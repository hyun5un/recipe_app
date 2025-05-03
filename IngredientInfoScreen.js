// IngredientTipScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';

const IngredientTipScreen = () => {
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    fetchIngredient();
  }, []);

  const fetchIngredient = async () => {
    try {
      const response = await axios.get('http://YOUR_BACKEND_URL/api/daily/recommendations/ingredient');
      setIngredient(response.data.ingredient);
    } catch (error) {
      console.error('식재료 정보 로딩 실패:', error);
    }
  };

  if (!ingredient) {
    return <Text style={styles.loading}>로딩 중...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* 대표 이미지 자리에 이미지 경로가 없으면 기본 배경 */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>{ingredient.name}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionTitle}>오늘의 상식</Text>
        <Text style={styles.description}>{ingredient.description}</Text>

        <View style={styles.bulletContainer}>
          {ingredient.nutrients.split(',').map((item, index) => (
            <Text key={index} style={styles.bulletPoint}>• {item.trim()}</Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>보관법</Text>
        <Text style={styles.description}>{ingredient.storage}</Text>

        <Text style={styles.sectionTitle}>활용법</Text>
        <Text style={styles.description}>{ingredient.usage}</Text>
      </View>
    </ScrollView>
  );
};

export default IngredientTipScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#333',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  body: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  bulletContainer: {
    marginVertical: 8,
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 8,
  },
});
