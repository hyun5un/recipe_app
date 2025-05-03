import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { menuData } from '../data/menuData';
import RecipeCard from '../components/RecipeCard';

const STORAGE_KEY = '@daily_recommendation';

const RecommendScreen = ({ navigation }) => {
  const [recommendedMenus, setRecommendedMenus] = useState([]);

  const todayString = new Date().toISOString().split('T')[0];

  const getRandomMenus = () => {
    const shuffled = [...menuData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const loadDailyRecommendation = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const { date, menus } = JSON.parse(json);
        if (date === todayString) {
          setRecommendedMenus(menus);
          return;
        }
      }
      const newMenus = getRandomMenus();
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: todayString, menus: newMenus })
      );
      setRecommendedMenus(newMenus);
    } catch (e) {
      console.error('추천 메뉴 로딩 오류:', e);
      setRecommendedMenus(getRandomMenus());
    }
  };

  useEffect(() => {
    loadDailyRecommendation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 추천 메뉴</Text>
      <FlatList
        data={recommendedMenus}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard name={item.name} description={item.description} />
        )}
      />
      <Button
        title="오늘의 식재료 상식 보기"
        onPress={() => navigation.navigate('Ingredient')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});

export default RecommendScreen;
