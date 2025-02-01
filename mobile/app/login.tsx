import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { useSession } from "@/provider/ctx";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { signIn } = useSession();

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = (formState: any) => {
    console.log(formState);
    signIn();
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack space="xs" className="mt-3 items-center justify-end">
          <Image
            source={require("@/assets/images/react-logo.png")}
            alt="Logo"
            // size="xs"
            className="h-8 w-8"
          />
          <Text size="xl" bold>
            Fashion
          </Text>
        </HStack>
        <VStack space="4xl">
          <VStack space="lg">
            <Heading size="3xl" bold className="leading-snug">
              Sign in {"\n"}to your Account
            </Heading>
            <Text size="lg" className="font-semibold text-gray-500">
              Enter your phone & password to log in
            </Text>
          </VStack>
          <FormControl
            // isInvalid={false}
            size="lg"
            // isDisabled={false}
            // isReadOnly={false}
            // isRequired={false}
          >
            <VStack space="xs">
              <FormControlLabel>
                <FormControlLabelText className="text-lg font-semibold text-gray-500">
                  Phone Number
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "This is required.",
                  },
                  minLength: {
                    value: 7,
                    message: "This is not phone number.",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Please enter digits only.",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="h-16 rounded-lg border-gray-200 bg-white"
                    size="xl"
                  >
                    <InputField
                      placeholder="0977******7"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      inputMode="numeric"
                      maxLength={12}
                    />
                  </Input>
                )}
                name="phone"
              />
              {errors.phone && (
                <Text size="md" className="text-red-400">
                  {errors.phone.message}
                </Text>
              )}
            </VStack>
            <VStack space="xs" className="mt-5">
              <FormControlLabel>
                <FormControlLabelText className="text-lg font-semibold text-gray-500">
                  Password
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "This is required.",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be 8 digits.",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Please enter digits only.",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="h-16 rounded-lg border-gray-200 bg-white"
                    size="xl"
                  >
                    <InputField
                      placeholder="********"
                      type={showPassword ? "text" : "password"}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      inputMode="numeric"
                      maxLength={8}
                    />
                    <InputSlot className="pr-3" onPress={handleState}>
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  </Input>
                )}
                name="password"
              />
              {errors.password && (
                <Text size="md" className="text-red-400">
                  {errors.password.message}
                </Text>
              )}
              {/* <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  8 Digits are required.
                </FormControlErrorText>
              </FormControlError> */}

              <FormControlHelper>
                <FormControlHelperText>Must be 8 digits.</FormControlHelperText>
              </FormControlHelper>
            </VStack>
          </FormControl>
          <Text size="md" bold className="text-right text-blue-500">
            Forgot Password?
          </Text>
          <Button
            className="h-16 rounded-lg bg-blue-600"
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText className="text-lg font-bold">Log In</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
