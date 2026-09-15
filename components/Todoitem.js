import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Component TodoItem: 1 dòng todo với checkbox, text, nút xoá
export default function TodoItem({ todo, onToggle, onDelete, colors, cardRadius, spacing }) {
  return (
    <View style={[styles.itemRow, { borderRadius: cardRadius, marginBottom: spacing, borderColor: colors.accent }]}>
      {/* Checkbox: bấm vào để đổi trạng thái completed */}
      <TouchableOpacity
        style={[styles.checkbox, { borderColor: colors.accent }, todo.completed && { backgroundColor: colors.accent }]}
        onPress={() => onToggle(todo.id)}
      >
        {todo.completed && <Text style={styles.checkMark}>✓</Text>}
      </TouchableOpacity>

      {/* Text: gạch ngang khi đã hoàn thành */}
      <Text
        style={[
          styles.itemText,
          todo.completed && styles.itemTextDone,
        ]}
      >
        {todo.text}
      </Text>

      {/* Nút xoá */}
      <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkMark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteBtn: {
    paddingHorizontal: 8,
  },
  deleteText: {
    color: '#E53935',
    fontSize: 16,
    fontWeight: 'bold',
  },
});