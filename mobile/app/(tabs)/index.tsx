import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "@/components/shop/Card";
import { API_URL } from "@/config";

// const usersList = [
//   { id: 1, name: "David", image: "baby.png" },
//   { id: 2, name: "Smith", image: "baby.png" },
//   { id: 3, name: "Henery", image: "baby.png" },
//   { id: 4, name: "John", image: "baby.png" },
// ];

type UserProps = {
  id: number;
  name: string;
  image: string;
};

export default function HomeScreen() {
  const [users, setUsers] = useState<UserProps[]>();
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users`);
      const userList = await response.json();
      //console.log("Users : ", userList);

      setUsers(userList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={users}
          renderItem={({ item }) => <Card {...item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      )}
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
