"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

type Message = {
  name: string;
  message: string;
  timestamp?: string;
};

const navItems = [
  { href: "#our-stories", label: "Our Stories" },
  { href: "#journey", label: "The Journey of Falling in Love" },
  { href: "#album", label: "Album" },
  { href: "#party", label: "Party" },
];

const featuredImages = [
  { src: "/media/f1.jpg", label: "Khoảnh khắc ngọt ngào Red Velvet" },
  { src: "/media/f2.jpg", label: "Sưởi ấm nhau dưới bình minh Tuy Hòa" },
  { src: "/media/f3.jpg", label: "Sưởi ấm nhau dưới bình minh Tuy Hòa" },
  { src: "/media/f4.jpg", label: "Sưởi ấm nhau dưới bình minh Tuy Hòa" },
];

const heroSlides = featuredImages.map(({ src, label }) => ({
  src,
  alt: label,
}));


const storySnapshots = [
  {
    src: "/media/s1.jpg",
    label: "Bước chân đầu tiên trên cát trắng kể từ ngày gặp nhau.",
  },
  {
    src: "/media/s2.jpg",
    label: "Hòa mình trong mùi hoa giấy ngọt ngào của Phú Yên.",
  },
  {
    src: "/media/s3.jpg",
    label: "Một cái nhìn thật lâu khiến tim đập rộn ràng.",
  },
  {
    src: "/media/s4.jpg",
    label: "Khi sân khấu ngoài trời chỉ còn lại chúng mình.",
  },

  {
    src: "/media/s5.jpg",
    label: "Bước chân đầu tiên trên cát trắng kể từ ngày gặp nhau.",
  },
  {
    src: "/media/s6.jpg",
    label: "Hòa mình trong mùi hoa giấy ngọt ngào của Phú Yên.",
  },
  {
    src: "/media/s7.jpg",
    label: "Khi sân khấu ngoài trời chỉ còn lại chúng mình.",
  },

  {
    src: "/media/s8.jpg",
    label: "Bước chân đầu tiên trên cát trắng kể từ ngày gặp nhau.",
  },
  {
    src: "/media/s9.jpg",
    label: "Hòa mình trong mùi hoa giấy ngọt ngào của Phú Yên.",
  },
  {
    src: "/media/f2.jpg",
    label: "Một cái nhìn thật lâu khiến tim đập rộn ràng.",
  },
  {
    src: "/media/gr-min.jpg",
    label: "Khi sân khấu ngoài trời chỉ còn lại chúng mình.",
  },
  {
    src: "/media/s3.jpg",
    label: "Khi sân khấu ngoài trời chỉ còn lại chúng mình.",
  },
];

const marqueeImages = [{
  src: "/media/t1-min.jpg",
  label: "Bình minh Tuy Hòa",
}, {
  src: "/media/t2-min.jpg",
  label: "Cát trắng kể chuyện",
}, {
  src: "/media/t3-min.jpg",
  label: "Hương hoa giấy",
}, {
  src: "/media/t4-min.JPG",
  label: "Bình minh Tuy Hòa",
},
{
src: "/media/t5-min.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/t6-min.JPG",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/t7-min.JPG",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/t8-min.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/t9-min.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/t10-min.JPG",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/t11-min.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/t12-min.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/t13-min.jpg",
  label: "Bình minh Tuy Hòa",
},  
  {
    src: "/media/t14-min.jpg",
    label: "Bình minh Tuy Hòa",
  },
  {
    src: "/media/t15-min.jpg",
    label: "Bình minh Tuy Hòa",
  },
];



const collageImages = [
 "/media/doi/1-min.jpg",
 "/media/doi/2-min.jpg",
 "/media/doi/4-min.jpg",
 "/media/doi/6-min.jpg",
 "/media/doi/7-min.jpg",
 "/media/doi/10-min.jpg",
 "/media/doi/11-min.jpg",
 "/media/doi/12-min.jpg",
 "/media/doi/13-min.jpg",
 "/media/doi/15-min.jpg",
];

const journeyAlbumSlides = [
  {
    src: "/media/journey/donghanh-5.jpg",
    date: "16.8.2024",
    title: "Lần đầu gặp mặt",
    caption: "Trong sự lịch sự và tinh tế, chúng mình đã bắt đầu câu chuyện của mình.",
  },
  {
    src: "/media/journey/ngoloi-min.jpg",
    date: "30.9.2024",
    title: "Ngỏ lời",
    caption: "Một lời tỏ tình giản dị nhưng đầy chân thành, mở ra hành trình tìm thấy phiên bản tốt nhất của chính mình vì nhau.",
  },
  {
    src: "/media/journey/donghanh-8.jpg",

    title: "Đồng Hành",
    caption: "Qua những chuyến đi, mọi cung bậc cảm xúc, chúng tôi học cách tôn trọng và nâng niu từng cảm nhận của đối phương.",
  },
  {
    src: "/media/journey/donghanh-7.jpg",
    title: "Đồng Hành",
    caption: "Qua những chuyến đi, mọi cung bậc cảm xúc, chúng tôi học cách tôn trọng và nâng niu từng cảm nhận của đối phương.",
  },
  {
    src: "/media/journey/donghanh-4.jpg",
    title: "Hạnh phúc",
    caption: "Qua những chuyến đi, mọi cung bậc cảm xúc, chúng tôi học cách tôn trọng và nâng niu từng cảm nhận của đối phương.",
  },
  {
    src: "/media/journey/donghanh-1.jpg",
    title: "Hạnh phúc",
    caption: "Qua những chuyến đi, mọi cung bậc cảm xúc, chúng tôi học cách tôn trọng và nâng niu từng cảm nhận của đối phương.",
  },
  {
    src: "/media/journey/cauhon.jpg",
    date: "30.10.2025",
    title: "Cầu hôn",
    caption: "Khoảnh khắc cầu hôn xúc động, lời hứa cho chặng đường sắp tới.",
  },
  {
    src: "/media/journey/donghanh-2.jpg",
    date: "05.12.2025",
    title: "Đính hôn",
    caption: "Khoảnh khắc đặc biệt đánh dấu hành trình của hai đứa đến một chặng đường mới – chính thức về chung một nhà.",
  },
];

