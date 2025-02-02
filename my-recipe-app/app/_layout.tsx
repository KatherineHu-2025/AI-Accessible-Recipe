import { Stack } from "expo-router";
import { RecipeProvider } from "../app/context/RecipeContext"; // Ensure the correct path

export default function RootLayout() {
  return (
    <RecipeProvider>
      <Stack />
    </RecipeProvider>
  );
}
