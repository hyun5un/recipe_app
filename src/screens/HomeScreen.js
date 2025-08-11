import { View, Text, ScrollView, Image, StatusBar, TouchableOpacity, Pressable, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTodayRecipes();
    fetchTodayIngredient();
  }, []);

  const fetchTodayRecipes = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await axios.get('http://43.200.200.161:8080/api/recipetoday', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        // 배열 형태면 slice(0,5) 가능, 단일 객체면 배열로 변환
        const recipeList = Array.isArray(res.data) ? res.data.slice(0, 5) : [res.data];
        setRecipes(recipeList);
      }
    } catch (err) {
      console.log('레시피 불러오기 오류:', err.message);
    }
  };

  const fetchTodayIngredient = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await axios.get('http://43.200.200.161:8080/api/Ingredienttoday', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) setIngredient(res.data);
    } catch (err) {
      console.log('식재료 불러오기 오류:', err.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar backgroundColor="#eab308" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} className="space-y-6 pt-10">
        {/* 로고 */}
        <Animated.View entering={FadeInDown.delay(100).duration(600).springify().damping(12)}>
          <View style={{ height: 50 }} className="flex-row justify-between items-center mb-2 top-2 bottom-2 bg-ye">
            <Image source={require('../../assets/images/recipppe.png')} style={{ marginLeft: 16, height: hp(3.2), width: hp(8.3) }} />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image source={require('../../assets/images/avatar.png')} style={{ marginRight: 16, height: hp(4.2), width: hp(4.3) }} />
            </TouchableOpacity>
          </View>

          {/* 검색/나의 레시피 */}
          <View className="mt-8 flex-row mx-4 space-x-4 justify-center items-center">
            <Pressable onPress={() => navigation.navigate('Select_cate')}>
              <View style={{ height: 180, width: 180 }} className="bg-gr rounded-3xl flex-col justify-center items-center">
                <Text style={{ fontSize: hp(2.8) }} className="font-semibold text-ye pb-3">레시피 검색</Text>
                <AntDesign name="search1" size={hp(5.5)} color="#ffab00" />
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('MyRecipe')}>
              <View style={{ height: 180, width: 180 }} className="bg-gr rounded-3xl flex-col justify-center items-center">
                <Text style={{ fontSize: hp(2.8) }} className="font-semibold text-ye pb-3">나의 레시피</Text>
                <AntDesign name="like2" size={hp(5.5)} color="#ffab00" />
              </View>
            </Pressable>
          </View>
        </Animated.View>

        {/* 오늘의 추천 레시피 */}
        <View className="-mt-10 mx-4 space-y-3">
          <View className="flex-row justify-between items-center pt-2 pb-2 bg-ye rounded-xl px-4">
            <Text style={{ fontSize: hp(2) }} className="font-semibold text-gr">오늘의 추천 레시피</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AiRecommend')}>
              <Text className="text-gr font-semibold">≫</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recipes}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
                style={{ marginRight: 10 }}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: wp(40), height: hp(20), borderRadius: 12, backgroundColor: '#f3f3f3' }}
                />
                <Text numberOfLines={1} style={{ marginTop: 5, fontWeight: '500' }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* 오늘의 식재료 상식 */}
        <View className="-mt-10 mx-4 space-y-3">
          <View className="flex-row justify-between items-center pt-2 pb-2 bg-ye rounded-xl px-4">
            <Text style={{ fontSize: hp(2) }} className="font-semibold text-gr">오늘의 식재료 상식</Text>
            <TouchableOpacity onPress={() => navigation.navigate('IngredientDetail', { ingredient })}>
              <Text className="text-gr font-semibold">≫</Text>
            </TouchableOpacity>
          </View>
          {ingredient && (
            <TouchableOpacity onPress={() => navigation.navigate('IngredientDetail', { ingredient })}>
              <Image
                source={{ uri: ingredient.imageUrl }}
                style={{ width: '100%', height: hp(20), borderRadius: 12, backgroundColor: '#f3f3f3' }}
              />
              <Text numberOfLines={1} style={{ marginTop: 5, fontWeight: '500' }}>{ingredient.name}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
