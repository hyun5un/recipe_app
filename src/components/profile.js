import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Profile() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white pt-2">
      <StatusBar hidden={true} />

      {/* 뒤로가기 */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full mb-4 flex-row justify-between items-center pt-14">
        <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 rounded-full ml-5 bg-gr">
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
      </Animated.View>

      <View className="flex-row space-y-3 space-x-3 justify-left items-center mx-4">
          <Image source={require('../../assets/images/avatar.png')} style={{height: hp(15), width: hp(15)}} />
          <Text className="font-bold text-3xl">김철수</Text>
      </View>
    </View>
  )
}