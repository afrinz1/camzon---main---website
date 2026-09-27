import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Check,
  SlidersHorizontal,
  RotateCcw,
  ArrowLeft,
  Home,
  ChevronRight,
  ArrowUp,
  ArrowUpRight,
} from 'lucide-react';
import { Product, FilterState, ActivePage } from '../types';
import { SIDEBAR_CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import catalogBannerImg from '../assets/images/catalog_banner_1789820182050.jpg';

interface CatalogPageProps {
  products: Product[];
  initialCategory?: string;
  onNavigate: (page: ActivePage, category?: string) => void;
  onGoBack?: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, selectedColorHex?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onQuickView: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  initialCategory,
  onNavigate,
  onGoBack,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory || 'all',
    minPrice: 0,
    maxPrice: 25000,
    inStockOnly: false,
    onSaleOnly: false,
    selectedColor: '',
    sortBy: 'featured',
    search: '',
  });

  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync initialCategory
  React.useEffect(() => {
    if (initialCategory) {
      setFilters((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (filters.category !== 'all' && p.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
        // Search query
        if (filters.search.trim()) {
          const q = filters.search.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchSub = p.subtitle.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchTitle && !matchSub && !matchCat) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price;
        if (filters.sortBy === 'price-high') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, filters]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleCategoryToggle = (catId: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.toLowerCase() === catId.toLowerCase() ? 'all' : catId,
    }));
    setVisibleCount(6); // reset pagination on filter change
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      minPrice: 0,
      maxPrice: 25000,
      inStockOnly: false,
      onSaleOnly: false,
      selectedColor: '',
      sortBy: 'featured',
      search: '',
    });
    setVisibleCount(6);
  };

  return (
    <div id="catalog-page" className="min-h-screen bg-[#0d0e12] text-stone-200 pb-20 pt-6 selection:bg-[#f26a1b] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* ========================================================================= */}
        {/* 0. TOP NAVIGATION & BACK BAR */}
        {/* ========================================================================= */}
        <div
          id="catalog-top-nav-bar"
          className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800/80"
        >
          <button
            id="catalog-back-home-btn"
            onClick={() => {
              if (onGoBack) {
                onGoBack();
              } else {
                onNavigate('home');
              }
            }}
            className="inline-flex items-center gap-2 bg-[#17181f] hover:bg-[#20222a] border border-stone-800 hover:border-stone-700 text-stone-200 hover:text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer shadow-sm group active:scale-95"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4 text-[#f26a1b] transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>

          {/* Interactive Clickable Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-stone-400">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              title="Go to Home"
            >
              <Home className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />
            <button
              onClick={() => resetFilters()}
              className={`hover:text-white transition-colors cursor-pointer ${
                filters.category === 'all' && !filters.search ? 'text-[#f26a1b] font-medium' : ''
              }`}
              title="View all collections"
            >
              Catalog
            </button>
            {filters.category !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                <span className="text-[#f26a1b] font-medium capitalize">
                  {filters.category}
                </span>
                <button
                  onClick={() => setFilters({ ...filters, category: 'all' })}
                  className="text-stone-500 hover:text-stone-300 ml-1 cursor-pointer text-[11px]"
                  title="Clear category filter"
                >
                  (clear)
                </button>
              </>
            )}
          </nav>
        </div>

        {/* 1. TOP HEADER ROW: Full Catalog. + Search Capsule */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Full Catalog<span className="text-[#f26a1b]">.</span>
            </h1>
          </div>

          {/* Search Pill Capsule matching mockup */}
          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="catalog-search-input"
              type="text"
              value={filters.search}
              onChange={(e) => {
                setFilters({ ...filters, search: e.target.value });
                setVisibleCount(6);
              }}
              placeholder="Search"
              className="w-full bg-[#202227] border border-stone-700/60 text-white text-xs rounded-full pl-9 pr-8 py-2 placeholder:text-stone-400 focus:outline-none focus:border-[#f26a1b] transition-colors"
            />
            {filters.search && (
              <button
                onClick={() => setFilters({ ...filters, search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2. WIDE HERO BANNER (Clean, no text overlay) */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-800/80 shadow-2xl bg-[#14151a]">
          <img
            src={catalogBannerImg}
            alt="Camzon Bathware Collection"
            className="w-full h-44 sm:h-64 md:h-72 lg:h-80 object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* 3. BREADCRUMBS & SECTION TITLE */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-400 tracking-wide mb-1">
              <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                Home
              </button>
              <span>&gt;</span>
              <span className="text-stone-300 font-medium">Catalog</span>
              {filters.category !== 'all' && (
                <>
                  <span>&gt;</span>
                  <span className="text-[#f26a1b] font-semibold">{filters.category}</span>
                </>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              <span className="text-[#f26a1b]">Camzon</span> Collection
            </h2>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden inline-flex items-center gap-2 bg-[#1e2025] border border-stone-800 text-stone-300 hover:text-white px-4 py-2 rounded-full text-xs font-semibold self-start"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#f26a1b]" />
            <span>Filter Categories</span>
          </button>
        </div>

        {/* 4. TWO-COLUMN LAYOUT: Sidebar (Category / nos) + Product Grid (3 cols) */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR: Charcoal Panel matching mockup */}
          <aside
            className={`w-full lg:w-56 flex-shrink-0 bg-[#1e2025] rounded-2xl p-4 sm:p-5 border border-stone-800 shadow-xl space-y-6 ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* Category Navigation */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold pb-2.5 border-b border-stone-800/80 mb-3">
                <span className="text-[#f26a1b]">Category</span>
                <span className="text-stone-400 font-normal text-[11px]">nos:</span>
              </div>

              <div className="space-y-2">
                {SIDEBAR_CATEGORIES.map((cat) => {
                  const isSelected = filters.category.toLowerCase() === cat.id.toLowerCase();
                  return (
                    <div
                      key={`cat-1-${cat.id}`}
                      onClick={() => handleCategoryToggle(cat.id)}
                      className="flex items-center justify-between group cursor-pointer py-1 select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Square checkbox matching mockup */}
                        <div
                          className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#f26a1b] text-white'
                              : 'bg-[#2b2d34] border border-stone-700/80 group-hover:border-stone-500'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span
                          className={`text-xs transition-colors ${
                            isSelected ? 'text-white font-semibold' : 'text-stone-300 group-hover:text-white'
                          }`}
                        >
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs text-stone-400 font-mono">{cat.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Status Filters */}
            <div className="pt-2 border-t border-stone-800/80">
              <div className="flex items-center justify-between text-xs font-bold pb-2.5 border-b border-stone-800/80 mb-3">
                <span className="text-stone-300 font-semibold">Availability</span>
              </div>

              <div className="space-y-2">
                <div
                  onClick={() => setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }))}
                  className="flex items-center justify-between group cursor-pointer py-1 select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-colors ${
                        filters.inStockOnly
                          ? 'bg-[#f26a1b] text-white'
                          : 'bg-[#2b2d34] border border-stone-700/80 group-hover:border-stone-500'
                      }`}
                    >
                      {filters.inStockOnly && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span
                      className={`text-xs transition-colors ${
                        filters.inStockOnly ? 'text-white font-semibold' : 'text-stone-300 group-hover:text-white'
                      }`}
                    >
                      In Stock Ready to Ship
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setFilters((prev) => ({ ...prev, onSaleOnly: !prev.onSaleOnly }))}
                  className="flex items-center justify-between group cursor-pointer py-1 select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-colors ${
                        filters.onSaleOnly
                          ? 'bg-[#f26a1b] text-white'
                          : 'bg-[#2b2d34] border border-stone-700/80 group-hover:border-stone-500'
                      }`}
                    >
                      {filters.onSaleOnly && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span
                      className={`text-xs transition-colors ${
                        filters.onSaleOnly ? 'text-white font-semibold' : 'text-stone-300 group-hover:text-white'
                      }`}
                    >
                      Special Value Offers
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Filters button if any filter is active */}
            {(filters.category !== 'all' || filters.search) && (
              <button
                onClick={resetFilters}
                className="w-full pt-2 flex items-center justify-center gap-1.5 text-[11px] text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Show All Collections</span>
              </button>
            )}
          </aside>

          {/* RIGHT PRODUCT GRID (3 columns on desktop matching catalog.png) */}
          <main className="flex-1 w-full">
            {displayedProducts.length === 0 ? (
              <div className="bg-[#1e2025] rounded-2xl p-12 text-center border border-stone-800">
                <p className="text-stone-400 text-sm">No bathware designs found matching your search.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 bg-[#f26a1b] hover:bg-[#d9560f] text-white text-xs font-semibold px-5 py-2 rounded-full transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelectProduct={onSelectProduct}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={onToggleWishlist}
                      isWishlisted={wishlistIds.has(product.id)}
                      onQuickView={onQuickView}
                    />
                  ))}
                </div>

                {/* Explore More. Pill Button matching catalog.png */}
                {visibleCount < filteredProducts.length && (
                  <div className="pt-10 text-center">
                    <button
                      id="catalog-explore-more-btn"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="bg-[#dadbe0] hover:bg-white text-stone-900 font-bold text-xs sm:text-[13px] px-8 py-2.5 rounded-full shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                    >
                      Explore more.
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>

        {/* ========================================================================= */}
        {/* 5. BOTTOM CATALOG NAVIGATION ROW */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t border-stone-800/80">
          <button
            id="catalog-bottom-back-home-btn"
            onClick={() => {
              if (onGoBack) onGoBack();
              else onNavigate('home');
            }}
            className="inline-flex items-center gap-2 bg-[#17181f] hover:bg-[#20222a] border border-stone-800 hover:border-stone-700 text-stone-200 hover:text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer shadow-sm group active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#f26a1b] transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('contact-touch-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="inline-flex items-center gap-1.5 bg-[#202228] hover:bg-[#282a32] border border-stone-700 text-stone-200 hover:text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all cursor-pointer"
            >
              <span>Visit Showroom</span>
              <ArrowUpRight className="w-4 h-4 text-[#f26a1b]" />
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 bg-[#17181f] hover:bg-[#20222a] border border-stone-800 text-stone-300 hover:text-white px-4 py-2.5 rounded-full text-xs font-medium transition-colors cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
