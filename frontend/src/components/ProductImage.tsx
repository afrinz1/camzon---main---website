import type { ImgHTMLAttributes } from 'react';
import demoProductImage from '../assets/images/1.webp';

interface ProductImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
}

export function ProductImage({ src, onError, ...props }: ProductImageProps) {
  return (
    <img
      {...props}
      src={src || demoProductImage}
      onError={(event) => {
        onError?.(event);
        event.currentTarget.onerror = null;
        event.currentTarget.src = demoProductImage;
      }}
    />
  );
}
