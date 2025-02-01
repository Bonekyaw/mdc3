import { Stack, Slot } from "expo-router";
// export default Stack;

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="detail" />
    </Stack>
  );
}
