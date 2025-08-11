// IngredientInfoScreen.js
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function IngredientInfoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [ingredient, setIngredient] = useState(route.params?.ingredient || null);
  const [loading, setLoading] = useState(!route.params?.ingredient);

  // 서버에서 식재료 가져오기 (홈화면에서 param 안 보내면 자동 호출)
  const fetchIngredient = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await axios.get('http://43.200.200.161:8080/api/Ingredienttoday', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) setIngredient(res.data);
    } catch (err) {
      console.log('식재료 정보 불러오기 오류:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!ingredient) {
      fetchIngredient();
    }
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#fbbf24" />
      </View>
    );
  }

  if (!ingredient) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>식재료 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden={true} />
      
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-12 left-5 z-10 p-2 rounded-full bg-gr"
      >
        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: hp(12), paddingBottom: hp(5), paddingHorizontal: wp(5) }}
      >
        <Animated.View entering={FadeInDown.delay(100).duration(600).springify().damping(12)}>
          <Text style={{ fontSize: hp(2.3) }} className="font-semibold text-neutral-700 text-center mb-4">
            오늘의 식재료 상식
          </Text>

          <View className="items-center">
            <Image
              source={{ uri: ingredient.imageUrl }}
              style={{ width: wp(80), height: hp(25), borderRadius: 20 }}
              className="bg-black/5"
              resizeMode="cover"
            />
          </View>

          <View className="space-y-2 pt-4">
            <Text className="text-xl font-bold text-center">{ingredient.name}</Text>
            <Text className="text-base text-neutral-700 text-justify leading-6">
              {ingredient.description}
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
