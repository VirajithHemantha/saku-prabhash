import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Send, ChevronDown } from "lucide-react";

const INVITATION = {
  couple: {
    bride: "Saku",
    groom: "Prabhash",
    brideFull: "Saku",
    groomFull: "Prabhash",
  },
  date: {
    displayNumeric: "18 . 06 . 2026",
    displayLong: "Wednesday, 18 June 2026",
    countdownTarget: "June 18, 2026 09:00:00",
  },
  time: {
    ceremony: "09:00 AM",
    reception: "04:00 PM",
  },
  venue: {
    name: "Golden Ray Hotel",
    city: "Dambulla",
    mapQuery: "Golden Ray Hotel, Dambulla",
    googleMapsLink: "https://maps.app.goo.gl/6YTHEpHyHr9V1VGn9",
  },
  parents: {
    groomParents: [
      { name: "D.M. Podi Appuhamy" },
      { name: "J.A. Vimala Lakshmi" },
    ],
    brideParents: [
      { name: "P. Rajakrishnan" },
      { name: "R. Sathyabhama" },
    ],
  },
  colorTheme: {
    primary: "#FFFFFF",
    accent: "#FFB6D9",
  },
} as const;

const backgroundMusic = "/01-Alex_Warren_-_Ordinary_(Wedding_version).mp3";

// Google Apps Script Deployment URL
const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxXy9w03rQUf-TFmka-HMF8zPgQMER6QcCMUoIIpxGrbhRkgmoKznTVqOa4-t-YbMTh/exec";

const publicImagePath = (fileName: string) => `/images/${fileName.replaceAll(" ", "%20")}`;

const HERO_BACKGROUND_IMAGE = publicImagePath("1 (4).jpg");
const FEATURED_COUPLE_IMAGE = publicImagePath("1 (6).jpg");

