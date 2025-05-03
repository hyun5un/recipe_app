// RecipeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const RecipeScreen = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://YOUR_BACKEND_URL/api/daily/recommendations/recipes');
      setRecipes(response.data.recipes.slice(0, 5)); // 상위 5개만 표시
    } catch (error) {
      console.error('레시피 로드 실패:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI의 오늘의 추천</Text>
      <View style={styles.grid}>
        {recipes.map((recipe, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Image source={{ uri: recipe.strRecipeThumb }} style={styles.image} />
            <Text style={styles.name}>{recipe.strName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginVertical: 12,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
  },
  name: {
    padding: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});

import IngredientInfoScreen from './IngredientInfoScreen';

