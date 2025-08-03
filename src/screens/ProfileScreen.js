import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

export default function Profile() {
  const navigation = useNavigation();

  const renderSection = (title) => (
    <Animated.View
      entering={FadeInDown.duration(700).springify().damping(12)}
      className="bg-gray-100 p-4 rounded-2xl mb-5"
    >
      <Text style={{ fontSize: hp(2.2) }} className="font-semibold mb-3 text-neutral-700">
        {title}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row space-x-4">
          <View className="w-16 h-16 bg-teal-500 rounded-xl justify-center items-center">
            <Text className="text-white text-xs">아이템{'\n'}이미지</Text>
          </View>
          <View className="w-16 h-16 bg-teal-500 rounded-xl justify-center items-center">
            <Text className="text-white text-xs">아이템{'\n'}이미지</Text>
          </View>
          <View className="w-16 h-16 bg-teal-500 rounded-xl justify-center items-center">
            <Text className="text-white text-xs">아이템{'\n'}이미지</Text>
          </View>
          <View className="w-16 h-16 bg-teal-500 rounded-xl justify-center items-center">
            <Text className="text-white text-xs">아이템{'\n'}이미지</Text>
          </View>
          <View className="w-16 h-16 bg-teal-500 rounded-xl justify-center items-center">
            <Text className="text-white text-xs">아이템{'\n'}이미지</Text>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-white pt-2">
      <StatusBar hidden={true} />

      {/* 뒤로가기 버튼 */}
      <Animated.View entering={FadeInDown.delay(200).duration(1000)} className="w-full mb-4 flex-row justify-between items-center pt-14">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-gr">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
      </Animated.View>

      {/* 프로필 영역 */}
      <View className="flex-row space-y-3 space-x-3 justify-left items-center mx-4">
        <Image source={require('../../assets/images/avatar.png')} style={{ height: hp(15), width: hp(15) }} />
        <Text className="font-bold text-3xl">김철수</Text>
      </View>

      {/* 섹션들  */}
      <View className="px-4 mt-10">
        {renderSection('알레르기')}
        {renderSection('조리도구')}
        {renderSection('냉장고 현황')}
      </View>

      {/* 수정하기 버튼 */}
      <View className="items-center mt-8">
        <TouchableOpacity onPress={() => navigation.navigate('ProfileEdit')}>
          <Text style={{ color: '#000000', textDecorationLine: 'underline', fontSize: hp(2.2) }}>
            수정하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
