import React from 'react';
import { X, Trash2, Heart, ArrowRight, MessageCircle } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const handleInquireAll = () => {
    const titles = wishlistProducts.map((p) => `${p.title} (₹${p.price.toLocaleString('en-IN')})`).join(', ');
    const text = encodeURIComponent(
      `Hello Camzon! I am interested in these saved pieces from my wishlist: ${titles}. Please share availability and delivery timeframe.`
    );
    window.open(`https://wa.me/919447000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#14151a] shadow-2xl flex flex-col border-l border-stone-800 text-stone-200">
          {/* Header */}
          <div className="p-6 bg-[#1a1b22] border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#f26a1b] fill-[#f26a1b]" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Saved Wishlist ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-stone-200">
                  No Saved Pieces Yet
                </h3>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Click the heart icon on any bathware piece to save it to your personal curation list.
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-[#f26a1b] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-lg hover:bg-[#ea580c] transition-colors cursor-pointer"
                >
                  <span>Browse Collections</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#1c1d25] p-4 rounded-xl border border-stone-800/80 shadow-sm flex gap-4"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-20 h-20 rounded-lg bg-[#121316] overflow-hidden flex-shrink-0 cursor-pointer border border-stone-700/60"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            onSelectProduct(product);
                            onClose();
                          }}
                          className="text-xs font-bold text-white line-clamp-1 hover:text-[#f26a1b] cursor-pointer uppercase"
                        >
                          {product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-stone-400 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-stone-400 block mt-0.5 font-medium">
                        <span className="text-[#f26a1b] font-semibold">{product.category}</span> · ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="w-full bg-stone-800 hover:bg-[#f26a1b] text-white text-[11px] font-semibold py-1.5 px-3 rounded-md uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>View Piece</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Inquiry Button */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 bg-[#1a1b22] border-t border-stone-800 space-y-2">
              <button
                onClick={handleInquireAll}
                className="w-full bg-[#f26a1b] hover:bg-[#ea580c] text-white py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire About Saved Pieces</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
