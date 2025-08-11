import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, FlatList, Dimensions, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AiRecommendScreen() {
  const navigation = useNavigation();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getRecommendedRecipes();
  }, []);

  const getRecommendedRecipes = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('로그인 필요', '레시피를 보려면 먼저 로그인하세요.');
        navigation.replace('LoginScreen');
        return;
      }

      const response = await axios.get('http://43.200.200.161:8080/api/recipetoday', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        // 서버가 배열이 아닌 단일 객체를 주면 배열로 변환
        const recipes = Array.isArray(response.data) ? response.data : [response.data];
        setMeals(recipes);
      }
    } catch (err) {
      console.error('서버에서 레시피 가져오기 오류:', err);
      Alert.alert('오류', '레시피를 불러올 수 없습니다.');
    }
  };

  const numColumns = 2;
  const imageSize = (Dimensions.get('window').width - wp(12)) / 2;

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
            오늘의 추천 레시피
          </Text>

          <FlatList
            data={meals}
            numColumns={numColumns}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: hp(2) }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('RecipeDetail', { ...item })}
              >
                <Image
                  source={{ uri: item.imageUrl }} // 서버 DTO의 이미지 필드명에 맞춰 수정
                  style={{
                    width: imageSize,
                    height: hp(25),
                    borderRadius: 16,
                    backgroundColor: '#f3f3f3',
                  }}
                  resizeMode="cover"
                />
                <Text style={{ textAlign: 'center', marginTop: 5 }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
}