const partyEvents = [
  {
    title: "Tiệc Nhà Gái · Phú Yên",
    date: "24 · Tháng 01 ·2026",
    time: "17:00",
    venue: "Khách sạn Công Đoàn, 53 Độc Lập, Phường 7, Tuy Hòa, Phú Yên",
    map: "https://maps.app.goo.gl/XcVFcoLNJS8FdC3G9?g_st=ipc",
  },
  {
    title: "Tiệc Nhà Trai · Ninh Thuận",
    date: "29 · Tháng 01 · 2026",
    time: "17:00",
    venue: "Khách sạn Sài Gòn Ninh Chữ, 19 An Dương Vương, TT. Khánh Hải, Ninh Hải, Ninh Thuận",
    map: "https://maps.app.goo.gl/R7WRbBAQdxkGZ9QF9?g_st=ipc",
  },
];

const ensureExternalUrl = (url: string): string => {
  if (!url) return "#";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  return `https://${url.replace(/^\/+/, "")}`;
};

const getTimestampValue = (timestamp?: string) => {
  if (!timestamp) return 0;
  const parsed = Date.parse(timestamp);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const sortBlessingsByLatest = (entries: Message[]) =>
  [...entries].sort((a, b) => getTimestampValue(b.timestamp) - getTimestampValue(a.timestamp));

const musicUrl = "/media/audio/wedding.webm";
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
  viewport: { once: true, amount: 0.3 },
});

type ParallaxSectionProps = {
  id?: string;
  backgroundSrc: string;
  priority?: boolean;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  children: ReactNode;
};

