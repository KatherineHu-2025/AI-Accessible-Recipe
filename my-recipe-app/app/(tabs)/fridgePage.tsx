import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";  
import { auth, db } from "../../firebaseConfig";  
import { doc, getDoc, setDoc } from "firebase/firestore";

type FridgePageProps = NativeStackScreenProps<AuthStackParamList, "FridgePage">;

const FridgePage: React.FC<FridgePageProps> = ({ navigation }) => {
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: boolean }>({});
  const [searchInput, setSearchInput] = useState("");
  const [recordedIngredients, setRecordedIngredients] = useState<string[]>([]);
  const [otherIngredients, setOtherIngredients] = useState<string[]>([]);

  // ✅ Fetch fridge data from Firestore when the user logs in
  useEffect(() => {
    const fetchFridgeData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setRecordedIngredients(userData.fridgeItems || []);
          setOtherIngredients(userData.otherIngredients || []);
          const savedTags = userData.selectedTags || {};
          setSelectedTags(savedTags);
        }
      }
    };

    fetchFridgeData();
  }, []);

  // ✅ Save fridge items to Firestore
  const saveFridgeData = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(userDocRef, { 
        fridgeItems: recordedIngredients, 
        otherIngredients: otherIngredients,
        selectedTags: selectedTags
      }, { merge: true });
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prevState) => {
      const updatedTags = { ...prevState, [tag]: !prevState[tag] };
      saveFridgeData(); // ✅ Save immediately when a tag is toggled
      return updatedTags;
    });
  };

  const handleSearchSubmit = () => {
    if (searchInput.trim()) {
      const newItem = searchInput.trim();
      setRecordedIngredients([...recordedIngredients, newItem]);
      setOtherIngredients((prev) => [...prev, newItem]); // ✅ Add to "Other" category
      setSelectedTags((prev) => ({ ...prev, [newItem]: true })); // ✅ Automatically select the item
      setSearchInput("");

      // ✅ Save fridge data after new item is added
      saveFridgeData();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <Text style={styles.title}>What’s in your fridge?</Text>

      {/* Dairy Products Section */}
      <Text style={styles.sectionTitle}>Dairy Products</Text>
      <View style={styles.tagsContainer}>
        {ingredientsData.dairy.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tag,
              selectedTags[item] ? styles.tagSelected : styles.tagUnselected,
            ]}
            onPress={() => toggleTag(item)}
          >
            <Text style={styles.tagText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Vegetables Section */}
      <Text style={styles.sectionTitle}>Vegetables</Text>
      <View style={styles.tagsContainer}>
        {ingredientsData.vegetables.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tag,
              selectedTags[item] ? styles.tagSelected : styles.tagUnselected,
            ]}
            onPress={() => toggleTag(item)}
          >
            <Text style={styles.tagText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Proteins Section */}
      <Text style={styles.sectionTitle}>Proteins</Text>
      <View style={styles.tagsContainer}>
        {ingredientsData.proteins.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tag,
              selectedTags[item] ? styles.tagSelected : styles.tagUnselected,
            ]}
            onPress={() => toggleTag(item)}
          >
            <Text style={styles.tagText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Other Category Section */}
      <Text style={styles.sectionTitle}>Other</Text>
      <View style={styles.tagsContainer}>
        {otherIngredients.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tag,
              selectedTags[item] ? styles.tagSelected : styles.tagUnselected,
            ]}
            onPress={() => toggleTag(item)}
          >
            <Text style={styles.tagText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Enter other ingredients you have here"
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleSearchSubmit}
        />
        {searchInput.length > 0 && (
          <TouchableOpacity onPress={() => setSearchInput("")}>
            <MaterialIcons name="cancel" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {/* Save Data on Exit */}
      <TouchableOpacity onPress={() => {
        saveFridgeData();
        navigation.goBack();
      }} style={styles.backContainer}>
        <Text style={styles.backText}>{"<<< Save and Back"}</Text>
        <MaterialIcons name="kitchen" size={32} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const ingredientsData = {
  dairy: ["Milk", "Cheese", "Yogurt", "Butter"],
  vegetables: ["Carrot", "Lettuce", "Spinach", "Tomato", "Cucumber", "Pepper", "Onion"],
  proteins: ["Chicken", "Beef", "Fish", "Eggs", "Tofu", "Beans", "Pork"],
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  tagUnselected: {
    backgroundColor: "#e3d7f5",
  },
  tagSelected: {
    backgroundColor: "#a385f4",
  },
  tagText: {
    color: "white",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  backText: {
    fontSize: 16,
    marginRight: 10,
    color: "navy",
  },
});

export default FridgePage;
