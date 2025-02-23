import React, { useCallback } from "react";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { TrashIcon } from "lucide-react-native";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import useCartStore from "@/store/cartStore";
import { Box } from "@/components/ui/box";
import { IMG_URL } from "@/config";
import { AddIcon, Icon, RemoveIcon } from "@/components/ui/icon";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";
import { Fab, FabIcon } from "@/components/ui/fab";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const CartScreen = () => {
  const {
    carts,
    removeFromCart,
    updateCart,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCartStore();
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [productInfo, setProductInfo] = React.useState<{
    productId: number;
    itemId: number;
  }>();
  const handleClose = () => setShowAlertDialog(false);
  const handleDelete = () => {
    removeFromCart(productInfo!.productId, productInfo!.itemId);
    setShowAlertDialog(false);
  };

  const createTwoButtonAlert = useCallback(
    () =>
      Alert.alert(
        "Delete All in cart!",
        `Are you sure to delete all products from cart?`,
        [
          {
            text: "No",
            onPress: () => {},
            style: "cancel",
          },
          { text: "Yes", onPress: () => clearCart() },
        ],
      ),
    [],
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* Empty Cart State */}
      {carts.length === 0 ? (
        <Box className="flex-1 items-center justify-center">
          {/* Header */}
          <Heading size="lg" bold className="mb-6 text-center">
            Shopping Cart
          </Heading>

          <VStack className="items-center justify-center">
            <Text className="text-lg text-gray-500">Your cart is empty.</Text>
            <Button
              onPress={() => router.navigate("/")}
              className="mt-4 bg-sky-500"
            >
              <ButtonText>Start Shopping</ButtonText>
            </Button>
          </VStack>
        </Box>
      ) : (
        <Box className="flex-1">
          {/* Header */}
          <Heading size="lg" bold className="mb-6 text-center">
            Shopping Cart - {getTotalItems()}
          </Heading>
          <Fab
            size="md"
            placement="bottom right"
            className="mb-16 bg-red-400"
            onPress={createTwoButtonAlert}
          >
            <FabIcon as={TrashIcon} size="md" />
          </Fab>
          <VStack>
            <ScrollView showsVerticalScrollIndicator={false}>
              {carts.map((product) => {
                return (
                  <VStack key={product.id}>
                    {product.items.map((item) => (
                      <Box
                        key={`${item.id}-${item.color}-${item.size}`}
                        className="mb-1 rounded-lg border-2 border-gray-100 px-4 py-3"
                      >
                        {/* Item Details */}
                        <HStack className="items-center justify-between">
                          <HStack space="lg" className="flex-1 items-center">
                            <Image
                              style={{
                                height: 50,
                                aspectRatio: 3 / 4,
                                borderRadius: 5,
                              }}
                              source={IMG_URL + product.image}
                              placeholder={{ blurhash }}
                              contentFit="cover"
                              transition={1000}
                            />
                            <VStack className="w-2/3">
                              <Text className="line-clamp-1">
                                {product.title}
                              </Text>
                              <Text size="sm" className="font-light">
                                {item.color} - {item.size}
                              </Text>
                              <Text className="text-gray-500">
                                ${product.price} x {item.quantity}
                              </Text>
                            </VStack>
                          </HStack>

                          {/* Update Quantity Buttons */}
                          <HStack space="xs">
                            <Button
                              size="xs"
                              variant="outline"
                              onPress={() =>
                                updateCart(
                                  product.id,
                                  item.id,
                                  item.quantity - 1,
                                )
                              }
                              className="border-gray-300"
                              isDisabled={item.quantity === 0 ? true : false}
                            >
                              <ButtonIcon as={RemoveIcon} size="xs" />
                            </Button>
                            <Text className="text-lg">{item.quantity}</Text>
                            <Button
                              size="xs"
                              variant="outline"
                              onPress={() =>
                                updateCart(
                                  product.id,
                                  item.id,
                                  item.quantity + 1,
                                )
                              }
                              className="border-gray-300"
                            >
                              <ButtonIcon as={AddIcon} size="xs" />
                            </Button>
                          </HStack>

                          {/* Delete Button */}
                          <Button
                            size="sm"
                            variant="link"
                            onPress={() => {
                              setProductInfo({
                                productId: product.id,
                                itemId: item.id,
                              });
                              setShowAlertDialog(true);
                            }}
                            className="ml-2"
                          >
                            <ButtonIcon as={TrashIcon} size="sm" />
                          </Button>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                );
              })}
              {/* Total Price */}
              <Box className="mt-6">
                <HStack className="justify-between">
                  <Text className="text-lg font-bold">Total Price :</Text>
                  <Text className="text-lg font-bold">${getTotalPrice()}</Text>
                </HStack>
              </Box>

              {/* Checkout Button */}
              <Button size="lg" className="mt-6 bg-green-500">
                <ButtonText>Checkout</ButtonText>
              </Button>
            </ScrollView>
          </VStack>
        </Box>
      )}
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-full max-w-[415px] items-center gap-4">
          <Box className="h-[52px] w-[52px] items-center justify-center rounded-full bg-background-error">
            <Icon as={TrashIcon} size="lg" className="stroke-error-500" />
          </Box>
          <AlertDialogHeader className="mb-2">
            <Heading size="md">Delete this product?</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm" className="text-center">
              Are you sure? This product will be deleted from your cart.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="mt-5">
            <Button
              size="sm"
              action="negative"
              onPress={handleDelete}
              className="px-[30px]"
            >
              <ButtonText>Delete</ButtonText>
            </Button>
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
              className="px-[30px]"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  );
};

export default CartScreen;
