import { Slot } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SessionProvider } from "@/provider/ctx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
