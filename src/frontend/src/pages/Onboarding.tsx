import { GoldButton } from "@/components/GoldButton";
import { useAppStore } from "@/store/appStore";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Sparkles,
  Target,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const slides = [
  {
    id: 1,
    icon: Sparkles,
    title: "Welcome to AURA AI",
    subtitle: "Your Premium Personal Assistant",
    description:
      "Experience the future of personal productivity. AURA AI learns your habits and crafts a lifestyle optimized for peak performance.",
    accent: "Powered by AI · Zero Compromise",
  },
  {
    id: 2,
    icon: CalendarDays,
    title: "Master Your Routines",
    subtitle: "Morning to Night, Perfected",
    description:
      "Build powerful daily routines with smart scheduling. From sunrise workouts to evening reflections — every hour has purpose.",
    accent: "Morning · Deep Work · Evening Flow",
  },
  {
    id: 3,
    icon: Target,
    title: "Achieve Your Goals",
    subtitle: "Track, Adapt, Conquer",
    description:
      "Set ambitious goals and watch them become reality. AURA AI tracks your progress and sends intelligent nudges to keep you on track.",
    accent: "Tasks · Goals · Focus Sessions",
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setOnboardingCompleted } = useAppStore();

  const isLast = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      setOnboardingCompleted(true);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleSkip = () => setOnboardingCompleted(true);

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div
      className="min-h-screen min-h-dvh bg-background flex flex-col items-center justify-between px-6 py-8 relative overflow-hidden"
      data-ocid="onboarding.page"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary/5 blur-[80px]" />
      </div>

      {/* Skip button */}
      <div className="w-full flex justify-end relative z-10">
        <button
          type="button"
          onClick={handleSkip}
          className="text-muted-foreground text-sm font-body hover:text-foreground transition-smooth"
          data-ocid="onboarding.skip_button"
        >
          Skip
        </button>
      </div>

      {/* Hero image area */}
      <div className="flex-1 flex items-center justify-center w-full py-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center text-center gap-6 max-w-xs"
          >
            {/* Icon orb */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full glassmorphism gold-glow flex items-center justify-center">
                <img
                  src="/assets/generated/aura-hero.dim_800x800.png"
                  alt="AURA AI"
                  className="w-20 h-20 object-cover rounded-full opacity-70"
                />
                <Icon
                  size={40}
                  className="absolute text-primary drop-shadow-[0_0_8px_oklch(0.70_0.14_58/0.9)]"
                />
              </div>
              <div className="absolute inset-0 rounded-full animate-glow-pulse opacity-60" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <p className="text-xs font-display font-semibold tracking-[0.15em] text-primary uppercase">
                {slide.subtitle}
              </p>
              <h1 className="font-display font-bold text-3xl text-foreground leading-tight">
                {slide.title}
              </h1>
              <p className="font-body text-muted-foreground leading-relaxed text-sm">
                {slide.description}
              </p>
            </div>

            {/* Accent tag */}
            <div className="px-4 py-2 rounded-full glassmorphism border border-primary/20">
              <span className="text-xs font-display text-primary/80 tracking-wide">
                {slide.accent}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="w-full flex flex-col items-center gap-5 relative z-10">
        {/* Dots */}
        <div
          className="flex gap-2"
          role="tablist"
          aria-label="Onboarding steps"
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentSlide(i)}
              role="tab"
              aria-selected={i === currentSlide}
              aria-label={`Step ${i + 1}`}
              data-ocid={`onboarding.dot.${i + 1}`}
              className={`rounded-full transition-smooth ${
                i === currentSlide
                  ? "w-6 h-2 bg-primary gold-glow"
                  : "w-2 h-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <GoldButton
          size="lg"
          onClick={handleNext}
          className="w-full max-w-xs"
          data-ocid="onboarding.continue_button"
        >
          {isLast ? (
            <>
              <Check size={18} />
              Get Started
            </>
          ) : (
            <>
              Continue
              <ArrowRight size={18} />
            </>
          )}
        </GoldButton>

        <p className="text-xs text-muted-foreground font-body">
          Free forever · No subscription required
        </p>
      </div>
    </div>
  );
}
