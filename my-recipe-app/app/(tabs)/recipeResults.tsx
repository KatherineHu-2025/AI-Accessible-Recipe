import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRecipe } from "../context/RecipeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";  // ✅ For star icon

const RecipeResultsScreen: React.FC = () => {
  const { recipes, loading } = useRecipe();  // ✅ Get recipes from context

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Here’s some cuisines you might like:</Text>

      <View style={styles.card}>
        <Text style={styles.cardHeading}>Cuisines</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading recipes...</Text>
        ) : recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <TouchableOpacity key={index} style={styles.recipeRow} activeOpacity={0.7}>
              <MaterialCommunityIcons name="star-outline" size={20} color="black" />
              <View style={styles.recipeText}>
                <Text style={styles.recipeTitle}>{recipe.name}</Text>
                <Text style={styles.recipeDescription}>Click for more info.</Text>
              </View>
              <MaterialCommunityIcons name="arrow-up" size={20} color="black" />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRecipesText}>No recipes found. Try changing your preferences.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F8F8F8", flex: 1 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 20 , marginTop: 20},
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 16, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardHeading: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  recipeRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#EAEAEA" },
  recipeText: { flex: 1, marginLeft: 10 },
  recipeTitle: { fontSize: 16, fontWeight: "bold" },
  recipeDescription: { fontSize: 14, color: "#666" },
  noRecipesText: { fontSize: 14, color: "#999", textAlign: "center", marginTop: 10 },
  loadingText: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 10 },
});

export default RecipeResultsScreen;