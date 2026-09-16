import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

// Component Header: nhận theme màu, STUDENT_ID, số liệu counter, và search text từ App.js
export default function Header({ STUDENT_ID, colors, total, completedCount, remaining, searchText, setSearchText }) {
  return (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      {/* Dùng STUDENT_ID lần 1: hiển thị trong header */}
      <Text style={styles.title}>Todo App - SV: {STUDENT_ID}</Text>

      {/* Feature: Counter - đếm tổng, đã xong, còn lại */}
      <View style={styles.counterRow}>
        <Text style={styles.counterText}>Tổng: {total}</Text>
        <Text style={styles.counterText}>Đã hoàn thành: {completedCount}</Text>
        <Text style={styles.counterText}>Còn: {remaining}</Text>
      </View>

      {/* Feature: Search - lọc todo theo text */}
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm todo..."
        placeholderTextColor="#666"
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    // Flexbox: sắp xếp các phần theo chiều dọc, căn giữa theo chiều ngang
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  counterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
});
