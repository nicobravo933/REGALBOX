import { useState } from 'react';
import { Filter } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { products } from './productsData';

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'romantico', label: '❤️ Romántico' },
  { id: 'cumpleanos', label: '🎂 Cumpleaños' },
  { id: 'aniversario', label: '💍 Aniversario' },
  { id: 'personalizado', label: '🎁 Personalizado' },
];

export function StorePage() {
  const [active, setActive] = useState('todos');
  const [sort, setSort] = useState('relevancia');

  const filtered = products
    .filter(p => active === 'todos' || p.category === active)
    .sort((a, b) => {
      if (sort === 'precio-asc') return a.price - b.price;
      if (sort === 'precio-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>Nuestra Tienda</h1>
        <p className="text-muted-foreground">Regalos que emocionan para cada ocasión especial</p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="text-sm border border-border rounded-lg px-2 py-1.5 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="relevancia">Relevancia</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor puntuados</option>
          </select>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground mb-4">{filtered.length} productos encontrados</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p>No encontramos productos en esta categoría.</p>
        </div>
      )}
    </main>
  );
}
