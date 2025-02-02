import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
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
  const allergies = [
    "Milk and dairy products", "Eggs", "Peanuts", "Tree Nuts",
    "Shellfish", "Fish", "Soy", "Wheat (Non-Celiac)"
  ];

  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");

  

  // ✅ Fetch user preferences from Firestore on login
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
          setCustomAllergy(userData.customAllergy || "");
        }
      }
    };

    fetchUserData();
  }, []);

  // ✅ Save preferences to Firestore when clicking "Next"
  const savePreferences = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(userDocRef, { 
        dietaryPreferences: selectedDiet, 
        allergies: selectedAllergies, 
        customAllergy: customAllergy 
      }, { merge: true });
    }
  };

  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>USER SPECIALIZED SETTINGS</Text>
        <Text style={globalStyles.subheader}>We will give you specialized cooking advice based on your condition.</Text>

       
        <ScrollView style={globalStyles.scrollView}>
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
          <TextInput
            style={globalStyles.input}
            placeholder="Add any allergies here"
            placeholderTextColor="#aaa"
            value={customAllergy}
            onChangeText={setCustomAllergy}
          />
        </ScrollView>

        <View style={globalStyles.buttonContainer}>

          <Button mode="outlined" style={globalStyles.skipButton} onPress={() => navigation.goBack()}>
            Previous
          </Button>

          <Button mode="contained" style={globalStyles.nextButton} onPress={async () => {
              await savePreferences();  // ✅ Wait for Firestore update before navigating
              navigation.navigate("FinishSetting");
          }}>
            Next
          </Button>

        </View>
      </View>
    </SafeAreaView>
  );
};



export default DietaryPreferenceScreen;
