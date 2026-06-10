import { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ChevronRight, Check } from 'lucide-react';
import { useCart } from './CartContext';

type Step = 'cart' | 'shipping' | 'confirm';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>('cart');
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', phone: '' });

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(p);

  const shipping = total > 8000 ? 0 : 490;

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setStep('cart'), 300);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirm');
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--foreground)' }}>
              {step === 'cart' ? 'Tu carrito' : step === 'shipping' ? 'Datos de envío' : '¡Pedido confirmado!'}
            </span>
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps indicator */}
        {step !== 'confirm' && (
          <div className="flex px-5 py-3 gap-2 border-b border-border">
            {(['cart', 'shipping'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {i + 1}
                </div>
                <span className={`text-xs ${step === s ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {s === 'cart' ? 'Carrito' : 'Envío'}
                </span>
                {i < 1 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Cart Step */}
          {step === 'cart' && (
            <div className="p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Tu carrito está vacío</p>
                  <button
                    onClick={handleClose}
                    className="mt-4 text-primary text-sm underline"
                  >
                    Ir a la tienda
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate" style={{ fontFamily: 'var(--font-display)' }}>
                          {item.name}
                        </p>
                        <p className="text-primary font-semibold text-sm mt-0.5">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 bg-muted rounded-lg px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Shipping Step */}
          {step === 'shipping' && (
            <form id="shipping-form" onSubmit={handleConfirm} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Nombre completo *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="María González"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="maria@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Teléfono *</label>
                <input
                  required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+54 11 1234-5678"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Dirección *</label>
                <input
                  required
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Av. Corrientes 1234, Piso 2"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Ciudad *</label>
                <input
                  required
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Buenos Aires"
                />
              </div>
            </form>
          )}

          {/* Confirm Step */}
          {step === 'confirm' && (
            <div className="p-5 flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mt-8">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>
                  ¡Pedido confirmado!
                </h3>
                <p className="text-muted-foreground text-sm mt-2">
                  Hola {form.name}, recibimos tu pedido. Te contactaremos a {form.email} para coordinar la entrega.
                </p>
              </div>
              <div className="w-full bg-secondary rounded-xl p-4 text-left">
                <p className="text-sm font-medium text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>Resumen del pedido</p>
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm text-muted-foreground py-1">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-border mt-2 pt-2 flex justify-between font-medium text-sm text-foreground">
                  <span>Total</span>
                  <span>{formatPrice(total + shipping)}</span>
                </div>
              </div>
              <button
                onClick={() => { clearCart(); handleClose(); }}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'confirm' && items.length > 0 && (
          <div className="border-t border-border p-5">
            {step === 'cart' && (
              <>
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Envío</span>
                    <span className={shipping === 0 ? 'text-primary font-medium' : ''}>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-primary">🎉 Envío gratis por compra mayor a {formatPrice(8000)}</p>
                  )}
                  <div className="flex justify-between font-semibold text-foreground pt-1 border-t border-border">
                    <span>Total</span>
                    <span style={{ fontFamily: 'var(--font-display)' }}>{formatPrice(total + shipping)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep('shipping')}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Continuar con el pedido
                </button>
              </>
            )}
            {step === 'shipping' && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('cart')}
                  className="flex-1 border border-border py-3 rounded-xl text-sm font-medium hover:bg-muted transition-colors"
                >
                  Volver
                </button>
                <button
                  form="shipping-form"
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Confirmar pedido
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
