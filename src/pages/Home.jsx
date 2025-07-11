import React, { useState, useEffect, useRef } from "react";
import "../assets/css/home.css";
import { GetNewShortcuts } from '../services/main/KioskServices'

// --- MOCK DATA ---
const sliderContent = [
  {
    title: "ÇARŞAMBA",
    subtitle: "BİLGİLENDİRMESİ - 02 TEMMUZ 2025",
    color: "#0079c2",
  },
  {
    title: "HAFTANIN FIRSATLARI",
    subtitle: "SEÇİLİ ÜRÜNLERDE BÜYÜK İNDİRİMLER!",
    color: "#E53935",
  },
  {
    title: "ALDIN ALDIN!",
    subtitle: "BU PERŞEMBE GELECEK AKTÜEL ÜRÜNLER",
    color: "#43A047",
  },
];

const announcements = [
  { id: "1", text: "CIPS MISIR TACO SHOTS 30 G DORITOS", date: "2025-07-08T17:09:49" },
  { id: "2", text: "27 HAZİRAN - 3 TEMMUZ KASA AKTİVİTESİ 7", date: "2025-07-08T17:47:44" },
  { id: "3", text: "1000 G NUT MASTER %100 YERFISTIĞI", date: "2025-07-08T17:47:40" },
  { id: "4", text: "Aske listeleri - 03.07.2025", date: "2025-07-08T17:12:17" },
  { id: "5", text: "27 HAZİRAN - 3 TEMMUZ HAFTANIN YILDIZI", date: "2025-07-03T16:10:20" },
  { id: "6", text: "Yeni personel eğitimi duyurusu", date: "2025-07-02T11:30:00" },
  { id: "7", text: "Stok sayımı hatırlatması", date: "2025-07-01T18:00:15" },
  { id: "8", text: "Bayram temizliği planlaması", date: "2025-06-30T14:22:05" },
];


export default function A101KioskDashboard() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [appShortcuts, setAppShortcuts] = useState([]);
  const rootRef = useRef(null);
  // Burada backend isteği simüle ediliyor
  const getShortcuts = async () => {
    try {
      const response = await GetNewShortcuts(9900);
      console.log(response?.shortcuts?.data)
      setAppShortcuts(response?.shortcuts?.data || []);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    function scaleKiosk() {
      const element = rootRef.current;
      if (!element) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = 1920,
        h = 1080;
      const scale = Math.min(vw / w, vh / h);
      const left = (vw - w * scale) / 2;
      const top = (vh - h * scale) / 2;
      element.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;
    }
    window.addEventListener('resize', scaleKiosk);
    scaleKiosk();
    return () => window.removeEventListener('resize', scaleKiosk);
  }, []);


  useEffect(() => {
    getShortcuts();
  }, []);


  const bottomMenuShortcuts = appShortcuts.filter(
    s => String(s.bottomMenu).toLowerCase() === 'true'
  );
  const gridShortcuts = appShortcuts.filter(
    s => String(s.bottomMenu).toLowerCase() !== 'true'
  );

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % sliderContent.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);
  };

  return (
    <div className="kiosk-viewport">
      <div className="kiosk-root" ref={rootRef}>
        {/* Üst Panel */}
        {/*    <div className="kiosk-header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/A101_logo.svg/1200px-A101_logo.svg.png" alt="logo" className="logo" />
        <div className="header-title">Kiosk Arayüzü</div>
        <div className="header-info">
          <div>
            <b>Turgut Aydın Üsküdar İstanbul - F240</b>
            <div>TERMINAL: MGYT45TRD</div>
          </div>
          <div>
            {new Date().toLocaleDateString("tr-TR")}<br />
            {new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div> */}
        <div className="kiosk-main">
          {/* Sol Panel */}
          <div className="main-left">
            {/* Banner / Slider */}
            <div className="banner" style={{ background: sliderContent[activeSlide].color }}>
              <button className="banner-arrow left" onClick={handlePrevSlide}>&#8592;</button>
              <div className="banner-content">
                <div className="banner-title">{sliderContent[activeSlide].title}</div>
                <div className="banner-sub">{sliderContent[activeSlide].subtitle}</div>
              </div>
              <button className="banner-arrow right" onClick={handleNextSlide}>&#8594;</button>
            </div>
            {/* Kısayollar / grid */}
            <div className="shortcuts">
              {gridShortcuts.map((app, i) => (
                <div className="shortcut-card" style={{ background: app.bgColor }} key={i}>
                  <img src={app.iconUrl} alt={app.name} style={{ width: 36, height: 36, marginBottom: 4 }} />
                  <div>{app.name}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Sağ Panel */}
          <div className="main-right">
            <div className="ann-header">BÖLGE DUYURU PANOSU</div>
            <div className="announcements">
              {announcements.map((item, i) => (
                <div className="announcement" key={i}>
                  <div className="ann-index">{i + 1}</div>
                  <div>
                    <div className="ann-text">{item.text}</div>
                    <div className="ann-date">{new Date(item.date).toLocaleString("tr-TR")}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ciro-panel">
              <div>TÜM ETİKETLERİNİZ GÜNCELDİR</div>
              <div>KASA-1: <b>3,582.96 (28)</b></div>
              <div>KASA-2: <b>8,865.12 (70)</b></div>
              <div>Toplam Ciro: <b>12,448.08 (98)</b></div>
            </div>
          </div>
        </div>
        {/* Alt Dock */}
        <div className="kiosk-footer">
          {bottomMenuShortcuts.map((app, i) => (
            <div className="dock-btn" key={i}>
              <img src={app.iconUrl} alt={app.name} style={{ width: 28, height: 28, marginRight: 6 }} />
              <span>{app.name}</span>
            </div>
          ))}
        </div>
      </div></div>
  );
}
