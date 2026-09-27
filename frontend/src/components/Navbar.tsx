import React, { useState, useEffect } from 'react';
import { Heart, Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { ActivePage } from '../types';

interface NavbarProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage, category?: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  wishlistCount,
  onOpenWishlist,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (page: ActivePage, category?: string) => {
    onNavigate(page, category);
    setMobileMenuOpen(false);
  };

  const handleScrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0c]/60 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white rounded-md focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo - CAMZON */}
          <div
            id="brand-logo-camzon"
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <span className="text-xl sm:text-2xl font-black tracking-widest text-[#f26a1b] uppercase drop-shadow-sm">
              CAMZON
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-10">
            <button
              id="nav-link-home"
              onClick={() => handleLinkClick('home')}
              className={`text-xs tracking-wider uppercase font-semibold transition-colors duration-150 py-1 cursor-pointer ${
                currentPage === 'home'
                  ? 'text-white'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              HOME
            </button>

            <button
              id="nav-link-catalog"
              onClick={() => handleLinkClick('catalog')}
              className={`text-xs tracking-wider uppercase font-semibold transition-colors duration-150 py-1 cursor-pointer ${
                currentPage === 'catalog'
                  ? 'text-white'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              CATALOG
            </button>

            <button
              id="nav-link-about"
              onClick={() => handleScrollToSection('why-camzon-section')}
              className="text-xs tracking-wider uppercase font-semibold text-stone-400 hover:text-white transition-colors duration-150 py-1 cursor-pointer"
            >
              ABOUT
            </button>

            <button
              id="nav-link-contact"
              onClick={() => handleScrollToSection('contact-touch-section')}
              className="text-xs tracking-wider uppercase font-semibold text-stone-400 hover:text-white transition-colors duration-150 py-1 cursor-pointer"
            >
              CONTACT US
            </button>
          </nav>

          {/* Right Action Icons: Search + Wishlist + Inquire */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Trigger */}
            <button
              id="navbar-search-btn"
              onClick={onOpenSearch}
              className="p-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Search Bathware"
              title="Search bathware collection"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Button */}
            <button
              id="navbar-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-1.5 text-stone-400 hover:text-white transition-colors relative cursor-pointer"
              aria-label="View Saved Pieces"
              title="Saved pieces"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#f26a1b]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f26a1b] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Direct Catalog / Inquire Action */}
            <button
              id="navbar-explore-catalog-btn"
              onClick={() => onNavigate('catalog')}
              className="hidden sm:inline-flex border border-stone-600/90 hover:border-white text-stone-200 hover:text-white px-4 py-1 rounded-full transition-all duration-150 text-xs font-medium cursor-pointer"
              aria-label="Explore Collections"
            >
              Collections
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="lg:hidden border-t border-stone-800 bg-[#0d0e12] px-6 py-5 space-y-4 shadow-2xl">
          <button
            onClick={() => handleLinkClick('home')}
            className="w-full text-left py-2 text-base font-semibold text-stone-200 hover:text-white flex items-center justify-between border-b border-stone-800"
          >
            <span>HOME</span>
            <ArrowUpRight className="w-4 h-4 text-stone-400" />
          </button>
          <button
            onClick={() => handleLinkClick('catalog')}
            className="w-full text-left py-2 text-base font-semibold text-stone-200 hover:text-white flex items-center justify-between border-b border-stone-800"
          >
            <span>CATALOG</span>
            <ArrowUpRight className="w-4 h-4 text-stone-400" />
          </button>
          <button
            onClick={() => handleScrollToSection('why-camzon-section')}
            className="w-full text-left py-2 text-base font-semibold text-stone-200 hover:text-white flex items-center justify-between border-b border-stone-800"
          >
            <span>ABOUT</span>
            <ArrowUpRight className="w-4 h-4 text-stone-400" />
          </button>
          <button
            onClick={() => handleScrollToSection('contact-touch-section')}
            className="w-full text-left py-2 text-base font-semibold text-stone-200 hover:text-white flex items-center justify-between"
          >
            <span>CONTACT US</span>
            <ArrowUpRight className="w-4 h-4 text-stone-400" />
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('catalog');
              }}
              className="w-full bg-[#f26a1b] hover:bg-[#ea580c] text-white py-3 rounded-lg text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <span>Explore All 9 Collections</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
