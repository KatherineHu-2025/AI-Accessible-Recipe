import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useRecipe } from "../context/RecipeContext"; // Adjust path if needed

// Define the recipe type
interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
}

const TestRecipeScreen = () => {
  const { recipes, fetchRecipes, loading } = useRecipe();

  // Call the API manually for testing (hardcoded input values)
  useEffect(() => {
    fetchRecipes("chicken,tomato", 30, "healthy", "chinese,italian");
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Fetching Recipes...</Text>

      {loading && <ActivityIndicator size="large" color="#000" />}

      {recipes.length > 0 ? (
        recipes.map((recipe: Recipe, index: number) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{recipe.name}</Text>
            <Text style={{ fontSize: 16, marginTop: 5 }}>Ingredients: {recipe.ingredients.join(", ")}</Text>
            <Text style={{ fontSize: 16, marginTop: 5 }}>Instructions: {recipe.instructions.join(". ")}</Text>
          </View>
        ))
      ) : (
        !loading && <Text style={{ fontSize: 16, color: "gray" }}>No recipes fetched yet.</Text>
      )}
    </ScrollView>
  );
};

export default TestRecipeScreen;
