import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";  
import { auth, db } from "../../firebaseConfig";  
import { doc, getDoc, setDoc } from "firebase/firestore";
import globalStyles from "./globalStyles";  

type CookingEquipmentScreenProps = NativeStackScreenProps<AuthStackParamList, "CookingEquipment">;

const CookingEquipmentScreen: React.FC<CookingEquipmentScreenProps> = ({ navigation }) => {
  const equipmentList = [
    "Frying Pan", "Saucepan", "Stockpot", "Wok", "Oven",
    "Air Fryer", "Pizza Oven", "Microwave", "Barbecue Grills",
  ];

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser?.email) {
        const emailUsername = currentUser.email.split("@")[0];
        setUsername(emailUsername);

        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setSelectedItems(userData.cookingEquipment || equipmentList);  // Load saved data or default
        } else {
          setSelectedItems(equipmentList);  // Default selection
        }
      }
    };

    fetchUserData();
  }, []);

  const savePreferences = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(userDocRef, { cookingEquipment: selectedItems }, { merge: true });
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>USER SPECIALIZED SETTINGS</Text>
        <Text style={globalStyles.subheader}>We will give you specialized cooking advice based on your condition.</Text>

        <Text style={globalStyles.title}>Welcome, {username}! What cooking equipment do you have?</Text>

        <ScrollView style={globalStyles.scrollView}>
        {equipmentList.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={globalStyles.checkboxContainer} 
          onPress={() => {
            setSelectedItems((prevSelected) =>
              prevSelected.includes(item)
                ? prevSelected.filter((i) => i !== item)
                : [...prevSelected, item]
            );
          }}
          activeOpacity={0.7} // Provides slight feedback when tapped
        >
          <Checkbox
            value={selectedItems.includes(item)}
            onValueChange={() => {
              setSelectedItems((prevSelected) =>
                prevSelected.includes(item)
                  ? prevSelected.filter((i) => i !== item)
                  : [...prevSelected, item]
              );
            }}
            color={selectedItems.includes(item) ? "#000" : undefined}
          />
          <Text style={globalStyles.checkboxLabel}>{item}</Text>
        </TouchableOpacity>
      ))}

        </ScrollView>

        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("StartCooking")}>
            <Text style={globalStyles.skipAllText}>Skip All</Text>
          </TouchableOpacity>

          <Button mode="outlined" style={globalStyles.skipButton} onPress={() => navigation.goBack()}>
            Previous
          </Button>

          <Button mode="contained" style={globalStyles.nextButton} onPress={() => {
            savePreferences();
            navigation.navigate("Seasoning");
          }}>
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CookingEquipmentScreen;
