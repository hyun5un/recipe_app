import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, StyleSheet } from 'react-native';

const TOOLS = ['프라이팬', '냄비', '믹서기', '칼'];

export default function SelectToolScreen({ route, navigation }) {
  const [selectedTools, setSelectedTools] = useState([]);
  const [search, setSearch] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const filteredTools = TOOLS.filter(item => item.includes(search));

  const addTool = (item) => {
    if (!selectedTools.includes(item)) {
      setSelectedTools([...selectedTools, item]);
    }
  };

  const removeTool = (item) => {
    setSelectedTools(selectedTools.filter(i => i !== item));
  };

  const handleCustomAdd = () => {
    if (customInput.trim() && !selectedTools.includes(customInput.trim())) {
      setSelectedTools([...selectedTools, customInput.trim()]);
      setCustomInput('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>조리도구 선택</Text>

      <TextInput
        placeholder="검색"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <ScrollView style={styles.itemList}>
        {filteredTools.map(item => (
          <TouchableOpacity key={item} style={styles.itemButton} onPress={() => addTool(item)}>
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
        <Text>선택된 조리도구:</Text>
        <ScrollView horizontal>
          {selectedTools.map(item => (
            <View key={item} style={styles.selectedItem}>
              <Text>{item}</Text>
              <TouchableOpacity onPress={() => removeTool(item)}>
                <Text style={{ marginLeft: 5 }}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>도구 추가</Text>
            <TextInput
              value={customInput}
              onChangeText={setCustomInput}
              placeholder="예: 전기밥솥"
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
