import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, StyleSheet } from 'react-native';

const ALLERGIES = ['견과류', '유제품', '글루텐', '달걀'];

export default function SelectAllergyScreen({ route, navigation }) {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [search, setSearch] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const filteredAllergies = ALLERGIES.filter(item => item.includes(search));

  const addAllergy = (item) => {
    if (!selectedAllergies.includes(item)) {
      setSelectedAllergies([...selectedAllergies, item]);
    }
  };

  const removeAllergy = (item) => {
    setSelectedAllergies(selectedAllergies.filter(i => i !== item));
  };

  const handleCustomAdd = () => {
    if (customInput.trim() && !selectedAllergies.includes(customInput.trim())) {
      setSelectedAllergies([...selectedAllergies, customInput.trim()]);
      setCustomInput('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>알레르기 선택</Text>

      <TextInput
        placeholder="검색"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <ScrollView style={styles.itemList}>
        {filteredAllergies.map(item => (
          <TouchableOpacity key={item} style={styles.itemButton} onPress={() => addAllergy(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.itemButton, { backgroundColor: '#ddd' }]}
          onPress={() => setModalVisible(true)}
        >
          <Text>+ 직접 추가</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.selectedItems}>
        <Text>선택된 알레르기:</Text>
        <ScrollView horizontal>
          {selectedAllergies.map(item => (
            <View key={item} style={styles.selectedItem}>
              <Text>{item}</Text>
              <TouchableOpacity onPress={() => removeAllergy(item)}>
                <Text style={{ marginLeft: 5 }}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>알레르기 추가</Text>
            <TextInput
              value={customInput}
              onChangeText={setCustomInput}
              placeholder="예: 해산물"
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
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  search: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10, marginBottom: 10 },
  itemList: { flexDirection: 'row', flexWrap: 'wrap' },
  itemButton: { backgroundColor: '#eee', padding: 10, borderRadius: 20, margin: 5 },
  selectedItems: { backgroundColor: '#444', padding: 15, borderRadius: 20, marginTop: 20 },
  selectedItem: { backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', marginRight: 10 },
  overlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modal: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
