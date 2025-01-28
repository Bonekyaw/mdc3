import { Slot } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SessionProvider } from "@/provider/ctx";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <GluestackUIProvider mode="light">
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </GluestackUIProvider>
  );
}
