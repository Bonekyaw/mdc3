import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { CartItem, CartType } from "@/types";

type State = {
  carts: CartType[];
};

type Actions = {};
