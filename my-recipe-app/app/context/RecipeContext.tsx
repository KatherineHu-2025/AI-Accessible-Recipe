import React, { createContext, useState, useContext, ReactNode } from "react";

// Create the RecipeContext
const RecipeContext = createContext<any>(null);

interface RecipeProviderProps {
  children: ReactNode;
}

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  //const [recipes, setRecipes] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);


  // Fetch recipes from backend
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://accessible-ai-recipe-production.up.railway.app/get_recipe?ingredients=${ingredients}&time_limit=${time_limit}&preferences=${preferences}&cuisines=${cuisines}");
      const data = await response.json();

      console.log("Fetched Recipes:", data); // Debugging output
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

export default RecipeProvider;
