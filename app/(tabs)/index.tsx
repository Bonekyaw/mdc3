import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "@/components/shop/Card";

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
      <FlatList
        data={users}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 17,
    gap: 7,
  },
  row: {
    justifyContent: "space-between",
  },
});
