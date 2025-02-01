import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./_layout";  // ✅ Import the AuthNavigator

// ✅ Only ONE NavigationContainer at the root
const App = () => {
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
};

registerRootComponent(App);
