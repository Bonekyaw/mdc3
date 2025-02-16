interface User {
  id: number;
}

interface Color {
  color: {
    id: number;
    name: string;
    bgColor: string;
  };
}

interface Size {
  size: {
    id: number;
    name: string;
  };
}

export interface ImageType {
  id: number;
  image: string;
}

export interface ProductType {
  id: number;
  categoryId: number;
  brand: string;
  title: string;
  star: number;
  quantity: number;
  price: number;
  discount: number;
  image: any;
  description: string;
  images: ImageType[];
  colors: Color[];
  sizes: Size[];
  users: User[];
}

export interface CategoryType {
  id: number;
  name: string;
  image: any;
}

export interface CartItem {
  id: number;
  color: string;
  size: string;
  quantity: number;
}

export interface CartType {
  id: number;
  title: string;
  price: number;
  image: any;
  items: CartItem[];
}
