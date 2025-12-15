"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  { src: "/media/DAG_3775.jpg", label: "Khoảnh khắc ngọt ngào Red Velvet" },
  { src: "/media/DAG_3724.jpg", label: "Sưởi ấm nhau dưới bình minh Tuy Hòa" },
  { src: "/media/DAG_3941.jpg", label: "Sưởi ấm nhau dưới bình minh Tuy Hòa" },
  { src: "/media/DAG_3794.jpg", label: "Sưởi ấm nhau dưới bình minh Tuy Hòa" },
];

const heroSlides = featuredImages.map(({ src, label }) => ({
  src,
  alt: label,
}));


const storySnapshots = [
  {
    src: "/media/DAG_3844.jpg",
    label: "Bước chân đầu tiên trên cát trắng kể từ ngày gặp nhau.",
  },
  {
    src: "/media/DAG_3818.jpg",
    label: "Hòa mình trong mùi hoa giấy ngọt ngào của Phú Yên.",
  },
  {
    src: "/media/DAG_3858.jpg",
    label: "Một cái nhìn thật lâu khiến tim đập rộn ràng.",
  },
  {
    src: "/media/DAG_3870.jpg",
    label: "Khi sân khấu ngoài trời chỉ còn lại chúng mình.",
  },

  {
    src: "/media/DAG_3915.jpg",
    label: "Bước chân đầu tiên trên cát trắng kể từ ngày gặp nhau.",
  },
  {
    src: "/media/DAG_3919.jpg",
    label: "Hòa mình trong mùi hoa giấy ngọt ngào của Phú Yên.",
  },
  {
    src: "/media/DAG_3941.jpg",
    label: "Một cái nhìn thật lâu khiến tim đập rộn ràng.",
  },
  {
    src: "/media/DAG_4007.jpg",
    label: "Khi sân khấu ngoài trời chỉ còn lại chúng mình.",
  },

  {
    src: "/media/DAG_4215.jpg",
    label: "Bước chân đầu tiên trên cát trắng kể từ ngày gặp nhau.",
  },
  {
    src: "/media/DAG_4063.jpg",
    label: "Hòa mình trong mùi hoa giấy ngọt ngào của Phú Yên.",
  },
  {
    src: "/media/DAG_4111.jpg",
    label: "Một cái nhìn thật lâu khiến tim đập rộn ràng.",
  },
  {
    src: "/media/DAG_4135.jpg",
    label: "Khi sân khấu ngoài trời chỉ còn lại chúng mình.",
  },
];

const marqueeImages = [{
  src: "/media/DAG_4765.jpg",
  label: "Bình minh Tuy Hòa",
}, {
  src: "/media/DAG_4761.jpg",
  label: "Cát trắng kể chuyện",
}, {
  src: "/media/DAG_4757.jpg",
  label: "Hương hoa giấy",
}, {
  src: "/media/DAG_4740.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/DAG_4713.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/DAG_4705.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/DAG_4643.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/DAG_4492.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/DAG_4464.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/DAG_4355.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/DAG_4352.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/DAG_4337.jpg",
  label: "Bình minh Tuy Hòa",
},
{
  src: "/media/DAG_4308.jpg",
  label: "Bình minh Tuy Hòa",
},  
  {
    src: "/media/DAG_4232.jpg",
    label: "Bình minh Tuy Hòa",
  },
  {
    src: "/media/DAG_4260.jpg",
    label: "Bình minh Tuy Hòa",
  },
];



const collageImages = [
  "/media/DAG_3724.jpg", 
  "/media/DAG_4308.jpg",
  "/media/DAG_4260.jpg",
  
  "/media/DAG_4135.jpg", // do
  "/media/DAG_4224.jpg",
  "/media/DAG_4713.jpg",
  "/media/DAG_4761.jpg",
  
  "/media/DAG_4740.jpg",
  "/media/DAG_3794.jpg", // do
  
  "/media/DAG_4765.jpg",
"/media/DAG_3941.jpg", // do
"/media/DAG_3775.jpg",
"/media/DAG_4757.jpg",


"/media/DAG_4705.jpg",
"/media/DAG_4492.jpg",
"/media/DAG_4464.jpg",
"/media/DAG_4337.jpg",
"/media/DAG_4232.jpg",


"/media/DAG_3870.jpg",
"/media/DAG_3919.jpg",

];

