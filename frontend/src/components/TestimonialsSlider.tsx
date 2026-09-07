import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";

export interface Testimonial {
  name: string;
  role: string;
  loanType: string;
  rating: number;
  quote: string;
  /** Optional image URL for avatar. Falls back to initials if not provided. */
  image?: string;
  /** Avatar background gradient classes (used when no image) */
  avatarBg?: string;
  initials?: string;
}

interface TestimonialsSliderProps {
  items: Testimonial[];
  autoPlay?: boolean;
  intervalMs?: number;
  /** Number of cards visible at once per breakpoint */
  cardsPerView?: { mobile: number; sm: number; lg: number };
}

export default function TestimonialsSlider({
  items,
  autoPlay = true,
  intervalMs = 6000,
  cardsPerView = { mobile: 1, sm: 2, lg: 3 },
}: TestimonialsSliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(cardsPerView.lg);
  const touchStartX = useRef<number | null>(null);
  const count = items.length;
  const maxSlide = Math.max(0, count - perView);

  // Responsive cards per view
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(cardsPerView.mobile);
      else if (w < 1024) setPerView(cardsPerView.sm);
      else setPerView(cardsPerView.lg);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [cardsPerView]);

  // Clamp active when perView changes
  useEffect(() => {
    setActive((a) => Math.min(a, maxSlide));
  }, [maxSlide]);

  const go = useCallback(
    (dir: number) => {
      setActive((prev) => {
        const next = prev + dir;
        if (next < 0) return maxSlide;
        if (next > maxSlide) return 0;
        return next;
      });
    },
    [maxSlide]
  );

  const goTo = useCallback((i: number) => setActive(Math.min(i, maxSlide)), [maxSlide]);

  useEffect(() => {
    if (!autoPlay || paused || maxSlide <= 0) return;
    const id = setInterval(() => {
      setActive((p) => (p >= maxSlide ? 0 : p + 1));
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, paused, maxSlide, intervalMs]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) go(diff > 0 ? -1 : 1);
    touchStartX.current = null;
  }

  if (count === 0) return null;

  const slidePct = 100 / perView;

  return (
    <Reveal>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Slides track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${active * slidePct}%)` }}
          >
            {items.map((t, i) => (
              <div
                key={i}
                className="shrink-0 px-3"
                style={{ width: `${slidePct}%` }}
              >
                <TestimonialCard item={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        {count > perView && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-brand-navy shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-accent hover:text-brand-accent"
            >
              <Icon name="chevron" className="h-5 w-5 rotate-90" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-8 bg-brand-orange"
                      : "w-2.5 bg-brand-line hover:bg-brand-accent/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-brand-navy shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-accent hover:text-brand-accent"
            >
              <Icon name="chevron" className="h-5 w-5 -rotate-90" />
            </button>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const initials = item.initials ?? item.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const avatarBg = item.avatarBg ?? "from-brand-navy to-brand-royal";

  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-brand-line bg-white p-6 shadow-card sm:p-7">
      {/* Decorative quote mark */}
      <span className="pointer-events-none absolute right-5 top-3 font-display text-6xl font-extrabold text-brand-mist select-none">
        &rdquo;
      </span>

      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, s) => (
          <Icon
            key={s}
            name="star"
            className={`h-4 w-4 ${s < item.rating ? "text-brand-orange" : "text-brand-line"}`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3.5 border-t border-brand-line pt-5">
        {/* Avatar with image */}
        <div className="relative shrink-0">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="h-12 w-12 rounded-full object-cover shadow-soft"
            />
          ) : (
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${avatarBg} font-display text-base font-bold text-white shadow-soft`}
            >
              {initials}
            </div>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-brand-green">
            <Icon name="check" className="h-2.5 w-2.5 text-white" />
          </span>
        </div>
        <div className="min-w-0">
          <div className="truncate font-display text-sm font-bold text-brand-navy">{item.name}</div>
          <div className="truncate text-xs text-slate-500">{item.role}</div>
          <div className="mt-1">
            <span className="chip text-[0.65rem]">{item.loanType}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
