import { useState } from 'react';
import { Link } from 'react-router';
import { Heart, Instagram, Facebook, Twitter, Send } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Tienda', href: '/tienda' },
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Contacto', href: '/#contacto' },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: 'https://www.instagram.com' },
    { icon: <Facebook className="w-5 h-5" />, label: 'Facebook', href: 'https://www.facebook.com' },
    { icon: <Twitter className="w-5 h-5" />, label: 'X / Twitter', href: 'https://www.x.com' },
  ];

  return (
    <footer style={{ background: 'var(--primary)', color: 'white' }}>
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>
              RegalBOX
            </span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Creamos regalos únicos con flores y cajas personalizadas para cada ocasión especial.
          </p>
          <p className="text-white/50 text-xs mt-3">© 2026 RegalBOX. Todos los derechos reservados.</p>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)' }} className="text-white mb-4">Navegación</h4>
          <ul className="flex flex-col gap-2">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => {
                    if (link.href.startsWith('/#')) {
                      const id = link.href.slice(2);
                      setTimeout(() => {
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)' }} className="text-white mb-4">Redes sociales</h4>
          <div className="flex flex-col gap-3">
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                {s.icon}
                <span className="text-sm">{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)' }} className="text-white mb-2">Newsletter</h4>
          <p className="text-white/70 text-sm mb-4">
            Suscribite y recibí ofertas exclusivas y novedades.
          </p>
          {subscribed ? (
            <div className="bg-white/20 rounded-xl p-3 text-sm text-white">
              ✅ ¡Gracias por suscribirte!
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50"
              />
              <button
                type="submit"
                className="bg-white text-primary p-2 rounded-xl hover:opacity-90 transition-opacity flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Google Maps */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h4 style={{ fontFamily: 'var(--font-display)' }} className="text-white mb-3 flex items-center gap-2">
            📍 Cómo llegar
          </h4>
          <div className="w-full rounded-2xl overflow-hidden" style={{ height: '220px' }}>
            <iframe
              title="Ubicación RegalBOX"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016956660492!2d-58.38375852404496!3d-34.60373705714083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac630121623%3A0x53386f2ac88991a9!2sAv.%20Santa%20Fe%201234%2C%20C1059%20CABA!5e0!3m2!1ses!2sar!4v1702000000000!5m2!1ses!2sar"
              width="100%"
              height="220"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Payment methods bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-3">
          <span className="text-white/60 text-xs whitespace-nowrap">Medios de pago:</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* Visa */}
            <div className="h-8 w-14 bg-[#1A1F71] rounded-md flex items-center justify-center">
              <span className="text-white font-extrabold italic text-sm tracking-widest select-none" style={{ fontFamily: 'Arial, sans-serif' }}>VISA</span>
            </div>
            {/* Mastercard */}
            <div className="h-8 w-14 bg-[#1A1A1A] rounded-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute left-2 w-5 h-5 rounded-full bg-[#EB001B]" />
              <div className="absolute right-2 w-5 h-5 rounded-full bg-[#F79E1B] opacity-90" />
            </div>
            {/* Amex */}
            <div className="h-8 w-14 bg-[#007BC1] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-[10px] tracking-widest select-none" style={{ fontFamily: 'Arial, sans-serif' }}>AMEX</span>
            </div>
            {/* Mercado Pago */}
            <div className="h-8 px-2 bg-[#009EE3] rounded-md flex items-center gap-1.5">
              <img src="/mercadopago.png" alt="" className="h-5 w-5 object-contain" />
              <span className="text-white text-[10px] font-bold select-none whitespace-nowrap" style={{ fontFamily: 'Arial, sans-serif' }}>Mercado Pago</span>
            </div>
            {/* Naranja X */}
            <div className="h-8 w-16 bg-[#FF5C00] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-[10px] tracking-wide select-none" style={{ fontFamily: 'Arial, sans-serif' }}>NARANJA X</span>
            </div>
            {/* Cabal */}
            <div className="h-8 w-14 bg-[#003082] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-[11px] tracking-wide select-none" style={{ fontFamily: 'Arial, sans-serif' }}>CABAL</span>
            </div>
            {/* Transferencia */}
            <div className="h-8 px-3 bg-white/15 rounded-md flex items-center gap-1.5 border border-white/20">
              <span className="text-white text-[10px] font-medium select-none whitespace-nowrap">🏦 Transferencia</span>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-1.5 text-white/40 text-[10px] whitespace-nowrap">
            🔒 Pago seguro con SSL
          </div>
        </div>
      </div>
    </footer>
  );
}
