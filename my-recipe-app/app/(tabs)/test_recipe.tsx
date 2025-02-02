import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useRecipe } from "../context/RecipeContext"; // Adjust path if needed

// Define the expected recipe structure
interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
}

const TestRecipeScreen = () => {
  const { recipes, setRecipes, loading, setLoading } = useRecipe();

  // ✅ FIX: Ensure time_limit is correctly converted and logged
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      // Replace these with actual user input if necessary
      const ingredients = "chicken,tomato";
      const time_limit = 30; // ✅ Ensure this is a NUMBER
      const preferences = "healthy";
      const cuisines = "chinese,italian";

      // ✅ Log values before making API request
      console.log("API Request Params:", { ingredients, time_limit, preferences, cuisines });

      // ✅ Convert time_limit to string explicitly
      const url = `https://accessible-ai-recipe-production.up.railway.app/get_recipe?ingredients=${ingredients}&time_limit=${time_limit.toString()}&preferences=${preferences}&cuisines=${cuisines}`;

      console.log("Fetching from URL:", url); // ✅ Log the final URL for debugging

      const response = await fetch(url);
      const data = await response.json();

      console.log("Fetched Recipes:", data); // ✅ Debugging log

      if (data.recipes) {
        setRecipes(data.recipes);
      } else {
        console.error("No recipes found:", data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchRecipes manually on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Fetching Recipes...</Text>

      {loading && <ActivityIndicator size="large" color="#000" />}

      {recipes.length > 0 ? (
        recipes.map((recipe: Recipe, index: number) => (
          <View key={index} style={{ marginBottom: 20, padding: 10, borderWidth: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{recipe.name}</Text>
            <Text>Ingredients: {recipe.ingredients?.join(", ")}</Text>
            <Text>Instructions: {recipe.instructions?.join(". ")}</Text>
          </View>
        ))
      ) : (
        !loading && <Text style={{ fontSize: 16, color: "gray" }}>No recipes fetched yet.</Text>
      )}
    </ScrollView>
  );
};

export default TestRecipeScreen;
