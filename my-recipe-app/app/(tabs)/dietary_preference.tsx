import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { Button } from "react-native-paper";

const DietaryPreferenceScreen = () => {
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
  ]);
  const [allergies, setAllergies] = useState<string[]>([
    "Milk and dairy products",
    "Eggs",
    "Peanuts",
    "Tree Nuts",
    "Shellfish",
    "Fish",
    "Soy",
    "Wheat (Non-Celiac)",
  ]);
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");

  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>USER SPECIALIZED SETTINGS</Text>
      <Text style={styles.subHeader}>We will give you specialized cooking advice based on your condition.</Text>

      <Text style={styles.sectionTitle}>What are your dietary preferences?</Text>
      {dietaryPreferences.map((item) => (
        <View key={item} style={styles.checkboxContainer}>
          <Checkbox
            value={selectedDiet.includes(item)}
            onValueChange={() => toggleSelection(item, selectedDiet, setSelectedDiet)}
            color={selectedDiet.includes(item) ? "#000" : undefined}
          />
          <Text style={styles.checkboxLabel}>{item}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>What are your allergies?</Text>
      {allergies.map((item) => (
        <View key={item} style={styles.checkboxContainer}>
          <Checkbox
            value={selectedAllergies.includes(item)}
            onValueChange={() => toggleSelection(item, selectedAllergies, setSelectedAllergies)}
            color={selectedAllergies.includes(item) ? "#000" : undefined}
          />
          <Text style={styles.checkboxLabel}>{item}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Customize</Text>
      <TextInput
        style={styles.input}
        placeholder="Add any allergies here"
        placeholderTextColor="#aaa"
        value={customAllergy}
        onChangeText={setCustomAllergy}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={styles.skipAll}>Skip All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonGroup}>
        <Button mode="outlined" style={styles.skipButton} onPress={() => {}}>
          Skip
        </Button>
        <Button mode="contained" style={styles.finishButton} onPress={() => {}}>
          Finish
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  skipAll: {
    fontSize: 14,
    color: "#000",
    textDecorationLine: "underline",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skipButton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 5,
    flex: 1,
    marginRight: 10,
  },
  finishButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 5,
    flex: 1,
  },
});

export default DietaryPreferenceScreen;
