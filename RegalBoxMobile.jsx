import styles from './RegalBoxMobile.module.css';

const benefits = [
  '🎀 Envío en 24 h',
  '💝 Empaque gratis',
  '✨ Tarjeta personalizada',
  '🔒 Pago seguro',
];

const promoItems = [
  { label: '3 productos', discount: '5% OFF' },
  { label: '5 productos', discount: '10% OFF' },
  { label: '10 productos', discount: '20% OFF' },
];

const testimonials = [
  {
    initials: 'MF',
    text: '"¡El box romántico me encantó! El peluche Lotso es hermoso y llegó con una tarjeta personalizada preciosa, tal como la pedí. Sin dudas voy a volver a comprar para otro regalo."',
  },
  {
    initials: 'JL',
    text: '"Pedí un ramo personalizado con flores violetas para el cumpleaños de mi novia y quedó increíble. Se nota el amor y dedicación en cada detalle."',
  },
  {
    initials: 'SC',
    text: '"Armé un box personalizado para el cumple de mi mamá y quedó espectacular. ¡Gracias RegalBOX!"',
  },
];

const categories = [
  { name: 'Románticos', emoji: '💕', bg: '#F9E4E6' },
  { name: 'Cumpleaños', emoji: '🎂', bg: '#FFF0D6' },
  { name: 'Amistad', emoji: '🤝', bg: '#E8F4EA' },
  { name: 'Personalizados', emoji: '🎁', bg: '#EDE8F4' },
];

const footerLinks = {
  Tienda: ['Novedades', 'Más vendidos', 'Promociones', '🎁 Armá tu box'],
  Ayuda: ['Envíos', '📦 Seguimiento de pedido', 'Preguntas frecuentes', 'Contacto'],
  Seguinos: ['📸 Instagram', '🎵 TikTok', '📘 Facebook', '📌 Pinterest'],
  Legal: ['Privacidad', 'Términos', 'Cookies'],
};

const navItems = [
  { label: 'Inicio', icon: '🏠' },
  { label: 'Categorías', icon: '🏷️' },
  { label: 'Productos', icon: '📦' },
  { label: 'Promos', icon: '🎉' },
  { label: 'Carrito', icon: '🛒' },
];

export default function RegalBoxMobile() {
  return (
    <div className={styles.page}>
      {/* NAVBAR */}
      <header className={styles.navbar}>
        <span className={styles.navbarLogo}>RegalBOX</span>
        <div className={styles.navbarActions}>
          <div className={styles.cartWrapper}>
            <span>🛍️</span>
            <span className={styles.cartBadge}>0</span>
          </div>
          <div className={styles.hamburger}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>Regalos que emocionan</h1>
          <p className={styles.heroSubtitle}>Diseñados para sorprender.</p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className={styles.benefits}>
        {benefits.map((b) => (
          <span key={b} className={styles.benefitTag}>{b}</span>
        ))}
      </section>

      {/* PROMO */}
      <section className={styles.promo}>
        <p className={styles.sectionLabelLight}>✨ Oferta especial</p>
        <div className={styles.promoIcon}>🎁</div>
        <h2 className={styles.promoHeading}>Armá tu box{'\n'}a medida</h2>
        <p className={styles.promoText}>
          Elegí los productos que más te gusten y nosotros te armamos el box perfecto.{' '}
          Beneficios especiales en boxes de 3 o más productos.
        </p>
        <div className={styles.promoCards}>
          {promoItems.map((item) => (
            <div key={item.label} className={styles.promoCard}>
              <span className={styles.promoCardLabel}>{item.label}</span>
              <span className={styles.promoCardDiscount}>{item.discount}</span>
            </div>
          ))}
        </div>
        <button className={styles.promoBtn}>Armar mi box →</button>
      </section>

      {/* TESTIMONIOS */}
      <section className={styles.testimonials}>
        <p className={styles.sectionLabelAccent}>Comunidad</p>
        <h2 className={styles.sectionHeading}>Lo que dicen nuestros clientes</h2>
        <div className={styles.testimonialList}>
          {testimonials.map((t) => (
            <div key={t.initials} className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>{t.text}</p>
              <div className={styles.testimonialAvatar}>{t.initials}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIAS 2x2 */}
      <section className={styles.categories}>
        <p className={styles.sectionLabelAccent}>Explorá</p>
        <h2 className={styles.sectionHeading}>Regalos para cada ocasión</h2>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <div key={cat.name} className={styles.categoryCard} style={{ backgroundColor: cat.bg }}>
              <span className={styles.categoryEmoji}>{cat.emoji}</span>
              <span className={styles.categoryName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className={styles.newsletter}>
        <p className={styles.newsletterTitle}>🎁 Sumate a RegalBOX</p>
        <p className={styles.newsletterText}>
          Recibí ofertas exclusivas y 10% OFF en tu primera compra.
        </p>
        <input type="email" placeholder="Tu email" className={styles.newsletterInput} />
        <button className={styles.newsletterBtn}>Suscribirme</button>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <h3 className={styles.footerBrand}>RegalBOX</h3>
        <p className={styles.footerTagline}>
          Regalos únicos, momentos inolvidables. Empaquetamos cada regalo con amor desde Buenos Aires.
        </p>
        <div className={styles.footerGrid}>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className={styles.footerColumn}>
              <p className={styles.footerColumnTitle}>{section}</p>
              {links.map((link) => (
                <a key={link} href="#" className={styles.footerLink}>{link}</a>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 RegalBOX</span>
          <span className={styles.footerTeam}>Grupo 29</span>
        </div>
      </footer>

      {/* BOTTOM NAV */}
      <nav className={styles.bottomNav}>
        {navItems.map((item, i) => (
          <button
            key={item.label}
            className={`${styles.navItem} ${i === 0 ? styles.navItemActive : ''}`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
