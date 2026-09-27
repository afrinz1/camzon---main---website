import React, { useState } from 'react';
import { X, Heart, Star, ArrowRight, Phone } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onAddToCart?: (product: Product, selectedColorHex?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onSelectProduct,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!product) return null;

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#181a20] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-800 z-10 text-stone-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-stone-900/90 backdrop-blur-sm p-2 rounded-full text-stone-300 hover:text-white border border-stone-700 shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="bg-[#121316] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-800">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#0c0d10] border border-stone-800/80">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2 mt-4 justify-center">
              {product.images.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIdx === i ? 'border-[#f26a1b]' : 'border-stone-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest mb-1">
                <span className="text-[#f26a1b] font-bold">{product.category}</span>
                <div className="flex items-center text-amber-400 gap-1 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-white">{product.rating}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight uppercase">
                {product.title}
              </h2>

              <p className="text-xs text-stone-300 mt-2 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              <div className="flex items-baseline gap-3 my-4">
                <span className="text-2xl font-bold text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Swatches */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-stone-300 block">
                  Finish: <span className="font-normal text-stone-400">{activeColor.name}</span>
                </span>
                <div className="flex gap-2">
                  {product.colors.map((col, idx) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                        selectedColorIdx === idx ? 'ring-2 ring-[#f26a1b] ring-offset-2 ring-offset-stone-900' : 'border-stone-600'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex-1 bg-[#f26a1b] hover:bg-[#ea580c] text-white py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>View Product Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    isWishlisted ? 'bg-rose-950/40 border-rose-600 text-rose-500' : 'bg-stone-800 border-stone-700 text-stone-300 hover:text-white'
                  }`}
                  title="Save to Wishlist"
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              <div className="text-center text-[11px] text-stone-400">
                10-Year CAMZON Warranty · Lead-free virgin forged brass core
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
