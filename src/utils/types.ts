import { AxiosRequestConfig } from "axios";

export interface FeatureOption {
  id: number;
  name: string;
  name_en: string;
  price: number;
  available: boolean;
}

export interface Feature {
  id: number;
  name: string;
  name_en: string;
  options: FeatureOption[];
}

export interface Product {
  is_available: boolean;
  sub_category: number;
  price: number;
  name: string;
  name_en: string;
  description: string;
  features: Feature[];
}
export interface ProductCardProps {
  product: Product;
}
export interface ProductState {
  productDetails: Product | null;
}

export interface LoginCredentials {
  mobile_number: string;
  password: string;
}

export interface TokensCredentials {
  refresh: string;
  access: string;
  [key: string]: string;
}

export interface Config<T> {
  body?: T; // Request body
  headers?: Record<string, string>; // Request headers
}

export interface ApiRequest<T> {
  route: string;
  method: AxiosRequestConfig["method"];
  data?: T;
}

export interface ApiRequeste<T> {
  route: string;
  method: string;
  config: Config<T>;
}

export type SubCategory = {
  id: number;
  name: string;
  name_en: string;
};

export type Category = {
  id: number;
  name: string;
  name_en: string;
  subcat: SubCategory[];
};

export interface Item {
  id: number;
  name: string;
  name_en: string;
  image: string;
  price: number;
  is_available: boolean;
}

export interface ProductCategory {
  id: number;
  name: string;
  name_en: string;
  items: Item[];
}
export interface Card {
  item: Item;
  category: ProductCategory;
}

export interface NavbarProps {
  active: string;
  appearance?: string;
  onSelect: (eventKey: string) => void;
}

export interface OrdersTransaction {
  store: number;
  date: string;
  amount: number;
  note: string;
}

export interface OrdersData {
  total_profit: number;
  transactions: OrdersTransaction[];
}

export interface AdminArchive {
  id: number;
  name_en: string;
  name_ar: string;
  creation_time: string;
  items_count: number;
  cart_total: number;
  total_quantity: number;
}

export interface UserInterface {
  id: number; //
  name_en: string; //x
  name_ar: string; //
  image: string | undefined | File | null;
  mobile_number: string;
  email: string;
  country: string; //
  surname: string; //
  city: number | string; //
}
