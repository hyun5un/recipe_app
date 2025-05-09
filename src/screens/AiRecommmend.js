import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import Loading from '../components/loading';
import { CachedImage } from '../helpers/image';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function AiRecommend() {
  const navigation = useNavigation();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getRecommendedRecipes();
  }, []);

  const getRecommendedRecipes = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/search.php?s=');
      if (response && response.data && response.data.meals) {
        setMeals(response.data.meals.slice(0, 5)); // 최대 5개만
      }
    } catch (err) {
      console.log('error fetching AI recommended recipes: ', err.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar backgroundColor="#eab308" barStyle="light-content" />
      {/* 상단 바 & 뒤로가기 버튼 */}
      <View className="flex-row items-center justify-between bg-ye px-4 py-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={hp(3)} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: hp(2.2) }} className="font-semibold text-black">AI 추천 레시피</Text>
        <View style={{ width: hp(3) }} /> {/* 오른쪽 공간 정렬용 */}
      </View>

      {/* 본문 */}
      <View className="mx-4 mt-6">
        {
          meals.length === 0 ? (
            <Loading size="large" className="mt-20" />
          ) : (
            <FlatList
              data={meals}
              keyExtractor={(item) => item.idMeal}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('RecipeDetail', { ...item })}
                    className="mb-6"
                  >
                    <CachedImage
                      uri={item.strMealThumb}
                      style={{ width: '100%', height: hp(30), borderRadius: 20 }}
                      className="bg-black/5"
                      sharedTransitionTag={item.strMeal}
                    />
                    <Text style={{ fontSize: hp(2) }} className="font-semibold mt-2 text-neutral-700">
                      {item.strMeal.length > 25 ? item.strMeal.slice(0, 25) + '...' : item.strMeal}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            />
          )
        }
      </View>
    </View>
  );
}
