import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { router, useFocusEffect } from 'expo-router';

export default function Messages() {
  const user = useSelector((s) => s.user);

  useFocusEffect(() => {
    !user && router.push("/login");
  });
  return (
    <View>
      <Text>M</Text>
    </View>
  )
}