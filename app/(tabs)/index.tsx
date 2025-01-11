import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MyButton from "@/components/shop/MyButton";

const users = [
  { id: 1, name: "David" },
  { id: 2, name: "Smith" },
  { id: 3, name: "Henery" },
  { id: 4, name: "John" },
  { id: 5, name: "Wales" },
  { id: 6, name: "Supra" },
  { id: 7, name: "Sia" },
  { id: 8, name: "Hulk" },
  { id: 9, name: "Smile" },
  { id: 10, name: "Travo" },
  { id: 11, name: "Mike" },
  { id: 12, name: "Ford" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {users.map((user) => (
          <View style={styles.card} key={user.id}>
            <Text style={styles.text}>{user.name}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 17,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 7,
  },
  card: {
    width: "48%",
    height: 200,
    backgroundColor: "#687076",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 27,
    color: "white",
    fontWeight: "bold",
    // textAlign: "center",
  },
});
