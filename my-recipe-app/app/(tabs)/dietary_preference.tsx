import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, ScrollView, SafeAreaView, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from "react-native";
import Checkbox from "expo-checkbox";  
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";  
import { auth, db } from "../../firebaseConfig";  
import { doc, getDoc, setDoc } from "firebase/firestore";
import globalStyles from "./globalStyles"; 

type DietaryPreferenceScreenProps = NativeStackScreenProps<AuthStackParamList, "DietaryPreference">;

const DietaryPreferenceScreen: React.FC<DietaryPreferenceScreenProps> = ({ navigation }) => {
  const dietaryPreferences = ["Vegetarian", "Vegan", "Gluten-Free"];
  const defaultAllergies = [
    "Milk and dairy products", "Eggs", "Peanuts", "Tree Nuts",
    "Shellfish", "Fish", "Soy", "Wheat (Non-Celiac)"
  ];

  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>(defaultAllergies);
  const [customAllergy, setCustomAllergy] = useState("");

  // Fetch user preferences from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setSelectedDiet(userData.dietaryPreferences || []);
          setSelectedAllergies(userData.allergies || []);
          setAllergies([...defaultAllergies, ...(userData.customAllergies || [])]);
        }
      }
    };

    fetchUserData();
  }, []);

  // Save preferences to Firestore
  const savePreferences = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(userDocRef, { 
        dietaryPreferences: selectedDiet, 
        allergies: selectedAllergies, 
        customAllergies: allergies.filter(a => !defaultAllergies.includes(a))
      }, { merge: true });
    }
  };

  // Function to toggle selection of a checkbox
  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Function to handle adding custom allergies
  const handleAddCustomAllergy = () => {
    const trimmedAllergy = customAllergy.trim();
    if (trimmedAllergy !== "" && !allergies.includes(trimmedAllergy)) {
      setAllergies((prev) => [...prev, trimmedAllergy]);
      setSelectedAllergies((prev) => [...prev, trimmedAllergy]); // Automatically check the new allergy
      setCustomAllergy(""); // Clear the input field
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={globalStyles.container}>
            <Text style={globalStyles.header}>USER SPECIALIZED SETTINGS</Text>
            <Text style={globalStyles.subheader}>
              We will give you specialized cooking advice based on your condition.
            </Text>

            <ScrollView 
              style={globalStyles.scrollView} 
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 50 }} // Ensure button visibility
            >
              <Text style={globalStyles.title}>What are your dietary preferences?</Text>
              {dietaryPreferences.map((item, index) => (
                <View key={index} style={globalStyles.checkboxContainer}>
                  <Checkbox
                    value={selectedDiet.includes(item)}
                    onValueChange={() => toggleSelection(item, selectedDiet, setSelectedDiet)}
                    color={selectedDiet.includes(item) ? "#000" : undefined}
                  />
                  <Text style={globalStyles.checkboxLabel}>{item}</Text>
                </View>
              ))}

              <Text style={[globalStyles.title, globalStyles.extraMarginTop]}>What are your allergies?</Text>
              {allergies.map((item, index) => (
                <View key={index} style={globalStyles.checkboxContainer}>
                  <Checkbox
                    value={selectedAllergies.includes(item)}
                    onValueChange={() => toggleSelection(item, selectedAllergies, setSelectedAllergies)}
                    color={selectedAllergies.includes(item) ? "#000" : undefined}
                  />
                  <Text style={globalStyles.checkboxLabel}>{item}</Text>
                </View>
              ))}

              <Text style={[globalStyles.title, globalStyles.extraMarginTop]}>Customize</Text>
              <View style={[globalStyles.customAllergyContainer, { flexDirection: "row", alignItems: "center", gap: 10 }]}>
                <TextInput
                  style={[globalStyles.input, { flex: 1 }]} // Make input take available space
                  placeholder="Add any allergies here"
                  placeholderTextColor="#aaa"
                  value={customAllergy}
                  onChangeText={setCustomAllergy}
                />
                <Button mode="contained" onPress={handleAddCustomAllergy} style={globalStyles.addButton}>
                  Add
                </Button>
              </View>
            </ScrollView>

            <View style={globalStyles.buttonContainer}>
              <Button mode="outlined" style={globalStyles.skipButton} onPress={() => navigation.goBack()}>
                Previous
              </Button>

              <Button mode="contained" style={globalStyles.nextButton} onPress={async () => {
                await savePreferences();  // Wait for Firestore update before navigating
                navigation.navigate("FinishSetting");
              }}>
                Next
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DietaryPreferenceScreen;
