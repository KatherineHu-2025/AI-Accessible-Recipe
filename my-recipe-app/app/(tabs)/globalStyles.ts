import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30, // Matches all screens
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
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  extraMarginTop: {
    marginTop: 20, // Extra margin for spacing
  },
  scrollView: {
    paddingHorizontal: 5,
    paddingBottom: 20, // Ensures smooth scrolling
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  checkboxLabel: {
    fontSize: 18,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  skipAllText: {
    fontSize: 16,
    color: "black",
    textDecorationLine: "underline",
  },
  BackToEditing: {
    flexDirection: "row",
    fontSize: 16,
    color: "black",
    textDecorationLine: "underline",
    alignItems: "center",
    paddingVertical: 10,
  },
  skipButton: {
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  nextButton: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    flex: 1, // Makes input take up remaining space
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F5F5F5",
    marginBottom: 0, // Remove extra bottom margin for better alignment
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
  // Added styles for the "Customize" section
  customAllergyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures spacing
    marginTop: 10,
  },
  addButton: {
    height: 50, // Match input field height
    paddingHorizontal: 20,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default globalStyles;
