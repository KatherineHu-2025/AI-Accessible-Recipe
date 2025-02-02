import { useRoute, RouteProp } from "@react-navigation/native";
import { View, Text, ScrollView } from "react-native";

// Define the expected route params type
type RouteParams = {
  recipe: {
    recipe: {
      name: string;
      ingredients: string[];
      instructions: string[];
    };
  };
};

const RecipeDetailScreen = () => {
  // Explicitly define route type
  const route = useRoute<RouteProp<RouteParams, "recipe">>();

  // Extract recipe data safely
  const recipe = route.params?.recipe;

  if (!recipe) {
    return <Text style={{ padding: 20, fontSize: 18, color: "red" }}>No recipe data found.</Text>;
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{recipe.name}</Text>

      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>Ingredients:</Text>
      <Text>{recipe.ingredients.join(", ")}</Text>

      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>Instructions:</Text>
      {recipe.instructions.map((step, index) => (
        <Text key={index}>{index + 1}. {step}</Text>
      ))}
    </ScrollView>
  );
};

export default RecipeDetailScreen;

