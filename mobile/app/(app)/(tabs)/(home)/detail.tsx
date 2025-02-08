import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { Heart } from "lucide-react-native";

import { products } from "@/data";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import Cart from "@/components/shop/Cart";
import PagerViewScreen from "@/components/shop/PagerView";
import { ScrollView } from "react-native";
import { HStack } from "@/components/ui/hstack";
import {
  AddIcon,
  CheckIcon,
  CloseCircleIcon,
  Icon,
  RemoveIcon,
  StarIcon,
} from "@/components/ui/icon";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  CheckboxGroup,
} from "@/components/ui/checkbox";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetIcon,
} from "@/components/ui/actionsheet";
import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";

type CartProps = {
  id: number;
  color: string;
  size: string;
  quantity: number;
};

const Detail = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === +id);
  const [colors, setColors] = React.useState([]);
  const [sizes, setSizes] = React.useState([]);
  const [quantity, setQuantity] = React.useState(1);
  const [cart, setCart] = React.useState<CartProps[]>([]);
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => {
    setShowActionsheet(false);
    if (quantity == 0) {
      return;
    }
    // Add to local cart
    colors.forEach((color) => {
      sizes.forEach((size) => {
        setCart((prev) => [
          { id: Math.random(), color, size, quantity },
          ...prev,
        ]);
      });
    });
    // Reset
    setColors([]);
    setSizes([]);
    setQuantity(1);
  };

  const toast = useToast();
  const [toastId, setToastId] = React.useState(0);
  const handleToast = () => {
    if (!toast.isActive(toastId.toString())) {
      showNewToast();
    }
  };
  const showNewToast = () => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: newId.toString(),
      placement: "bottom",
      duration: 2000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast nativeID={uniqueToastId} action="info" variant="solid">
            <ToastTitle>{`Must choose ${colors.length == 0 ? "color - " : ""} ${sizes.length == 0 ? "size" : ""}`}</ToastTitle>
            <ToastDescription>
              Please set quantity after choosing
            </ToastDescription>
          </Toast>
        );
      },
    });
  };

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="sm" className="mt-4 px-5">
          <HStack space="sm" className="justify-between">
            <HStack space="sm" className="items-center">
              <Text className="font-semibold text-gray-500">
                {product?.brand}
              </Text>
              <Icon as={StarIcon} size="xs" className="text-orange-500" />
              <Text size="sm">{product?.star}</Text>
              <Text size="xs" className="text-gray-500">
                ({product?.quantity})
              </Text>
            </HStack>
            <Pressable>
              <Icon
                as={Heart}
                className={`m-1 h-5 w-5 text-red-400 ${true && "fill-red-400"}`}
              />
            </Pressable>
          </HStack>
          <Text className="line-clamp-1 font-medium">{product?.title}</Text>
          <HStack space="sm" className="items-center">
            <Text className="font-medium text-green-700">
              ${product?.price.toFixed(2)}
            </Text>
            {product?.discount! > 0 && (
              <Text className="text-gray-500 line-through">
                ${product?.discount.toFixed(2)}
              </Text>
            )}
          </HStack>
          <Text>{product?.description}</Text>
          <Text className="mb-1 mt-2 font-medium">Choose Colors</Text>
          <CheckboxGroup
            value={colors}
            onChange={(keys) => {
              setColors(keys);
            }}
          >
            <HStack space="xl" className="flex-wrap">
              {product?.colors.map((color) => {
                if (!color.stock) {
                  return null;
                }
                return (
                  <Checkbox value={color.name} key={color.id}>
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>{color.name}</CheckboxLabel>
                  </Checkbox>
                );
              })}
            </HStack>
          </CheckboxGroup>
          <Text className="mb-1 mt-2 font-medium">Choose Sizes</Text>
          <CheckboxGroup
            value={sizes}
            onChange={(keys) => {
              setSizes(keys);
            }}
          >
            <HStack space="xl" className="flex-wrap">
              {product?.sizes.map((size) => {
                if (!size.stock) {
                  return null;
                }
                return (
                  <Checkbox value={size.name} key={size.id}>
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>{size.name}</CheckboxLabel>
                  </Checkbox>
                );
              })}
            </HStack>
          </CheckboxGroup>
          <Box className="mt-6 self-start">
            <Button
              size="lg"
              className="rounded-lg bg-sky-500"
              onPress={() => {
                if (colors.length > 0 && sizes.length > 0) {
                  setShowActionsheet(true);
                  return;
                }
                handleToast();
              }}
            >
              <ButtonText>Set Quantity</ButtonText>
            </Button>
          </Box>
          {cart.length > 0 && (
            <VStack space="sm">
              {cart.map((c) => (
                <HStack
                  key={c.id}
                  className="items-center justify-between rounded-md bg-slate-100 px-2 py-1"
                >
                  <HStack space="md" className="items-center">
                    <Icon as={AddIcon} size="sm" />
                    <Text>
                      {c.color} - {c.size} ( {c.quantity} )
                    </Text>
                  </HStack>
                  <Button
                    size="md"
                    className="mr-4"
                    variant="link"
                    onPress={() =>
                      setCart((prev) => prev.filter((item) => item.id !== c.id))
                    }
                  >
                    <ButtonIcon as={CloseCircleIcon} />
                  </Button>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
        <Box className="mb-48" />
      </ScrollView>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <VStack className="w-full items-center justify-center pt-5">
            <Text bold>You chose colors and sizes.</Text>
            <Text>
              {colors.join(", ")} - {sizes.join(", ")}
            </Text>
            <Text bold className="mt-8">
              Please set quantity
            </Text>
            <Text bold className="my-8 text-5xl">
              {quantity}
            </Text>
            <HStack className="w-full" space="lg">
              <Button
                size="lg"
                className="flex-1 bg-sky-500"
                onPress={() => setQuantity((q) => q + 1)}
              >
                <ButtonText>Increase</ButtonText>
                <ButtonIcon as={AddIcon} />
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-sky-500"
                onPress={() => {
                  if (quantity == 0) {
                    return;
                  }
                  setQuantity((q) => q - 1);
                }}
              >
                <ButtonText>Decrease</ButtonText>
                <ButtonIcon as={RemoveIcon} />
              </Button>
            </HStack>
            <Button
              size="lg"
              className={`mb-12 mt-6 ${quantity > 0 ? "bg-green-500" : "bg-gray-500"}`}
              onPress={handleClose}
            >
              <ButtonText className="flex-1 text-center font-bold">
                {quantity == 0 ? "Close" : "Confirm"}
              </ButtonText>
            </Button>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
      <Box className="self-end">
        <Fab size="md" className="bottom-28 bg-green-500">
          <FabIcon as={AddIcon} size="md" />
          <FabLabel bold>Add To Cart</FabLabel>
        </Fab>
      </Box>
    </VStack>
  );
};

export default Detail;
