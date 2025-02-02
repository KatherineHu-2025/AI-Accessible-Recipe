import React, { createContext, useState, useContext, ReactNode } from "react";

// Create the RecipeContext
const RecipeContext = createContext<any>(null);

interface RecipeProviderProps {
  children: ReactNode; // ✅ This explicitly types children
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<any[]>([]); // Stores fetched recipes
  const [loading, setLoading] = useState(false); // Track loading state

  // Function to fetch recipes from backend
  const fetchRecipes = async (
    ingredients: string, 
    time_limit: number, 
    preferences: string, 
    cuisines: string
  ) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://accessible-ai-recipe-production.up.railway.app/get_recipe?ingredients=${ingredients}&time_limit=${time_limit}&preferences=${preferences}&cuisines=${cuisines}`
      );
  
      console.log("Raw Response:", response); // Check if response is valid
  
      const data = await response.json();
      console.log("Parsed Data:", data);
  
      if (data.recipes) {
        setRecipes(data.recipes);
      } else {
        console.error("Failed to fetch recipes:", data.error || "No recipes found");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <RecipeContext.Provider value={{ recipes, fetchRecipes, loading }}>
      {children}
    </RecipeContext.Provider>
  );
};

// Custom Hook to use RecipeContext
export const useRecipe = () => {
  return useContext(RecipeContext);
};
