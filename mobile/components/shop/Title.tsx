import { memo } from "react";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

type TitleProps = {
  title: string;
  actionText: string;
};
const Title = ({ title, actionText }: TitleProps) => {
  // console.log("Rendering Title ----");

  return (
    <HStack className="items-center justify-between">
      <Text size="lg" className="font-medium text-black">
        {title}
      </Text>
      <Pressable>
        <Text className="font-medium text-gray-500">{actionText}</Text>
      </Pressable>
    </HStack>
  );
};

export default memo(Title);
