import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import Cart from "@/components/shop/Cart";
import { Pressable } from "@/components/ui/pressable";
import { ScrollView } from "react-native";
import Title from "@/components/shop/Title";
import { Box } from "@/components/ui/box";
import { categories } from "@/data";
import { FlashList } from "@shopify/flash-list";
import Category from "@/components/shop/Category";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Home = () => {
  const [select, setSelect] = useState(1);

  const onSelectHandler = (id: number) => {
    setSelect(id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HStack className="my-2 items-center justify-between px-5">
        <Pressable>
          <Image
            style={{ width: 50, height: 25 }}
            source={require("@/assets/images/n.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </Pressable>
        <Pressable className="mr-4">
          <Cart />
        </Pressable>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{ width: "100%", aspectRatio: 20 / 9 }}
          source={require("@/assets/images/banner6.png")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <Box className="mt-4 px-5">
          <Title title="Shop By Category" actionText="See All" />
          <FlashList
            data={categories}
            extraData={select}
            renderItem={({ item }) => (
              <Category {...item} onSelect={onSelectHandler} select={select} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={80}
            contentContainerStyle={{ paddingBottom: 7 }}
          />
          <Title title="Recommended for You" actionText="See All" />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
