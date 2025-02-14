import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import Cart from "@/components/shop/Cart";
import { Pressable } from "@/components/ui/pressable";
import { Dimensions, ScrollView } from "react-native";
import Title from "@/components/shop/Title";
import { Box } from "@/components/ui/box";
import { categories, products } from "@/data";
import { FlashList } from "@shopify/flash-list";
import Category from "@/components/shop/Category";
import Product from "@/components/shop/Product";
import { router } from "expo-router";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react-native";
import { Card } from "@/components/ui/card";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Home = () => {
  console.log("Rendering Home ----");

  const [select, setSelect] = useState(1);
  const width = Dimensions.get("screen").width;
  const numColumns = width < 600 ? 2 : width < 768 ? 3 : 4;

  const onSelectHandler = useCallback((id: number) => {
    setSelect(id);
  }, []);

  const goDetail = (id: number) => {
    router.navigate({ pathname: "/detail", params: { id } });
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
          style={{
            width: "100%",
            aspectRatio: 20 / 9,
          }}
          source={require("@/assets/images/banner6.png")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <Box className="mt-4 px-5 pb-40">
          <Title title="Shop By Category" actionText="See All" />
          <FlashList
            data={categories}
            extraData={select}
            renderItem={({ item }) => (
              <Pressable onPress={() => setSelect(item.id)}>
                <Card className="items-center">
                  <Image
                    style={[
                      { width: 56, height: 56, marginBottom: 7 },
                      select === item.id && {
                        borderColor: "orange",
                        borderWidth: 2,
                        borderRadius: 28,
                      },
                    ]}
                    source={item.image}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                  />

                  <Text size="sm" bold>
                    {item.name}
                  </Text>
                </Card>
              </Pressable>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={80}
            contentContainerStyle={{ paddingBottom: 7 }}
          />
          <Title title="Recommended for You" actionText="See All" />
          <FlashList
            data={products}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <Product {...item} onCallRoute={goDetail} />
            )}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
            contentContainerStyle={{ paddingTop: 4 }}
          />
          <Button className="mx-auto mt-8 h-14 w-[200px] rounded-lg bg-blue-500 text-white">
            <ButtonText size="lg" className="font-bold">
              Explore More
            </ButtonText>
            <ButtonIcon as={ArrowUpRight} className="ml-2" />
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
