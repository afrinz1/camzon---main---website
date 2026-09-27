import React, { useState } from 'react';
import { Heart, Eye, Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, selectedColorHex?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView?: (product: Product) => void;
  viewMode?: 'grid-3' | 'grid-4' | 'list';
  cleanCard?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onToggleWishlist,
  isWishlisted,
  onQuickView,
  viewMode = 'grid-3',
  cleanCard = false,
}) => {
  const [selectedColorIdx] = useState(0);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const cardImages = product.images && product.images.length > 0 ? product.images : [];
  const displayImage = cardImages[currentImgIdx] || cardImages[0] || '';
  const activeColor = product.colors[selectedColorIdx] || product.colors[0];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? cardImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === cardImages.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || cardImages.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 35) {
      setCurrentImgIdx((prev) => (prev === cardImages.length - 1 ? 0 : prev + 1));
    } else if (diff < -35) {
      setCurrentImgIdx((prev) => (prev === 0 ? cardImages.length - 1 : prev - 1));
    }
    setTouchStartX(null);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.isSale
    ? 30
    : 0;

  if (viewMode === 'list') {
    return (
      <div
        id={`product-card-list-${product.id}`}
        className="group bg-[#15161b] rounded-2xl border border-stone-800 overflow-hidden hover:border-stone-700 transition-all duration-200 flex flex-col sm:flex-row p-4 sm:p-5 gap-6"
      >
        {/* Image thumbnail */}
        <div
          className="relative w-full sm:w-60 h-64 sm:h-52 bg-[#1c1e24] rounded-xl overflow-hidden flex-shrink-0 cursor-pointer flex items-center justify-center group/thumb"
          onClick={() => onSelectProduct(product)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={displayImage}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Small Arrow Buttons to swipe between product views */}
          {cardImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/75 hover:bg-black text-stone-200 hover:text-white flex items-center justify-center border border-white/15 backdrop-blur-xs transition-all z-20 cursor-pointer opacity-75 sm:opacity-0 sm:group-hover/thumb:opacity-100 shadow-md"
                aria-label="Previous view"
                title="Previous view"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/75 hover:bg-black text-stone-200 hover:text-white flex items-center justify-center border border-white/15 backdrop-blur-xs transition-all z-20 cursor-pointer opacity-75 sm:opacity-0 sm:group-hover/thumb:opacity-100 shadow-md"
                aria-label="Next view"
                title="Next view"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Indicator Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
                {cardImages.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-200 ${
                      i === currentImgIdx ? 'w-3 bg-white' : 'w-1 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs uppercase tracking-wider text-[#f26a1b] font-semibold">
                {product.category}
              </span>
              <div className="flex items-center text-amber-400 text-xs gap-1 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-stone-400">({product.reviewsCount})</span>
              </div>
            </div>

            <h3
              onClick={() => onSelectProduct(product)}
              className="text-lg font-bold text-white hover:text-[#f26a1b] transition-colors cursor-pointer uppercase tracking-tight"
            >
              {product.title}
            </h3>
            <p className="text-stone-400 text-xs mt-1 line-clamp-2">{product.subtitle}</p>
          </div>

          <div className="flex items-center justify-between pt-4 mt-2 border-t border-stone-800">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2 rounded-full border transition-colors ${
                  isWishlisted
                    ? 'bg-rose-900/30 border-rose-500 text-rose-500'
                    : 'bg-stone-800 border-stone-700 text-stone-300 hover:text-white'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
              <button
                onClick={() => onSelectProduct(product)}
                className="bg-[#f26a1b] hover:bg-[#d9560f] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 uppercase tracking-wider"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exact Card design matching catalog.png
  return (
    <div
      id={`product-card-${product.id}`}
      className="group rounded-2xl border border-stone-800/90 bg-[#121316] overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:border-stone-600 hover:shadow-2xl hover:shadow-black/70"
      onClick={() => onSelectProduct(product)}
    >
      {/* Upper Dark Studio Frame: Product Image */}
      <div 
        className="relative w-full aspect-[4/3.4] bg-gradient-to-b from-[#181a20] via-[#121317] to-[#0c0d10] flex items-center justify-center overflow-hidden border-b border-stone-800/80 group/img"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Discount / Special Tag */}
        {!cleanCard && discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-black/85 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 z-10 select-none">
            -{discountPercent}%
          </span>
        )}

        {/* Small Arrow Buttons to swipe/switch between product views */}
        {cardImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/70 hover:bg-black text-stone-200 hover:text-white flex items-center justify-center border border-white/15 backdrop-blur-xs transition-all z-20 cursor-pointer opacity-80 sm:opacity-0 sm:group-hover/img:opacity-100 shadow-md"
              aria-label="Previous view"
              title="Previous view"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/70 hover:bg-black text-stone-200 hover:text-white flex items-center justify-center border border-white/15 backdrop-blur-xs transition-all z-20 cursor-pointer opacity-80 sm:opacity-0 sm:group-hover/img:opacity-100 shadow-md"
              aria-label="Next view"
              title="Next view"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
              {cardImages.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-200 ${
                    i === currentImgIdx ? 'w-3 bg-white' : 'w-1 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute top-3 right-3 bg-black/80 hover:bg-[#f26a1b] text-stone-200 hover:text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm border border-white/10 opacity-0 group-hover/img:opacity-100 transition-all duration-200 z-10 shadow-lg cursor-pointer"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}

        <img
          src={displayImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Lower Silver / Light Grey Architectural Panel */}
      <div className="bg-[#dadbe0] p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Category & Color Finishes */}
          {!cleanCard && (
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea580c]">
                {product.category}
              </span>

              {/* Color Swatch Dots */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-1">
                  {product.colors.slice(0, 4).map((color, idx) => (
                    <span
                      key={color.hex + idx}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      className="w-2.5 h-2.5 rounded-full border border-stone-400/60 inline-block shadow-2xs"
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-[9px] text-stone-500 font-mono">
                      +{product.colors.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Title in bold uppercase */}
          <h3
            className="font-bold text-xs sm:text-[13px] tracking-tight text-stone-900 uppercase font-sans line-clamp-1 group-hover:text-[#f26a1b] transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Subtitle description */}
          <p className="text-[11px] text-stone-600 leading-snug my-1.5 line-clamp-2 font-normal">
            {product.subtitle || 'Engineered with precision CW617N forged brass core for lifetime reliability.'}
          </p>
        </div>

        {/* Bottom Action Row: Black Price Pill & Round Action Buttons */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-stone-300/60">
          {/* Price Pill */}
          <div className="flex items-center gap-2">
            <div className="bg-black text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice && (
              <span className="text-[11px] text-stone-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Wishlist Heart Button */}
            <button
              id={`wishlist-btn-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product);
              }}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-100 text-rose-600'
                  : 'bg-stone-300/90 hover:bg-stone-400 text-stone-800'
              }`}
              aria-label="Wishlist"
              title={isWishlisted ? 'Saved to wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>

            {/* View Details Arrow Button */}
            <button
              id={`view-btn-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(product);
              }}
              className="w-7 h-7 rounded-full bg-stone-300/90 hover:bg-[#f26a1b] hover:text-white text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="View product details"
              title="View product details"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
