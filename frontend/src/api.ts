import { Product } from './types';
import { PRODUCT_IMAGES } from './data/productImages';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

export interface InquiryPayload {
  inquiry_type: 'contact' | 'order';
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  product_name?: string;
}

function mapProductImages(product: Product): Product {
  return {
    ...product,
    images: product.images.map((image) => PRODUCT_IMAGES[image] ?? image),
  };
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, options);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}). Please try again.`);
  }
  return response.json() as Promise<T>;
}

export async function fetchProducts(): Promise<Product[]> {
  const products = await request<Product[]>('/api/products/');
  return products.map(mapProductImages);
}

export async function fetchProduct(slug: string): Promise<Product> {
  const product = await request<Product>(`/api/products/${encodeURIComponent(slug)}/`);
  return mapProductImages(product);
}

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  await request('/api/inquiries/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}