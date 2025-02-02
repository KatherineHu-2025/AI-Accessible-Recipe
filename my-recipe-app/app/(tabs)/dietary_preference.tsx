// import React, { useState } from "react";
// import { View, Text, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
// import Checkbox from "expo-checkbox";
// import { Button } from "react-native-paper";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { AuthStackParamList } from "../_layout";
// import globalStyles from "./globalStyles";

// type DietaryPreferenceScreenProps = NativeStackScreenProps<AuthStackParamList, "DietaryPreference">;

// const DietaryPreferenceScreen: React.FC<DietaryPreferenceScreenProps> = ({ navigation }) => {
//   const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
//   const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
//   const [allergies, setAllergies] = useState<string[]>([
//     "Milk and dairy products", "Eggs", "Peanuts", "Tree Nuts",
//     "Shellfish", "Fish", "Soy", "Wheat (Non-Celiac)"
//   ]);
//   const [customAllergy, setCustomAllergy] = useState("");

//   const dietaryPreferences = ["Vegetarian", "Vegan", "Gluten-Free"];

//   const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
//     setList((prev) =>
//       prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
//     );
//   };

//   const handleAddCustomAllergy = () => {
//     const trimmedAllergy = customAllergy.trim();
//     if (trimmedAllergy !== "" && !allergies.includes(trimmedAllergy)) {
//       setAllergies((prev) => [...prev, trimmedAllergy]);
//       setSelectedAllergies((prev) => [...prev, trimmedAllergy]); // Automatically check the new allergy
//       setCustomAllergy(""); // Clear the input field
//     }
//   };

//   return (
//     <SafeAreaView style={globalStyles.safeContainer}>
//       <KeyboardAvoidingView 
//         behavior={Platform.OS === "ios" ? "padding" : "height"} 
//         style={{ flex: 1 }}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={globalStyles.container}>
//             <Text style={globalStyles.header}>USER SPECIALIZED SETTINGS</Text>
//             <Text style={globalStyles.subheader}>We will give you specialized cooking advice based on your condition.</Text>

//             <ScrollView 
//               style={globalStyles.scrollView} 
//               keyboardShouldPersistTaps="handled"
//             >
//               <Text style={globalStyles.title}>What are your dietary preferences?</Text>
//               {dietaryPreferences.map((item, index) => (
//                 <View key={index} style={globalStyles.checkboxContainer}>
//                   <Checkbox
//                     value={selectedDiet.includes(item)}
//                     onValueChange={() => toggleSelection(item, selectedDiet, setSelectedDiet)}
//                     color={selectedDiet.includes(item) ? "#000" : undefined}
//                   />
//                   <Text style={globalStyles.checkboxLabel}>{item}</Text>
//                 </View>
//               ))}

//               <Text style={[globalStyles.title, globalStyles.extraMarginTop]}>What are your allergies?</Text>
//               {allergies.map((item, index) => (
//                 <View key={index} style={globalStyles.checkboxContainer}>
//                   <Checkbox
//                     value={selectedAllergies.includes(item)}
//                     onValueChange={() => toggleSelection(item, selectedAllergies, setSelectedAllergies)}
//                     color={selectedAllergies.includes(item) ? "#000" : undefined}
//                   />
//                   <Text style={globalStyles.checkboxLabel}>{item}</Text>
//                 </View>
//               ))}

//               <Text style={[globalStyles.title, globalStyles.extraMarginTop]}>Customize</Text>
//               <View style={globalStyles.customAllergyContainer}>
//                 <TextInput
//                   style={globalStyles.input}
//                   placeholder="Add any allergies here"
//                   placeholderTextColor="#aaa"
//                   value={customAllergy}
//                   onChangeText={setCustomAllergy}
//                 />
//                 <Button mode="contained" onPress={handleAddCustomAllergy} style={globalStyles.addButton}>
//                   Add
//                 </Button>
//               </View>
//             </ScrollView>

//             <View style={globalStyles.buttonContainer}>
//               <Button mode="outlined" style={globalStyles.skipButton} onPress={() => navigation.goBack()}>
//                 Previous
//               </Button>

//               <Button mode="contained" style={globalStyles.nextButton} onPress={() => navigation.navigate("FinishSetting")}>
//                 Next
//               </Button>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default DietaryPreferenceScreen;
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import Checkbox from "expo-checkbox";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";
import globalStyles from "./globalStyles";

type DietaryPreferenceScreenProps = NativeStackScreenProps<AuthStackParamList, "DietaryPreference">;

const DietaryPreferenceScreen: React.FC<DietaryPreferenceScreenProps> = ({ navigation }) => {
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([
    "Milk and dairy products", "Eggs", "Peanuts", "Tree Nuts",
    "Shellfish", "Fish", "Soy", "Wheat (Non-Celiac)"
  ]);
  const [customAllergy, setCustomAllergy] = useState("");

  const dietaryPreferences = ["Vegetarian", "Vegan", "Gluten-Free"];

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
            <Text style={globalStyles.subheader}>We will give you specialized cooking advice based on your condition.</Text>

            <ScrollView 
              style={globalStyles.scrollView} 
              keyboardShouldPersistTaps="handled"
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
              <View style={globalStyles.customAllergyContainer}>
                <TextInput
                  style={globalStyles.input}
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

              <Button mode="contained" style={globalStyles.nextButton} onPress={() => navigation.navigate("FinishSetting")}>
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
