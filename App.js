import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Header from './components/Header';
import TodoItem from './components/Todoitem';

// ====== STUDENT_ID - KHÔNG ĐƯỢC SỬA/XOÁ DÒNG NÀY ======
const STUDENT_ID = "1923050808";

// Custom requirement tự chọn: Light/Green theme, Search + Counter, List with checkbox
// Bảng màu theo theme Light/Green (được giao)
const colorPalette = ['#2E7D32', '#43A047', '#66BB6A', '#81C784', '#A5D6A7'];

export default function App() {
  // ---- STATE (useState) ----
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học React Native', completed: false },
    { id: 2, text: 'Ôn bài vấn đáp', completed: false },
    {id :3 , text:'Làm bài tập lập trình mobile ',completed:false},
  ]);
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');

  // ---- Dùng STUDENT_ID để tạo theme màu (Dùng lần 2, 3, 4, 5) ----
  const colorIndex = parseInt(STUDENT_ID[0]) % colorPalette.length; // digit[0] = '1' -> 1 % 5 = 1
  const cardRadius = parseInt(STUDENT_ID[2]) + 5;                   // digit[2] = '2' -> 2 + 5 = 7
  const cardPadding = parseInt(STUDENT_ID[4]) + 10;                 // digit[4] = '0' -> 0 + 10 = 10
  const itemSpacing = parseInt(STUDENT_ID[8]) + 4;                  // digit[8] = '0' -> 0 + 4 = 4

  const colors = {
    primary: colorPalette[colorIndex],
    accent: colorPalette[(colorIndex + 2) % colorPalette.length],
    background: '#F1F8F4', // nền xanh lá nhạt (Light/Green theme)
  };

  // ---- LOGIC CRUD ----
  const addTodo = () => {
    if (inputText.trim() === '') return; // không thêm todo rỗng
    const newTodo = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputText(''); // clear input sau khi thêm
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ---- Feature: Search - lọc danh sách theo searchText ----
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchText.toLowerCase())
  );

  // ---- Feature: Counter ----
  const total = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const remaining = total - completedCount;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* HEADER: chứa STUDENT_ID, counter, search */}
      <Header
        STUDENT_ID={STUDENT_ID}
        colors={colors}
        total={total}
        completedCount={completedCount}
        remaining={remaining}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {/* INPUT SECTION: flexDirection row, input chiếm hết chỗ trống (flex: 1) */}
      <View style={[styles.inputSection, { padding: cardPadding }]}>
        <TextInput
          style={[styles.input, { borderColor: colors.primary }]}
          placeholder="Nhập công việc mới..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={addTodo}
        >
          <Text style={styles.addButtonText}>Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* TODO LIST: flex: 1 để chiếm phần còn lại của màn hình */}
      <ScrollView style={styles.list} contentContainerStyle={{ paddingHorizontal: cardPadding }}>
        {filteredTodos.length === 0 ? (
          <Text style={styles.emptyText}>Không có todo nào</Text>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleComplete}
              onDelete={deleteTodo}
              colors={colors}
              cardRadius={cardRadius}
              spacing={itemSpacing}
            />
          ))
        )}
      </ScrollView>

      {/* FOOTER: hiển thị lại STUDENT_ID theo đúng yêu cầu "header/footer" */}
      <View style={[styles.footer, { backgroundColor: colors.accent }]}>
        <Text style={styles.footerText}>Student ID: {STUDENT_ID}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // chiếm toàn bộ màn hình
  },
  inputSection: {
    flexDirection: 'row', // input và button nằm ngang hàng
    alignItems: 'center',
  },
  input: {
    flex: 1, // input chiếm hết khoảng trống còn lại
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1, // list chiếm hết phần còn lại của màn hình
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontStyle: 'italic',
  },
});