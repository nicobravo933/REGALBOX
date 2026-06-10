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
              src="https://maps.google.com/maps?q=Av.+Santa+Fe+1234,+CABA,+Buenos+Aires,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed"
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

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <p className="text-white/50 text-xs">© 2026 RegalBOX. Todos los derechos reservados.</p>
          <span className="text-white/70 text-xs font-medium border border-white/30 rounded-full px-3 py-1">
            Grupo 29
          </span>
        </div>
      </div>

    </footer>
  );
}
