import { Image } from "expo-image";

import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type CategoryProps = {
  id: number;
  name: string;
  image: any;
  onSelect: (id: number) => void;
  select: number;
};

export default function Category({
  id,
  name,
  image,
  onSelect,
  select,
}: CategoryProps) {
  return (
    <Pressable onPress={() => onSelect(id)}>
      <Card className="items-center">
        <Image
          style={[
            { width: 56, height: 56, marginBottom: 7 },
            select === id && {
              borderColor: "orange",
              borderWidth: 2,
              borderRadius: 28,
            },
          ]}
          source={image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />

        <Text size="sm" bold>
          {name}
        </Text>
      </Card>
    </Pressable>
  );
}
