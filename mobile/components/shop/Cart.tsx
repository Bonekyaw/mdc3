import { ShoppingCart } from "lucide-react-native";

import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Icon } from "@/components/ui/icon";

export default function Cart() {
  return (
    <Box className="items-center">
      <VStack>
        <Badge
          className="z-10 -mb-3.5 -mr-3.5 h-[22px] w-[22px] self-end rounded-full bg-red-600"
          variant="solid"
        >
          <BadgeText className="font-bold text-white">2</BadgeText>
        </Badge>
        <Icon as={ShoppingCart} size="xl" />
      </VStack>
    </Box>
  );
}
