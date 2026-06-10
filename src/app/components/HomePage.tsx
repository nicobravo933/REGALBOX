import {
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	Heart,
	MessageCircle,
	Package,
	Star,
	Truck,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { ProductCard } from "./ProductCard";
import { products } from "./productsData";

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
	return (
		<section className="relative overflow-hidden min-h-[520px] md:min-h-[600px] flex items-center">
			{/* Background image con overlay claro para mantener colores del diseño */}
			<div className="absolute inset-0">
				<img
					src="/images/lotso3.jpeg"
					alt="RegalBOX hero"
					className="w-full h-full object-cover object-center"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/30 to-transparent" />
			</div>

			{/* Content */}
			<div className="relative max-w-6xl mx-auto px-4 py-16 w-full">
				<span
					className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide"
					style={{ background: "var(--primary)", color: "white" }}
				>
					🌸 Envíos a todo el país
				</span>
				<h1
					className="mb-4 leading-tight"
					style={{
						fontFamily: "var(--font-display)",
						fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
					}}
				>
					<span style={{ color: "var(--foreground)", fontWeight: 700 }}>
						Regalos que
					</span>
					<br />
					<em
						style={{
							color: "var(--primary)",
							fontStyle: "italic",
							fontWeight: 700,
						}}
					>
						emocionan
					</em>
				</h1>
				<p
					className="hidden md:block mb-6 max-w-sm leading-relaxed text-muted-foreground"
					style={{ fontSize: "0.95rem" }}
				>
					Creamos experiencias únicas con flores, cajas personalizadas y más.
					Para cada ocasión especial.
				</p>
				<div className="flex gap-3 flex-wrap">
					<Link
						to="/tienda"
						className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-md"
					>
						Ver productos
						<ArrowRight className="w-4 h-4" />
					</Link>
					<button
						type="button"
						onClick={() =>
							document
								.getElementById("contacto")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-2xl font-semibold hover:bg-primary/5 transition-colors"
					>
						Contactanos
					</button>
				</div>
				{/* Stats */}
				<div className="flex gap-3 mt-9 flex-wrap">
					{[
						{ value: "2.4k+", label: "Regalos entregados" },
						{ value: "180+", label: "Productos" },
						{ value: "4.9★", label: "Puntuación" },
					].map((s) => (
						<div
							key={s.label}
							className="rounded-xl px-4 py-3"
							style={{
								background: "rgba(255,255,255,0.75)",
								border: "1px solid rgba(139,61,69,0.15)",
								backdropFilter: "blur(4px)",
							}}
						>
							<p
								style={{
									fontFamily: "var(--font-display)",
									fontWeight: 700,
									fontSize: "1.3rem",
									color: "var(--primary)",
								}}
							>
								{s.value}
							</p>
							<p
								style={{
									fontSize: "0.72rem",
									color: "var(--muted-foreground)",
									marginTop: "2px",
								}}
							>
								{s.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ── Categories ────────────────────────────────────────────────────────────────
function Categories() {
	const cats = [
		{
			id: "romantico",
			label: "Romántico",
			image: "/images/products/ramo1.jpeg",
			href: "/tienda?cat=romantico",
		},
		{
			id: "cumpleanos",
			label: "Amistad",
			image: "/images/products/corazon1.jpeg",
			href: "/tienda?cat=cumpleanos",
		},
		{
			id: "aniversario",
			label: "Cumpleaños",
			image: "/images/products/stich1.jpeg",
			href: "/tienda?cat=aniversario",
		},
		{
			id: "personalizado",
			label: "Personalizado",
			image: "/images/products/oso1.jpeg",
			href: "/tienda?cat=personalizado",
		},
	];

	return (
		<section className="py-10 max-w-6xl mx-auto px-4">
			<p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
				Explorá
			</p>
			<h2
				className="text-foreground mb-6"
				style={{ fontFamily: "var(--font-display)" }}
			>
				Regalos para cada{" "}
				<span style={{ color: "var(--primary)" }}>ocasión</span>
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
				{cats.map((cat) => (
					<Link
						key={cat.id}
						to={cat.href}
						className="relative rounded-2xl overflow-hidden aspect-square group hover:shadow-lg transition-all"
					>
						<img
							src={cat.image}
							alt={cat.label}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
						<span
							className="absolute bottom-3 left-0 right-0 text-center text-white text-sm font-semibold"
							style={{ fontFamily: "var(--font-display)" }}
						>
							{cat.label}
						</span>
					</Link>
				))}
			</div>
		</section>
	);
}

// ── Features ──────────────────────────────────────────────────────────────────
function Features() {
	const feats = [
		{
			icon: <Heart className="w-5 h-5" />,
			title: "Hecho con amor",
			desc: "Cada regalo es preparado a mano con dedicación.",
		},
		{
			icon: <Truck className="w-5 h-5" />,
			title: "Envío express",
			desc: "Entregamos en el día para Buenos Aires.",
		},
		{
			icon: <Package className="w-5 h-5" />,
			title: "Box a medida",
			desc: "Personalizamos cada detalle para ti.",
		},
	];

	return (
		<section className="bg-secondary py-8">
			<div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
				{feats.map((f) => (
					<div key={f.title} className="flex items-start gap-3 p-4">
						<div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
							{f.icon}
						</div>
						<div>
							<p
								className="font-medium text-foreground text-sm"
								style={{ fontFamily: "var(--font-display)" }}
							>
								{f.title}
							</p>
							<p className="text-muted-foreground text-xs mt-0.5">{f.desc}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

// ── Best Sellers (carousel) ───────────────────────────────────────────────────
function BestSellers() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const bestsellers = products
		.filter(
			(p) =>
				p.badge === "Más vendido" || p.badge === "Popular" || p.rating >= 4.9,
		)
		.slice(0, 6);

	const scroll = (dir: "left" | "right") => {
		scrollRef.current?.scrollBy({
			left: dir === "right" ? 280 : -280,
			behavior: "smooth",
		});
	};

	return (
		<section className="py-10 max-w-6xl mx-auto px-4">
			<div className="flex items-center justify-between mb-6">
				<h2
					className="text-foreground"
					style={{ fontFamily: "var(--font-display)" }}
				>
					Los más <span style={{ color: "var(--primary)" }}>elegidos</span>
				</h2>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => scroll("left")}
						className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
					>
						<ChevronLeft className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => scroll("right")}
						className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
					>
						<ChevronRight className="w-4 h-4" />
					</button>
				</div>
			</div>
			<div
				ref={scrollRef}
				className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
				style={{ scrollbarWidth: "none" }}
			>
				{bestsellers.map((product) => (
					<div key={product.id} className="flex-shrink-0 w-56">
						<ProductCard product={product} />
					</div>
				))}
			</div>
			<div className="mt-6 text-center">
				<Link
					to="/tienda"
					className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
				>
					Ver todos los productos <ArrowRight className="w-4 h-4" />
				</Link>
			</div>
		</section>
	);
}

// ── Custom Box CTA ────────────────────────────────────────────────────────────
function CustomBoxCTA() {
	return (
		<section style={{ background: "var(--primary)" }} className="py-16">
			<div className="max-w-6xl mx-auto px-4 text-center">
				<span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
					✨ Oferta especial
				</span>
				<h2
					className="text-white mb-3"
					style={{
						fontFamily: "var(--font-display)",
						fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
					}}
				>
					Armá tu box a medida
				</h2>
				<p className="text-white/80 mb-8 max-w-md mx-auto">
					Elegí los productos que más te gustan y creamos un box personalizado.
					Primeras 10 cajas con 20% de descuento.
				</p>
				<div className="flex gap-3 justify-center flex-wrap">
					<Link
						to="/tienda"
						className="bg-white text-primary px-8 py-3 rounded-2xl font-medium hover:opacity-90 transition-opacity"
					>
						Crear mi box
					</Link>
					<button
						type="button"
						onClick={() =>
							document
								.getElementById("contacto")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="border border-white/50 text-white px-8 py-3 rounded-2xl font-medium hover:bg-white/10 transition-colors"
					>
						Más información
					</button>
				</div>
			</div>
		</section>
	);
}

// ── Reviews ───────────────────────────────────────────────────────────────────
const reviews = [
	{
		id: 1,
		name: "María Fernanda R.",
		avatar: "MF",
		rating: 5,
		text: "¡El box romántico me encantó! El peluche Lotso es hermoso y llegó con una tarjeta personalizada preciosa, tal como la pedí. Sin dudas voy a volver a comprar para otro regalo.",
		product: "Box Romántico Deluxe",
		date: "hace 2 días",
	},
	{
		id: 2,
		name: "Julián López",
		avatar: "JL",
		rating: 5,
		text: "Pedí un ramo personalizado con flores violetas para el cumpleaños de mi novia y quedó increíble. Se nota el amor y dedicación en cada detalle.",
		product: "Bouquet Romántico",
		date: "hace 1 semana",
	},
	{
		id: 3,
		name: "Sofía Castro",
		avatar: "SC",
		rating: 5,
		text: "Armé un box personalizado para el cumple de mi mamá y quedó espectacular. ¡Gracias RegalBOX!",
		product: "Box Cumpleaños",
		date: "hace 2 semanas",
	},
	{
		id: 4,
		name: "Diego Ramírez",
		avatar: "DR",
		rating: 4,
		text: "El producto llegó en condiciones, es tal cual se ve en la foto! A mi novia le encantó.",
		product: "Corazón Kinder Love",
		date: "hace 3 semanas",
	},
];

function Reviews() {
	const [current, setCurrent] = useState(0);

	const next = () => setCurrent((c) => (c + 1) % reviews.length);
	const prev = () =>
		setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

	return (
		<section className="py-12 bg-secondary">
			<div className="max-w-6xl mx-auto px-4">
				<div className="text-center mb-8">
					<h2
						className="text-foreground"
						style={{ fontFamily: "var(--font-display)" }}
					>
						Lo que dicen nuestros{" "}
						<span style={{ color: "var(--primary)" }}>clientes</span>
					</h2>
					<div className="flex items-center justify-center gap-1 mt-2">
						{[1, 2, 3, 4, 5].map((n) => (
							<Star key={n} className="w-4 h-4 fill-accent text-accent" />
						))}
						<span className="text-muted-foreground text-sm ml-2">
							4.9 de 5 — más de 500 reseñas
						</span>
					</div>
				</div>

				{/* Mobile: single card carousel */}
				<div className="md:hidden relative">
					<div className="bg-card rounded-2xl p-6 shadow-sm border border-border mx-4">
						<div className="flex items-center gap-3 mb-3">
							<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">
								{reviews[current].avatar}
							</div>
							<div>
								<p className="font-medium text-sm text-foreground">
									{reviews[current].name}
								</p>
								<p className="text-xs text-muted-foreground">
									{reviews[current].date}
								</p>
							</div>
						</div>
						<div className="flex gap-0.5 mb-2">
							{[1, 2, 3, 4, 5].map((n) => (
								<Star
									key={n}
									className={`w-3.5 h-3.5 ${n <= reviews[current].rating ? "fill-accent text-accent" : "text-border"}`}
								/>
							))}
						</div>
						<p className="text-muted-foreground text-sm">
							{reviews[current].text}
						</p>
						<p className="text-xs text-primary mt-2">
							Compró: {reviews[current].product}
						</p>
					</div>
					<div className="flex justify-center gap-3 mt-4">
						<button
							type="button"
							onClick={prev}
							className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
						>
							<ChevronLeft className="w-4 h-4" />
						</button>
						{reviews.map((review, i) => (
							<button
								key={review.id}
								type="button"
								onClick={() => setCurrent(i)}
								className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-4" : "bg-border"}`}
							/>
						))}
						<button
							type="button"
							onClick={next}
							className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
						>
							<ChevronRight className="w-4 h-4" />
						</button>
					</div>
				</div>

				{/* Desktop: 2 col grid */}
				<div className="hidden md:grid grid-cols-2 gap-4">
					{reviews.map((r) => (
						<div
							key={r.id}
							className="bg-card rounded-2xl p-6 shadow-sm border border-border"
						>
							<div className="flex items-center gap-3 mb-3">
								<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
									{r.avatar}
								</div>
								<div>
									<p className="font-medium text-sm text-foreground">
										{r.name}
									</p>
									<p className="text-xs text-muted-foreground">{r.date}</p>
								</div>
							</div>
							<div className="flex gap-0.5 mb-2">
								{[1, 2, 3, 4, 5].map((n) => (
									<Star
										key={n}
										className={`w-3.5 h-3.5 ${n <= r.rating ? "fill-accent text-accent" : "text-border"}`}
									/>
								))}
							</div>
							<p className="text-muted-foreground text-sm">{r.text}</p>
							<p className="text-xs text-primary mt-2">Compró: {r.product}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ── Nosotros ──────────────────────────────────────────────────────────────────
function Nosotros() {
	return (
		<section id="nosotros" className="py-14 max-w-6xl mx-auto px-4">
			<div className="grid md:grid-cols-2 gap-10 items-center">
				<div className="relative rounded-3xl overflow-hidden aspect-square drop-shadow-xl">
					<img
						src="/images/regalbox.jpeg"
						alt="Equipo RegalBOX"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
				</div>
				<div>
					<p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
						Nuestra historia
					</p>
					<h2
						className="text-foreground mb-4"
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
						}}
					>
						Creamos regalos que{" "}
						<span style={{ color: "var(--primary)" }}>emocionan</span>
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						Somos un equipo apasionado de Buenos Aires dedicado a convertir cada
						regalo en una experiencia única. Desde 2026 empaquetamos amor,
						cuidado y creatividad en cada box.
					</p>
					<p className="text-muted-foreground mb-6 leading-relaxed">
						Cada producto es seleccionado a mano, cada caja es armada con
						dedicación, y cada entrega lleva una tarjeta personalizada porque
						creemos que los detalles marcan la diferencia.
					</p>
					<div className="grid grid-cols-3 gap-4">
						{[
							{ value: "2.4k+", label: "Regalos entregados" },
							{ value: "180+", label: "Productos" },
							{ value: "4.9★", label: "Puntuación" },
						].map((s) => (
							<div
								key={s.label}
								className="text-center bg-secondary rounded-2xl p-4"
							>
								<p
									className="text-primary font-bold text-xl"
									style={{ fontFamily: "var(--font-display)" }}
								>
									{s.value}
								</p>
								<p className="text-muted-foreground text-xs mt-1">{s.label}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// ── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
	const [sent, setSent] = useState(false);
	const [form, setForm] = useState({ name: "", email: "", message: "" });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSent(true);
	};

	return (
		<section id="contacto" className="py-12 max-w-6xl mx-auto px-4">
			<div className="grid md:grid-cols-2 gap-10 items-start">
				<div>
					<h2
						className="text-foreground mb-3"
						style={{ fontFamily: "var(--font-display)" }}
					>
						Envianos un mensaje
					</h2>
					<p className="text-muted-foreground mb-6">
						¿Tenés alguna consulta o querés armar un pedido especial? Estamos
						para ayudarte.
					</p>
					<div className="flex flex-col gap-3">
						{[
							{
								icon: "📍",
								label: "Dirección",
								value: "Av. Santa Fe 1234, CABA, Argentina",
							},
							{ icon: "📞", label: "Teléfono", value: "+54 11 4567-8900" },
							{ icon: "✉️", label: "Email", value: "hola@regalbox.com.ar" },
							{ icon: "🕐", label: "Horario", value: "Lun–Sáb: 9:00 – 20:00" },
						].map((item) => (
							<div key={item.label} className="flex items-start gap-3">
								<span className="text-lg">{item.icon}</span>
								<div>
									<p className="text-xs text-muted-foreground">{item.label}</p>
									<p className="text-sm text-foreground">{item.value}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
					{sent ? (
						<div className="text-center py-8">
							<MessageCircle className="w-12 h-12 text-primary mx-auto mb-3" />
							<h3
								style={{
									fontFamily: "var(--font-display)",
									color: "var(--primary)",
								}}
							>
								¡Mensaje enviado!
							</h3>
							<p className="text-muted-foreground text-sm mt-2">
								Te contactaremos a la brevedad.
							</p>
							<button
								type="button"
								onClick={() => {
									setSent(false);
									setForm({ name: "", email: "", message: "" });
								}}
								className="mt-4 text-primary text-sm underline"
							>
								Enviar otro mensaje
							</button>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							<div>
								<label
									htmlFor="contact-name"
									className="block text-sm text-muted-foreground mb-1"
								>
									Nombre
								</label>
								<input
									id="contact-name"
									required
									value={form.name}
									onChange={(e) =>
										setForm((f) => ({ ...f, name: e.target.value }))
									}
									className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
									placeholder="Tu nombre"
								/>
							</div>
							<div>
								<label
									htmlFor="contact-email"
									className="block text-sm text-muted-foreground mb-1"
								>
									Email
								</label>
								<input
									id="contact-email"
									required
									type="email"
									value={form.email}
									onChange={(e) =>
										setForm((f) => ({ ...f, email: e.target.value }))
									}
									className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
									placeholder="tu@email.com"
								/>
							</div>
							<div>
								<label
									htmlFor="contact-message"
									className="block text-sm text-muted-foreground mb-1"
								>
									Mensaje
								</label>
								<textarea
									id="contact-message"
									required
									rows={4}
									value={form.message}
									onChange={(e) =>
										setForm((f) => ({ ...f, message: e.target.value }))
									}
									className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
									placeholder="Contanos qué necesitás..."
								/>
							</div>
							<button
								type="submit"
								className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
							>
								Enviar mensaje
							</button>
						</form>
					)}
				</div>
			</div>
		</section>
	);
}

// ── HomePage ──────────────────────────────────────────────────────────────────
export function HomePage() {
	return (
		<>
			<Hero />
			<Categories />
			<Features />
			<BestSellers />
			<CustomBoxCTA />
			<Reviews />
			<Nosotros />
			<ContactForm />
		</>
	);
}