const journeyAlbumSlides = [
  {
    src: "/media/journey/donghanh-5.jpg",
    date: "16.8.2024",
    title: "Lần đầu gặp mặt",
    caption: "Trong sự lịch sự và tinh tế, chúng mình đã bắt đầu câu chuyện của mình.",
  },
  {
    src: "/media/journey/donghanh-6.jpg",
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
    date: "24 Tháng 01 2026",
    time: "18:00",
    venue: "Sảnh A - Nhà hàng Công Đoàn, 278 Đường Nguyễn Huệ, Tuy Hòa, Phú Yên",
    map: "google.com/maps/dir//278+Nguyễn+Huệ,+Phường7,+Tuy+Hòa,+Phú+Yên/@10.791811,106.6261761,15z/data=!4m9!4m8!1m1!4e2!1m5!1m1!1s0x316fec48bf7c254d:0x43974ccddc063b94!2m2!1d109.3206338!2d13.0969768?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    title: "Tiệc Nhà Trai · Ninh Thuận",
    date: "29 Tháng 01 2026",
    time: "18:00",
    venue: "Ballroom - Khu nghỉ dưỡng biển Long Thuận, Phan Rang – Tháp Chàm",
    map: "https://maps.app.goo.gl/tBiA1Pum1x6mJYGMA",
  },
];

const blessingPlaceholders: Message[] = [
  {
    name: "Team NYC",
    message: "Chúc hai bạn mãi nắm tay nhau đi qua mọi mùa thương nhớ!",
  },
  {
    name: "Henry",
    message: "Ngày chung đôi chính thức đếm ngược, tụi mình luôn bên cạnh.",
  },
];

