import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../_layout";  // ✅ Import navigation types

type FinishSettingScreenProps = NativeStackScreenProps<AuthStackParamList, "FinishSetting">;

const FinishSettingScreen: React.FC<FinishSettingScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header message */}
        <Text style={styles.header}>USER SPECIALIZED SETTINGS</Text>
        <Text style={styles.subheader}>We’ll keep them in mind for your cooking experience.</Text>

        <Text style={styles.title}>Start Cooking?</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button mode="outlined" style={styles.notYetButton} onPress={() => navigation.goBack()}>
            Not Yet
          </Button>

          <Button mode="contained" style={styles.startButton} onPress={() => console.log("Start Cooking!")}>
            Start Cooking!
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30, // Matches `cooking_equipment.tsx`
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  subheader: {
    fontSize: 13,
    color: "gray",
    marginBottom: 10,
    lineHeight: 18,
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  notYetButton: {
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    marginRight: 10,
  },
  startButton: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
});

export default FinishSettingScreen;