import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Checkbox from "expo-checkbox";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";  
import { auth } from "../../firebaseConfig";  // ✅ Import Firebase authentication
import globalStyles from "./globalStyles";  // ✅ Import global styles


type CookingEquipmentScreenProps = NativeStackScreenProps<AuthStackParamList, "CookingEquipment">;

const CookingEquipmentScreen: React.FC<CookingEquipmentScreenProps> = ({ navigation }) => {
  const equipmentList = [
    "Frying Pan", "Saucepan", "Stockpot", "Wok", "Oven",
    "Air Fryer", "Pizza Oven", "Microwave", "Barbecue Grills",
  ];

  // ✅ Set all checkboxes as selected by default
  const [selectedItems, setSelectedItems] = useState<string[]>(equipmentList);

  // ✅ Store and display the user's email username
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser?.email) {
      const emailUsername = currentUser.email.split("@")[0]; // Extract username from email
      setUsername(emailUsername);
    }
  }, []);

  // ✅ Toggle checkbox selection
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

        {/* ✅ Dynamically insert username */}
        <Text style={globalStyles.title}>Welcome, {username}! What cooking equipment do you have?</Text>

        <ScrollView style={globalStyles.scrollView}>
          {equipmentList.map((item, index) => (
            <View key={index} style={globalStyles.checkboxContainer}>
              <Checkbox
                value={selectedItems.includes(item)}
                onValueChange={() => toggleCheckbox(item)}
                color={selectedItems.includes(item) ? "#000" : undefined}
              />
              <Text style={globalStyles.checkboxLabel}>{item}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={globalStyles.buttonContainer}>

          <Button mode="outlined" style={globalStyles.skipButton} onPress={() => navigation.goBack()}>
            Previous
          </Button>

          <Button mode="contained" style={globalStyles.nextButton} onPress={() => navigation.navigate("Seasoning")}>
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};


// const styles = StyleSheet.create({
//   safeContainer: {
//     flex: 1,
//     backgroundColor: "#F9F9F9",
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 30, // Matches previous screens
//     backgroundColor: "#F9F9F9",
//   },
//   header: {
//     fontSize: 16,
//     fontWeight: "bold",
//     textTransform: "uppercase",
//     marginBottom: 8,
//   },
//   subheader: {
//     fontSize: 13,
//     color: "gray",
//     marginBottom: 10,
//     lineHeight: 18,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   scrollView: {
//     marginBottom: 20,
//     paddingHorizontal: 5,
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 5,
//   },
//   checkboxLabel: {
//     fontSize: 18,
//     marginLeft: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     // marginBottom: 30,
//   },
//   skipAllText: {
//     fontSize: 16,
//     color: "black",
//     textDecorationLine: "underline",
//   },
//   skipButton: {
//     borderColor: "gray",
//     borderWidth: 1,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//   },
//   nextButton: {
//     backgroundColor: "black",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
// });

export default CookingEquipmentScreen;
