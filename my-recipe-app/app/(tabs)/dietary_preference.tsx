import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";  // ✅ Use expo-checkbox to match other screens
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";  // ✅ Import navigation types

type DietaryPreferenceScreenProps = NativeStackScreenProps<AuthStackParamList, "DietaryPreference">;

const DietaryPreferenceScreen: React.FC<DietaryPreferenceScreenProps> = ({ navigation }) => {
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");

  const dietaryPreferences = ["Vegetarian", "Vegan", "Gluten-Free"];
  const allergies = [
    "Milk and dairy products", "Eggs", "Peanuts", "Tree Nuts",
    "Shellfish", "Fish", "Soy", "Wheat (Non-Celiac)"
  ];

  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>USER SPECIALIZED SETTINGS</Text>
        <Text style={styles.subheader}>We will give you specialized cooking advice based on your condition.</Text>

        <Text style={styles.title}>What are your dietary preferences?</Text>
        <ScrollView style={styles.scrollView}>
          {dietaryPreferences.map((item, index) => (
            <View key={index} style={styles.checkboxContainer}>
              <Checkbox
                value={selectedDiet.includes(item)}
                onValueChange={() => toggleSelection(item, selectedDiet, setSelectedDiet)}
                color={selectedDiet.includes(item) ? "#000" : undefined}
              />
              <Text style={styles.checkboxLabel}>{item}</Text>
            </View>
          ))}

          <Text style={styles.title}>What are your allergies?</Text>
          {allergies.map((item, index) => (
            <View key={index} style={styles.checkboxContainer}>
              <Checkbox
                value={selectedAllergies.includes(item)}
                onValueChange={() => toggleSelection(item, selectedAllergies, setSelectedAllergies)}
                color={selectedAllergies.includes(item) ? "#000" : undefined}
              />
              <Text style={styles.checkboxLabel}>{item}</Text>
            </View>
          ))}

          <Text style={styles.title}>Customize</Text>
          <TextInput
            style={styles.input}
            placeholder="Add any allergies here"
            placeholderTextColor="#aaa"
            value={customAllergy}
            onChangeText={setCustomAllergy}
          />
        </ScrollView>

        <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setSelectedDiet([]); 
            setSelectedAllergies([]);
          }}
        >
          <Text style={styles.skipAllText}>Skip All</Text>
        </TouchableOpacity>

          <Button mode="outlined" style={styles.skipButton} onPress={() => navigation.goBack()}>
            Skip
          </Button>

          <Button mode="contained" style={styles.nextButton} onPress={() => navigation.navigate("FinishSetting")}>
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30, // Matches `cooking_equipment.tsx`
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  subheader: {
    fontSize: 13,
    color: "gray",
    marginBottom: 10,
    lineHeight: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollView: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5, // Matches `cooking_equipment.tsx`
  },
  checkboxLabel: {
    fontSize: 18,
    marginLeft: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F5F5F5",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  skipAllText: {
    fontSize: 16,
    color: "black",
    textDecorationLine: "underline",
  },
  skipButton: {
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  nextButton: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default DietaryPreferenceScreen;
