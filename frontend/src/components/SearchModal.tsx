import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularSearches = [
    'DART',
    'DECK',
    'DUERO',
    'DUNE',
    'FACET',
    'KORE',
    'QUADRA',
    'RIDGE',
    'SHOWERS',
  ];

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#181a20] rounded-2xl max-w-2xl mx-auto shadow-2xl border border-stone-800 overflow-hidden z-10 text-stone-200">
        {/* Search input header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center gap-3 bg-[#131418]">
          <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by collection (DART, QUADRA...), finish, or feature..."
            className="w-full text-sm sm:text-base text-white placeholder-stone-500 focus:outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-stone-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-white ml-2 cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
          {!query.trim() ? (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3">
                Explore Collections
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="bg-[#22242c] hover:bg-[#f26a1b] hover:text-white text-stone-300 text-xs px-3.5 py-1.5 rounded-full transition-colors font-medium border border-stone-700/60 cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-sm">
              No pieces found for &quot;{query}&quot;. Try searching for &quot;DART&quot;, &quot;QUADRA&quot;, or &quot;SHOWERS&quot;.
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Matching Pieces ({results.length})
              </span>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[#20222a] transition-colors cursor-pointer group border border-transparent hover:border-stone-800"
                >
                  <div className="w-14 h-14 rounded-lg bg-[#121316] overflow-hidden flex-shrink-0 border border-stone-800">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#f26a1b] font-bold block">
                      {product.category}
                    </span>
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-[#f26a1b] uppercase">
                      {product.title}
                    </h4>
                    <span className="text-xs font-bold text-stone-300">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
