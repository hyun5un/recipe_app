import React, { useState } from 'react'; // useState 임포트
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, StatusBar, StyleSheet } from 'react-native'; // StatusBar 임포트
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CATEGORIES = ['전체', '육류', '수산물', '채소', '과일', '유제품'];
const INGREDIENTS = {
  육류: ['소고기', '돼지고기', '닭', '양고기'],
  수산물: ['연어', '고등어', '참치', '새우'],
  채소: ['상추', '양파', '당근'],
  과일: ['사과', '바나나'],
  유제품: ['우유', '치즈'],
};

export default function SelectIngredientsScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const allIngredients = selectedCategory === '전체'
    ? Object.values(INGREDIENTS).flat()
    : INGREDIENTS[selectedCategory] || [];

  const filtered = allIngredients.filter(i => i.includes(search));

  const addIngredient = (item) => {
    if (!selectedIngredients.includes(item)) {
      setSelectedIngredients([...selectedIngredients, item]);
    }
  };

  const removeIngredient = (item) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== item));
  };

  const handleCustomAdd = () => {
    if (customInput.trim() && !selectedIngredients.includes(customInput.trim())) {
      setSelectedIngredients([...selectedIngredients, customInput.trim()]);
      setCustomInput('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      {/* 뒤로가기 버튼 */}
      <Animated.View entering={FadeInDown.delay(200).duration(1000)} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeftIcon size={26} strokeWidth={3} color="#fbbf24" />
        </TouchableOpacity>
        <Text style={styles.title}>재료 선택</Text>
      </Animated.View>

      {/* 재료 검색 */}
      <TextInput
        placeholder="재료 검색"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* 카테고리 선택 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)}>
            <Text style={[styles.tab, selectedCategory === cat && styles.activeTab]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 재료 목록 */}
      <ScrollView contentContainerStyle={styles.ingredientsWrap}>
        {filtered.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => addIngredient(item)}
            style={styles.ingredientButton}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.ingredientButton, { backgroundColor: '#ddd' }]}
          onPress={() => setModalVisible(true)}
        >
          <Text>+ 추가</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 선택된 재료 */}
      <View style={styles.selectedBox}>
        <Text style={{ color: 'white', marginBottom: 5 }}>선택한 재료</Text>
        <ScrollView>
          <View style={styles.selectedChipWrap}>
            {selectedIngredients.map((item) => (
              <View key={item} style={styles.selectedChip}>
                <Text>{item}</Text>
                <TouchableOpacity onPress={() => removeIngredient(item)}>
                  <Text style={{ marginLeft: 5 }}>✕</Text>
              </TouchableOpacity>
            </View>
           ))}
          </View>
        </ScrollView>
      </View>

      {/* 재료 추가 모달 */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>재료 추가</Text>
            <TextInput
              placeholder="예: 계란"
              value={customInput}
              onChangeText={setCustomInput}
              style={styles.modalInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCustomAdd}>
                <Text>추가</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  title: { fontSize: 22, fontWeight: 'bold' },
  search: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10, marginBottom: 10,
  },
  tabs: { marginBottom: 10 },
  tab: { marginRight: 15, fontSize: 16, color: 'gray' },
  activeTab: { color: 'black', fontWeight: 'bold' },
  ingredientsWrap: {
    flexDirection: 'row', flexWrap: 'wrap',
  },
  ingredientButton: {
    backgroundColor: '#eee', padding: 10, borderRadius: 20, margin: 5,
  },
  selectedBox: {
    backgroundColor: '#444',padding: 15,borderRadius: 20,marginBottom: 20,maxHeight: 120,
  },
  selectedChip: {
    backgroundColor: 'white', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 5,
    flexDirection: 'row', alignItems: 'center', marginRight: 10,
  },
  selectedChipWrap: {
    flexDirection: 'row',
  flexWrap: 'wrap',
  },
  overlay: {
    flex: 1, justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalInput: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 20,
  },
}); 