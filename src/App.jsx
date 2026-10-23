import { useEffect, useState, useCallback } from "react";
import "@/App.css";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { rooms as staticRooms } from "@/data/rooms";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Story } from "@/components/Story";
import { Rooms } from "@/components/Rooms";
import { Gallery } from "@/components/Gallery";
import { ValleyGuide } from "@/components/ValleyGuide";
import { Webcam } from "@/components/Webcam";
import { Reviews } from "@/components/Reviews";
import { Booking } from "@/components/Booking";
import { Location } from "@/components/Location";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { DomoticaPage } from "@/components/DomoticaPage";
import { AccessoPage } from "@/components/AccessoPage";
import { DoveMangiarePage } from "@/components/DoveMangiarePage";
import { PrivacyPage } from "@/components/PrivacyPage";

const Home = ({ rooms, selectedRoom, setSelectedRoom, onBook }) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView(), 400);
    }
  }, [hash]);

  return (
    <main>
      <Hero />
      <Marquee />
      <Story />
      <Rooms rooms={rooms} onBook={onBook} />
      <Gallery />
      <ValleyGuide />
      <Webcam />
      <Reviews />
      <Booking rooms={rooms} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
      <Location />
      <ContactSection />
    </main>
  );
};

function App() {
  const rooms = staticRooms;
  const [selectedRoom, setSelectedRoom] = useState(staticRooms[0]?.id ?? null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -56, duration: 1.4 });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);

  const handleBook = useCallback((roomId) => setSelectedRoom(roomId), []);

  return (
    <LanguageProvider>
      <div className="App bg-background text-foreground font-sans">
        <div className="noise-overlay" aria-hidden="true" />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home rooms={rooms} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} onBook={handleBook} />} />
            <Route path="/domotica" element={<DomoticaPage />} />
            <Route path="/accesso" element={<AccessoPage />} />
            <Route path="/dove-mangiare" element={<DoveMangiarePage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/pagine/accesso-domotica-camere.html" element={<Navigate to="/domotica" replace />} />
            <Route path="/pagine/accesso.html" element={<Navigate to="/accesso" replace />} />
            <Route path="/pagine/dovemangiare.html" element={<Navigate to="/dove-mangiare" replace />} />
            <Route path="/pagine/camere.html" element={<Navigate to="/#camere" replace />} />
            <Route path="/pagine/foto-istruzioni.html" element={<Navigate to="/" replace />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          <ChatWidget />
        </BrowserRouter>
        <Toaster position="top-center" toastOptions={{ style: { borderRadius: 0, border: "1px solid hsl(var(--foreground))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" } }} />
      </div>
    </LanguageProvider>
  );
}

export default App;
