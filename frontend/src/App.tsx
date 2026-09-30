import React, { useEffect, useState } from 'react';
import { ActivePage, Product } from './types';
import { fetchProducts } from './api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';

function readWishlist(): Set<string> {
  try {
    const saved = JSON.parse(localStorage.getItem('camzon-wishlist') || '[]');
    return new Set(Array.isArray(saved) ? saved.filter((id): id is string => typeof id === 'string') : []);
  } catch {
    return new Set();
  }
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [reloadProducts, setReloadProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [previousPage, setPreviousPage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(readWishlist);

  useEffect(() => {
    let cancelled = false;
    setProductsLoading(true);
    setProductsError(null);
    fetchProducts()
      .then((loadedProducts) => {
        if (!cancelled) setProducts(loadedProducts);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setProductsError(error instanceof Error ? error.message : 'Unable to load products.');
        }
      })
      .finally(() => {
        if (!cancelled) setProductsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reloadProducts]);

  useEffect(() => {
    localStorage.setItem('camzon-wishlist', JSON.stringify([...wishlistIds]));
  }, [wishlistIds]);

  // Modals & Drawers state
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Global floating toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Scroll to top on page switch
  const handleNavigate = (page: ActivePage, category?: string) => {
    if (currentPage !== page) {
      setPreviousPage(currentPage);
    }
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category);
    } else if (page === 'catalog' && !category) {
      setSelectedCategory('all');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    if (currentPage !== 'product') {
      setPreviousPage(currentPage);
    }
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (currentPage === 'product' && selectedProduct) {
      handleNavigate(previousPage || 'catalog', selectedProduct.category);
    } else if (currentPage === 'product') {
      handleNavigate('catalog');
    } else if (currentPage === 'catalog') {
      handleNavigate('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed "${product.title}" from saved wishlist`);
      } else {
        next.add(product.id);
        showToast(`Saved "${product.title}" to your wishlist`);
      }
      return next;
    });
  };

  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-stone-100 selection:bg-[#f26a1b] selection:text-white">
      {/* 1. TOP NAVBAR (Shopping bag removed) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        wishlistCount={wishlistIds.size}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. MAIN ACTIVE VIEW ROUTER */}
      <main className="flex-1">
        {productsLoading ? (
          <div className="min-h-[50vh] flex items-center justify-center text-stone-300" role="status">
            Loading products...
          </div>
        ) : productsError ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-4 text-center" role="alert">
            <p className="text-stone-200">{productsError}</p>
            <button
              onClick={() => setReloadProducts((attempt) => attempt + 1)}
              className="bg-[#f26a1b] px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
            >
              Retry
            </button>
          </div>
        ) : currentPage === 'home' ? (
          <HomePage
            products={products}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ) : currentPage === 'catalog' ? (
          <CatalogPage
            products={products}
            initialCategory={selectedCategory}
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
            onSelectProduct={handleSelectProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ) : currentPage === 'product' && selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
            previousPage={previousPage}
            onSelectProduct={handleSelectProduct}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.has(selectedProduct.id)}
            wishlistIds={wishlistIds}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ) : null}
      </main>

      {/* 3. SITE FOOTER */}
      <Footer onNavigate={handleNavigate} showContactSection={currentPage === 'home'} />

      {/* 4. WISHLIST SLIDE-OUT DRAWER */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={handleSelectProduct}
      />

      {/* 5. QUICK VIEW MODAL */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onSelectProduct={(p) => {
          handleSelectProduct(p);
          setQuickViewProduct(null);
        }}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
      />

      {/* 6. SEARCH AUTOCOMPLETE OVERLAY MODAL */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => {
          handleSelectProduct(p);
          setIsSearchOpen(false);
        }}
      />

      {/* 7. GLOBAL FLOATING TOAST FEEDBACK */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16171d] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-stone-700 text-xs font-medium flex items-center gap-3 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f26a1b]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
