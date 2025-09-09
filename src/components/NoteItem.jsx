import React from 'react';
import { View, Text } from 'react-native';

export default function NoteItem({ note }) {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 18 }}>{note.title}</Text>
    </View>
  );
}
