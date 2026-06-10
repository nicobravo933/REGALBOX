import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from './CartContext';
import { useCart } from './CartContext';

interface ProductCardProps {
  product: Product;
  horizontal?: boolean;
}

export function ProductCard({ product, horizontal = false }: ProductCardProps) {
  const { addItem } = useCart();

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(p);

  if (horizontal) {
    return (
      <div className="flex gap-3 bg-card rounded-xl p-3 shadow-sm border border-border hover:shadow-md transition-shadow">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.badge && (
            <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <p className="text-sm text-foreground truncate" style={{ fontFamily: 'var(--font-display)' }}>{product.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary font-semibold text-sm">{formatPrice(product.price)}</span>
            <button
              type="button"
              onClick={() => addItem(product)}
              className="bg-primary text-primary-foreground rounded-lg px-3 py-1.5 text-xs flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all"
            >
              <ShoppingCart className="w-3 h-3" />
              Agregar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border group hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden bg-muted aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-foreground mb-1 truncate" style={{ fontFamily: 'var(--font-display)' }}>{product.name}</h3>
        {product.description && (
          <p className="text-muted-foreground text-xs mb-2 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map(n => (
            <Star
              key={n}
              className={`w-3.5 h-3.5 ${n <= Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-border fill-border'}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-primary" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-xs line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