function FloatingPetals() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#ffd1dc", "#fbb6ce", "#f687b3", "#ed64a6", "#ffb7c5"];
    const petalCount = isMobile ? 10 : 18;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_10px_rgba(213,63,140,0.3)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer({ isDark = false }: { isDark?: boolean }) {
  const targetDate = new Date(INVITATION.date.countdownTarget).getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className={`relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] border flex flex-col items-center justify-center overflow-hidden transition-all duration-700 group-hover:-translate-y-3 ${isDark ? "bg-[#d53f8c] border-white/20" : "bg-white border-theme-100/60"
            }`}>
            <div className={`absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] rounded-t-full pointer-events-none ${isDark ? "border-white/30" : "border-theme-300/50"
              }`} />

            {/* The Number */}
            <span className={`text-2xl sm:text-3xl md:text-5xl font-playball leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110 ${isDark ? "text-white" : "text-theme-800"
              }`}>
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className={`text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border shadow-sm whitespace-nowrap ${isDark ? "bg-white/10 text-white border-white/20" : "bg-stone-50 text-stone-500 border-theme-100/50"
                }`}>
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className={`absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 ${isDark ? "bg-white/40" : "bg-theme-300"
              }`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}


export default function WeddingInvitation() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    guests: "1",
  });
  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [wishStatus, setWishStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const introVideoRef = React.useRef<HTMLVideoElement>(null);

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!googleScriptUrl) {
      throw new Error("Google Script URL is not configured");
    }

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      body: new URLSearchParams(payload),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rsvpForm.name.trim()) {
      setRsvpStatus("error");
      return;
    }

    setRsvpStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "rsvp",
        name: rsvpForm.name.trim(),
        guests: rsvpForm.guests,
        dietaryNotes: "",
      });
      setRsvpStatus("success");
      setRsvpForm({ name: "", guests: "1" });
    } catch {
      setRsvpStatus("error");
    }
  };

  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setWishStatus("error");
      return;
    }

    setWishStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "wish",
        name: wishForm.name.trim(),
        message: wishForm.message.trim(),
      });
      setWishStatus("success");
      setWishForm({ name: "", message: "" });
    } catch {
      setWishStatus("error");
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);

  useEffect(() => {
    if (isOpened && !isPlaying && !hasAttemptedAutoplay && audioRef.current) {
      setHasAttemptedAutoplay(true);

      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const playOnInteraction = () => {
            if (audioRef.current && !isPlaying) {
              audioRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                  window.removeEventListener("click", playOnInteraction);
                })
                .catch(() => { });
            }
          };

          window.addEventListener("click", playOnInteraction);
        });
    }
  }, [isOpened, isPlaying, hasAttemptedAutoplay]);

  return (
    <main
      className={`h-[100dvh] w-full bg-[#fdfaf5] transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="video-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              ref={introVideoRef}
              src="/intro_video.mp4"
              muted={!hasStarted}
              playsInline
              preload="auto"
              className={`w-full h-full object-cover transition-all duration-[2000ms] ease-out ${!hasStarted ? "blur-xl scale-110 opacity-60" : "blur-0 scale-100 opacity-100"
                }`}
              onEnded={() => setIsOpened(true)}
              onError={() => setIsOpened(true)}
            />

            {!hasStarted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[120] bg-black/40 backdrop-blur-[2px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12"
                  >
                    <h2 className="font-playball text-4xl md:text-6xl text-white mb-2 drop-shadow-2xl">The Wedding of</h2>
                    <p className="font-cinzel text-xl md:text-2xl text-[#fbb6ce] tracking-[0.3em] uppercase drop-shadow-lg">{INVITATION.couple.bride} & {INVITATION.couple.groom}</p>
                  </motion.div>

                  <button
                    onClick={() => {
                      setHasStarted(true);
                      if (introVideoRef.current) {
                        introVideoRef.current.muted = false;
                        introVideoRef.current.currentTime = 0;
                        introVideoRef.current.play();
                      }
                    }}
                    className="group relative px-12 py-5 overflow-hidden rounded-full transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-[#fbb6ce] opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative z-10 font-cinzel font-bold text-black text-sm tracking-[0.4em] uppercase">Open Invitation</span>
                  </button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8 text-white/50 text-[10px] uppercase tracking-[0.4em]"
                  >
                    Click to begin
                  </motion.div>
                </motion.div>
              </div>
            )}

            {hasStarted && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-start pt-24 md:pt-32 z-[105] pointer-events-none text-center px-6"
                >
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                    className="font-playball text-4xl md:text-7xl text-[#d53f8c] mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                  >
                    Wedding Invitation
                  </motion.h2>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    className="h-1 w-32 md:w-48 bg-[#d53f8c] mb-6"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                    className="font-cinzel text-xl md:text-4xl text-[#d53f8c] tracking-[0.5em] uppercase font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                  >
                    {INVITATION.couple.bride} & {INVITATION.couple.groom}
                  </motion.p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setIsOpened(true)}
                  className="absolute bottom-10 right-10 z-[110] px-8 py-3 bg-white/10 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.4em] rounded-full border border-white/20 hover:bg-white/20 transition-all font-bold"
                >
                  Skip Intro
                </motion.button>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            {/* Sticky Return Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            {/* Hero Section */}
            <section className="w-full relative flex items-center justify-center overflow-hidden bg-white min-h-[85vh]">
              {/* Floral Decorations */}
              <img src="/images/44.png" className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-90 transition-transform duration-1000" alt="" />
              <img src="/images/f.png" className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-90 transition-transform duration-1000" alt="" />

              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(\"${HERO_BACKGROUND_IMAGE}\")` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-white/70" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-b from-theme-50 via-white/70 to-theme-100/40" aria-hidden="true" />
              <div className="relative z-10 w-full max-w-5xl px-6 py-24 md:py-32 text-center">
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 0.75, y: 0 }}
                  className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold text-[#d53f8c]"
                >
                  Wedding Invitation
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.8 }}
                  className="mt-10"
                >
                  <h1 className="font-playball text-6xl sm:text-7xl md:text-8xl text-[#ed64a6] italic leading-none">
                    {INVITATION.couple.bride}
                  </h1>
                  <div className="mt-6 flex items-center justify-center gap-5">
                    <div className="h-px w-14 bg-[#d53f8c]/25" />
                    <span className="font-playball text-4xl md:text-5xl text-[#d53f8c]">&</span>
                    <div className="h-px w-14 bg-[#d53f8c]/25" />
                  </div>
                  <h1 className="mt-6 font-playball text-6xl sm:text-7xl md:text-8xl text-[#ed64a6] italic leading-none">
                    {INVITATION.couple.groom}
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.8 }}
                  className="mt-12 space-y-5"
                >
                  <p className="font-cinzel text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#d53f8c]/70">
                    {INVITATION.date.displayLong} · {INVITATION.time.reception}
                  </p>
                  <p className="text-[#d53f8c]/70 text-xs md:text-sm tracking-[0.15em] font-medium font-cinzel leading-loose max-w-2xl mx-auto">
                    Together with our families, we request the honour of your presence as we celebrate our wedding.
                  </p>

                  <a
                    href="#details"
                    className="inline-flex items-center justify-center gap-2 mt-6 px-8 py-4 bg-[#d53f8c] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] shadow-xl hover:bg-black transition-colors"
                  >
                    View Details
                    <ChevronDown className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>

              {/* Subtle Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1.1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
              >
                <div className="w-px h-14 bg-gradient-to-b from-[#d53f8c]/30 to-transparent rounded-full overflow-hidden">
                  <motion.div
                    animate={{ y: [-56, 56] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-1/2 bg-[#ed64a6]/45"
                  />
                </div>
              </motion.div>
            </section>

            {/* Wedding Details Section */}
            <section id="details" className="relative pt-12 md:pt-20 pb-24 md:pb-32 w-full flex flex-col items-center bg-[#ffd1dc]/10 overflow-hidden">

              {/* Ornate Frame Border Overlay */}
              <div className="absolute inset-4 md:inset-8 border-[1.5px] border-[#4a5d23]/30 pointer-events-none z-10" />
              <div className="absolute inset-5 md:inset-10 border-[0.5px] border-[#c1b199]/20 pointer-events-none z-10" />

              <div className="max-w-[1100px] w-full flex flex-col items-center text-center relative z-20 px-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-16 space-y-6"
                >
                  <div className="flex items-center gap-4 opacity-40">
                    <div className="h-px w-8 bg-[#d53f8c]" />
                    <Sparkles className="w-4 h-4 text-[#ed64a6]" />
                    <div className="h-px w-8 bg-[#d53f8c]" />
                  </div>

                  <div className="text-[#d53f8c] space-y-4">
                    <div className="space-y-4 mb-8">
                      <p className="font-cinzel text-[11px] md:text-sm tracking-[0.4em] mb-2 uppercase font-bold">Two Families Join Hands</p>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="space-y-1">
                          <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#d53f8c]/50">Parents of the Groom</p>
                          <span className="text-sm md:text-base font-cinzel tracking-wider text-stone-700 block">{INVITATION.parents.groomParents[0].name}</span>
                          <span className="text-sm md:text-base font-cinzel tracking-wider text-stone-700 block">{INVITATION.parents.groomParents[1].name}</span>
                        </div>
                        <span className="font-playball text-2xl text-[#ed64a6] italic my-3">Together with</span>
                        <div className="space-y-1">
                          <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#d53f8c]/50">Parents of the Bride</p>
                          <span className="text-sm md:text-base font-cinzel tracking-wider text-stone-700 block">{INVITATION.parents.brideParents[0].name}</span>
                          <span className="text-sm md:text-base font-cinzel tracking-wider text-stone-700 block">{INVITATION.parents.brideParents[1].name}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] md:text-[13px] tracking-[0.2em] md:tracking-[0.4em] uppercase font-medium leading-loose max-w-3xl border-t border-b border-[#ffd1dc]/50 py-6">
                      With hearts full of love, we request the honour of the presence of<br />
                      <span className="text-[#ed64a6] font-bold text-xs md:text-sm my-2 block">Our Honored Guests</span>
                      to celebrate the joyous marriage of our children<br />
                      <span className="text-[#ed64a6] font-bold text-base md:text-xl my-2 block font-playball">{INVITATION.couple.brideFull} & {INVITATION.couple.groomFull}</span>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h2 className="font-cinzel text-xl md:text-2xl text-[#ed64a6] tracking-[0.5em] font-bold uppercase">Wedding Celebration</h2>
                </motion.div>

                {/* Featured couple image */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full max-w-[520px] mx-auto mb-12"
                >
                </motion.div>

                {/* Names Card */}
                <div className="relative w-full flex flex-col items-center justify-center my-12 mb-24">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-20 w-full max-w-[560px] bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(135,147,122,0.2)] border border-[#ffd1dc]/50 flex flex-col items-center justify-center text-center"
                  >
                    <div className="absolute inset-2 border-[0.5px] border-[#ed64a6]/30 pointer-events-none" />

                    <div className="space-y-5 mb-10">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[9px] uppercase tracking-[0.6em] font-bold text-[#d53f8c]/50">Bride</span>
                        <h3 className="text-5xl md:text-7xl font-playball text-[#ed64a6] leading-none">{INVITATION.couple.bride}</h3>
                      </div>
                    </div>

                    <div className="py-2 flex items-center justify-center w-full relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-[#ffd1dc]/50"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-6 font-playball text-4xl text-[#ed64a6]">With</span>
                      </div>
                    </div>

                    <div className="space-y-5 mt-10">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[9px] uppercase tracking-[0.6em] font-bold text-[#d53f8c]/50">Groom</span>
                        <h3 className="text-5xl md:text-7xl font-playball text-[#ed64a6] leading-none">{INVITATION.couple.groom}</h3>
                      </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 w-full text-left">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#ed64a6]/20 flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4 text-[#ed64a6]" />
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#d53f8c]/40 font-cinzel">Date</div>
                          <div className="text-sm md:text-base text-[#d53f8c] font-cinzel tracking-wide font-bold">{INVITATION.date.displayLong}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#ed64a6]/20 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-[#ed64a6]" />
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#d53f8c]/40 font-cinzel">Time</div>
                          <div className="text-sm md:text-base text-[#d53f8c] font-cinzel tracking-wide font-bold">{INVITATION.time.ceremony} - {INVITATION.time.reception}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#ed64a6]/20 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-[#ed64a6]" />
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#d53f8c]/40 font-cinzel">Venue</div>
                          <div className="text-sm md:text-base text-[#d53f8c] font-cinzel tracking-wide font-bold">{INVITATION.venue.name}, {INVITATION.venue.city}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>



            {/* Schedule Section (No Images) */}
            <section className="relative py-20 md:py-28 bg-white overflow-hidden">
              <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6 mb-12"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[#d53f8c] font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs opacity-50">THE DAY</span>
                    <div className="h-px w-16 bg-[#ed64a6]/30" />
                  </div>
                  <h2 className="font-playball text-5xl md:text-7xl bg-gradient-to-r from-[#ed64a6] via-[#d53f8c] to-[#ed64a6] bg-clip-text text-transparent leading-none drop-shadow-sm italic">Schedule</h2>
                  <p className="text-[#d53f8c]/70 text-xs md:text-sm tracking-[0.3em] font-medium uppercase font-cinzel max-w-2xl mx-auto pt-2 leading-loose">
                    A simple outline of the celebration.
                  </p>
                </motion.div>

                <div className="mx-auto max-w-2xl text-left bg-[#fdfaf5] border border-[#ffd1dc]/40 shadow-[0_30px_70px_-20px_rgba(135,147,122,0.15)]">
                  <div className="p-8 md:p-12 space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-[#ed64a6]/20 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-[#ed64a6]" />
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#d53f8c]/40 font-cinzel">Date</div>
                        <div className="text-sm md:text-base text-[#d53f8c] font-cinzel tracking-wide font-bold">{INVITATION.date.displayLong}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-[#ed64a6]/20 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-[#ed64a6]" />
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#d53f8c]/40 font-cinzel">Ceremony Time</div>
                        <div className="text-sm md:text-base text-[#d53f8c] font-cinzel tracking-wide font-bold">{INVITATION.time.ceremony} - {INVITATION.time.reception}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-[#ed64a6]/20 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#ed64a6]" />
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#d53f8c]/40 font-cinzel">Venue</div>
                        <div className="text-sm md:text-base text-[#d53f8c] font-cinzel tracking-wide font-bold">{INVITATION.venue.name}, {INVITATION.venue.city}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Countdown Section */}
            <section className="relative py-28 md:py-48 bg-[#d53f8c] flex flex-col items-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Decorative Shapes */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -top-24 -right-24 w-96 h-96 bg-white blur-[100px] rounded-full pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-white blur-[100px] rounded-full pointer-events-none"
              />

              <div className="w-full max-w-[1200px] px-6 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative mb-20"
                >
                  {/* Backdrop Title */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[18vw] md:text-[220px] text-white/5 whitespace-nowrap pointer-events-none select-none tracking-wider">
                    Eternity
                  </div>

                  {/* Main Title Container */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "80px" }}
                      viewport={{ once: true }}
                      className="h-px bg-white/40 mb-8"
                    />

                    <h2 className="font-cinzel text-3xl md:text-6xl text-white tracking-[0.25em] md:tracking-[0.4em] font-bold uppercase leading-tight">
                      SAVE <span className="mx-2 md:mx-4 text-[#fbb6ce]">THE</span> DATE
                    </h2>

                    <div className="mt-10 flex items-center justify-center gap-6">
                      <div className="h-[0.5px] w-8 md:w-16 bg-[#fbb6ce]/50" />
                      <span className="font-playball text-3xl md:text-5xl text-[#fbb6ce] drop-shadow-md">{INVITATION.date.displayNumeric}</span>
                      <div className="h-[0.5px] w-8 md:w-16 bg-[#fbb6ce]/50" />
                    </div>
                  </div>
                </motion.div>

                {/* Countdown Component with Dark Theme */}
                <CountdownTimer isDark={true} />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.8 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="mt-20 flex flex-col items-center gap-4"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-white font-bold text-center">
                    Wait for the magic
                  </p>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        className="w-1 h-1 bg-[#fbb6ce] rotate-45"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>


            {/* Venue Location Section */}
            <section className="relative py-28 md:py-48 bg-[#fdfaf5] overflow-hidden">
              {/* Floral Decorations */}
              <img src="/images/44.png" className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />
              <img src="/images/f.png" className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />

              {/* Decorative Geometric Elements (CSS-Based UI Decorations) */}
              <div className="absolute -top-24 -left-24 w-[500px] h-[500px] border border-[#ed64a6]/10 rounded-full flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-[80%] h-[80%] border border-[#d53f8c]/10 rounded-full" />
                <div className="w-[60%] h-[60%] border border-[#ed64a6]/10 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#ed64a6]/20 to-transparent rotate-45" />
              </div>

              <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-10 mb-24"
                >
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-[#d53f8c] font-bold uppercase tracking-[0.8em] text-[10px] md:text-xs opacity-40">T H E · V E N U E</span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`w-1.5 h-1.5 rotate-45 ${i === 2 ? "bg-[#ed64a6]" : "bg-[#d53f8c]/20"}`} />
                      ))}
                    </div>
                  </div>

                  <h2 className="font-cinzel text-5xl md:text-9xl bg-gradient-to-br from-[#ed64a6] to-[#b83280] bg-clip-text text-transparent leading-tight font-light uppercase tracking-tight relative">
                    {INVITATION.venue.name.split(" ")[0].toUpperCase()} <span className="block md:inline font-playball normal-case text-4xl md:text-8xl bg-gradient-to-r from-[#d53f8c] to-[#ed64a6] bg-clip-text text-transparent md:-ml-8 relative z-10 translate-y-4 md:translate-y-0 italic drop-shadow-sm">{INVITATION.venue.name.split(" ").slice(1).join(" ")}</span>
                  </h2>

                  <div className="max-w-xl mx-auto pt-10 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[#ffd1dc]" />
                    <p className="text-[#d53f8c]/80 text-sm md:text-base tracking-[0.2em] font-medium uppercase font-cinzel leading-loose pt-8">
                      WHERE TRADITION MEETS THE BEAUTY OF NEW BEGINNINGS
                    </p>
                  </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                  {/* Left: Atmospheric Location Card */}
                  <div className="lg:col-span-5 text-left order-2 lg:order-1">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="bg-white p-10 md:p-16 shadow-[0_60px_100px_-40px_rgba(135,147,122,0.2)] border border-[#ffd1dc]/30 relative group"
                    >
                      {/* Interactive hover ornament */}
                      <div className="absolute inset-2 border-[0.5px] border-[#ed64a6]/20 pointer-events-none group-hover:border-[#ed64a6]/40 transition-colors duration-700" />

                      <div className="space-y-12 relative z-10">
                        <div className="space-y-6">
                          <p className="text-[#d53f8c] text-xl md:text-2xl font-light italic leading-relaxed font-playball text-center lg:text-left">
                            "May our celebration be as infinite as the ocean and as warm as the tropical sun."
                          </p>
                          <div className="h-0.5 w-12 bg-[#ffd1dc]/60 mx-auto lg:ml-0" />
                        </div>

                        <div className="space-y-10">
                          <div className="flex items-start gap-8">
                            <div className="w-12 h-12 rounded-full border border-[#ed64a6]/20 flex items-center justify-center shrink-0">
                              <MapPin className="w-5 h-5 text-[#ed64a6]" />
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-[#d53f8c]/40 font-bold text-[10px] uppercase tracking-[0.5em] font-cinzel">The Destination</h4>
                              <p className="text-xl md:text-2xl text-[#d53f8c] font-cinzel leading-relaxed tracking-wide font-bold">
                                {INVITATION.venue.name}, {INVITATION.venue.city}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-8">
                            <div className="w-12 h-12 rounded-full border border-[#ed64a6]/20 flex items-center justify-center shrink-0">
                              <Clock className="w-5 h-5 text-[#ed64a6]" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-[#d53f8c]/40 font-bold text-[10px] uppercase tracking-[0.5em] font-cinzel">Ceremony Time</h4>
                              <p className="text-xl md:text-2xl text-[#d53f8c] font-cinzel leading-relaxed tracking-wide font-bold">
                                {INVITATION.time.ceremony} - {INVITATION.time.reception}
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => window.open(INVITATION.venue.googleMapsLink, "_blank")}
                          className="w-full group relative inline-flex items-center justify-center gap-4 py-6 bg-[#d53f8c] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] overflow-hidden transition-all hover:bg-black shadow-xl mt-4"
                        >
                          <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                          <span className="relative z-10 flex items-center gap-3">
                            <MapPin className="w-4 h-4" />
                            Launch Digital Map
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: Architectural Map Frame */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "circOut" }}
                      className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.25)] group bg-white"
                    >
                      {/* The Map */}
                      <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(INVITATION.venue.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full transition-all duration-1000 scale-[1.02] group-hover:scale-100"
                      />

                      {/* Decorative Frame Overlays */}
                      <div className="absolute inset-0 pointer-events-none border-[15px] md:border-[25px] border-white/95 rounded-[3rem]" />
                      <div className="absolute inset-8 md:inset-12 pointer-events-none border border-white/20 rounded-[2.5rem]" />

                      {/* Arched Corner Floating Element (No image used) */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center rounded-bl-full shadow-2xl p-8 transform translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700">
                        <MapPin className="w-8 h-8 text-[#d53f8c] mb-2 opacity-80" />
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#d53f8c]/50">Explore</span>
                      </div>

                      {/* Subtle lens flare overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#ed64a6]/5 to-transparent mix-blend-overlay" />
                    </motion.div>

                    {/* Bottom Floating Card Decoration */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="inline-flex items-center gap-4 mt-8 px-8 py-3 bg-white border border-[#ffd1dc]/40 shadow-lg rounded-full"
                    >
                      <Sparkles className="w-4 h-4 text-[#ed64a6]" />
                      <span className="text-[10px] md:text-xs font-bold text-[#d53f8c] uppercase tracking-widest">{INVITATION.venue.city}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* RSVP Section (No Images) */}
            <section className="relative py-32 md:py-48 bg-[#f8f6f2] flex flex-col items-center overflow-hidden">
              <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center relative z-10 w-full">
                {/* Heading exactly like image */}
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-cinzel text-2xl md:text-4xl text-slate-800 tracking-[0.3em] mb-12 uppercase text-center"
                >
                  RSVP
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="relative w-full max-w-[650px] bg-white p-6 md:p-10 shadow-[0_40px_100px_-25px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col items-center"
                >
                  {/* Inner rounded border frame exactly like the image mockup */}
                  <div className="w-full border border-slate-300 rounded-[1.5rem] p-6 md:p-8 flex flex-col items-center">
                    <h3 className="font-playball text-2xl md:text-4xl text-slate-800 mb-8 text-center">RSVP Confirmation</h3>

                    <form className="w-full space-y-6 text-left" onSubmit={handleRsvpSubmit}>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 ml-1">Your Name</label>
                        <input
                          type="text"
                          placeholder="Type your name here..."
                          value={rsvpForm.name}
                          onChange={(e) => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, name: e.target.value }));
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all font-cinzel text-base"
                          required
                        />
                      </div>

                      <div className="space-y-4 pt-2">
                        <label className="text-xs font-bold text-slate-500 ml-1">Will you join us on our big day?</label>

                        <button
                          type="button"
                          onClick={() => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, guests: "1" }));
                          }}
                          aria-pressed={rsvpForm.guests !== "0"}
                          className="w-full bg-[#f3f3f3] hover:bg-slate-200 text-slate-700 py-5 md:py-6 rounded-xl font-cinzel text-[11px] md:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center px-4 leading-relaxed active:scale-[0.98]"
                        >
                          Yes, I'll be there!
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, guests: "0" }));
                          }}
                          aria-pressed={rsvpForm.guests === "0"}
                          className="w-full bg-[#f3f3f3] hover:bg-slate-200 text-slate-700 py-5 md:py-6 rounded-xl font-cinzel text-[11px] md:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center px-4 leading-relaxed active:scale-[0.98]"
                        >
                          Sadly I can't attend, but you're in my heart
                        </button>
                      </div>

                      {(rsvpStatus === "success" || rsvpStatus === "error") && (
                        <p className={`text-[10px] text-center font-semibold ${rsvpStatus === "success" ? "text-emerald-600" : "text-red-500"}`}>
                          {rsvpStatus === "success" ? "RSVP sent successfully." : "Please enter your name and try again."}
                        </p>
                      )}

                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={rsvpStatus === "sending"}
                          className="w-full bg-[#d53f8c] text-white py-4 md:py-5 rounded-xl font-cinzel text-xs md:text-sm tracking-[0.2em] font-bold hover:bg-[#1a5c4a] transition-all shadow-md uppercase disabled:opacity-70"
                        >
                          {rsvpStatus === "sending" ? "SENDING..." : "CLICK HERE TO CONFIRM"}
                        </button>
                        <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed">No shared details will be public. Your response is private.</p>
                      </div>
                    </form>
                  </div>
                </motion.div>


              </div>
            </section>

            {/* Wishing Section */}
            <section className="relative py-28 md:py-48 bg-[#fdfaf5] overflow-hidden">
              {/* Floral Decorations */}
              <img src="/images/44.png" className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />
              <img src="/images/f.png" className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />

              {/* Large Background Text Ornament */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[15vw] text-[#ed64a6]/5 whitespace-nowrap pointer-events-none select-none italic">
                Sweet Messages
              </div>

              <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6 mb-20"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[#d53f8c] font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs opacity-50">GUESTBOOK</span>
                    <div className="h-px w-16 bg-[#ed64a6]/30" />
                  </div>

                  <h2 className="font-playball text-5xl md:text-8xl bg-gradient-to-r from-[#ed64a6] via-[#d53f8c] to-[#ed64a6] bg-clip-text text-transparent leading-none drop-shadow-sm italic">
                    Best Wishes
                  </h2>

                  <p className="text-[#d53f8c]/70 text-xs md:text-sm tracking-[0.3em] font-medium uppercase font-cinzel max-w-xl mx-auto pt-4 leading-loose">
                    Your love and presence are the greatest gifts. If you wish to leave a note, we'd be honored.
                  </p>
                </motion.div>

                {/* Refined Stationery Form */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="bg-white p-10 md:p-20 shadow-[0_40px_100px_-20px_rgba(135,147,122,0.15)] border border-[#ffd1dc]/40 relative overflow-hidden">
                    {/* Inner elegant border */}
                    <div className="absolute inset-4 border border-[#ffd1dc]/20 pointer-events-none" />
                    <div className="absolute inset-6 border-[0.5px] border-[#ed64a6]/10 pointer-events-none" />

                    {/* Corner Ornaments */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#ed64a6]/40 rounded-tl-xl" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#ed64a6]/40 rounded-br-xl" />

                    <form className="space-y-16 text-left relative z-10" onSubmit={handleWishSubmit}>
                      <div className="space-y-6 group">
                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d53f8c]/40 group-focus-within:text-[#ed64a6] transition-colors">
                          From
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="YOUR NAME"
                            value={wishForm.name}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#ffd1dc]/60 px-0 py-4 text-[#d53f8c] placeholder:text-[#ffd1dc]/30 focus:outline-none focus:border-[#d53f8c] transition-all font-cinzel text-xl tracking-widest uppercase"
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d53f8c] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                      </div>

                      <div className="space-y-6 group">
                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d53f8c]/40 group-focus-within:text-[#ed64a6] transition-colors">
                          Your Message
                        </label>
                        <div className="relative">
                          <textarea
                            rows={4}
                            placeholder="WISHES FOR THE NEWLYWEDS..."
                            value={wishForm.message}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, message: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#ffd1dc]/60 px-0 py-4 text-[#d53f8c] placeholder:text-[#ffd1dc]/30 focus:outline-none focus:border-[#d53f8c] transition-all font-cinzel text-lg tracking-widest resize-none leading-relaxed"
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d53f8c] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                      </div>

                      {/* Success/Error States */}
                      <AnimatePresence>
                        {(wishStatus === "success" || wishStatus === "error") && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`text-[10px] text-center font-bold tracking-widest uppercase ${wishStatus === "success" ? "text-emerald-600" : "text-red-500"}`}
                          >
                            {wishStatus === "success" ? "Message sent with love" : "Please complete the form"}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <div className="pt-8 flex justify-center">
                        <button
                          type="submit"
                          disabled={wishStatus === "sending"}
                          className="group relative px-16 py-6 bg-[#d53f8c] text-white font-bold uppercase tracking-[0.5em] text-[10px] hover:bg-slate-900 transition-all duration-500 shadow-xl disabled:opacity-70 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                          <span className="relative z-10 flex items-center gap-3">
                            <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            {wishStatus === "sending" ? "Sending..." : "Send Wishes"}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Closing Section (No Images) */}
            <section className="w-full relative overflow-hidden bg-[#fdfaf5] py-24 md:py-32">
              <div className="container mx-auto px-6 max-w-5xl text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-center gap-3 opacity-70">
                    <div className="h-px w-10 bg-[#d53f8c]/20" />
                    <Sparkles className="w-4 h-4 text-[#ed64a6]" />
                    <div className="h-px w-10 bg-[#d53f8c]/20" />
                  </div>

                  <h2 className="font-playball text-5xl md:text-7xl bg-gradient-to-r from-[#ed64a6] via-[#d53f8c] to-[#ed64a6] bg-clip-text text-transparent italic">Thank You</h2>
                  <p className="text-[#d53f8c]/70 text-xs md:text-sm tracking-[0.25em] font-medium uppercase font-cinzel leading-loose max-w-3xl mx-auto">
                    We look forward to celebrating with you.
                  </p>

                  <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#d53f8c]/50 font-bold">
                    © 2026 {INVITATION.couple.bride} & {INVITATION.couple.groom}
                  </p>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={backgroundMusic} loop />

      {/* Music Control Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[60] bg-white text-[#87937a] p-3 rounded-full shadow-lg border border-[#ccbaa2]/40 hover:bg-[#87937a]/10 transition-colors"
      >
        <div className="flex flex-col items-center">
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
          )}
        </div>
      </motion.button>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #ccbaa233;
        }
        ::-webkit-scrollbar-thumb {
          background: #87937a66;
          border-radius: 10px;
        }
      `}} />
    </main >
  );
}
