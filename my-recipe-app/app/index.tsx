import React from "react";
import { View, StyleSheet } from "react-native";
import TestRecipeScreen from "./(tabs)/test_recipe"; // Ensure this path is correct

export default function Index() {
  return (
    <View style={styles.container}>
      <TestRecipeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
