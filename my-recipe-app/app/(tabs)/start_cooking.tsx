

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   StyleSheet,
// } from "react-native";
// import Checkbox from "expo-checkbox";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { AuthStackParamList } from "../_layout"; // Import the type correctly

// type StartCookingScreenProps = NativeStackScreenProps<AuthStackParamList, "StartCooking">;

// const StartCookingScreen: React.FC<StartCookingScreenProps> = ({ navigation }) => {
//   const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
//   const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
//   const [customPreference, setCustomPreference] = useState("");

//   const cookingPreferences = [
//     "Short Cooking Time ⏰",
//     "Healthy / Low Calories 🥦",
//     "Not Labor Intensive 😊",
//     "Left-over friendly 🥡",
//     "Impressive Dish 🍳",
//     "One-Pot Meal 🍽️",
//   ];

//   const cuisines = ["Chinese", "Mexican", "Greek", "Japanese", "Italian", "Indian"];

//   const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
//     setList((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
//   };

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView contentContainerStyle={styles.scroll}>
//           {/* Header with clickable icon */}
//           <TouchableOpacity style={styles.headerContainer} onPress={() => navigation.navigate("FridgePage")}>
//             <MaterialCommunityIcons name="fridge-outline" size={40} color="black" />
//             <Text style={styles.subHeader}>Click to open your fridge</Text>
//           </TouchableOpacity>

//           {/* Cooking Preferences */}
//           <Text style={styles.sectionTitle}>Check all your cooking preferences:</Text>
//           {cookingPreferences.map((item) => (
//             <View key={item} style={styles.checkboxContainer}>
//               <Checkbox
//                 value={selectedPreferences.includes(item)}
//                 onValueChange={() => toggleSelection(item, selectedPreferences, setSelectedPreferences)}
//                 color={selectedPreferences.includes(item) ? "#000" : "#ccc"} // Black when selected, light gray otherwise
//               />
//               <Text style={styles.checkboxLabel}>{item}</Text>
//             </View>
//           ))}

//           {/* Cuisine Preferences */}
//           <Text style={styles.sectionTitle}>Check all cuisine types you’d like:</Text>
//           <View style={styles.cuisineGrid}>
//             {cuisines.map((item) => (
//               <View key={item} style={styles.cuisineRow}>
//                 <Checkbox
//                   value={selectedCuisines.includes(item)}
//                   onValueChange={() => toggleSelection(item, selectedCuisines, setSelectedCuisines)}
//                   color={selectedCuisines.includes(item) ? "#000" : "#ccc"} // Black when selected, light gray otherwise
//                 />
//                 <Text style={styles.checkboxLabel}>{item}</Text>
//               </View>
//             ))}
//           </View>

//           {/* Custom Input */}
//           <Text style={styles.sectionTitle}>Customized</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Include any cooking preferences here"
//             placeholderTextColor="#aaa"
//             value={customPreference}
//             onChangeText={setCustomPreference}
//           />

//           {/* Submit Button */}
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Get My Recipes!</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   scroll: { paddingBottom: 20 },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   subHeader: {
//     fontSize: 18,
//     color: "black",
//     marginLeft: 10,
//   },
//   sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
//   checkboxContainer: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
//   cuisineGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
//   cuisineRow: { flexDirection: "row", alignItems: "center", width: "45%", marginVertical: 5 },
//   checkboxLabel: { fontSize: 16, marginLeft: 8 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 16,
//     marginTop: 10,
//   },
//   button: { backgroundColor: "#000", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 15 },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });

// export default StartCookingScreen;

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
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout"; // ✅ Import the type correctly

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
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Header with clickable icon */}
          <TouchableOpacity style={styles.headerContainer} onPress={() => navigation.navigate("FridgePage")}>
            <MaterialCommunityIcons name="fridge-outline" size={40} color="black" />
            <Text style={styles.subHeader}>Click to open your fridge</Text>
          </TouchableOpacity>

          {/* Cooking Preferences */}
          <Text style={styles.sectionTitle}>Check all your cooking preferences:</Text>
          {cookingPreferences.map((item) => (
            <View key={item} style={styles.checkboxContainer}>
              <Checkbox
                value={selectedPreferences.includes(item)}
                onValueChange={() => toggleSelection(item, selectedPreferences, setSelectedPreferences)}
                color={selectedPreferences.includes(item) ? "#000" : "#ccc"} // Black when selected, light gray otherwise
              />
              <Text style={styles.checkboxLabel}>{item}</Text>
            </View>
          ))}

          {/* Cuisine Preferences */}
          <Text style={styles.sectionTitle}>Check all cuisine types you’d like:</Text>
          <View style={styles.cuisineGrid}>
            {cuisines.map((item) => (
              <View key={item} style={styles.cuisineRow}>
                <Checkbox
                  value={selectedCuisines.includes(item)}
                  onValueChange={() => toggleSelection(item, selectedCuisines, setSelectedCuisines)}
                  color={selectedCuisines.includes(item) ? "#000" : "#ccc"} // Black when selected, light gray otherwise
                />
                <Text style={styles.checkboxLabel}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Custom Input */}
          <Text style={styles.sectionTitle}>Customized</Text>
          <TextInput
            style={styles.input}
            placeholder="Include any cooking preferences here"
            placeholderTextColor="#aaa"
            value={customPreference}
            onChangeText={setCustomPreference}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CuisinePage")}  // ✅ Navigate to CuisinePage
          >
            <Text style={styles.buttonText}>Get My Recipes!</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  scroll: { paddingBottom: 20 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  cuisineGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  cuisineRow: { flexDirection: "row", alignItems: "center", width: "45%", marginVertical: 5 },
  checkboxLabel: { fontSize: 16, marginLeft: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 10,
  },
  button: { backgroundColor: "#000", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 15 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default StartCookingScreen;
