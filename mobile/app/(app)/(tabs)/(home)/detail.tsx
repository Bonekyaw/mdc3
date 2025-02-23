import React from "react";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { Heart } from "lucide-react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import { products } from "@/data";
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
import api from "@/api/axios";
import type { ProductType, CartItem } from "@/types";
import useCartStore from "@/store/cartStore";

type CartProps = {
  id: number;
  color: string;
  size: string;
  quantity: number;
};

const fetchProduct = async (productId: number): Promise<ProductType> => {
  // console.log("Fetching Product ---", productId);

  const response = await api.get(`/users/products/${productId}`);
  console.log("Product ---", response.data);

  return response.data;
};

const Detail = () => {
  console.log("Rendering Detail ---");

  const { id } = useLocalSearchParams();
  const { addToCart } = useCartStore();

  const queryClient = useQueryClient();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(+id),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  // const product = products.find((p) => p.id === +id);
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

  const toggleFavourite = async (productId: number) => {
    console.log("Favourite api ----", productId);

    const response = await api.patch("/users/products/favourite-toggle", {
      productId,
      favourite: product?.users.length == 0,
    });
    return response.data;
  };

  const { mutate } = useMutation({
    mutationFn: toggleFavourite,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["product", id] });

      const previousProduct = queryClient.getQueryData(["product", id]);

      queryClient.setQueryData(["product", id], (oldData: any) => {
        const favouriteData = product?.users.length == 0 ? [{ id: 1 }] : [];

        return {
          ...oldData,
          users: favouriteData,
        };
      });

      return { previousProduct };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["product", id], context?.previousProduct);
      handleToast("An error occurs", error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", product?.categoryId],
      });
    },
  });

  const handleToggleFavourite = () => {
    mutate(+id);
  };

  const toast = useToast();
  const [toastId, setToastId] = React.useState(0);
  const handleToast = (title: string, description: string) => {
    if (!toast.isActive(toastId.toString())) {
      showNewToast(title, description);
    }
  };
  const showNewToast = (title: string, description: string) => {
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
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{description}</ToastDescription>
          </Toast>
        );
      },
    });
  };

  const addCartToStore = () => {
    if (cart.length === 0) {
      return handleToast("Cart is empty", "Please add items to cart");
    }
    const cartProduct = {
      id: product?.id!,
      title: product?.title!,
      price: product?.price!,
      image: product?.image,
      items: cart,
    };

    addToCart(cartProduct);
    router.back();
  };

  if (isLoading) {
    return (
      <VStack className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack className="flex-1 items-center justify-center">
        <Text className="mb-4">Error : {error.message}</Text>
        <Button size="md" variant="solid" action="primary" onPress={refetch}>
          <ButtonText>Retry</ButtonText>
        </Button>
      </VStack>
    );
  }

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
            <Pressable onPress={handleToggleFavourite}>
              <Icon
                as={Heart}
                className={`m-1 h-5 w-5 text-red-400 ${product!.users?.length > 0 && "fill-red-400"}`}
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
              {product?.colors.map((item) => {
                return (
                  <Checkbox value={item.color.name} key={item.color.id}>
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>{item.color.name}</CheckboxLabel>
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
              {product?.sizes.map((item) => {
                return (
                  <Checkbox value={item.size.name} key={item.size.id}>
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>{item.size.name}</CheckboxLabel>
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
                const title = `Must choose ${colors.length == 0 ? "color - " : ""} ${sizes.length == 0 ? "size" : ""}`;
                const description = "Please set quantity after choosing";
                handleToast(title, description);
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
      <Fab
        size="md"
        placement="bottom right"
        className="mb-24 bg-green-500"
        onPress={addCartToStore}
      >
        <FabIcon as={AddIcon} size="md" />
        <FabLabel bold>Add To Cart</FabLabel>
      </Fab>
    </VStack>
  );
};

export default Detail;
