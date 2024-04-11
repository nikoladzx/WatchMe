export interface Order {
  id: number;
  userId: string;
  totalPrice: number;
  status: number;
  basketItems: BasketItem[];
}

export interface BasketItem {
  id: number;
  quantity: number;
  productId: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  quantityInStock: string;
  brand: string;
  type: string;
}