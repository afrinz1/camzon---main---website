import React, { useState } from 'react';
import {
  Star,
  Phone,
  MessageCircle,
  X,
  Check,
  Send,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Home,
  ArrowUp,
  ArrowUpRight,
} from 'lucide-react';
import { Product, ActivePage } from '../types';
import { ProductCard } from './ProductCard';
import faucetAureliaImg from '../assets/images/faucet_aurelia_1789820230663.jpg';
import featuredFaucetImg from '../assets/images/featured_faucet_1789786590956.jpg';
import ourDesignFaucetImg from '../assets/images/our_design_faucet_1789788346067.jpg';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onNavigate: (page: ActivePage, category?: string) => void;
  onGoBack?: () => void;
  previousPage?: ActivePage;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, selectedColorHex?: string, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  wishlistIds: Set<string>;
  onQuickView: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onNavigate,
  onGoBack,
  previousPage = 'catalog',
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  wishlistIds,
  onQuickView,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Order modal form state
  const [orderFormSubmitted, setOrderFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactNote, setContactNote] = useState('');

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Curate 3 distinct angle views for the product showcase
  const angleImages = [
    product.images?.[0] || faucetAureliaImg,
    product.images?.[1] || featuredFaucetImg,
    ourDesignFaucetImg || faucetAureliaImg,
  ];
  const activeImage = angleImages[activeImageIdx] || angleImages[0];

  const handlePrevAngle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIdx((prev) => (prev === 0 ? angleImages.length - 1 : prev - 1));
  };

  const handleNextAngle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIdx((prev) => (prev === angleImages.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      handleNextAngle();
    } else if (diff < -40) {
      handlePrevAngle();
    }
    setTouchStartX(null);
  };

  // Curated customer reviews
  const customerReviews = [
    {
      author: 'Afrin',
      rating: 5,
      comment:
        'Exceptional build quality! Heavy solid brass feel and the water stream is whisper-quiet. Looks like a European luxury fixture in our master bathroom.',
    },
    {
      author: 'Arjun S.',
      rating: 5,
      comment:
        'The mirror chrome finish is top tier. Zero water spots even after months of hard water usage. Camzon delivery was swift.',
    },
    {
      author: 'Meera Nair',
      rating: 5,
      comment:
        'Our interior designer suggested Camzon Aurelia. The precision machining on the base and the smooth single-lever action exceeded all expectations.',
    },
  ];

  // Related products (4 items)
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderFormSubmitted(true);
    setTimeout(() => {
      setOrderFormSubmitted(false);
      setIsOrderModalOpen(false);
      setContactName('');
      setContactPhone('');
      setContactNote('');
    }, 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Camzon! I would like to order the ${product.title} priced at ₹${product.price.toLocaleString('en-IN')}. Please share delivery timeframe to my address.`
  );

  return (
    <div
      id="product-detail-page"
      className="min-h-screen bg-[#0d0e12] text-stone-200 pb-20 selection:bg-[#f26a1b] selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* ========================================================================= */}
        {/* 0. TOP NAVIGATION & BACK BAR */}
        {/* ========================================================================= */}
        <div
          id="product-detail-nav-bar"
          className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-stone-800/80"
        >
          {/* Back Button with Left Arrow */}
          <div className="flex items-center gap-3">
            <button
              id="product-back-btn"
              onClick={() => {
                if (onGoBack) {
                  onGoBack();
                } else {
                  onNavigate(previousPage || 'catalog', product.category);
                }
              }}
              className="inline-flex items-center gap-2 bg-[#17181f] hover:bg-[#20222a] border border-stone-800 hover:border-stone-700 text-stone-200 hover:text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer shadow-sm group active:scale-95"
              aria-label="Back to Previous Page"
            >
              <ArrowLeft className="w-4 h-4 text-[#f26a1b] transition-transform group-hover:-translate-x-1" />
              <span>{previousPage === 'home' ? 'Back to Home' : 'Back to Catalog'}</span>
            </button>

            <button
              id="product-view-all-cat-btn"
              onClick={() => onNavigate('catalog', product.category)}
              className="hidden sm:inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-xs font-normal transition-colors py-2 px-3 rounded-full hover:bg-white/5 cursor-pointer"
            >
              <span>View all in {product.category}</span>
            </button>
          </div>

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
              onClick={() => onNavigate('catalog')}
              className="hover:text-white transition-colors cursor-pointer"
              title="Go to Full Catalog"
            >
              Catalog
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />
            <button
              onClick={() => onNavigate('catalog', product.category)}
              className="text-stone-300 hover:text-[#f26a1b] transition-colors cursor-pointer capitalize font-medium"
              title={`View ${product.category} collection`}
            >
              {product.category}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />
            <span className="text-[#f26a1b] font-medium truncate max-w-[130px] sm:max-w-[220px]">
              {product.title}
            </span>
          </nav>
        </div>

        {/* ========================================================================= */}
        {/* 1. TOP PRODUCT SECTION (2-COLUMN GRID matching image.png) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Studio Showcase + Rating & Reviews */}
          {/* ========================================================================= */}
          <div className="space-y-6 sm:space-y-8">
            {/* Dark Studio Image Container matching image.png */}
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#131418] border border-stone-800/90 overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[480px] sm:min-h-[540px]">
              {/* Top center pill bar indicator matching image.png */}
              <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 w-16 h-1 bg-stone-600/40 rounded-full z-10" />

              {/* Product Image Stage */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative w-full h-full flex items-center justify-center p-8 sm:p-12 cursor-pointer select-none"
              >
                {/* Radial Lighting behind product */}
                <div className="absolute inset-0 bg-radial from-[#222530]/25 via-transparent to-transparent pointer-events-none" />

                {/* Primary High-Resolution Product Image */}
                <img
                  src={activeImage}
                  alt={product.title}
                  className="w-full h-auto max-h-[440px] sm:max-h-[480px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom 3 Dots Indicator matching image.png */}
              <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {angleImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      activeImageIdx === idx
                        ? 'w-2.5 bg-[#f26a1b]'
                        : 'w-2.5 bg-[#dadbe0] opacity-75 hover:opacity-100'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Rating and Reviews Section matching image.png */}
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-stone-200 mb-4 tracking-wide">
                Rating and reviews
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                {/* Large 4.5 /5 Score Block */}
                <div className="flex-shrink-0">
                  <div className="text-6xl sm:text-7xl font-bold text-white tracking-tight leading-none flex items-baseline">
                    4.5
                    <span className="text-2xl sm:text-3xl text-stone-400 font-light ml-0.5">/5</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-stone-400 font-semibold tracking-wider mt-2">
                    (150 REVIEWS)
                  </div>
                </div>

                {/* 5 Rating Distribution Bars matching image.png */}
                <div className="flex-1 space-y-2 max-w-xs sm:max-w-sm">
                  {/* Star 5 Bar (heavy orange fill) */}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 w-6 text-[#f26a1b] font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#f26a1b] text-[#f26a1b]" />
                      <span>5</span>
                    </div>
                    <div className="flex-1 h-1.5 bg-[#22242a] rounded-full overflow-hidden">
                      <div className="w-[82%] h-full bg-[#f26a1b] rounded-full" />
                    </div>
                  </div>

                  {/* Star 4 Bar (shorter orange fill) */}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 w-6 text-[#f26a1b] font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#f26a1b] text-[#f26a1b]" />
                      <span>4</span>
                    </div>
                    <div className="flex-1 h-1.5 bg-[#22242a] rounded-full overflow-hidden">
                      <div className="w-[14%] h-full bg-[#f26a1b] rounded-full" />
                    </div>
                  </div>

                  {/* Star 3 Bar */}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 w-6 text-[#f26a1b] font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#f26a1b] text-[#f26a1b]" />
                      <span>3</span>
                    </div>
                    <div className="flex-1 h-1.5 bg-[#22242a] rounded-full overflow-hidden">
                      <div className="w-[0%] h-full bg-[#f26a1b] rounded-full" />
                    </div>
                  </div>

                  {/* Star 2 Bar */}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 w-6 text-[#f26a1b] font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#f26a1b] text-[#f26a1b]" />
                      <span>2</span>
                    </div>
                    <div className="flex-1 h-1.5 bg-[#22242a] rounded-full overflow-hidden">
                      <div className="w-[0%] h-full bg-[#f26a1b] rounded-full" />
                    </div>
                  </div>

                  {/* Star 1 Bar */}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 w-6 text-[#f26a1b] font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#f26a1b] text-[#f26a1b]" />
                      <span>1</span>
                    </div>
                    <div className="flex-1 h-1.5 bg-[#22242a] rounded-full overflow-hidden">
                      <div className="w-[0%] h-full bg-[#f26a1b] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Category + Title + Price + Contact Button + 3 Cards */}
          {/* ========================================================================= */}
          <div className="space-y-4">
            {/* Category Pill matching image.png */}
            <div>
              <span className="inline-block bg-[#202228] text-stone-300 text-xs font-medium px-4 py-1 rounded-full border border-stone-800/80">
                {product.category || 'Faucets'}
              </span>
            </div>

            {/* Product Title matching image.png */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                {product.title === 'CAMZON AURELIA' ? 'Camzon Aurelia' : product.title}
              </h1>
            </div>

            {/* Price matching image.png */}
            <div className="text-2xl sm:text-3xl font-bold text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            {/* Primary Orange Button: "Contact to order now!" matching image.png */}
            <div className="pt-1">
              <button
                id="contact-order-btn"
                onClick={() => setIsOrderModalOpen(true)}
                className="w-full bg-[#f26a1b] hover:bg-[#d9560f] text-stone-950 font-bold text-base sm:text-lg py-3.5 px-6 rounded-xl shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.99] text-center"
              >
                Contact to order now!
              </button>
            </div>

            {/* ===================================================================== */}
            {/* CARD 1: Description Card matching image.png */}
            {/* ===================================================================== */}
            <div className="bg-[#dadbe0] rounded-2xl p-5 sm:p-6 text-stone-900 shadow-md">
              <h3 className="text-sm font-bold text-stone-900 mb-2">
                Description
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-800 leading-relaxed font-normal">
                {product.description ||
                  'Designed with contemporary aesthetics in mind, LUMEN delivers exceptional functionality through precision-engineering and timeless styling. Its clean lines and premium craftsmanship make it an ideal choice for homeowners seeking both beauty and reliability in their bathroom fixtures.'}
              </p>
            </div>

            {/* ===================================================================== */}
            {/* CARD 2: Product Details Card matching image.png */}
            {/* ===================================================================== */}
            <div className="bg-[#dadbe0] rounded-2xl p-5 sm:p-6 text-stone-900 shadow-md">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                <div>
                  <span className="text-stone-500 font-medium block text-[10px] uppercase">Material</span>
                  <span className="font-semibold text-stone-900">{product.specs?.materials || 'Solid CW617N Brass'}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block text-[10px] uppercase">Finish</span>
                  <span className="font-semibold text-stone-900">{product.specs?.finish || 'PVD Mirror Chrome'}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block text-[10px] uppercase">Dimensions</span>
                  <span className="font-semibold text-stone-900">{product.specs?.dimensions || '185mm H × 140mm Spout'}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block text-[10px] uppercase">Weight</span>
                  <span className="font-semibold text-stone-900">{product.specs?.weight || '1.85 kg'}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block text-[10px] uppercase">Assembly</span>
                  <span className="font-semibold text-stone-900">{product.specs?.assembly || 'Single Hole Deck Mount'}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block text-[10px] uppercase">Origin</span>
                  <span className="font-semibold text-stone-900">{product.specs?.origin || 'Karamana, Trivandrum'}</span>
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* CARD 3: Review Card matching image.png */}
            {/* ===================================================================== */}
            <div className="bg-[#dadbe0] rounded-2xl p-5 sm:p-6 text-stone-900 shadow-md min-h-[135px] flex flex-col justify-between">
              <div>
                <div className="text-sm font-bold text-stone-900">
                  {customerReviews[0].author}
                </div>
                <div className="flex items-center gap-1 text-[#f26a1b] my-2">
                  {[...Array(customerReviews[0].rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#f26a1b] text-[#f26a1b]" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 leading-snug">
                  "{customerReviews[0].comment}"
                </p>
              </div>

              {/* Bottom slider pill line matching image.png */}
              <div className="w-full flex justify-center pt-3">
                <div className="w-12 h-1 bg-stone-500/60 rounded-full" />
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. "YOU MIGHT ALSO LIKE" SECTION matching image.png */}
        {/* ========================================================================= */}
        <div className="mt-20 sm:mt-28 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10 tracking-tight">
            You might also like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <ProductCard
                  product={relProduct}
                  cleanCard={true}
                  onSelectProduct={(p) => {
                    onSelectProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistIds.has(relProduct.id)}
                  onQuickView={onQuickView}
                />
              </div>
            ))}
          </div>

          {/* Bottom Navigation Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-stone-800/80">
            <button
              onClick={() => {
                if (onGoBack) onGoBack();
                else onNavigate(previousPage || 'catalog', product.category);
              }}
              className="inline-flex items-center gap-2 bg-[#17181f] hover:bg-[#20222a] border border-stone-800 hover:border-stone-700 text-stone-200 hover:text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer shadow-sm group active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-[#f26a1b] transition-transform group-hover:-translate-x-1" />
              <span>Back to {previousPage === 'home' ? 'Home' : 'Catalog'}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('catalog')}
                className="inline-flex items-center gap-1.5 bg-[#f26a1b] hover:bg-[#d9560f] text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Browse Full Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
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

      {/* ========================================================================= */}
      {/* 3. FULLSCREEN LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-stone-300 hover:text-white bg-stone-800/80 p-2.5 rounded-full cursor-pointer transition-colors z-50"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl w-full flex flex-col items-center justify-center">
            {/* Left & Right Lightbox Arrows */}
            <button
              onClick={handlePrevAngle}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center transition-all cursor-pointer z-50 border border-stone-700 shadow-xl"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextAngle}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center transition-all cursor-pointer z-50 border border-stone-700 shadow-xl"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img
              src={activeImage}
              alt={product.title}
              className="max-h-[75vh] w-auto object-contain drop-shadow-2xl select-none"
            />
            <div className="text-center mt-4">
              <h4 className="text-white text-lg font-bold">{product.title}</h4>
              <div className="flex items-center justify-center gap-2 mt-3">
                {angleImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`h-2.5 rounded-full cursor-pointer transition-all ${
                      activeImageIdx === idx
                        ? 'w-7 bg-[#f26a1b]'
                        : 'w-2.5 bg-stone-700 hover:bg-stone-500'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. CONTACT TO ORDER MODAL */}
      {/* ========================================================================= */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#181a20] border border-stone-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-[#121316] px-6 py-4 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f26a1b]" />
                <h3 className="text-base font-bold text-white">Order Inquiry • {product.title}</h3>
              </div>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Product mini summary */}
              <div className="flex items-center gap-4 p-3 bg-[#121316] rounded-2xl border border-stone-800/80">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="w-14 h-14 object-contain rounded-lg bg-stone-900"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{product.title}</h4>
                  <p className="text-xs text-stone-400">
                    {product.category}
                  </p>
                  <span className="text-sm font-bold text-[#f26a1b]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp Order Option */}
              <a
                href={`https://wa.me/919847012345?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-stone-950" />
                <span>Instant Order via WhatsApp (+91 98470 12345)</span>
              </a>

              {/* Call Direct Option */}
              <a
                href="tel:+919847012345"
                className="w-full bg-[#202227] hover:bg-[#282a30] text-stone-200 hover:text-white border border-stone-700 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#f26a1b]" />
                <span>Call Showroom directly: +91 98470 12345</span>
              </a>

              {/* Form Divider */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-stone-800 w-full" />
                <span className="bg-[#181a20] px-3 text-[11px] text-stone-500 uppercase tracking-wider">
                  or submit quick request
                </span>
              </div>

              {/* Quick Callback Form */}
              {orderFormSubmitted ? (
                <div className="bg-emerald-950/40 border border-emerald-600/50 rounded-2xl p-5 text-center text-emerald-300">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="font-bold text-sm">Request Submitted!</p>
                  <p className="text-xs text-emerald-400/80 mt-1">
                    Our sales advisor will contact you within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Afrin"
                      className="w-full bg-[#121316] border border-stone-700 text-white text-xs rounded-xl px-3.5 py-2.5 focus:border-[#f26a1b] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98470 XXXXX"
                      className="w-full bg-[#121316] border border-stone-700 text-white text-xs rounded-xl px-3.5 py-2.5 focus:border-[#f26a1b] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                      Delivery Location / Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={contactNote}
                      onChange={(e) => setContactNote(e.target.value)}
                      placeholder="Karamana, Trivandrum..."
                      className="w-full bg-[#121316] border border-stone-700 text-white text-xs rounded-xl px-3.5 py-2.5 focus:border-[#f26a1b] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#f26a1b] hover:bg-[#d9560f] text-stone-950 font-bold py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Order Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
