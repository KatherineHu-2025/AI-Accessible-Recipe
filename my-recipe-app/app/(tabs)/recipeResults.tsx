import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRecipe } from "../context/RecipeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";

type RecipeResultsProps = NativeStackScreenProps<AuthStackParamList, "RecipeResults">;

const RecipeResultsScreen: React.FC<RecipeResultsProps> = ({ navigation }) => {
  const { recipes, loading } = useRecipe();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Here’s some cuisines you might like:</Text>

      <View style={styles.card}>
        <Text style={styles.cardHeading}>Cuisines</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading recipes...</Text>
        ) : recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.recipeRow} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate("RecipeDetail", { recipe })} // ✅ Navigate to detail page
            >
              <MaterialCommunityIcons name="star-outline" size={24} color="black" />
              <View style={styles.recipeText}>
                <Text style={styles.recipeTitle}>{recipe.name}</Text>
                <Text style={styles.recipeDescription}>Click for more info.</Text>
              </View>
              <MaterialCommunityIcons name="arrow-right" size={24} color="black" />
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
    container: { 
      flexGrow: 1, 
      padding: 24, // ✅ Consistent horizontal padding
      backgroundColor: "#F9F9F9" 
    },
    header: { 
      fontSize: 22, // ✅ Slightly larger for consistency 
      fontWeight: "bold", 
      marginBottom: 20,
      marginTop: 70, // ✅ More space on top
    },
    card: { 
      backgroundColor: "#FFF", 
      borderRadius: 12, 
      padding: 16, 
      shadowColor: "#000", 
      shadowOpacity: 0.1, 
      shadowRadius: 5, 
      elevation: 3,
      marginBottom: 20, // ✅ Space between cards
    },
    cardHeading: { 
      fontSize: 20, 
      fontWeight: "bold", 
      marginBottom: 12, // ✅ Increased spacing
    },
    recipeRow: { 
      flexDirection: "row", 
      alignItems: "center", 
      paddingVertical: 14, // ✅ Increased padding for better touch area
      borderBottomWidth: 1, 
      borderBottomColor: "#EAEAEA",
    },
    recipeText: { 
      flex: 1, 
      marginLeft: 12, // ✅ More spacing for readability
    },
    recipeTitle: { 
      fontSize: 18, // ✅ Slightly larger for hierarchy
      fontWeight: "bold",
    },
    recipeDescription: { 
      fontSize: 14, 
      color: "#666", 
      marginTop: 4, // ✅ Small margin for separation
    },
    noRecipesText: { 
      fontSize: 16, 
      color: "#999", 
      textAlign: "center", 
      marginTop: 20, // ✅ More space before message
    },
    loadingText: { 
      fontSize: 16, 
      color: "#666", 
      textAlign: "center", 
      marginTop: 20,
    },
  });

export default RecipeResultsScreen;
