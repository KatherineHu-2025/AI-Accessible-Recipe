import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";  

type SeasoningScreenProps = NativeStackScreenProps<AuthStackParamList, "Seasoning">;

const SeasoningScreen: React.FC<SeasoningScreenProps> = ({ navigation }) => {
  const seasoningList = [
    "Salt", "Black Pepper", "Sugar", "Garlic Powder", "Onion Powder",
    "Chili Powder", "Cinnamon", "Oregano", "Basil", "Red Pepper Flakes",
  ];

  const condimentList = [
    "Ketchup", "Mustard", "Mayonnaise", "Soy Sauce", "Hot Sauce",
    "Barbecue Sauce", "Vinegar", "Honey",
  ];

  // ✅ Set all checkboxes as selected by default
  const [selectedItems, setSelectedItems] = useState<string[]>([...seasoningList, ...condimentList]);

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

        {/* ✅ Make both questions move within ScrollView */}
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>What seasonings do you have?</Text>
          {seasoningList.map((item, index) => (
            <View key={index} style={styles.checkboxContainer}>
              <Checkbox
                value={selectedItems.includes(item)}
                onValueChange={() => toggleCheckbox(item)}
                color={selectedItems.includes(item) ? "#000" : undefined}
              />
              <Text style={styles.checkboxLabel}>{item}</Text>
            </View>
          ))}

          {/* ✅ Added extra margin for better spacing */}
          <Text style={[styles.title, styles.extraMarginTop]}>What condiments/sauces do you have?</Text>
          {condimentList.map((item, index) => (
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
          <Button mode="outlined" style={styles.skipButton} onPress={() => navigation.goBack()}>
            Previous
          </Button>

          <Button mode="contained" style={styles.nextButton} onPress={() => navigation.navigate("DietaryPreference")}>
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
  extraMarginTop: {
    marginTop: 20, // ✅ Adds extra margin for "What condiments/sauces do you have?"
  },
  scrollView: {
    paddingHorizontal: 5,
    paddingBottom: 20, // Ensures scrolling is smooth and allows space at bottom
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 30,
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

export default SeasoningScreen;
