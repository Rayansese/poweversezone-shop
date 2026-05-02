export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  images: {
    edges: { node: Image }[];
  };
  variants: {
    edges: { node: ProductVariant }[];
  };
};

export type CartItem = {
  id: string;
  merchandiseId: string; // The variant ID representing the item
  product: Product;
  variant: ProductVariant;
  quantity: number;
};
