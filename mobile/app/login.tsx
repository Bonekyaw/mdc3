import React from "react";
import { router } from "expo-router";
// import { Text, View } from "react-native";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { useSession } from "@/provider/ctx";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ArrowLeftIcon } from "@/components/ui/icon";

export default function SignIn() {
  const { signIn } = useSession();
  const register = () => {
    signIn();
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/");
  };
  return (
    <Center>
      <Box className="max-w-96 rounded-lg border border-background-300 p-5">
        <VStack space="md" className="pb-8">
          <Heading size="2xl">Sign In</Heading>
          <Text size="lg">
            Welcome back! Sign in to continue. Are you ready?
          </Text>
        </VStack>
        <VStack space="lg">
          <Button
            action="positive"
            variant="solid"
            size="xl"
            onPress={register}
          >
            <ButtonText className="font-extrabold">Sign In</ButtonText>
          </Button>
          <Box className="flex flex-row">
            <Button variant="link" size="sm">
              <ButtonIcon as={ArrowLeftIcon} size="md" />
              <ButtonText>Sign Up</ButtonText>
            </Button>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
}
