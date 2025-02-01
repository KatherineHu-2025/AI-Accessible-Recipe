import React, { useState } from "react";
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, 
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { AuthStackParamList } from "../_layout";

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Logged in successfully!");
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.title}>LOG IN</Text>

                    <Text style={styles.label}>Your Username:</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter username" 
                        placeholderTextColor="#888" 
                        value={email} 
                        onChangeText={setEmail} 
                    />

                    <Text style={styles.label}>Password:</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter password" 
                        placeholderTextColor="#888" 
                        secureTextEntry 
                        value={password} 
                        onChangeText={setPassword} 
                    />

                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.signupText}>I'm new. Sign up here!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>START COOKING!</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    inner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "#F5F5F5",
        marginBottom: 15,
    },
    signupText: {
        color: "#000",
        fontWeight: "500",
        textDecorationLine: "underline",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#222",
        paddingVertical: 15,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
