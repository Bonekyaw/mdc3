import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";

import { products } from "@/data";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import Cart from "@/components/shop/Cart";
import PagerViewScreen from "@/components/shop/PagerView";

const Detail = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === +id);

  return (
    <VStack className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerTitle: "Product Detail",
          headerBackTitle: "Home",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
          headerRight: () => (
            <Pressable className="mr-4">
              <Cart />
            </Pressable>
          ),
        }}
      />
      <PagerViewScreen />
    </VStack>
  );
};

export default Detail;
