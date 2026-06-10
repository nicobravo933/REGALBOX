import { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ChevronRight, Check, Lock, CreditCard, Wallet } from 'lucide-react';
import { useCart } from './CartContext';

type Step = 'cart' | 'shipping' | 'payment' | 'confirm';
type PaymentMethod = 'card' | 'mercadopago';

function VisaBadge() {
  return (
    <div className="h-7 w-12 bg-[#1A1F71] rounded flex items-center justify-center flex-shrink-0">
      <span className="text-white font-extrabold italic text-sm tracking-widest select-none" style={{ fontFamily: 'Arial, sans-serif' }}>VISA</span>
    </div>
  );
}

function MastercardBadge() {
  return (
    <div className="h-7 w-12 bg-[#1A1A1A] rounded flex items-center justify-center flex-shrink-0 overflow-hidden relative">
      <div className="absolute left-1.5 w-5 h-5 rounded-full bg-[#EB001B]" />
      <div className="absolute right-1.5 w-5 h-5 rounded-full bg-[#F79E1B] opacity-90" />
    </div>
  );
}

function AmexBadge() {
  return (
    <div className="h-7 w-12 bg-[#007BC1] rounded flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-[10px] tracking-widest select-none" style={{ fontFamily: 'Arial, sans-serif' }}>AMEX</span>
    </div>
  );
}

function MercadoPagoBadge({ large = false }: { large?: boolean }) {
  return (
    <div className={`bg-[#009EE3] rounded-xl flex items-center justify-center gap-2 flex-shrink-0 ${large ? 'h-14 w-52 ' : 'h-7 px-2'}`}>
      <svg width={large ? 22 : 14} height={large ? 22 : 14} viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a7 7 0 110 14A7 7 0 0112 5zm-1.5 3v2H9v4h1.5v2h3v-2H15V10h-1.5V8h-3z"/>
      </svg>
      <span className={`text-white font-bold select-none ${large ? 'text-base' : 'text-[10px]'}`} style={{ fontFamily: 'Arial, sans-serif' }}>
        Mercado Pago
      </span>
    </div>
  );
}

function CardTypeIndicator({ number }: { number: string }) {
  const n = number.replace(/\s/g, '');
  if (n.startsWith('4')) return <VisaBadge />;
  if (n.startsWith('5') || n.startsWith('2')) return <MastercardBadge />;
  if (n.startsWith('3')) return <AmexBadge />;
  return <CreditCard className="w-5 h-5 text-muted-foreground" />;
}

