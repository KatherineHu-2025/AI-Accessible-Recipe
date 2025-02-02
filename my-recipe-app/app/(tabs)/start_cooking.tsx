import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet
} from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";  

type StartCookingScreenProps = NativeStackScreenProps<AuthStackParamList, "StartCooking">;

const StartCookingScreen: React.FC<StartCookingScreenProps> = ({ navigation }) => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [customPreference, setCustomPreference] = useState("");

  const cookingPreferences = [
    "Short Cooking Time ⏰",
    "Healthy / Low Calories 🥦",
    "Not Labor Intensive 😊",
    "Left-over friendly 🥡",
    "Impressive Dish 🍳",
    "One-Pot Meal 🍽️",
  ];

  const cuisines = ["Chinese", "Mexican", "Greek", "Japanese", "Italian", "Indian"];

  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeContainer}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {/* Header with clickable icon */}
            <TouchableOpacity style={styles.headerContainer} onPress={() => navigation.navigate("FridgePage")}>
              <MaterialCommunityIcons name="fridge-outline" size={40} color="black" />
              <Text style={styles.subHeader}>Click to open your fridge</Text>
            </TouchableOpacity>

            {/* Cooking Preferences */}
            <Text style={styles.sectionTitle}>What are your cooking preferences?</Text>
            {cookingPreferences.map((item) => (
            <TouchableOpacity 
              key={item} 
              style={styles.checkboxContainer} 
              onPress={() => toggleSelection(item, selectedPreferences, setSelectedPreferences)}
              activeOpacity={0.7} // Slight click feedback
            >
              <Checkbox
                value={selectedPreferences.includes(item)}
                onValueChange={() => toggleSelection(item, selectedPreferences, setSelectedPreferences)}
                color={selectedPreferences.includes(item) ? "#000" : "#ccc"}
              />
              <Text style={styles.checkboxLabel}>{item}</Text>
            </TouchableOpacity>
          ))}

            {/* Cuisine Preferences */}
            <Text style={styles.sectionTitle}>What cuisines do you prefer?</Text>
            <View style={styles.cuisineGrid}>
              {cuisines.map((item) => (
                <TouchableOpacity  key={item}  style={styles.cuisineRow} 
                    activeOpacity={0.7}
                    onPress={() => toggleSelection(item, selectedCuisines, setSelectedCuisines)}
                  >
                  <Checkbox
                    value={selectedCuisines.includes(item)}
                    onValueChange={() => toggleSelection(item, selectedCuisines, setSelectedCuisines)}
                    color={selectedCuisines.includes(item) ? "#000" : "#ccc"}
                  />
                  <Text style={styles.checkboxLabel}>{item}</Text>
                </TouchableOpacity>

                  
              ))}
            </View>

  

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log("Navigate to Cuisine")}
            >
              <Text style={styles.buttonText}>Get My Recipes!</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24, // ✅ Increased horizontal padding
    paddingTop: 50, // ✅ More space on top to avoid content being covered
  },
  safeContainer: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24, // ✅ Increased margin for better spacing
  },
  subHeader: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20, // ✅ Slightly increased font size
    fontWeight: "bold",
    marginTop: 24, // ✅ More padding after the title
    marginBottom: 12, // ✅ More space below the title
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8, // ✅ Increased spacing between checkboxes
  },
  cuisineGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cuisineRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "45%",
    marginVertical: 8, // ✅ Increased spacing between rows
  },
  checkboxLabel: {
    fontSize: 18, // ✅ Slightly increased font size
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12, // ✅ Increased padding inside the input
    fontSize: 18,
    marginTop: 12, // ✅ More space before input
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 16, // ✅ Increased button padding
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24, // ✅ More space before button
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default StartCookingScreen;
