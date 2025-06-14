import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const validateName = (text) => /^[가-힣]+$/.test(text); // 한글만
  const validateBirth = (text) => /^\d{8}$/.test(text);   // 숫자 8자리

  const handleSignup = () => {
    if (!name || !birth || !id || !password) {
      Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
      return;
    }

    if (!validateName(name)) {
      Alert.alert('이름 오류', '이름은 한글만 입력 가능합니다.');
      return;
    }

    if (!validateBirth(birth)) {
      Alert.alert('생년월일 오류', '생년월일은 숫자 8자리로 입력해주세요. (예: 19950101)');
      return;
    }

    Alert.alert('회원가입 완료', '성공적으로 가입되었습니다!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={28} color="#558B2F" />
      </TouchableOpacity>

      <Text style={styles.title}>회원가입</Text>

      <TextInput
        style={styles.input}
        placeholder="이름 (한글만)"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="생년월일 (YYYYMMDD)"
        keyboardType="numeric"
        onChangeText={setBirth}
        value={birth}
        maxLength={8}
      />
      <TextInput
        style={styles.input}
        placeholder="아이디"
        onChangeText={setId}
        value={id}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>

      {/* 소셜 아이콘 */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={[styles.iconCircle, { backgroundColor: '#FEE500' }]}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#3C1E1E" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconCircle, { backgroundColor: '#fff' }]}>
          <AntDesign name="google" size={24} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconCircle, { backgroundColor: '#1877F2' }]}>
          <AntDesign name="facebook-square" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconCircle, { backgroundColor: '#ccc' }]}>
          <MaterialIcons name="email" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f59e0b' },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#558B2F',
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#558B2F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
  },
});

export default SignupScreen;
