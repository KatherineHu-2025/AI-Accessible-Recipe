import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";  
import { auth, db } from "../../firebaseConfig";  
import { doc, getDoc, setDoc } from "firebase/firestore";
import globalStyles from "./globalStyles";  

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

  // ✅ Load user preferences from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setSelectedItems(userData.seasonings || [...seasoningList, ...condimentList]); // Load saved data or defaults
        }
      }
    };

    fetchUserData();
  }, []);

  // ✅ Save user preferences to Firestore
  const savePreferences = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(userDocRef, { seasonings: selectedItems }, { merge: true });
    }
  };

  const toggleCheckbox = (item: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>USER SPECIALIZED SETTINGS</Text>
        <Text style={globalStyles.subheader}>We will give you specialized cooking advice based on your condition.</Text>

        <ScrollView style={globalStyles.scrollView}>
        {/* Seasonings Section */}
        <Text style={globalStyles.title}>What seasonings do you have?</Text>
        {seasoningList.map((item, index) => (
            <TouchableOpacity 
            key={index} 
            style={globalStyles.checkboxContainer} 
            onPress={() => toggleCheckbox(item)}
            activeOpacity={0.7} // Provides slight feedback when tapped
            >
            <Checkbox
                value={selectedItems.includes(item)}
                onValueChange={() => toggleCheckbox(item)}
                color={selectedItems.includes(item) ? "#000" : undefined}
            />
            <Text style={globalStyles.checkboxLabel}>{item}</Text>
            </TouchableOpacity>
        ))}

        {/* Condiments Section */}
        <Text style={[globalStyles.title, globalStyles.extraMarginTop]}>What condiments/sauces do you have?</Text>
        {condimentList.map((item, index) => (
            <TouchableOpacity 
            key={index} 
            style={globalStyles.checkboxContainer} 
            onPress={() => toggleCheckbox(item)}
            activeOpacity={0.7} // Provides slight feedback when tapped
            >
            <Checkbox
                value={selectedItems.includes(item)}
                onValueChange={() => toggleCheckbox(item)}
                color={selectedItems.includes(item) ? "#000" : undefined}
            />
            <Text style={globalStyles.checkboxLabel}>{item}</Text>
            </TouchableOpacity>
        ))}
        </ScrollView>


        <View style={globalStyles.buttonContainer}>
          <Button mode="outlined" style={globalStyles.skipButton} onPress={() => navigation.goBack()}>
            Previous
          </Button>

          <Button mode="contained" style={globalStyles.nextButton} onPress={() => {
            savePreferences();
            navigation.navigate("DietaryPreference");
          }}>
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SeasoningScreen;
