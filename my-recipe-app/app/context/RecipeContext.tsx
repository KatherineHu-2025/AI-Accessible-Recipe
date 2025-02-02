import React, { createContext, useState, useContext, ReactNode } from "react";
import { auth, db } from "../../firebaseConfig";  // Import Firebase
import { doc, getDoc } from "firebase/firestore";

// Define Recipe type for better type safety
interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
}

// Define Context type
interface RecipeContextType {
  recipes: Recipe[];
  fetchRecipes: () => Promise<void>;
  loading: boolean;
}

// Create the RecipeContext with a proper type
const RecipeContext = createContext<RecipeContextType | null>(null);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch Recipes from Backend using User Data from Firebase
  const fetchRecipes = async () => {
    setLoading(true);
    
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("User not authenticated");
        setLoading(false);
        return;
      }

      // 🔹 Fetch user data from Firestore
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.error("User data not found!");
        setLoading(false);
        return;
      }

      // 🔹 Extract user data
      const userData = userDoc.data();
      console.log("User Data from Firestore:", userData); // testing
      
      const requestBody = {
        // ✅ Keep `selectedTags` structure intact (with true/false values)
        selectedTags: userData.selectedTags || {},
    
        time_limit: userData.cookingPreferences?.includes("Short Cooking Time ⏰") ? 20 : 40,
    
        preferences: [
            ...(Array.isArray(userData.dietaryPreferences) ? userData.dietaryPreferences : []),
            ...(Array.isArray(userData.allergies) ? userData.allergies : [])
        ],
    
        cuisines: Array.isArray(userData.preferredCuisines) ? userData.preferredCuisines : [],
        cooking_equipment: Array.isArray(userData.cookingEquipment) ? userData.cookingEquipment : [],
        seasonings: Array.isArray(userData.seasonings) ? userData.seasonings : []
    };
    
    // 🔹 Debugging Logs
    console.log("🔹 User Data from Firestore:", userData);
    console.log("🔹 Sending to Backend:", JSON.stringify(requestBody, null, 2)); // ✅ Logs full request body
    
    

      console.log("Sending to backend:", requestBody);

      // 🔹 Send a POST request with JSON body
      const response = await fetch(
        "https://accessible-ai-recipe-production.up.railway.app/get_recipe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      console.log("Backend Response:", data);

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
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe must be used within a RecipeProvider");
  }
  return context;
};