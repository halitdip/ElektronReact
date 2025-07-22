import React, { useState, useEffect, useRef } from "react";
import "../assets/css/home.css";
import { GetNewShortcuts, GetLabelsWithLastDay } from '../services/main/KioskServices'
import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  Modal,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LabelTable from '../components/LabelTable';
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
  const [labelStatus, setLabelStatus] = useState(false);
  const [labels, setLabels] = useState([])
  const [labelModalStatus, setLabelModalStatus] = useState(false);

  const rootRef = useRef(null);

  useEffect(() => {
    function scaleKiosk() {
      const element = rootRef.current;
      if (!element) return;
      const parent = element.parentElement;
      const vw = parent.clientWidth;
      const vh = parent.clientHeight;
      const w = 1920, h = 1080;
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
    getMainServices();
  }, []);


  const getMainServices = async () => {
    try {
      const response = await GetNewShortcuts(9900, 'F240');

      if (response.GetLabelDownloadStatus.isError) {
        alert("Etiket güncel mi ? kontrolü yapılamadı..")
      } else {
        setLabelStatus(response?.GetLabelDownloadStatus?.data.anyUndownloaded);

      }

      if (response.shortcuts.isError) {
        alert("Kısayollar verisi alınamadı lütfen daha sonra tekrar deneyiniz..")
      } else {
        setAppShortcuts(response?.shortcuts?.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadLabel = async () => {
    try {
      const response = await GetLabelsWithLastDay('F240');
      console.log(response)
      if (response.getLabel.isError) {
        alert("Etiket verileri alınamadı ! Lütfen daha sonra tekrar deneyiniz..")
      } else {
        setLabels(response?.getLabel?.data);
        setLabelModalStatus(true)
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => setLabelModalStatus(false);



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
            <Box sx={{ borderTop: '1px solid #eee', height: '20%' }}>
              <Grid container style={{ height: '100%', flex: 1 }}>
                <Grid size={6}>
                  <Button variant="contained" color={labelStatus ? "primary" : "warning"} onClick={handleDownloadLabel}
                    style={{ flex: 1, height: '100%', width: '100%', borderTop: '1px solid #eee', borderRadius: 0 }}>
                    {labelStatus ? 'TÜM ETİKETLERİNİZ GÜNCELDİR !' : 'ETİKETLERİNİZ GÜNCEL DEĞİLDİR !'}
                  </Button>
                </Grid>
                <Grid size={6} sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>KASA-1:</span>
                    <strong>3,582.96 (28)</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>KASA-2:</span>
                    <strong>8,865.12 (70)</strong>
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>Toplam Ciro:</span>
                    <strong>12,448.08 (98)</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
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
      </div>

      <Modal
        open={labelModalStatus}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition
        slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0,0,0,0.7)' } } }}
      >
        <Box sx={style}>
          {/* Çarpı butonu sağ üstte */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              color: '#888',
              zIndex: 1,
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          {/* Modal içeriği */}
          <Typography id="modal-title" variant="h6" component="h2" sx={{ fontWeight: 600, pr: 4, mb:2 }}>
            Etiket Listesi
          </Typography>
          <LabelTable rows={labels} />
        </Box>
      </Modal>
    </div>
  );
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 700,
  maxWidth: '90%',
  bgcolor: '#fff',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  outline: 'none',
};