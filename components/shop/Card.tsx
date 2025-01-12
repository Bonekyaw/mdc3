import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
// import { Image } from "expo-image";

const { width, height } = Dimensions.get("screen");

type cardProps = {
  id: number;
  name: string;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Card = ({ id, name }: cardProps) => {
  const [isClick, setIsClick] = useState(false);

  return (
    <Pressable
      style={[styles.card, isClick && { backgroundColor: "#0a7ea4" }]}
      onPress={() => setIsClick(!isClick)}
    >
      {/* <Text style={styles.text}>{name}</Text> */}
      <Image
        source={{ uri: "http://localhost:4000/teen.png" }}
        style={styles.image}
      />
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: width / 2 - 24,
    height: width > 600 ? 300 : 200,
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
  image: {
    width: "100%",
    height: "100%",
  },
});
