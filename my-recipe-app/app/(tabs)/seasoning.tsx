import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";  
import globalStyles from "./globalStyles";  // ✅ Import global styles

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

  const [selectedItems, setSelectedItems] = useState<string[]>([...seasoningList, ...condimentList]);

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

        <ScrollView contentContainerStyle={globalStyles.scrollView}>
          <Text style={globalStyles.title}>What seasonings do you have?</Text>
          {seasoningList.map((item, index) => (
            <View key={index} style={globalStyles.checkboxContainer}>
              <Checkbox
                value={selectedItems.includes(item)}
                onValueChange={() => toggleCheckbox(item)}
                color={selectedItems.includes(item) ? "#000" : undefined}
              />
              <Text style={globalStyles.checkboxLabel}>{item}</Text>
            </View>
          ))}

          <Text style={[globalStyles.title, globalStyles.extraMarginTop]}>What condiments/sauces do you have?</Text>
          {condimentList.map((item, index) => (
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

          <Button mode="contained" style={globalStyles.nextButton} onPress={() => navigation.navigate("DietaryPreference")}>
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SeasoningScreen;
