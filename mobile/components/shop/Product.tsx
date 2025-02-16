import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "expo-image";
import { Icon, StarIcon } from "@/components/ui/icon";
import { Heart } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import type { ProductType } from "@/types";
import { IMG_URL } from "@/config";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface ProductProps extends ProductType {
  onCallRoute: (id: number) => void;
  toggleFavourite: (productId: number, favourite: boolean) => void;
}

export default function Product({
  id,
  brand,
  title,
  star,
  quantity,
  price,
  discount,
  image,
  users,
  onCallRoute,
  toggleFavourite,
}: ProductProps) {
  // console.log("Rendering Product ----", id);

  return (
    <Pressable className="flex-1" onPress={() => onCallRoute(id)}>
      <Card className="relative p-2">
        <Image
          style={{ width: "100%", aspectRatio: 3 / 4, borderRadius: 5 }}
          source={IMG_URL + image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <Pressable
          className="absolute right-4 top-4 rounded-full bg-zinc-300/40"
          onPress={() => toggleFavourite(id, users.length === 0)}
        >
          <Icon
            as={Heart}
            className={`m-2 h-5 w-5 text-red-400 ${users.length > 0 && "fill-red-400"}`}
          />
        </Pressable>
        <VStack space="xs" className="mt-2">
          <HStack space="sm" className="items-center">
            <Text className="font-semibold text-gray-500">{brand}</Text>
            <Icon as={StarIcon} size="xs" className="text-orange-500" />
            <Text size="sm">{star}</Text>
            <Text size="xs" className="text-gray-500">
              ({quantity})
            </Text>
          </HStack>
          <Text className="line-clamp-1 font-medium">{title}</Text>
          <HStack space="sm" className="items-center">
            <Text className="font-medium text-green-700">
              ${price.toFixed(2)}
            </Text>
            {discount > 0 && (
              <Text className="text-gray-500 line-through">
                ${discount.toFixed(2)}
              </Text>
            )}
          </HStack>
        </VStack>
      </Card>
    </Pressable>
  );
}
