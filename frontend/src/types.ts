export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSpecs {
  dimensions: string;
  materials: string;
  finish: string;
  weight: string;
  assembly: string;
  origin: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export type ProductCategory =
  | 'DART'
  | 'DECK'
  | 'DUERO'
  | 'DUNE'
  | 'FACET'
  | 'KORE'
  | 'QUADRA'
  | 'RIDGE'
  | 'SHOWERS'
  | string;

export interface CategoryItem {
  id: string;
  name: string;
  count?: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  badge?: string;
  colors: ProductColor[];
  images: string[];
  description: string;
  story: string;
  details: string[];
  specs: ProductSpecs;
  stockCount: number;
  sku: string;
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  selectedColor: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  search: string;
}

export type ActivePage = 'home' | 'catalog' | 'product';
