import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";

type RecipeDetailProps = NativeStackScreenProps<AuthStackParamList, "RecipeDetail">;

const RecipeDetailScreen: React.FC<RecipeDetailProps> = ({ route, navigation }) => {
  const { recipe } = route.params; // ✅ Extract recipe details

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Recipe Name */}
      <Text style={styles.title}>{recipe.name}</Text>

      {/* Ingredients Section */}
      <Text style={styles.sectionHeader}>Ingredients</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>{`• ${ingredient}`}</Text>
      ))}

      {/* Instructions Section */}
      <Text style={styles.sectionHeader}>Instructions</Text>
      {recipe.instructions.map((step, index) => (
        <Text key={index} style={styles.instruction}>{`${index + 1}. ${step}`}</Text>
      ))}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"<<< Back to Recipes"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 24, 
    backgroundColor: "#F9F9F9", 
    paddingBottom: 40 // ✅ Added padding to prevent cut-off
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 16, 
    textAlign: "center", 
    marginTop: 50 // ✅ Increased margin to prevent cut-off
  },
  sectionHeader: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginTop: 20, 
    marginBottom: 10 
  },
  ingredient: { 
    fontSize: 16, 
    marginBottom: 5 
  },
  instruction: { 
    fontSize: 16, 
    marginBottom: 10 
  },
  backButton: { 
    marginTop: 30, 
    alignItems: "center", 
    paddingVertical: 12, 
    borderRadius: 8, 
    backgroundColor: "#000",
    width: "100%", // ✅ Full width button
  },
  backButtonText: { 
    fontSize: 16, 
    color: "#FFF", 
    fontWeight: "bold" 
  },
});

export default RecipeDetailScreen;