const STEPS: { id: Step; label: string }[] = [
  { id: 'cart', label: 'Carrito' },
  { id: 'shipping', label: 'Envío' },
  { id: 'payment', label: 'Pago' },
];

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', phone: '' });
  const [card, setCard] = useState({ number: '', holder: '', expiry: '', cvv: '' });

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(p);

  const shipping = total > 8000 ? 0 : 490;

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setStep('cart'), 300);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirm');
  };

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const stepIndex = STEPS.findIndex(s => s.id === step);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Cerrar carrito"
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm w-full cursor-default"
        onClick={handleClose}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--foreground)' }}>
              {step === 'cart' ? 'Tu carrito'
                : step === 'shipping' ? 'Datos de envío'
                : step === 'payment' ? 'Método de pago'
                : '¡Pedido confirmado!'}
            </span>
          </div>
          <button type="button" onClick={handleClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps indicator */}
        {step !== 'confirm' && (
          <div className="flex items-center px-5 py-3 gap-1 border-b border-border bg-background">
            {STEPS.map((s, i) => {
              const done = i < stepIndex;
              const active = s.id === step;
              return (
                <div key={s.id} className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    done ? 'bg-primary text-primary-foreground'
                    : active ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                  }`}>
                    {done ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className={`text-xs ${active ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {s.label}
                  </span>
                  {i < STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-muted-foreground mx-0.5" />}
                </div>
              );
            })}
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">

          {/* ── STEP 1: Cart ── */}
          {step === 'cart' && (
            <div className="p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Tu carrito está vacío</p>
                  <button type="button" onClick={handleClose} className="mt-4 text-primary text-sm underline">
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
                            <button type="button" onClick={() => updateQuantity(item.id, -1)} className="text-foreground hover:text-primary transition-colors">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                            <button type="button" onClick={() => updateQuantity(item.id, 1)} className="text-foreground hover:text-primary transition-colors">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button type="button" onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors" title="Eliminar producto">
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

          {/* ── STEP 2: Shipping ── */}
          {step === 'shipping' && (
            <form id="shipping-form" onSubmit={handleShippingSubmit} className="p-5 flex flex-col gap-4">
              {[
                { key: 'name', label: 'Nombre completo', placeholder: 'María González', type: 'text' },
                { key: 'email', label: 'Email', placeholder: 'maria@email.com', type: 'email' },
                { key: 'phone', label: 'Teléfono', placeholder: '+54 11 1234-5678', type: 'tel' },
                { key: 'address', label: 'Dirección', placeholder: 'Av. Corrientes 1234, Piso 2', type: 'text' },
                { key: 'city', label: 'Ciudad', placeholder: 'Buenos Aires', type: 'text' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label htmlFor={`ship-${key}`} className="block text-sm text-muted-foreground mb-1">{label} *</label>
                  <input
                    id={`ship-${key}`}
                    required
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </form>
          )}

          {/* ── STEP 3: Payment ── */}
          {step === 'payment' && (
            <form id="payment-form" onSubmit={handlePaymentSubmit} className="p-5 flex flex-col gap-5">

              {/* Method selector */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-secondary text-primary shadow-sm'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Tarjeta
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mercadopago')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    paymentMethod === 'mercadopago'
                      ? 'border-[#009EE3] bg-[#009EE3]/10 text-[#009EE3] shadow-sm'
                      : 'border-border text-muted-foreground hover:border-[#009EE3]/40'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  Mercado Pago
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="flex flex-col gap-4">
                  {/* Card number */}
                  <div>
                    <label htmlFor="card-number" className="block text-sm text-muted-foreground mb-1">Número de tarjeta *</label>
                    <div className="relative">
                      <input
                        id="card-number"
                        required
                        value={card.number}
                        onChange={e => setCard(c => ({ ...c, number: formatCardNumber(e.target.value) }))}
                        maxLength={19}
                        className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring pr-16 font-mono tracking-widest"
                        placeholder="1234 5678 9012 3456"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 scale-75 origin-right">
                        <CardTypeIndicator number={card.number} />
                      </div>
                    </div>
                  </div>

                  {/* Cardholder name */}
                  <div>
                    <label htmlFor="card-holder" className="block text-sm text-muted-foreground mb-1">Nombre en la tarjeta *</label>
                    <input
                      id="card-holder"
                      required
                      value={card.holder}
                      onChange={e => setCard(c => ({ ...c, holder: e.target.value.toUpperCase() }))}
                      className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring uppercase tracking-wider"
                      placeholder="MARIA GONZALEZ"
                    />
                  </div>

                  {/* Expiry + CVV */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label htmlFor="card-expiry" className="block text-sm text-muted-foreground mb-1">Vencimiento *</label>
                      <input
                        id="card-expiry"
                        required
                        value={card.expiry}
                        onChange={e => setCard(c => ({ ...c, expiry: formatExpiry(e.target.value) }))}
                        maxLength={5}
                        className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                        placeholder="MM/AA"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="card-cvv" className="block text-sm text-muted-foreground mb-1">
                        CVV * <span className="text-[10px] text-muted-foreground/60">(3-4 dígitos)</span>
                      </label>
                      <input
                        id="card-cvv"
                        required
                        type="password"
                        value={card.cvv}
                        onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                        maxLength={4}
                        className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                        placeholder="•••"
                      />
                    </div>
                  </div>

                  {/* Accepted brands */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-muted-foreground mr-1">Aceptamos:</span>
                    <VisaBadge />
                    <MastercardBadge />
                    <AmexBadge />
                    <MercadoPagoBadge />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                  <MercadoPagoBadge large />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Al confirmar, te enviaremos un link de pago de <strong>Mercado Pago</strong> a tu email para completar la transacción de forma segura.
                  </p>
                  <div className="w-full bg-secondary rounded-xl p-4 text-left flex flex-col gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium">Ventajas de Mercado Pago:</p>
                    {['Hasta 12 cuotas sin interés', 'Protección al comprador', 'Pago en segundos'].map(t => (
                      <div key={t} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security badge */}
              <div className="flex items-center justify-center gap-2 py-3 bg-secondary rounded-xl">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Pago 100% seguro — encriptación SSL 256-bit</span>
              </div>
            </form>
          )}

          {/* ── CONFIRM ── */}
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
                  Hola <strong>{form.name}</strong>, recibimos tu pedido. Te contactaremos a <strong>{form.email}</strong> para coordinar la entrega.
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
                  <span>Total pagado</span>
                  <span style={{ fontFamily: 'var(--font-display)' }}>{formatPrice(total + shipping)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { clearCart(); handleClose(); }}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
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
                    <span className={shipping === 0 ? 'text-primary font-medium' : ''}>
                      {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-primary">Envío gratis en compras mayores a {formatPrice(8000)}</p>
                  )}
                  <div className="flex justify-between font-semibold text-foreground pt-1.5 border-t border-border">
                    <span>Total</span>
                    <span style={{ fontFamily: 'var(--font-display)' }}>{formatPrice(total + shipping)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Continuar con el pedido
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full mt-2 text-muted-foreground text-sm py-1.5 hover:text-destructive transition-colors"
                >
                  Vaciar carrito
                </button>
              </>
            )}

            {step === 'shipping' && (
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('cart')} className="flex-1 border border-border py-3 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                  Volver
                </button>
                <button form="shipping-form" type="submit" className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                  Continuar al pago
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('shipping')} className="flex-1 border border-border py-3 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                  Volver
                </button>
                <button form="payment-form" type="submit" className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Pagar {formatPrice(total + shipping)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
