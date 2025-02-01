import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { categories } from "../../data/index";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type ProductType = {
  id: number;
  categories_id: number;
  brand: string;
  title: string;
  star: number;
  quantity: number;
  price: number;
  discount: number;
  image: any;
  onCallRoute: (id: number) => void;
};

export default function Product({
  id,
  categories_id,
  brand,
  title,
  star,
  quantity,
  price,
  discount,
  image,
  onCallRoute,
}: ProductType) {
  return (
    <Pressable className="flex-1">
      <Card className="relative">
        <Text size="sm">Start building your next project in minutes</Text>
      </Card>
    </Pressable>
  );
}
