import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ChevronLeftIcon, PlusIcon } from 'react-native-heroicons/outline';

export default function ProfileEdit({ route }) {
  const navigation = useNavigation();
  const { userData } = route.params;

  // renderSection 함수는 수정 없이 그대로 사용합니다.
  const renderSection = (title, data, navigateTo) => (
    <TouchableOpacity onPress={() => navigation.navigate(navigateTo, { userData: userData })} activeOpacity={0.8}>
      <Animated.View
        entering={FadeInDown.duration(700).springify().damping(12)}
        className="bg-gray-100 p-4 rounded-2xl mb-5"
      >
        <Text style={{ fontSize: hp(2.5) }} className="font-semibold mb-3 text-neutral-700">
          {title}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-4">
            {data.length > 0 ? (
              data.map((item, index) => (
                <View key={index} className="w-16 h-16 bg-teal-500 rounded-xl justify-center items-center">
                  <Text className="text-white text-xs text-center">{item}</Text>
                </View>
              ))
            ) : (
              <View className="w-16 h-16 bg-gray-300 rounded-xl justify-center items-center">
                <PlusIcon size={hp(4)} strokeWidth={2.5} color="white" />
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white pt-2">
      <StatusBar hidden={true} />

      <Animated.View
        entering={FadeInDown.delay(200).duration(1000)}
        className="w-full mb-4 flex-row justify-between items-center pt-14"
      >
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-gray-200">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
      </Animated.View>

      <View className="flex-row space-y-3 space-x-3 justify-left items-center mx-4">
        <Text className="font-bold text-4xl">{userData.userId}</Text>
      </View>

      <View className="px-4 mt-10">
        {renderSection('알레르기', userData.bannedList, 'SelectAllergyScreen')}
        {renderSection('조리도구', userData.toolsList, 'SelectToolScreen')}
        {renderSection('냉장고 현황', userData.ingredients.map(ing => ing.name), 'SelectIngredientsScreen')}
      </View>

      {/* 저장하기 버튼을 제거했습니다. */}
    </View>
  );
}