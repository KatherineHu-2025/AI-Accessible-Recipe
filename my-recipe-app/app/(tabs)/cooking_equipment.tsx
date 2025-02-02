import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Checkbox from "expo-checkbox"; 
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";  // ✅ Import navigation types

type CookingEquipmentScreenProps = NativeStackScreenProps<AuthStackParamList, "CookingEquipment">;

// ✅ Define navigation props correctly
const CookingEquipmentScreen: React.FC<CookingEquipmentScreenProps> = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const equipmentList = [
    "FryingPan", "Saucepan", "Stockpot", "Wok", "Oven",
    "Air fryer", "Pizza Oven", "Microwave", "Barbecue Grills",
  ];

  const toggleCheckbox = (item: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>USER SPECIALIZED SETTINGS</Text>
        <Text style={styles.subheader}>We will give you specialized cooking advice based on your condition.</Text>

        <Text style={styles.title}>Welcome, Username! What cooking equipment do you have?</Text>

        <ScrollView style={styles.scrollView}>
          {equipmentList.map((item, index) => (
            <View key={index} style={styles.checkboxContainer}>
              <Checkbox
                value={selectedItems.includes(item)}
                onValueChange={() => toggleCheckbox(item)}
                color={selectedItems.includes(item) ? "#000" : undefined}
              />
              <Text style={styles.checkboxLabel}>{item}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setSelectedItems([])}>
            <Text style={styles.skipAllText}>Skip All</Text>
          </TouchableOpacity>

          <Button mode="outlined" style={styles.skipButton} onPress={() => navigation.goBack()}>
            Skip
          </Button>

          <Button mode="contained" style={styles.nextButton} onPress={() => navigation.navigate("Seasoning")}>
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
    paddingTop: 30, // Increased to avoid overlap with notch
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
    lineHeight: 18, // Increased line height for better readability
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20, // Increased spacing for clarity
  },
  scrollView: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5, // Added padding between checkboxes
  },
  checkboxLabel: {
    fontSize: 18, // Increased font size for readability
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30, // Ensure buttons don't get too close to the bottom
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

export default CookingEquipmentScreen;
