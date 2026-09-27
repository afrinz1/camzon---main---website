import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Star, MapPin, Phone, Mail, CheckCircle2, Sparkles, Plus, X, Layers } from 'lucide-react';
import { Product, ActivePage } from '../types';

import featuredFaucetImg from '../assets/images/featured_faucet_1789786590956.jpg';
import featuredShowerImg from '../assets/images/featured_shower_1789786603276.jpg';
import featuredBasinImg from '../assets/images/featured_basin_1789786616649.jpg';
import whyFaucetImg from '../assets/images/why_faucet_water_1789786545913.jpg';
import whyShowerImg from '../assets/images/why_rain_shower_1789786560763.jpg';
import whyHandShowerImg from '../assets/images/why_hand_shower_1789786577272.jpg';
import ourApproachImg from '../assets/images/our_approach_faucets_1789787881068.jpg';
import ourTechImg from '../assets/images/our_tech_valve_1789788320984.jpg';
import ourStoryImg from '../assets/images/our_story_interior_1789788334757.jpg';
import ourDesignImg from '../assets/images/our_design_faucet_1789788346067.jpg';
import camzonHeroBg from '../assets/images/camzon_hero_bg_1789864474967.jpg';

interface HomePageProps {
  products: Product[];
  onNavigate: (page: ActivePage, category?: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, selectedColorHex?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onNavigate,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}) => {
  // Testimonial Carousel State
  const testimonials = [
    {
      quote:
        'CAMZON transformed our bathroom into a space that feels both luxurious and practical. The quality and finish are exceptional.',
      author: 'Afrin',
      role: 'creative director',
      rating: 5,
    },
    {
      quote:
        'The water flow from the HydroFlow shower is unmatched. Even with our apartment water pressure, it feels like an upscale five-star spa sanctuary.',
      author: 'Rohan Mehta',
      role: 'architectural designer',
      rating: 5,
    },
    {
      quote:
        'Finding solid brass faucets with such pure minimalist contours at an honest price point is rare. CAMZON is our default recommendation for residential projects.',
      author: 'Kavita Nair',
      role: 'interior stylist',
      rating: 5,
    },
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Find sample products for the 9 collections
  const dartProduct = products.find((p) => p.category === 'DART') || products[0];
  const showersProduct = products.find((p) => p.category === 'SHOWERS') || products[1];
  const quadraProduct = products.find((p) => p.category === 'QUADRA') || products[2];
  const ridgeProduct = products.find((p) => p.category === 'RIDGE') || products[3];

  // Architectural showcase box hover/active state
  const [hoveredArchBox, setHoveredArchBox] = useState<number | null>(null);

  // Carousel ref and scroll handler for Featured Products
  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const [isDraggingFeatured, setIsDraggingFeatured] = useState(false);
  const isFeaturedMouseDownRef = useRef(false);
  const featuredStartXRef = useRef(0);
  const featuredScrollLeftStartRef = useRef(0);
  const featuredHasDraggedRef = useRef(false);

  const handleFeaturedMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!featuredScrollRef.current) return;
    isFeaturedMouseDownRef.current = true;
    featuredHasDraggedRef.current = false;
    featuredStartXRef.current = e.pageX - featuredScrollRef.current.offsetLeft;
    featuredScrollLeftStartRef.current = featuredScrollRef.current.scrollLeft;
    setIsDraggingFeatured(true);
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isFeaturedMouseDownRef.current || !featuredScrollRef.current) return;
      const x = e.pageX - featuredScrollRef.current.offsetLeft;
      const walk = x - featuredStartXRef.current;
      if (Math.abs(walk) > 5) {
        featuredHasDraggedRef.current = true;
      }
      featuredScrollRef.current.scrollLeft = featuredScrollLeftStartRef.current - walk;
    };

    const handleWindowMouseUp = () => {
      if (isFeaturedMouseDownRef.current) {
        isFeaturedMouseDownRef.current = false;
        setIsDraggingFeatured(false);
        setTimeout(() => {
          featuredHasDraggedRef.current = false;
        }, 80);
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, []);

  const scrollFeaturedNext = () => {
    if (featuredScrollRef.current) {
      const card = featuredScrollRef.current.firstElementChild as HTMLElement | null;
      const scrollStep = card ? card.offsetWidth + 16 : featuredScrollRef.current.clientWidth * 0.46;
      const maxScroll = featuredScrollRef.current.scrollWidth - featuredScrollRef.current.clientWidth;
      if (featuredScrollRef.current.scrollLeft >= maxScroll - 20) {
        featuredScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        featuredScrollRef.current.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }
  };

  const scrollFeaturedPrev = () => {
    if (featuredScrollRef.current) {
      const card = featuredScrollRef.current.firstElementChild as HTMLElement | null;
      const scrollStep = card ? card.offsetWidth + 16 : featuredScrollRef.current.clientWidth * 0.46;
      if (featuredScrollRef.current.scrollLeft <= 20) {
        featuredScrollRef.current.scrollTo({
          left: featuredScrollRef.current.scrollWidth,
          behavior: 'smooth',
        });
      } else {
        featuredScrollRef.current.scrollBy({
          left: -scrollStep,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div id="camzon-home-page" className="min-h-screen bg-[#0a0a0c] text-stone-100 selection:bg-[#f26a1b] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Matching image.png with proper space & luxury layout) */}
      {/* ========================================================================= */}
      <section
        id="camzon-hero-section"
        className="relative min-h-[100vh] flex flex-col justify-between overflow-hidden bg-cover bg-center -mt-20 pt-28 pb-10 sm:pb-14"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,10,12,0.45) 0%, rgba(10,10,12,0.2) 30%, rgba(10,10,12,0.55) 70%, #0a0a0c 100%), url(${camzonHeroBg})`,
        }}
      >
        {/* Subtle ambient lighting vignette overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 flex flex-col justify-between flex-1 pt-12 sm:pt-16 pb-8 sm:pb-12">
          {/* ========================================================================= */}
          {/* MIDDLE SECTION: Left Stats + Main Title & Actions + Right Stats (Airy & Balanced) */}
          {/* ========================================================================= */}
          <div className="my-auto py-10 sm:py-16">
            {/* Desktop 3-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-8">
              {/* LEFT COLUMN: 300+ Products / 20+ Category */}
              <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-6 select-none pl-2 xl:pl-4">
                <div>
                  <div className="text-3xl xl:text-4xl font-light text-white tracking-tight leading-none">
                    300 +
                  </div>
                  <div className="text-xs text-stone-400 font-normal mt-2 tracking-wide">
                    Products
                  </div>
                </div>

                <div className="w-16 xl:w-20 h-px bg-stone-700/80" />

                <div>
                  <div className="text-3xl xl:text-4xl font-light text-white tracking-tight leading-none">
                    20 +
                  </div>
                  <div className="text-xs text-stone-400 font-normal mt-2 tracking-wide">
                    Category
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: Main Headline & Actions (Smaller to Fit with Generous Breathing Space) */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 px-2 sm:px-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-normal text-white tracking-tight leading-[1.18] select-none max-w-xl mx-auto">
                  <span className="block">Crafted for Spaces</span>
                  <span className="font-serif-display italic font-normal text-[#f26a1b] tracking-wide inline-flex items-center mt-1 text-[32px]">
                    That Deserve More.
                  </span>
                </h1>

                {/* Call to Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    id="hero-explore-btn"
                    onClick={() => onNavigate('catalog')}
                    className="bg-[#f26a1b] hover:bg-[#d9560f] text-white font-medium px-7 py-2.5 rounded-full text-xs sm:text-sm transition-all duration-200 shadow-xl shadow-orange-950/40 flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Explore</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    id="hero-connect-btn"
                    onClick={() => {
                      const el = document.getElementById('contact-touch-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white hover:bg-stone-100 text-stone-950 font-medium px-7 py-2.5 rounded-full text-xs sm:text-sm transition-all duration-200 shadow-xl flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Connect with us.</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: 1000+ Transformations / 25+ Dealers */}
              <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-6 select-none lg:pl-10 xl:pl-16">
                <div>
                  <div className="text-3xl xl:text-4xl font-light text-white tracking-tight leading-none">
                    1000 +
                  </div>
                  <div className="text-xs text-stone-400 font-normal mt-2 tracking-wide">
                    Transformations
                  </div>
                </div>

                <div className="w-16 xl:w-20 h-px bg-stone-700/80" />

                <div>
                  <div className="text-3xl xl:text-4xl font-light text-white tracking-tight leading-none">
                    25 +
                  </div>
                  <div className="text-xs text-stone-400 font-normal mt-2 tracking-wide">
                    Dealers
                  </div>
                </div>
              </div>

              {/* Mobile/Tablet Fallback Stats Grid (visible only on < lg screens) */}
              <div className="lg:hidden grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 select-none text-center">
                <div className="p-3 bg-stone-900/40 rounded-xl border border-stone-800/60">
                  <div className="text-2xl font-light text-white">300 +</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Products</div>
                </div>
                <div className="p-3 bg-stone-900/40 rounded-xl border border-stone-800/60">
                  <div className="text-2xl font-light text-white">20 +</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Category</div>
                </div>
                <div className="p-3 bg-stone-900/40 rounded-xl border border-stone-800/60">
                  <div className="text-2xl font-light text-white">1000 +</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Transformations</div>
                </div>
                <div className="p-3 bg-stone-900/40 rounded-xl border border-stone-800/60">
                  <div className="text-2xl font-light text-white">25 +</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Dealers</div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* C. BOTTOM RIGHT PARAGRAPH with Proper Space */}
          {/* ========================================================================= */}
          <div className="pt-6 pb-2 w-full flex justify-end">
            <p className="text-xs sm:text-[13px] text-stone-300/90 font-light leading-relaxed text-left lg:text-right max-w-sm sm:max-w-md select-none">
              Discover quality faucets, sanitaryware, shower systems, and bath solutions crafted for{' '}
              <span className="text-[#f26a1b] font-normal">modern Indian homes</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MARQUEE TICKER (The 9 Collections: DART, DECK, DUERO, DUNE, FACET, KORE, QUADRA, RIDGE, SHOWERS) */}
      {/* ========================================================================= */}
      <div id="camzon-marquee-ticker" className="bg-[#0b0c0f] border-y border-stone-800/80 py-2.5 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...Array(4)].map((_, setIdx) => (
            <div key={setIdx} className="inline-flex items-center space-x-6 sm:space-x-8 mx-3 sm:mx-4 shrink-0">
              {[
                { label: 'DART', category: 'DART' },
                { label: 'DECK', category: 'DECK' },
                { label: 'DUERO', category: 'DUERO' },
                { label: 'DUNE', category: 'DUNE' },
                { label: 'FACET', category: 'FACET' },
                { label: 'KORE', category: 'KORE' },
                { label: 'QUADRA', category: 'QUADRA' },
                { label: 'RIDGE', category: 'RIDGE' },
                { label: 'SHOWERS', category: 'SHOWERS' },
              ].map((item, itemIdx) => (
                <React.Fragment key={`${setIdx}-${itemIdx}`}>
                  <button
                    onClick={() => onNavigate('catalog', item.category)}
                    className={`text-xs sm:text-[13px] font-semibold tracking-wider transition-colors cursor-pointer uppercase flex items-center ${
                      itemIdx % 2 === 0
                        ? 'text-white hover:text-[#f26a1b]'
                        : 'text-[#f26a1b] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f26a1b] shrink-0" />
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FEATURED PRODUCTS SECTION */}
      {/* ========================================================================= */}
      <section id="featured-products-section" className="py-14 sm:py-18 lg:py-22 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="mb-6 sm:mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Featured Products.
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Curated collections crafted for durability, comfort, and architectural elegance.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollFeaturedPrev}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-700/80 bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              title="Previous collection"
              aria-label="Previous collection"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={scrollFeaturedNext}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-700/80 bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              title="Next collection"
              aria-label="Next collection"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll / Carousel Track for Featured Products */}
        <div
          ref={featuredScrollRef}
          onMouseDown={handleFeaturedMouseDown}
          onClickCapture={(e) => {
            if (featuredHasDraggedRef.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          className={`flex gap-3 sm:gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 cursor-grab active:cursor-grabbing select-none ${
            isDraggingFeatured ? 'scroll-auto snap-none' : 'scroll-smooth snap-x snap-mandatory'
          }`}
        >
          {/* Card 1: DART. */}
          <div
            id="featured-card-dart"
            className="flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[440px] lg:w-[480px] snap-start border border-white/20 hover:border-white/40 rounded-[20px] overflow-hidden bg-black flex flex-col sm:flex-row min-h-[280px] sm:min-h-[290px] transition-all duration-300 shadow-xl"
          >
            {/* Left/Top Light Grey / Silver Panel */}
            <div className="w-full sm:w-[48%] bg-[#d8d9de] p-5 sm:p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-black tracking-tight mb-2 uppercase">
                  DART.
                </h3>
                <p className="text-stone-800 text-xs lg:text-[13px] font-normal leading-relaxed">
                  Aerodynamic forms. Dynamic precision flow. Discover DART fixtures designed to elevate every moment at the vanity.
                </p>
              </div>
              <div className="pt-4">
                <button
                  id="dart-discover-btn"
                  onClick={() => onNavigate('catalog', 'DART')}
                  className="bg-[#f26a1b] hover:bg-[#ea580c] text-white font-semibold text-xs px-4 py-2 rounded-full transition-all shadow-sm cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
                >
                  <span>Discover more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right/Bottom Product Image */}
            <div
              className="w-full sm:w-[52%] h-48 sm:h-auto min-h-[160px] relative bg-[#0b0c0e] overflow-hidden cursor-pointer group"
              onClick={() => onSelectProduct(dartProduct)}
            >
              <img
                src={featuredFaucetImg}
                alt="CAMZON DART Collection"
                referrerPolicy="no-referrer"
                draggable={false}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Card 2: SHOWERS. */}
          <div
            id="featured-card-showers"
            className="flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[440px] lg:w-[480px] snap-start border border-white/20 hover:border-white/40 rounded-[20px] overflow-hidden bg-black flex flex-col sm:flex-row min-h-[280px] sm:min-h-[290px] transition-all duration-300 shadow-xl"
          >
            {/* Left/Top Light Grey / Silver Panel */}
            <div className="w-full sm:w-[48%] bg-[#d8d9de] p-5 sm:p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-black tracking-tight mb-2 uppercase">
                  SHOWERS.
                </h3>
                <p className="text-stone-800 text-xs lg:text-[13px] font-normal leading-relaxed">
                  Thermostatic wellness suites engineered for the perfect harmony of water coverage, comfort, and contemporary relaxation.
                </p>
              </div>
              <div className="pt-4">
                <button
                  id="showers-discover-btn"
                  onClick={() => onNavigate('catalog', 'SHOWERS')}
                  className="bg-[#f26a1b] hover:bg-[#ea580c] text-white font-semibold text-xs px-4 py-2 rounded-full transition-all shadow-sm cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
                >
                  <span>Discover more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right/Bottom Product Image */}
            <div
              className="w-full sm:w-[52%] h-48 sm:h-auto min-h-[160px] relative bg-[#0b0c0e] overflow-hidden cursor-pointer group"
              onClick={() => onSelectProduct(showersProduct)}
            >
              <img
                src={featuredShowerImg}
                alt="CAMZON SHOWERS Collection"
                referrerPolicy="no-referrer"
                draggable={false}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Card 3: QUADRA. */}
          <div
            id="featured-card-quadra"
            className="flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[440px] lg:w-[480px] snap-start border border-white/20 hover:border-white/40 rounded-[20px] overflow-hidden bg-black flex flex-col sm:flex-row min-h-[280px] sm:min-h-[290px] transition-all duration-300 shadow-xl"
          >
            {/* Left/Top Light Grey / Silver Panel */}
            <div className="w-full sm:w-[48%] bg-[#d8d9de] p-5 sm:p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-black tracking-tight mb-2 uppercase">
                  QUADRA.
                </h3>
                <p className="text-stone-800 text-xs lg:text-[13px] font-normal leading-relaxed">
                  Bold 90-degree planar surfaces. Crisp right-angle silhouettes engineered for contemporary architectural homes.
                </p>
              </div>
              <div className="pt-4">
                <button
                  id="quadra-discover-btn"
                  onClick={() => onNavigate('catalog', 'QUADRA')}
                  className="bg-[#f26a1b] hover:bg-[#ea580c] text-white font-semibold text-xs px-4 py-2 rounded-full transition-all shadow-sm cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
                >
                  <span>Discover more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right/Bottom Product Image */}
            <div
              className="w-full sm:w-[52%] h-48 sm:h-auto min-h-[160px] relative bg-[#0b0c0e] overflow-hidden cursor-pointer group"
              onClick={() => onSelectProduct(quadraProduct)}
            >
              <img
                src={featuredBasinImg}
                alt="CAMZON QUADRA Collection"
                referrerPolicy="no-referrer"
                draggable={false}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Card 4: RIDGE. */}
          <div
            id="featured-card-ridge"
            className="flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[440px] lg:w-[480px] snap-start border border-white/20 hover:border-white/40 rounded-[20px] overflow-hidden bg-black flex flex-col sm:flex-row min-h-[280px] sm:min-h-[290px] transition-all duration-300 shadow-xl"
          >
            {/* Left/Top Light Grey / Silver Panel */}
            <div className="w-full sm:w-[48%] bg-[#d8d9de] p-5 sm:p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-black tracking-tight mb-2 uppercase">
                  RIDGE.
                </h3>
                <p className="text-stone-800 text-xs lg:text-[13px] font-normal leading-relaxed">
                  Linear fluted brass barrels and tactile knurled detailing machined with micro-precision CNC craftsmanship.
                </p>
              </div>
              <div className="pt-4">
                <button
                  id="ridge-discover-btn"
                  onClick={() => onNavigate('catalog', 'RIDGE')}
                  className="bg-[#f26a1b] hover:bg-[#ea580c] text-white font-semibold text-xs px-4 py-2 rounded-full transition-all shadow-sm cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
                >
                  <span>Discover more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right/Bottom Product Image */}
            <div
              className="w-full sm:w-[52%] h-48 sm:h-auto min-h-[160px] relative bg-[#0b0c0e] overflow-hidden cursor-pointer group"
              onClick={() => onSelectProduct(ridgeProduct)}
            >
              <img
                src={ourDesignImg}
                alt="CAMZON RIDGE Collection"
                referrerPolicy="no-referrer"
                draggable={false}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom exploration controls */}
        <div className="mt-6 flex items-center justify-between">
          {/* Left Arrow Button in Circle */}
          <button
            id="featured-arrow-left-btn"
            onClick={scrollFeaturedPrev}
            aria-label="Previous featured products"
            className="w-8 h-8 rounded-full border border-white/70 hover:border-white hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          {/* Centered Explore Archive Button */}
          <button
            id="explore-archive-btn"
            onClick={() => onNavigate('catalog')}
            className="bg-[#dadbe0] hover:bg-white text-stone-950 px-5 sm:px-7 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
          >
            Explore archive
          </button>

          {/* Right Arrow Button in Circle */}
          <button
            id="featured-arrow-right-btn"
            onClick={scrollFeaturedNext}
            aria-label="Next featured products"
            className="w-8 h-8 rounded-full border border-white/70 hover:border-white hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "Why camzon ?" SECTION (Redesigned to match image.png) */}
      {/* ========================================================================= */}
      <section id="why-camzon-section" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Centered Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-white tracking-tight text-center mb-8">
            Why camzon ?
          </h2>

          {/* Description Paragraph with exact styling from mockup */}
          <p className="text-stone-200 text-sm sm:text-base md:text-[17px] leading-relaxed font-light text-left sm:text-justify md:text-left mb-14 sm:mb-16">
            At CAMZON, we believe great design should be a part of{' '}
            <span className="text-[#f26a1b] font-normal">every home</span>. Our collection of bathware and sanitary solutions combines contemporary aesthetics, reliable engineering, and everyday practicality to create products that elevate daily living. Designed for{' '}
            <span className="inline-block bg-[#f26a1b] text-white px-3 py-0.5 rounded-full font-medium text-xs sm:text-sm mx-1 align-middle">
              modern families
            </span>{' '}
            and built for lasting durability, every CAMZON product reflects our commitment to quality without compromise{' '}
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#f26a1b] ml-1.5 align-middle">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />
            </span>
          </p>
        </div>

        {/* 3 Showcase Visual Feature Cards matching image.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
          {/* CARD 1: Luxury-Inspired Design (Chrome Faucet with water stream) */}
          <div
            id="why-card-1"
            className="relative h-[420px] sm:h-[460px] md:h-[480px] rounded-[28px] overflow-hidden bg-[#121316] border border-stone-800/80 group flex flex-col justify-end p-6"
          >
            <img
              src={whyFaucetImg}
              alt="Luxury-Inspired Design"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
            {/* Dark bottom gradient to ensure text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10 text-right mt-auto pr-1 select-none">
              <div className="text-white text-xs sm:text-sm font-normal leading-tight">
                Luxury-Inspired
              </div>
              <div className="text-white text-xs sm:text-sm font-normal leading-tight">
                Design.
              </div>
            </div>
          </div>

          {/* CARD 2: Luxury Within Reach header + Rainfall shower card + Premium Quality, Honest Value */}
          <div
            id="why-card-2"
            className="flex flex-col justify-between h-[420px] sm:h-[460px] md:h-[480px]"
          >
            {/* Top Orange Pill Header */}
            <div className="bg-[#f26a1b] text-stone-950 font-bold text-sm sm:text-base py-3 px-6 rounded-2xl text-center shadow-lg w-full select-none">
              Luxury Within Reach.
            </div>

            {/* Rainfall Shower Container */}
            <div className="relative flex-1 my-3 rounded-[28px] overflow-hidden bg-[#121316] border border-stone-800/80 group">
              <img
                src={whyShowerImg}
                alt="Premium Quality, Honest Value"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
            </div>

            {/* Bottom Centered Subtitle */}
            <div className="text-center pt-1 pb-1 select-none">
              <div className="text-stone-200 text-xs sm:text-sm font-medium">
                Premium Quality, Honest Value
              </div>
            </div>
          </div>

          {/* CARD 3: Built for Everyday Elegance (Hand shower with top-right orange circle accent) */}
          <div
            id="why-card-3"
            className="relative h-[420px] sm:h-[460px] md:h-[480px]"
          >
            {/* Top-Right Orange Decorative Circle emerging from behind card */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f26a1b] z-0 pointer-events-none drop-shadow-[0_0_12px_rgba(242,106,27,0.4)]" />

            {/* Main Rounded Card */}
            <div className="relative z-10 w-full h-full rounded-[28px] overflow-hidden bg-[#121316] border border-stone-800/80 group flex flex-col justify-end p-6">
              <img
                src={whyHandShowerImg}
                alt="Built for Everyday Elegance"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              {/* Dark bottom gradient to ensure text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              <div className="relative z-10 text-left mt-auto pl-1 select-none">
                <div className="text-white text-xs sm:text-sm font-normal leading-tight">
                  Built for Everyday
                </div>
                <div className="text-white text-xs sm:text-sm font-normal leading-tight">
                  Elegance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 4-COLUMN ARCHITECTURAL SHOWCASE (OUR APPROACH / TECHNOLOGY / STORY / DESIGN) */}
      {/* ========================================================================= */}
      <section id="approach-technology-story-section" className="border-t border-stone-800 bg-[#0a0a0c] relative overflow-hidden">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row min-h-[560px] lg:min-h-[640px] w-full">
          {/* ===================== COL 1: OUR APPROACH. ===================== */}
          <div
            id="column-our-approach"
            onMouseEnter={() => setHoveredArchBox(0)}
            onMouseLeave={() => setHoveredArchBox(null)}
            onClick={() => setHoveredArchBox(hoveredArchBox === 0 ? null : 0)}
            className={`relative border-b md:border-b-0 md:border-r border-stone-800/80 flex flex-col justify-between p-7 sm:p-8 overflow-hidden group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              hoveredArchBox === 0
                ? 'lg:flex-[1.45] shadow-2xl'
                : hoveredArchBox !== null
                ? 'lg:flex-[0.85] opacity-90'
                : 'lg:flex-1'
            }`}
          >
            {/* Resting Background Photo */}
            <img
              src={ourApproachImg}
              alt="CAMZON Water Flow"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" />

            {/* Resting Top Header */}
            <div className="relative z-10 flex items-center justify-end w-full">
              <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 group-hover:border-[#f26a1b] group-hover:text-[#f26a1b] transition-colors">
                <Plus className={`w-4 h-4 transition-transform duration-300 ${hoveredArchBox === 0 ? 'rotate-45' : 'group-hover:rotate-90'}`} />
              </div>
            </div>

            {/* Resting Bottom Title */}
            <div className="relative z-10 pt-24">
              <div className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black tracking-tight leading-[0.92] uppercase text-[#f26a1b] select-none group-hover:drop-shadow-[0_4px_16px_rgba(242,106,27,0.35)] transition-all">
                OUR<br />APPROACH.
              </div>
            </div>

            {/* Hover State: Photographic backdrop + precise typography */}
            <AnimatePresence>
              {hoveredArchBox === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-20 overflow-hidden flex flex-col justify-between p-7 sm:p-8 text-white"
                >
                  <img
                    src={ourApproachImg}
                    alt="Our Approach"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35 pointer-events-none" />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHoveredArchBox(null);
                      }}
                      className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
                      title="Close details"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="relative z-10 my-auto py-4">
                    <motion.h4
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-2"
                    >
                      Silent Flow. Tactile Touch.
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.14 }}
                      className="text-stone-200 text-xs sm:text-sm font-normal leading-relaxed max-w-xs"
                    >
                      Geometric purity paired with silent, anti-splash laminar water streams engineered for daily well-being.
                    </motion.p>
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 pt-2">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('catalog');
                      }}
                      className="w-full bg-[#f26a1b] hover:bg-[#ea580c] text-white py-2.5 px-4 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 mb-3.5 cursor-pointer shadow-lg shadow-[#f26a1b]/25"
                    >
                      <span>Explore products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                    <div className="text-lg sm:text-xl font-black tracking-tight leading-[0.9] text-[#f26a1b] uppercase">
                      OUR<br />APPROACH.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ===================== COL 2: OUR TECHNOLOGY. ===================== */}
          <div
            id="column-our-technology"
            onMouseEnter={() => setHoveredArchBox(1)}
            onMouseLeave={() => setHoveredArchBox(null)}
            onClick={() => setHoveredArchBox(hoveredArchBox === 1 ? null : 1)}
            className={`relative border-b md:border-b-0 md:border-r border-stone-400/40 bg-[#d8d9de] flex flex-col justify-between p-7 sm:p-8 overflow-hidden group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              hoveredArchBox === 1
                ? 'lg:flex-[1.45] shadow-2xl'
                : hoveredArchBox !== null
                ? 'lg:flex-[0.85] opacity-90'
                : 'lg:flex-1'
            }`}
          >
            {/* Resting Top Text */}
            <div className="relative z-10 flex items-start justify-between w-full">
              <div className="text-xs sm:text-sm font-bold text-black tracking-tight leading-snug">
                Pure Form.<br />
                Perfect Function.
              </div>
              <div className="w-8 h-8 rounded-full bg-black/5 border border-black/15 flex items-center justify-center text-black/70 group-hover:bg-[#f26a1b] group-hover:border-[#f26a1b] group-hover:text-white transition-all shrink-0 ml-2">
                <Plus className={`w-4 h-4 transition-transform duration-300 ${hoveredArchBox === 1 ? 'rotate-45' : 'group-hover:rotate-90'}`} />
              </div>
            </div>

            {/* Resting Bottom Title */}
            <div className="relative z-10 pt-24">
              <div className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black tracking-tight leading-[0.92] uppercase text-black select-none group-hover:translate-x-1 transition-transform">
                OUR<br />TECHNOLOGY.
              </div>
            </div>

            {/* Hover State: Precision Valve Image Backdrop */}
            <AnimatePresence>
              {hoveredArchBox === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-20 overflow-hidden flex flex-col justify-between p-7 sm:p-8 text-white"
                >
                  <img
                    src={ourTechImg}
                    alt="Precision Valve Engineering"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/40 pointer-events-none" />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHoveredArchBox(null);
                      }}
                      className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
                      title="Close details"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="relative z-10 my-auto py-4">
                    <motion.h4
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-2"
                    >
                      500,000 Cycles. Zero Leaks.
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.14 }}
                      className="text-stone-200 text-xs sm:text-sm font-normal leading-relaxed max-w-xs"
                    >
                      Diamond-hard ceramic disc cartridges tested for 15+ years of fluid, dripless operation.
                    </motion.p>
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 pt-2">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('catalog');
                      }}
                      className="w-full bg-[#f26a1b] hover:bg-[#ea580c] text-white py-2.5 px-4 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 mb-3.5 cursor-pointer shadow-lg shadow-[#f26a1b]/25"
                    >
                      <span>Technical specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                    <div className="text-lg sm:text-xl font-black tracking-tight leading-[0.9] text-white uppercase">
                      OUR<br />TECHNOLOGY.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ===================== COL 3: OUR STORY. ===================== */}
          <div
            id="column-our-story"
            onMouseEnter={() => setHoveredArchBox(2)}
            onMouseLeave={() => setHoveredArchBox(null)}
            onClick={() => setHoveredArchBox(hoveredArchBox === 2 ? null : 2)}
            className={`relative border-b md:border-b-0 md:border-r border-stone-400/40 bg-[#d8d9de] flex flex-col justify-between p-7 sm:p-8 overflow-hidden group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              hoveredArchBox === 2
                ? 'lg:flex-[1.45] shadow-2xl'
                : hoveredArchBox !== null
                ? 'lg:flex-[0.85] opacity-90'
                : 'lg:flex-1'
            }`}
          >
            {/* Resting Top Header & Button */}
            <div className="relative z-10">
              <div className="flex items-start justify-between w-full mb-3">
                <h4 className="text-base sm:text-lg lg:text-xl font-black text-black uppercase tracking-tight leading-snug">
                  EVERY HOME NEEDS<br />
                  LUXURY WITHIN REACH!
                </h4>
                <div className="w-8 h-8 rounded-full bg-black/5 border border-black/15 flex items-center justify-center text-black/70 group-hover:bg-[#f26a1b] group-hover:border-[#f26a1b] group-hover:text-white transition-all shrink-0 ml-2">
                  <Plus className={`w-4 h-4 transition-transform duration-300 ${hoveredArchBox === 2 ? 'rotate-45' : 'group-hover:rotate-90'}`} />
                </div>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('catalog');
                  }}
                  className="bg-[#f26a1b] hover:bg-[#ea580c] text-stone-950 font-semibold px-5 py-1.5 rounded-full text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Explore archive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Resting Bottom Title */}
            <div className="relative z-10 pt-16">
              <div className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black tracking-tight leading-[0.92] uppercase text-black select-none group-hover:translate-x-1 transition-transform">
                OUR<br />STORY.
              </div>
            </div>

            {/* Hover State: Warm Travertine Interior Backdrop */}
            <AnimatePresence>
              {hoveredArchBox === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-20 overflow-hidden flex flex-col justify-between p-7 sm:p-8 text-white"
                >
                  <img
                    src={ourStoryImg}
                    alt="Luxury Bath Sanctuary"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/40 pointer-events-none" />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHoveredArchBox(null);
                      }}
                      className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
                      title="Close details"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="relative z-10 my-auto py-4">
                    <motion.h4
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-2"
                    >
                      Foundry Direct. Honest Luxury.
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.14 }}
                      className="text-stone-200 text-xs sm:text-sm font-normal leading-relaxed max-w-xs"
                    >
                      Direct collaboration with precision casting foundries delivers certified five-star brassware without retail markups.
                    </motion.p>
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 pt-2">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('catalog');
                      }}
                      className="w-full bg-[#f26a1b] hover:bg-[#ea580c] text-white py-2.5 px-4 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 mb-3.5 cursor-pointer shadow-lg shadow-[#f26a1b]/25"
                    >
                      <span>Brand archive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                    <div className="text-lg sm:text-xl font-black tracking-tight leading-[0.9] text-white uppercase">
                      OUR<br />STORY.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ===================== COL 4: OUR DESIGN. ===================== */}
          <div
            id="column-our-design"
            onMouseEnter={() => setHoveredArchBox(3)}
            onMouseLeave={() => setHoveredArchBox(null)}
            onClick={() => setHoveredArchBox(hoveredArchBox === 3 ? null : 3)}
            className={`relative bg-[#d8d9de] flex flex-col justify-between p-7 sm:p-8 overflow-hidden group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              hoveredArchBox === 3
                ? 'lg:flex-[1.45] shadow-2xl'
                : hoveredArchBox !== null
                ? 'lg:flex-[0.85] opacity-90'
                : 'lg:flex-1'
            }`}
          >
            {/* Resting Top Text */}
            <div className="relative z-10 flex items-start justify-between w-full">
              <div className="text-xs sm:text-sm font-bold text-black tracking-tight leading-snug">
                Form Follows<br />
                Emotion.
              </div>
              <div className="w-8 h-8 rounded-full bg-black/5 border border-black/15 flex items-center justify-center text-black/70 group-hover:bg-[#f26a1b] group-hover:border-[#f26a1b] group-hover:text-white transition-all shrink-0 ml-2">
                <Plus className={`w-4 h-4 transition-transform duration-300 ${hoveredArchBox === 3 ? 'rotate-45' : 'group-hover:rotate-90'}`} />
              </div>
            </div>

            {/* Resting Bottom Title */}
            <div className="relative z-10 pt-24">
              <div className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black tracking-tight leading-[0.92] uppercase text-black select-none group-hover:translate-x-1 transition-transform">
                OUR<br />DESIGN.
              </div>
            </div>

            {/* Hover State: Sculptural Faucet Backdrop */}
            <AnimatePresence>
              {hoveredArchBox === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-20 overflow-hidden flex flex-col justify-between p-7 sm:p-8 text-white"
                >
                  <img
                    src={ourDesignImg}
                    alt="Sculptural Faucet Design"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/40 pointer-events-none" />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHoveredArchBox(null);
                      }}
                      className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
                      title="Close details"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="relative z-10 my-auto py-4">
                    <motion.h4
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-2"
                    >
                      Sculpted Architectural Harmony.
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.14 }}
                      className="text-stone-200 text-xs sm:text-sm font-normal leading-relaxed max-w-xs"
                    >
                      Crisp radiused contours and diamond-knurled grips proportioned for natural stone, slate, and timber.
                    </motion.p>
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 pt-2">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('catalog');
                      }}
                      className="w-full bg-[#f26a1b] hover:bg-[#ea580c] text-white py-2.5 px-4 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 mb-3.5 cursor-pointer shadow-lg shadow-[#f26a1b]/25"
                    >
                      <span>Browse designs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                    <div className="text-lg sm:text-xl font-black tracking-tight leading-[0.9] text-white uppercase">
                      OUR<br />DESIGN.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TESTIMONIALS CAROUSEL */}
      {/* ========================================================================= */}
      <section id="testimonials-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center relative">
        {/* Large orange opening quote */}
        <div className="text-4xl sm:text-5xl font-serif text-[#f26a1b] leading-none mb-4">
          &ldquo;
        </div>

        {/* Quote Content */}
        <p className="text-base sm:text-xl lg:text-2xl font-medium text-stone-100 leading-relaxed max-w-2xl mx-auto min-h-[70px]">
          {testimonials[currentTestimonialIndex].quote}
        </p>

        {/* 5 Stars */}
        <div className="flex items-center justify-center gap-1.5 my-5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#f26a1b] text-[#f26a1b]" />
          ))}
        </div>

        {/* Author Details & Carousel Controls */}
        <div className="flex items-center justify-center gap-5 mt-4">
          <button
            id="testimonial-prev-btn"
            onClick={prevTestimonial}
            className="w-9 h-9 rounded-full border border-stone-700 bg-[#121316] hover:border-[#f26a1b] hover:text-[#f26a1b] text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-stone-300">
            - {testimonials[currentTestimonialIndex].author} <span className="text-stone-400 font-normal">/ {testimonials[currentTestimonialIndex].role}</span>
          </div>

          <button
            id="testimonial-next-btn"
            onClick={nextTestimonial}
            className="w-9 h-9 rounded-full border border-stone-700 bg-[#121316] hover:border-[#f26a1b] hover:text-[#f26a1b] text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-7">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTestimonialIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentTestimonialIndex ? 'w-8 bg-[#f26a1b]' : 'w-2 bg-stone-700'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
