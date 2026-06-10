import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ShoppingCart, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from './CartContext';

export function Header() {
  const { count, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Inicio', href: '/', scrollTop: true },
    { label: 'Tienda', href: '/tienda' },
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Contacto', href: '/#contacto' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href.startsWith('/#')) return location.pathname === '/';
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
          </div>
          <span
            className="text-primary"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}
          >
            RegalBOX
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => {
                if (link.scrollTop) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (link.href.startsWith('/#')) {
                  const id = link.href.slice(2);
                  setTimeout(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`text-sm transition-colors hover:text-primary ${
                isActive(link.href) ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button type="button" className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative p-2 rounded-full hover:bg-muted transition-colors text-foreground"
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
          {/* Mobile menu */}
          <button
            type="button"
            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => {
                setMobileOpen(false);
                if (link.scrollTop) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (link.href.startsWith('/#')) {
                  const id = link.href.slice(2);
                  setTimeout(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`text-sm py-1 transition-colors hover:text-primary ${
                isActive(link.href) ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/tienda"
            onClick={() => setMobileOpen(false)}
            className="mt-2 bg-primary text-primary-foreground text-center py-2.5 rounded-xl text-sm font-medium"
          >
            Ver Tienda
          </Link>
        </div>
      )}
    </header>
  );
}