function ParallaxSection({
  id,
  backgroundSrc,
  priority = false,
  className = "",
  contentClassName = "",
  overlayClassName = "bg-linear-to-br from-white/25 via-white/30 to-white/40",
  children,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-15% 0px",
  });

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative isolate overflow-hidden rounded-[40px] shadow-glow-soft ${className}`}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ scale: 1.05, y: 60, opacity: 0 }}
        animate={
          isInView
            ? {
                scale: 1,
                y: 0,
                opacity: 1,
              }
            : undefined
        }
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src={backgroundSrc}
          alt=""
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className={`relative h-full w-full ${overlayClassName}`}>
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(sortBlessingsByLatest([]));
  const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
  const [attendanceForm, setAttendanceForm] = useState({
    name: "",
    joinAt: [] as string[],
    message: "",
    guests: "1",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeStorySlide, setActiveStorySlide] = useState(0);
  const [storyModal, setStoryModal] = useState<{
    src: string;
    caption?: string;
  } | null>(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCountdownReady, setIsCountdownReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const journeyAlbumRef = useRef<HTMLElement | null>(null);
  const journeySlidesRefs = useRef<HTMLDivElement[]>([]);
  const heroCtaRefs = useRef<HTMLAnchorElement[]>([]);
  const [letterOpened, setLetterOpened] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const galleryTextAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeInOut" as const },
    },
  };
  const galleryItemAnimation = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" as const },
    },
  };
  const textReveal = (delay = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: "easeInOut" as const, delay },
    viewport: { once: true, amount: 0.5 },
  });

  const buttonHover = {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.96 },
  };

  const joinOptions = useMemo(
    () => [
    
      {
        value: "Nhà Gái (Phú Yên)",
        label: "Nhà gái · Phú Yên",
        date: "24 · 01 · 2026 · 17:00",
      },
      {
        value: "Nhà Trai (Ninh Thuận)",
        label: "Nhà trai · Ninh Thuận",
                      date: "29 · 01 · 2026 · 17:00",
      },
    ],
    []
  );
  const storySnapshotGroups = useMemo(() => {
    const size = 4;
    const groups = [];
    for (let i = 0; i < storySnapshots.length; i += size) {
      groups.push(storySnapshots.slice(i, i + size));
    }
    return groups;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStorySlide((prev) => (prev + 1) % storySnapshotGroups.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [storySnapshotGroups.length]);

  useEffect(() => {
    const elements = heroCtaRefs.current.filter(Boolean);
    if (!elements.length) return;
    gsap.fromTo(
      elements,
      { y: 20, opacity: 0, rotateX: -15 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.3,
      }
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const fetchLatestMessages = useCallback(async () => {
    try {
      const response = await fetch(`/api/messages?ts=${Date.now()}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Unable to load blessings");
      const data = await response.json();
      if (Array.isArray(data.messages) && data.messages.length) {
        return sortBlessingsByLatest(data.messages);
      }
    } catch (error) {
      console.warn("Failed to refresh blessings", error);
    }
    return null;
  }, []);

  // Fetch blessings from API
  useEffect(() => {
    let isMounted = true;
    const fetchMessages = async () => {
      const latest = await fetchLatestMessages();
      if (latest && isMounted) {
        setMessages(latest);
      }
      if (isMounted) {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
    return () => {
      isMounted = false;
    };
  }, [fetchLatestMessages]);

  // Countdown helper
  useEffect(() => {
    const target = new Date("2026-02-02T17:00:00+07:00").getTime();
    const calcCountdown = () => {
      const now = Date.now();
      let diff = target - now;
      if (diff < 0) diff = 0;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
      setIsCountdownReady(true);
    };
    calcCountdown();
    const timer = setInterval(calcCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Preload gallery assets so modal opens without re-fetching
  useEffect(() => {
    if (typeof window === "undefined") return;
    const preloadedImages = collageImages.map((src) => {
      const img = new window.Image();
      img.src = src;
      return img;
    });
    return () => {
      preloadedImages.forEach((img) => {
        img.src = "";
      });
    };
  }, []);

  const attemptAudioPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      await audio.play();
      setAudioUnlocked(true);
      return true;
    } catch {
      return false;
    }
  }, []);

  // Background music autoplay
  useEffect(() => {
    if (!letterOpened) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;

    let disposed = false;

    const handleInteraction = async () => {
      if (disposed || audioUnlocked) return;
      const success = await attemptAudioPlayback();
      if (success) {
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("touchstart", handleInteraction);
      }
    };

    attemptAudioPlayback().then((success) => {
      if (!success) {
        document.addEventListener("click", handleInteraction, { passive: true });
        document.addEventListener("touchstart", handleInteraction, { passive: true });
      }
    });

    return () => {
      disposed = true;
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      audio.pause();
    };
  }, [letterOpened, attemptAudioPlayback, audioUnlocked]);

  useEffect(() => {
    if (!letterOpened) return;
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const section = journeyAlbumRef.current;
    if (!section) return;
    const slides = journeySlidesRefs.current.filter(Boolean);
    if (!slides.length) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 640px)", () => {
      gsap.set(slides, { opacity: 0, position: "absolute", inset: 0 });
      gsap.set(slides[0], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${slides.length * 1500}`,
          scrub: true,
          pin: true,
        },
      });

      slides.forEach((slide, index) => {
        tl.fromTo(
          slide,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
          },
          index === 0 ? 0 : ">+0.4"
        );
        if (index < slides.length - 1) {
          tl.to(
            slide,
            { opacity: 0, scale: 1.05, duration: 1, ease: "power2.in" },
            ">0.8"
          );
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, [letterOpened]);


  const handleStoryClick = (story: { src: string; caption?: string }) => {
    setStoryModal(story);
  };

  journeySlidesRefs.current = [];

  const toggleJoinOption = (value: string) => {
    setAttendanceForm((prev) => {
      const exists = prev.joinAt.includes(value);
      return {
        ...prev,
        joinAt: exists
          ? prev.joinAt.filter((party) => party !== value)
          : [...prev.joinAt, value],
      };
    });
  };

  const handleRsvpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = attendanceForm.name.trim();
    const trimmedMessage = attendanceForm.message.trim();
    if (!trimmedName || !trimmedMessage) return;
    const selectedAttend = attendanceForm.joinAt.join(", ") || "Chưa chọn";
    const guestCount = attendanceForm.guests;
    const normalizedName = trimmedName || "Bạn ẩn danh";
    const optimisticEntry: Message = {
      name: normalizedName,
      message: trimmedMessage,
      timestamp: new Date().toISOString(),
    };
    setFormStatus("loading");
    try {
      const messageResponse = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          message: trimmedMessage,
          attend: selectedAttend,
          guests: guestCount,
        }),
        cache: "no-store",
      });

      if (!messageResponse.ok) {
        throw new Error("Failed to save blessing");
      }

      const messageData = await messageResponse.json();
      let updatedMessages: Message[] | null = null;

      if (Array.isArray(messageData.messages) && messageData.messages.length) {
        updatedMessages = messageData.messages;
      } else {
        updatedMessages = await fetchLatestMessages();
      }

      if (updatedMessages && updatedMessages.length) {
        const alreadyIncluded = updatedMessages.some(
          (entry) =>
            entry.message.trim() === trimmedMessage &&
            (entry.name || "Bạn ẩn danh").trim() === normalizedName.trim()
        );
        const nextList = alreadyIncluded
          ? updatedMessages
          : [optimisticEntry, ...updatedMessages];
        setMessages(sortBlessingsByLatest(nextList));
      } else {
        setMessages((prev) => sortBlessingsByLatest([optimisticEntry, ...prev]));
      }

      setAttendanceForm({
        name: "",
        joinAt: [],
        message: "",
        guests: "1",
      });
      setFormStatus("success");
    } catch (error) {
      console.error(error);
      setFormStatus("error");
    }
  };

  const heartEmojis = ['❤️', '💙', '💜', '💛', '💚', '🧡', '🤎', '🖤', '🤍', '💖', '💘', '💝'];

  function openLetter() {
    setLetterOpened(true);
    attemptAudioPlayback();
    document.getElementById("letter")?.classList.add("show");
    document.getElementById("mailWrapper")?.classList.add("hide");
    startContinuousHeartRain();
  }

  function startContinuousHeartRain() {
      setInterval(() => {
          createHeart();
      }, 200); // Hearts keep falling every 200ms
  }

  function createHeart() {
      const heartContainer = document.getElementById("heartRain");
      const heart = document.createElement("span");
      heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.animationDuration = (Math.random() * 3 + 2) + "s"; // Random fall speed
      heartContainer?.appendChild(heart);

      // Remove heart after it falls
      setTimeout(() => heart.remove(), 5000);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterOpened(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (

    <>
    {!letterOpened && (
<div className="animation-love animation-love1 anibg-sm sm:anibg flex flex-col h-[30vh]">


<div className="flex flex-col items-center justify-center bg-over">
<div className="font size-big text-center">Quốc Hoàng & Ngọc Đăng</div>
<hr style={{ height: "2px", backgroundColor: "black", border: "none", margin: "1rem 0", fontFamily: "'UTM-Azkia.ttf', sans-serif" }} />
     <div className="intro-title">Thư mời thiệp cưới</div>
      <div className="mail-wrapper top30 flex flex-col items-center justify-center pt-10" id="mailWrapper" onClick={openLetter}>
        <div className="heart">💌</div>
    </div>
</div>

    <div className="letter" id="letter">
        <p>You&apos;re the reason hearts keep falling all around! 💕</p>
        <div className="small-hearts">
            <span>❤️</span><span>💖</span><span>💘</span>
        </div>
    </div>
    </div>
    )}
{letterOpened && (
    <div className="relative overflow-hidden">
      <audio ref={audioRef} src={musicUrl} loop preload="auto" autoPlay playsInline />

      <div className="pointer-events-none absolute inset-0 opacity-60 hero-grid" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-linear-to-b from-rose-200/20 to-transparent blur-3xl" />
      <header className="sticky hidden md:block top-0 z-40 w-full border-b border-blush-100 bg-white/80 text-midnight-900 backdrop-blur-xl shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <nav className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className=" px-3 py-1 text-2xl uppercase tracking-[0.3em] font-bold text-blush-500 text-cyan-950">
                QH & ND
              </span>

            </div>
            <div className="hidden gap-3 text-sm md:flex">
              {navItems.map((item) => (
                <motion.div key={item.href} {...buttonHover}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-full border border-blush-200 px-4 py-2 text-rose-600 transition hover:bg-blush-50 hover:text-rose-700"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 text-sm md:hidden">
            {navItems.map((item) => (
              <motion.div key={item.href} {...buttonHover}>
                <Link
                  href={item.href}
                  className="inline-flex whitespace-nowrap rounded-full border border-blush-200 px-4 py-2 text-rose-600 transition hover:bg-blush-50 hover:text-rose-700"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </header>


      <section
        id="hero"
        className="relative isolate overflow-hidden text-white pt-[170px] sm:pt-0"
      >
        <div className="absolute inset-0 bg-[#930014] py-20">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.src}
              className="absolute inset-0 w-full md:w-[58%] sm:aspect-3/4 py-10"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={
                activeHeroSlide === index
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 1.08 }
              }
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-contain md:object-cover img-hero-slide pt-20"
              />
          <div className="absolute inset-0 bg-linear-to-r from-rose-900/60 via-rose-700/50 to-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
        <div className="relative mx-auto sm:pt-24 flex max-w-7xl flex-col gap-10 pb-10 sm:py-24 sm:px-8 mb-14 lg:flex-row lg:items-center">
          <motion.div
            className="flex-1 space-y-6 px-4 md:px-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* <div className="h-[400px] md:hidden" /> */}
            <p className="text-md  md:block uppercase font-semibold tracking-[0.5em] text-white/80">
              Save the Date
            </p>
            <h1 className="font-script  md:block text-5xl leading-tight sm:text-6xl w-full text-center sm:w-fit sm:text-left">
              <span className="text-6xl sm:text-7xl font-wedding">Quốc&nbsp;Hoàng</span>
              <div className="text-blush-200 text-5xl sm:text-6xl text-center">&hearts;</div>
              <span className="text-6xl sm:text-7xl font-wedding">Ngọc&nbsp;Đăng</span>
            </h1>
           
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
             
              <motion.div {...buttonHover}>
                <Link
                  href="#rsvp"
                  ref={(el) => {
                    if (el) heroCtaRefs.current[1] = el;
                  }}
                  className="hero-cta-highlight relative sm:mt-4 animated-border-btn group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-4 md:px-7 py-3 text-sm md:text-base font-semibold  shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:bg-white/15"
                >
                  <span className="">Xác nhận tham dự</span>
                </Link>
              </motion.div>
            </div>
            
            <div className="rounded-3xl border border-white/30 bg-white/10 p-6 backdrop-blur  max-w-[480px]">
              <p className="text-sm uppercase tracking-[0.4em] text-white/80">
                Ngày chung đôi
              </p>
              <div className="mt-3 flex flex-wrap items-end gap-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-semibold">24 · 01 · 2026</p>
                  <p className="text-sm text-white/75">
                    Tuy Hòa, Phú Yên · 17:00
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-semibold">29 · 01 · 2026</p>
                  <p className="text-sm text-white/75">
                    Phan Rang, Ninh Thuận · 17:00
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 text-white/90">
                  {[
                    { label: "Ngày", value: countdown.days },
                    { label: "Giờ", value: countdown.hours },
                    { label: "Phút", value: countdown.minutes },
                    { label: "Giây", value: countdown.seconds },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className="flex w-[60px] md:w-[70px] flex-col items-center rounded-2xl border border-white/30 bg-white/10 px-3 py-2 text-white shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
                    >
                      <span className="text-xl md:text-2xl font-semibold">
                        {isCountdownReady
                          ? unit.value.toString().padStart(2, "0")
                          : "--"}
                      </span>
                      <span className="mt-1 text-[0.55rem] uppercase tracking-[0.4em] text-white/70">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </motion.div>

          <motion.div
            className="flex-1 rounded-[40px] max-w-[450px] mx-auto border border-white/40 bg-white/10 p-6 shadow-glow-gold backdrop-blur"
            {...fadeIn(0.2)}
          >
            <div className="gradient-border rounded-[32px] bg-white/95 p-2">
        <Image
                src="/media/ban.jpg"
                alt="Quốc Hoàng & Ngọc Đăng"
                width={860}
                height={1060}
                className="w-full rounded-[26px] object-cover"
                unoptimized
          priority
        />
            </div>
          </motion.div>
        </div>
      </section>

      {storyModal && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center bg-black/80 px-4 py-10"
          onClick={(event) => {
            if (event.target === event.currentTarget) setStoryModal(null);
          }}
        >
          <button
            aria-label="Đóng ảnh"
            className="absolute right-6 top-6 text-white transition hover:scale-110"
            onClick={() => setStoryModal(null)}
          >
            ✕
          </button>
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/30 bg-black/30 p-4 shadow-2xl">
            <div className="relative aspect-2/3 md:h-[90vh] w-full overflow-hidden rounded-[24px]">
              <Image
                src={storyModal.src}
                alt={storyModal.caption || "Story photo"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-0 sm:pt-6 text-midnight-900 sm:px-4">
        <section
          id="groom-bride"
          className="mt-16 rounded-[36px] border border-emerald-50 bg-white/85 p-6 shadow-glow-soft"
        >
          <motion.div className="text-center space-y-3" {...textReveal()}>
            <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
              Groom & Bride Info
            </p>
            <h2 className="font-display text-3xl text-rose-900 sm:text-4xl">
              Chú rể &amp; Cô dâu
            </h2>
            <div className="line-glow mx-auto h-[4px] w-[70%] bg-transparent  mt-8" />
          </motion.div>
          <div data-speed="0.5" className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <motion.div
              className="glass-panel flex flex-col items-center rounded-[28px] border border-emerald-100 bg-emerald-50/40 p-6 text-center shadow-glow-soft"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-600">
                Chú rể
              </p>
              <h3 className="mt-1 font-script text-5xl text-emerald-900 font-wedding">
                Quốc Hoàng
              </h3>
              <div className="mt-4 w-full overflow-hidden rounded-[22px] border border-emerald-100 bg-white/80">
                <div className="groom-bride-photo relative aspect-[2/3] w-full">
                  <Image
                    src="/media/groom.jpg"
                    alt="Chú rể Quốc Hoàng"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 24vw, 70vw"
                    quality={95}
                    priority
                  />
                </div>
              </div>
              <p className="mt-4 text-base text-emerald-900/80">
                Chàng trai tràn đầy năng lượng tích cực, lí trí nhưng ấm áp, luôn
                mang theo nụ cười khi đồng hành cùng người thương.
              </p>
            </motion.div>

            <motion.div
              className="hidden h-full flex-col items-center justify-center lg:flex"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <span className="block">
                <Image
                  src="/media/heart.gif"
                  width={80}
                  height={80}
                  alt="Heart"
                  className="h-20 w-20 object-contain"
                  style={{ display: "inline-block" }}
                  unoptimized
                  priority
                />
              </span>
            </motion.div>

            <motion.div
            data-speed="1.5"
              className="glass-panel flex flex-col items-center rounded-[28px] border border-emerald-100 bg-emerald-50/40 p-6 text-center shadow-glow-soft"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-600">
                Cô dâu
              </p>
              <h3 className="mt-1 font-script text-5xl text-emerald-900 font-wedding">
                Ngọc Đăng
              </h3>
              <div className="mt-4 w-full overflow-hidden rounded-[22px] border border-emerald-100 bg-white/80">
                <div className="groom-bride-photo relative aspect-[2/3] w-full">
                  <Image
                    src="/media/bride.jpg"
                    alt="Cô dâu Ngọc Đăng"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 24vw, 70vw"
                    quality={95}
                    priority
                  />
                </div>
              </div>
              <p className="mt-4 text-base text-emerald-900/80">
                Nàng thơ dịu dàng với trái tim giàu cảm xúc, đôi khi hờn dỗi nhưng luôn đầy ắp tiếng cười.
              </p>
            </motion.div>
          </div>
        </section>

      <div id="our-stories" className="relative mt-24 grid gap-10 py-8 lg:grid-cols-2 ">
          <div className="heart-rain" id="heartRain"></div>
          <motion.div className="space-y-6" {...fadeIn()}>
            <p className="text-sm uppercase tracking-[0.5em] text-rose-400 font-arial">
              Our Stories
            </p>
            <h2 className="font-display font-arial text-3xl font-semibold text-rose-900 sm:text-4xl text-animate-title">
              Chuyện chúng mình
            </h2>
            <p className="font-arial text-slate-600">
            Quốc Hoàng – chàng trai đầy lý trí nhưng ấm áp, và Ngọc Đăng – nàng dịu dàng mang trái tim nhiều yêu thương và luôn làm mọi người xung quanh cười.
            Hai hành tinh tưởng chừng khác biệt, mỗi người mang một nhịp sống riêng, lại bất ngờ tìm thấy quỹ đạo chung bằng sự chân thành. Giữa những bộn bề công việc và nhịp sống vội vã, chúng mình vẫn chọn dành thời gian cho nhau — để lắng nghe, để thấu hiểu và để sẻ chia những điều nhỏ bé nhất trong cuộc sống.
            </p>
            <p className="font-arial text-slate-600">
            Tình yêu của chúng mình không bắt đầu từ những điều quá lớn lao, mà lớn dần lên từ những khoảnh khắc rất đỗi bình thường. Là những lần cùng nhau dạo quanh thành phô lúc chiều muộn, nghe sóng biển thì thầm; là những bữa ăn giản dị tự tay nấu, đôi khi vụng về nhưng luôn đầy ắp tiếng cười; là những buổi tối chậm rãi kể cho nhau nghe về một ngày đã qua.
            </p>
            <p className="font-arial text-slate-600">
            Chúng mình tin rằng hạnh phúc không cần phải rực rỡ, chỉ cần đủ ấm. Là khi có một người để trở về, một người sẵn sàng ở bên dù vui hay buồn, thành công hay chông chênh. Từ hai con người độc lập, chúng mình học cách đồng hành — tôn trọng sự khác biệt, trân trọng điểm chung và kiên nhẫn cùng nhau trưởng thành.
            </p>
            <p className="font-arial text-slate-600">
            Hành trình yêu thương ấy đã đưa chúng mình đến quyết định quan trọng nhất: cùng nắm tay bước sang một chương mới của cuộc đời. Từ hôm nay, không chỉ là “anh” và “em”, mà là chúng mình — cùng viết tiếp câu chuyện đời bằng những khung hình thật dịu dàng, bằng yêu thương bền bỉ và niềm tin vào một tương lai chung.
            </p>
          </motion.div>
          <div className="relative overflow-hidden rounded-[30px] border border-rose-100 bg-white/60 p-2 shadow-glow-soft">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeStorySlide * 100}%)` }}
            >
              {storySnapshotGroups.map((group, slideIndex) => (
                <div
                  key={`story-slide-${slideIndex}`}
                  className="min-w-full grid gap-2 p-1 sm:grid-cols-2"
                >
                  {group.map((story) => (
                    <motion.button
                      type="button"
                      key={story.src}
                      onClick={() => handleStoryClick(story)}
                      className="rounded-3xl bg-rose-50/70 p-4 text-left cursor-pointer"
                      whileHover={{ y: -10, rotate: -0.5 }}
                    >
                      <div className="relative w-full aspect-3/4 overflow-hidden rounded-2xl sm:h-80">
                        <Image
                          src={story.src}
                          alt="Ký ức yêu thương"
                          fill
                          className="object-cover transition duration-700 hover:scale-105"
                        />
                      </div>
                     
                    </motion.button>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {storySnapshotGroups.map((_, index) => (
                <button
                  key={`story-dot-${index}`}
                  aria-label={`Slide ${index + 1}`}
                  className={`h-2.5 w-8 rounded-full border border-rose-200 transition ${
                    activeStorySlide === index ? "bg-rose-400" : "bg-transparent"
                  }`}
                  onClick={() => setActiveStorySlide(index)}
                />
              ))}
            </div>
          </div>
          </div>

        <section className="mt-16">
          <motion.div
            className="flex min-w-max gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          >
            {marqueeImages.map((image, index) => (
              <motion.button
                type="button"
                key={`${image.src}-${index}`}
            className="relative h-100 w-80 sm:h-170 sm:w-100 shrink-0 cursor-pointer overflow-hidden rounded-3xl shadow-lg"
                whileHover={{ scale: 1.04 }}
                onClick={() =>
                  setStoryModal({ src: image.src, caption: image.label })
                }
              >
                <Image
                  src={image.src}
                  alt={image.label}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* <ParallaxSection
          id="journey"
          backgroundSrc="/media/DAG_4050.jpg"
          priority
          className="mt-24"
          contentClassName="space-y-12 px-5 py-10 sm:px-10"
          overlayClassName="from-white/95 via-rose-50/60 to-white/90"
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
              The Journey of falling in love
            </p>
            <h2 className="mt-3 font-display text-3xl text-rose-900 sm:text-4xl">
              Từng cột mốc đáng nhớ
            </h2>
          </div>
          <div className="space-y-8 px-1 sm:px-0">
            {journeyTimeline.map((step, index) => (
              <motion.div
                key={step.title}
                className="glass-panel rounded-3xl p-6 lg:flex lg:items-center lg:gap-10"
                {...fadeIn(index * 0.1)}
                whileHover={{ scale: 1.01, y: -8 }}
              >
        <div className="mb-4 shrink-0 text-center text-rose-900 lg:mb-0">
                  <p className="text-sm uppercase tracking-[0.4em] text-blush-400">
                    {step.date}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-rose-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </ParallaxSection> */}

        <section
          id="journey"
          ref={journeyAlbumRef}
          className="mt-24 space-y-10 px-4 py-6 transition duration-500 sm:px-8"
        >
          <motion.div className="text-center font-arial" {...textReveal()}>
            <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
            The Journey of falling in love
            </p>
            <h2 className="mt-3 font-display text-3xl text-rose-900 sm:text-4xl text-animate-title font-arial">
            Dấu ấn tình yêu 
            </h2>
            <p className="mt-2 text-slate-600 font-arial">
              Cuộn xuống thật chậm, từng khung hình sẽ tự động hiện ra để bạn hòa mình
              vào hành trình yêu thương cùng tụi mình.
            </p>
          </motion.div>
          <div className="relative hidden h-[75vh] overflow-hidden rounded-[40px] border border-white/40 bg-white/70 p-6 shadow-glow-soft md:block">
            {journeyAlbumSlides.map((slide, index) => (
              <div
                key={slide.src}
                ref={(el) => {
                  if (el) journeySlidesRefs.current[index] = el;
                }}
                className="journey-fade-slide absolute inset-0 flex h-full flex-col justify-between rounded-[32px]"
              >
                <div className="relative  w-full aspect-[5/3] overflow-hidden rounded-[28px]">
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    quality={95}
                    className="object-cover"
                    sizes="(min-width: 1280px) 60vw, (min-width: 768px) 80vw, 100vw"
                  />
                </div>
                <div className="mt-6 space-y-2 p-6">
                
                  <h3 className="font-display text-2xl text-rose-900 font-arial">
                    {slide.title}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.4em] text-rose-300 font-arial">
                    {slide?.date}
                  </p>
                  <p className="text-base text-slate-600">{slide.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:hidden">
            {journeyAlbumSlides.map((slide) => (
              <div
                key={`mobile-${slide.src}`}
                className="rounded-[32px] border border-white/40 bg-white/90 p-4 shadow-glow-soft"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-[24px]">
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="font-display text-xl text-rose-900">
                    {slide.title}
                  </h3>
                  {slide.date && (
                    <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
                      {slide.date}
                    </p>
                  )}
                  <p className="text-sm sm:text-xl text-slate-600">{slide.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="album"
          className="full-bleed mt-16 bg-linear-to-b from-white via-rose-50/70 to-white px-4 py-12 sm:px-8"
        >
          <motion.div
            className="flex flex-col items-center justify-center mx-auto max-w-6xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={galleryTextAnimation}
          >
            <p className="text-sm uppercase tracking-[0.5em] text-rose-400 button-bor ">
              Gallery
            </p>
            <h2 className="mt-3 font-display text-3xl text-rose-900 sm:text-4xl text-animate-title">
            Nhật ký đời thường
            </h2>
            <p className="mt-2 text-slate-600">
              Tụi mình gom thêm những khoảnh khắc thường ngày để bạn cảm nhận rõ hơn
              nhịp thở của hành trình yêu.
            </p>
          </motion.div>
          <div className="mx-auto mt-10 w-full max-w-7xl">
            <div className="gallery">
              {collageImages.map((image) => (
                <motion.button
                  type="button"
                  key={image}
                  className="group block w-full cursor-zoom-in focus:outline-none"
                  whileHover={{ y: -6 }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={galleryItemAnimation}
                  onClick={() =>
                    setStoryModal({
                      src: image,
                      caption: "Khoảnh khắc yêu thương",
                    })
                  }
                >
                  <Image
                    src={image}
                    alt="Khoảnh khắc yêu thương"
                    width={1600}
                    height={2000}
                    loading="lazy"
                    className="max-h-full w-auto rounded-2xl object-contain transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1280px) 18vw, (min-width: 768px) 40vw, 90vw"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section id="party" className="full-bleed relative">
          <div className="absolute inset-0">
            <Image
              src="/media/bg-thiep.png"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-white/65 backdrop-blur-[1px]" />
          </div>
          <div className="relative flex item-center justify-center mx-auto max-w-6xl px-4 py-16 sm:px-6 h-[1000px] d-flex ">
            <div className="rounded-[40px]  p-6 shadow-glow-soft h-fit sm:mt-50">
              <motion.div className="text-center" {...textReveal()}>
                <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
                  Party
                </p>
                <h2 className="mt-2 font-display text-shadow-lg text-3xl from-rose-500 to-rose-300 sm:text-4xl text-animate-title">
                  <span className="bg-linear-to-r text-shadow-lg text-[#f1449b] bg-clip-text uppercase font-bold">
                    Hẹn gặp bạn tại hai miền yêu thương
                  </span>
                </h2>
              </motion.div>
              <div className="mt-10 grid gap-8 lg:grid-cols-2">
                {partyEvents.map((event) => (
                  <motion.div
                    key={event.title}
                    className="glass-panel flex flex-col rounded-3xl border border-rose-50/60 p-6 sm:p-8"
                    {...fadeIn(0.1)}
                    whileHover={{ y: -10, scale: 1.01 }}
                  >
                    <p className="text-sm uppercase tracking-[0.4em] text-blush-500">
                      {event.date}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-rose-900">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-3xl font-semibold text-rose-900 sm:text-4xl">
                      {event.time}
                    </p>
                    <p className="mt-1 flex-1 text-slate-600">{event.venue}</p>
                    <a
                      href={ensureExternalUrl(event.map)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r  px-5 py-2.5 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(248,63,10,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(244,63,94,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                    >
                      <span className="tracking-wide">Xem bản đồ</span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <p className="text-sm uppercase tracking-[0.5em] text-rose-400 mt-24">
                  Confirm Attendance
                </p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#9e751c] text-animate-title">
                  Bạn có thể tham dự chứ?
                </h2>
        <section className="mt-12 flex flex-col gap-8 lg:flex-row" id="rsvp">
          
          <div className="lg:w-1/2">
            <ParallaxSection  
              backgroundSrc="/media/t9-min.jpg"
              className="rounded-[32px]"
              contentClassName="px-5 py-8 sm:p-10"
            >
              <motion.div className="text-center" {...textReveal()}>
          
              </motion.div>
              <form className="mt-10 space-y-8" onSubmit={handleRsvpSubmit}>
                <div>
                  <label className="text-sm sm:text-base ">Họ và tên</label>
                  <input
                    type="text"
                    value={attendanceForm.name}
                    onChange={(event) =>
                      setAttendanceForm((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    required
                    className="mt-2 w-full rounded-2xl border border-blush-100 bg-white px-4 py-3 text-midnight-900 placeholder:text-rose-200 focus:border-blush-300 focus:outline-none"
                    placeholder="Nhập tên để tụi mình dễ nhận ra nhé"
                  />
                </div>
                <div>
                  <p className="text-sm sm:text-base ">Bạn sẽ tham dự ở đâu?</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {joinOptions.map((option) => {
                      const selected = attendanceForm.joinAt.includes(option.value);
                      return (
                        <motion.button
                          type="button"
                          key={option.value}
                          onClick={() => toggleJoinOption(option.value)}
                          className={`rounded-2xl border px-5 py-4 text-left transition ${
                            selected
                              ? "border-rose-500 bg-rose-50 text-rose-900 shadow-[0_12px_30px_rgba(255,115,147,0.3)]"
                              : "border-white/40 bg-white/80 text-slate-600 hover:border-rose-200"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <p className="font-semibold">{option.label}</p>
                          <p className="text-xs uppercase tracking-[0.4em] text-black-300">
                            {option.date}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.4em] text-black-400">
                            {selected ? "ĐÃ CHỌN" : "CHỌN"}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-sm sm:text-base">
                    Số lượng người tham dự
                  </label>
                  <select
                    value={attendanceForm.guests}
                    onChange={(event) =>
                      setAttendanceForm((prev) => ({
                        ...prev,
                        guests: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-2xl border border-blush-100 bg-white px-4 py-3 text-midnight-900 focus:border-blush-300 focus:outline-none"
                  >
                    <option value="1">1 người</option>
                    <option value="2">2 người</option>
                    <option value="3">3 người</option>
                    <option value="4">4 người</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm sm:text-base ">Lời chúc gửi đến Chú rể và Cô dâu</label>
                  <textarea
                    value={attendanceForm.message}
                    onChange={(event) =>
                      setAttendanceForm((prev) => ({
                        ...prev,
                        message: event.target.value,
                      }))
                    }
                    required
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-blush-100 bg-white px-4 py-3 text-midnight-900 placeholder:text-rose-200 focus:border-blush-300 focus:outline-none"
                    placeholder="Viết vài dòng yêu thương để tụi mình lưu giữ nhé..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="group w-full rounded-full bg-linear-to-r from-rose-500 via-rose-400 to-rose-300 px-6 py-4 text-lg font-semibold text-white shadow-[0_18px_45px_rgba(255,115,147,0.45)] transition hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(255,115,147,0.55)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    {formStatus === "loading" ? "Đang xác nhận..." : "Xác nhận tham dự"}
                  </span>
                </button>
                {formStatus === "success" && (
                  <p className="text-center text-sm text-emeraldFog text-[#1af3a7] text-animate-title">
                    Đã ghi nhận! Hẹn bạn trong ngày vui.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="text-center text-sm text-red-300">
                    Gửi chưa thành công, thử lại giúp tụi mình nhé.
                  </p>
                )}
              </form>
            </ParallaxSection>
          </div>
          <div className="lg:w-1/2" id="blessings">
            <motion.div
              className="rounded-[32px] bg-white p-6 shadow-glow-soft sm:p-8"
              {...fadeIn()}
            >
              <motion.div className="text-center" {...textReveal()}>
                <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
                  Lời chúc gần đây
                </p>
                <h2 className="mt-3 font-display text-3xl text-rose-900 sm:text-4xl text-animate-title">
                  Lan tỏa yêu thương
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Điền Lời chúc trong form xác nhận tham dự, lời nhắn của bạn sẽ xuất hiện tại đây.
                </p>
              </motion.div>
              <div className="mt-8 flex max-h-[520px] flex-col gap-4 overflow-auto pr-2">
                {loadingMessages ? (
                  <p className="text-center text-slate-500">Đang tải lời chúc...</p>
                ) : (
                  messages.map((blessing, index) => (
                    <motion.div
                      key={`${blessing.name}-${index}`}
                      className="rounded-3xl  bg-rose-50/70 p-4"
                      whileHover={{ scale: 1.01, y: -4 }}
                    >
                      <p
                        className="text-sm font-semibold text-rose-900"
                        style={{ textShadow: "0 2px 6px rgba(149, 64, 85, 0.25)" }}
                      >
                        {blessing.name || "Bạn ẩn danh"}
                      </p>
                      {blessing.timestamp && (
                        <p className="text-xs uppercase tracking-[0.3em] text-rose-300">
                          {new Date(blessing.timestamp).toLocaleDateString()}
                        </p>
                      )}
                      <p
                        className="mt-1 text-base text-slate-600"
                        style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.08)" }}
                      >
                        “{blessing.message}”
                      </p>
                      
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <section
          className="relative mt-24 overflow-hidden rounded-[40px] border border-rose-100/60 bg-linear-to-br from-white via-rose-50/60 to-amber-50/60 p-8 shadow-glow-soft"
          id="thank-you"
        >
          <motion.div
            className="flex flex-col items-center gap-10 lg:flex-row"
            {...fadeIn(0.1)}
          >
            <div className="relative w-full max-w-md">
              <div
                className="absolute inset-0 translate-y-6 bg-rose-600/30 blur-3xl"
                aria-hidden
              />
              <Image
                src="/media/thank-you.webp"
                alt="Thank you"
                width={900}
                height={900}
                priority={false}
                className="relative z-10 w-full  object-cover  heartbeat-visual"
              />
            </div>
            <div className="space-y-4 text-center lg:flex-1 lg:text-left">
              <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
                Thank You
              </p>
              <h2 className="font-display text-3xl text-rose-900 sm:text-4xl">
                Cảm ơn bạn đã góp mặt trong hành trình yêu thương
              </h2>
              <p className="text-base text-slate-600">
                Mỗi lời chúc, mỗi phút giây hiện diện của bạn đều là điều quý giá với chúng
                mình. Hẹn gặp lại bạn trong ngày vui
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-sm font-semibold text-rose-500 shadow-[0_15px_35px_rgba(255,115,147,0.25)]">
                <span role="img" aria-hidden>
                  💗
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="image-block-css p-relative full-width full-height full-mask-size mask-position"><div className="image-background p-absolute"></div></div>
        <div className="image-background p-absolute"></div>
        <div className="image-block-css p-relative full-width full-height full-mask-size mask-position"><div className="image-background p-absolute"></div></div>
      </main>


      <footer className="border-t border-blush-100 bg-white text-center text-sm text-rose-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="text-black sm:flex sm:gap-4">
            <p>
              Liên hệ cô dâu:{" "}
              <a href="tel:0398394340" className="font-semibold text-black hover:underline">
                0398 394 340
              </a>
            </p>
            <p>
              Liên hệ chú rể:{" "}
              <a href="tel:0906394297" className="font-semibold text-black hover:underline">
                0906 394 297
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
    )}
      </>



    );
  }