const musicUrl = "/media/audio/wedding.webm";
const sheetDbWebhookUrl =
  process.env.NEXT_PUBLIC_SHEETDB_URL ??
  "https://sheetdb.io/api/v1/c6eefggtbyk8s";

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
  overlayClassName = "bg-linear-to-br from-white/95 via-white/85 to-white/90",
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
      className={`relative isolate overflow-hidden rounded-[40px] border border-blush-100 shadow-glow-soft ${className}`}
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
  const [messages, setMessages] = useState<Message[]>(blessingPlaceholders);
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

  const buttonHover = {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.96 },
  };

  const joinOptions = useMemo(
    () => [
      {
        value: "Nhà Trai (Ninh Thuận)",
        label: "Nhà trai · Ninh Thuận",
                      date: "29 · 01 · 2026 · 18:00",
      },
      {
        value: "Nhà Gái (Phú Yên)",
        label: "Nhà gái · Phú Yên",
        date: "24 · 01 · 2026 · 18:00",
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

  // Fetch blessings from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages");
        if (!res.ok) throw new Error("Unable to load blessings");
        const data = await res.json();
        if (Array.isArray(data.messages) && data.messages.length) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
  }, []);

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

  // Background music autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;

    let unlocked = false;

    const cleanupUnlock = () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
    };

    const tryPlay = async () => {
      if (!audio) return;
      try {
        await audio.play();
        unlocked = true;
        cleanupUnlock();
      } catch {
      }
    };

    const unlockAudio = () => {
      if (unlocked) return;
      tryPlay();
    };

    tryPlay();
    document.addEventListener("click", unlockAudio);
    document.addEventListener("touchstart", unlockAudio);

    return () => {
      audio.pause();
      cleanupUnlock();
    };
  }, []);

  useEffect(() => {
    if (!letterOpened) return;
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
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
    setFormStatus("loading");
    try {
      const messageResponse = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          message: trimmedMessage,
        }),
      });

      if (!messageResponse.ok) {
        throw new Error("Failed to save blessing");
      }

      if (sheetDbWebhookUrl) {
        fetch(sheetDbWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [
              {
                Name: trimmedName,
                Attend: selectedAttend,
                Message: trimmedMessage,
                Guests: guestCount,
                Date: new Date().toISOString(),
              },
            ],
          }),
        }).catch((error) => {
          console.warn("SheetDB sync failed:", error);
        });
      }

      const messageData = await messageResponse.json();
      if (Array.isArray(messageData.messages) && messageData.messages.length) {
        setMessages(messageData.messages);
      } else {
        const refreshed = await fetch("/api/messages").then((res) => res.json());
        setMessages(refreshed.messages ?? blessingPlaceholders);
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

  return (

    <>
    {!letterOpened && (
<div className="animation-love anibg-sm sm:anibg flex flex-col items-center justify-center h-[30vh]">
      <div className="mail-wrapper top30 flex flex-col items-center justify-center pt-10" id="mailWrapper" onClick={openLetter}>
        <div className="heart">💌</div>
        <div className="font-be">Thiệp cưới</div>
        <div className="font">Quốc Hoàng & Ngọc Đăng</div>
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
              <span className="rounded-full border border-blush-200 bg-blush-50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-blush-500">
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
            <Link
              href="#rsvp"
              className="rounded-full bg-blush-500 px-4 py-2 text-sm font-semibold text-white shadow-glow-soft transition hover:bg-blush-400"
            >
              RSVP
            </Link>
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
        className="relative isolate overflow-hidden text-white"
      >
        <div className="absolute inset-0 bg-[#930014] py-20">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.src}
              className="absolute inset-0 w-full md:w-[60%] py-10"
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
                className="object-contain md:object-contain img-hero-slide"
              />
          <div className="absolute inset-0 sm:bg-linear-to-r sm:from-rose-900/60 sm:via-rose-700/50 sm:to-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
        <div className="relative mx-auto pt-[650px] sm:pt-24  flex max-w-7xl flex-col gap-10 py-24 sm:px-8 mb-14 lg:flex-row lg:items-center">
          <motion.div
            className="flex-1 space-y-6 px-4 md:px-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* <div className="h-[400px] md:hidden" /> */}
            <p className="text-md hidden md:block uppercase font-semibold tracking-[0.5em] text-white/80">
              Save the Date
            </p>
            <h1 className="font-script hidden md:block text-5xl leading-tight sm:text-6xl w-fit ml-30">
              <span className="text-6xl sm:text-7xl font-wedding">Quốc&nbsp;Hoàng</span>
              <div className="text-blush-200 text-5xl sm:text-6xl text-center">&hearts;</div>
              <span className="text-6xl sm:text-7xl font-wedding">Ngọc&nbsp;Đăng</span>
            </h1>
            <p className="max-w-xl hidden md:block  text-md md:text-lg text-white italic">
              Hành trình yêu thương của chúng mình tròn đầy hơn khi có sự hiện
              diện của bạn. Cảm ơn vì sẽ đến và gửi lời chúc cho ngày vui này.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div {...buttonHover}>
                <Link
                  href="#our-stories"
                  ref={(el) => {
                    if (el) heroCtaRefs.current[0] = el;
                  }}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-4 md:px-7 py-3 text-sm md:text-base font-semibold text-white shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:bg-white/15"
               
               >
                  <span>Chuyện chúng mình</span>
                </Link>
              </motion.div>
              <motion.div {...buttonHover}>
                <Link
                  href="#rsvp"
                  ref={(el) => {
                    if (el) heroCtaRefs.current[1] = el;
                  }}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-4 md:px-7 py-3 text-sm md:text-base font-semibold text-white shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:bg-white/15"
                >
                  <span>Xác nhận tham dự</span>
                </Link>
              </motion.div>
            </div>
            
            <div className="rounded-3xl border border-white/30 bg-white/10 p-6 backdrop-blur  max-w-[480px]">
              <p className="text-sm uppercase tracking-[0.4em] text-white/80">
                Ngày chung đôi
              </p>
              <div className="mt-3 flex flex-wrap items-end gap-6">
                <div>
                  <p className="text-3xl font-semibold">24 · 01 · 2026</p>
                  <p className="text-sm text-white/75">
                    Tuy Hòa, Phú Yên · 18:00
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">29 · 01 · 2026</p>
                  <p className="text-sm text-white/75">
                    Phan Rang, Ninh Thuận · 18:00
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
                src="/media/DAG_4355.JPG"
                alt="Quốc Hoàng & Ngọc Đăng"
                width={860}
                height={1060}
                className="h-auto w-full rounded-[26px] object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
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
        <ParallaxSection
          id="our-stories"
          backgroundSrc="/media/DAG_3724.jpg"
          priority
          className="mt-24"
          contentClassName="grid gap-10 px-5 py-8 sm:p-10 lg:grid-cols-2 bg-white/70"
          overlayClassName="from-white/95 via-rose-50/70 to-white/95"
        >
          <div className="heart-rain" id="heartRain"></div>
          <motion.div className="space-y-6" {...fadeIn()}>
            <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
              Our Stories
            </p>
            <h2 className="font-display text-3xl font-semibold text-rose-900 sm:text-4xl">
              Chuyện chúng mình
            </h2>
            <p className="text-slate-600">
            Quốc Hoàng – chàng trai đầy lý trí nhưng ấm áp, và Ngọc Đăng – nàng dịu dàng mang trái tim nhiều yêu thương.
            Hai hành tinh tưởng chừng khác biệt, mỗi người mang một nhịp sống riêng, lại bất ngờ tìm thấy quỹ đạo chung bằng sự chân thành. Giữa những bộn bề công việc và nhịp sống vội vã, chúng mình vẫn chọn dành thời gian cho nhau — để lắng nghe, để thấu hiểu và để sẻ chia những điều nhỏ bé nhất trong cuộc sống.
            </p>
            <p className="text-slate-600">
            Tình yêu của chúng mình không bắt đầu từ những điều quá lớn lao, mà lớn dần lên từ những khoảnh khắc rất đỗi bình thường. Là những lần cùng nhau dạo bước trên bãi cát lúc chiều muộn, nghe sóng biển thì thầm; là những bữa ăn giản dị tự tay nấu, đôi khi vụng về nhưng luôn đầy ắp tiếng cười; là những buổi tối chậm rãi kể cho nhau nghe về một ngày đã qua.
            </p>
            <p className="text-slate-600">
            Chúng mình tin rằng hạnh phúc không cần phải rực rỡ, chỉ cần đủ ấm. Là khi có một người để trở về, một người sẵn sàng ở bên dù vui hay buồn, thành công hay chông chênh. Từ hai con người độc lập, chúng mình học cách đồng hành — tôn trọng sự khác biệt, trân trọng điểm chung và kiên nhẫn cùng nhau trưởng thành.
            </p>
            <p className="text-slate-600">
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
                      <div className="relative h-80 w-full overflow-hidden rounded-2xl sm:h-72">
                        <Image
                          src={story.src}
                          alt="Ký ức yêu thương"
                          fill
                          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw"
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
        </ParallaxSection>

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
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
            The Journey of falling in love
            </p>
            <h2 className="mt-3 font-display text-3xl text-rose-900 sm:text-4xl">
              Từng cột mốc đáng nhớ
            </h2>
            <p className="mt-2 text-slate-600">
              Cuộn xuống thật chậm, từng khung hình sẽ tự động hiện ra để bạn hòa mình
              vào hành trình yêu thương cùng tụi mình.
            </p>
          </div>
          <div className="relative hidden h-[75vh] overflow-hidden rounded-[40px] border border-white/40 bg-white/70 p-6 shadow-glow-soft md:block">
            {journeyAlbumSlides.map((slide, index) => (
              <div
                key={slide.src}
                ref={(el) => {
                  if (el) journeySlidesRefs.current[index] = el;
                }}
                className="journey-fade-slide absolute inset-0 flex h-full flex-col justify-between rounded-[32px] p-6"
              >
                <div className="relative h-[85%] w-full overflow-hidden rounded-[28px]">
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
                <div className="mt-6 space-y-2">
                
                  <h3 className="font-display text-2xl text-rose-900">
                    {slide.title}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.4em] text-rose-300">
                    {slide?.date}
                  </p>
                  <p className="text-sm text-slate-600">{slide.caption}</p>
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
            className="mx-auto max-w-6xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={galleryTextAnimation}
          >
            <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
              Gallery
            </p>
            <h2 className="mt-3 font-display text-3xl text-rose-900 sm:text-4xl">
              Những mảnh ghép mới
            </h2>
            <p className="mt-2 text-slate-600">
              Tụi mình gom thêm những khung hình hậu trường để bạn cảm nhận rõ hơn
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

        <ParallaxSection
          id="party"
          backgroundSrc="/media/DAG_4757.JPG"
          className="mt-24"
          contentClassName="space-y-10 px-5 py-16 sm:p-16"
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
              Party
            </p>
            <h2 className="mt-2 font-display text-shadow-lg text-3xl  from-rose-500 to-rose-300 sm:text-4xl">
              <span className="bg-linear-to-r text-shadow-lg text-[#f1449b] bg-clip-text uppercase font-bold">
              Hẹn gặp bạn tại{" "} hai miền yêu thương
              </span>
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {partyEvents.map((event) => (
              <motion.div
                key={event.title}
                className="glass-panel flex flex-col rounded-3xl p-6 sm:p-8"
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
                <Link
                replace
                  href={event.map}
                  target="_blank"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blush-500 underline decoration-dotted"
                >
                  Xem bản đồ
                </Link>
              </motion.div>
            ))}
          </div>
        </ParallaxSection>

        <section className="mt-24 flex flex-col gap-8 lg:flex-row" id="rsvp">
          <div className="lg:w-1/2">
            <ParallaxSection
              backgroundSrc="/media/DAG_4224.jpg"
              className="rounded-[32px]"
              contentClassName="px-5 py-8 sm:p-10"
            >
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
                  Confirm Attendance
                </p>
                <h2 className="mt-3 font-display text-3xl text-rose-900 sm:text-4xl">
                  Bạn có thể tham dự chứ?
                </h2>
              </div>
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
                          <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
                            {option.date}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.4em] text-rose-400">
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
                    <span className="text-sm transition group-hover:translate-x-1">
                      ✨
                    </span>
                  </span>
                </button>
                {formStatus === "success" && (
                  <p className="text-center text-sm text-emeraldFog">
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
              className="rounded-[32px] border border-blush-100 bg-white p-6 shadow-glow-soft sm:p-8"
              {...fadeIn()}
            >
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.5em] text-rose-400">
                  Lời chúc gần đây
                </p>
                <h2 className="mt-3 font-display text-3xl text-rose-900 sm:text-4xl">
                  Lan tỏa yêu thương
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Điền Lời chúc trong form xác nhận tham dự, lời nhắn của bạn sẽ xuất hiện tại đây.
                </p>
              </div>
              <div className="mt-8 flex max-h-[520px] flex-col gap-4 overflow-auto pr-2">
                {loadingMessages ? (
                  <p className="text-center text-slate-500">Đang tải lời chúc...</p>
                ) : (
                  messages.map((blessing, index) => (
                    <motion.div
                      key={`${blessing.name}-${index}`}
                      className="rounded-3xl border border-blush-100 bg-rose-50/70 p-4"
                      whileHover={{ scale: 1.01, y: -4 }}
                    >
                      <p
                        className="text-sm font-semibold text-rose-900"
                        style={{ textShadow: "0 2px 6px rgba(149, 64, 85, 0.25)" }}
                      >
                        {blessing.name || "Bạn ẩn danh"}
                      </p>
                      <p
                        className="mt-2 text-sm text-slate-600"
                        style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.08)" }}
                      >
                        “{blessing.message}”
                      </p>
                      {blessing.timestamp && (
                        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-rose-300">
                          {new Date(blessing.timestamp).toLocaleDateString()}
                        </p>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <footer className="border-t border-blush-100 bg-white text-center text-sm text-rose-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="text-rose-400">
            <p>
              Liên hệ cô dâu:{" "}
              <a href="tel:0398394340" className="font-semibold text-rose-600 hover:underline">
                0398 394 340
              </a>
            </p>
            <p>
              Liên hệ chú rể:{" "}
              <a href="tel:0906394297" className="font-semibold text-rose-600 hover:underline">
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
