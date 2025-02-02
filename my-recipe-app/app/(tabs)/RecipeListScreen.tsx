import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

// Define expected route params (fix: remove nested "recipe")
type RouteParams = {
    name: string;
    ingredients: string[];
    instructions: string[];
};

const RecipeDetailScreen = () => {
    const navigation = useNavigation();
    
    // Correct route type
    const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();

    // Get recipe details directly
    const recipe = route.params; 

    // Handle case where no recipe data is found
    if (!recipe) {
        return (
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 18, color: "red" }}>
                    No recipe data found.
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ marginTop: 10, padding: 10, backgroundColor: "lightgray" }}
                >
                    <Text style={{ fontSize: 16 }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            {/* Back Button */}
            <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={{ marginBottom: 10, padding: 10, backgroundColor: "#ddd" }}
            >
                <Text style={{ fontSize: 16 }}>← Back</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{recipe.name}</Text>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
                Ingredients:
            </Text>
            <Text>{recipe.ingredients.join(", ")}</Text>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
                Instructions:
            </Text>
            {recipe.instructions.map((step, index) => (
                <Text key={index}>{index + 1}. {step}</Text>
            ))}
        </ScrollView>
    );
};

export default RecipeDetailScreen;
