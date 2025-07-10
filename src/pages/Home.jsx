import React, { useState, useEffect } from 'react';
import { GetNewShortcuts } from '../services/main/KioskServices'
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CssBaseline,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  keyframes
} from '@mui/material';
import {
  Home,
  ShoppingCart,
  MenuBook,
  Event,
  Fingerprint,
  HelpOutline,
  Folder,
  AllInbox,
  Notifications,
  Screenshot,
  Email,
  FlashOn,
  Security,
  Computer,
  Settings,
  AccountCircle,
  ArrowBackIosNew,
  ArrowForwardIos
} from '@mui/icons-material';

// --- MOCK DATA ---

// Slider için banner içeriği
const sliderContent = [
  {
    title: 'ÇARŞAMBA',
    subtitle: 'BİLGİLENDİRMESİ - 02 TEMMUZ 2025',
    color: '#0079c2'
  },
  {
    title: 'HAFTANIN FIRSATLARI',
    subtitle: 'SEÇİLİ ÜRÜNLERDE BÜYÜK İNDİRİMLER!',
    color: '#E53935'
  },
  {
    title: 'ALDIN ALDIN!',
    subtitle: 'BU PERŞEMBE GELECEK AKTÜEL ÜRÜNLER',
    color: '#43A047'
  }
];

// Uygulama kısayolları
const appShortcuts = [
  { text: 'Mağaza Otomasyon', icon: <ShoppingCart sx={{ fontSize: 40, color: '#fff' }} />, color: '#E53935' },
  { text: 'Kurumsal Portal', icon: <Home sx={{ fontSize: 40, color: '#fff' }} />, color: '#FB8C00' },
  { text: 'POS Kasa Raporları', icon: <AllInbox sx={{ fontSize: 40, color: '#fff' }} />, color: '#43A047' },
  { text: 'Eğitim Portalı', icon: <MenuBook sx={{ fontSize: 40, color: '#fff' }} />, color: '#1E88E5' },
  { text: 'Kurban Kayıt Sistemi', icon: <Event sx={{ fontSize: 40, color: '#fff' }} />, color: '#8E24AA' },
  { text: 'PUANTAJ', icon: <Fingerprint sx={{ fontSize: 40, color: '#fff' }} />, color: '#00897B' },
  { text: 'Yardım Masası', icon: <HelpOutline sx={{ fontSize: 40, color: '#fff' }} />, color: '#546E7A' },
  { text: 'Mağaza Klasörü', icon: <Folder sx={{ fontSize: 40, color: '#fff' }} />, color: '#3949AB' },
];

// Kaydırılabilir duyuru paneli için daha fazla veri
const announcements = [
  { id: '1', text: 'CIPS MISIR TACO SHOTS 30 G DORITOS', date: '2025-07-08T17:09:49' },
  { id: '2', text: '27 HAZİRAN - 3 TEMMUZ KASA AKTİVİTESİ 7', date: '2025-07-08T17:47:44' },
  { id: '3', text: '1000 G NUT MASTER %100 YERFISTIĞI', date: '2025-07-08T17:47:40' },
  { id: '4', text: 'Aske listeleri - 03.07.2025', date: '2025-07-08T17:12:17' },
  { id: '5', text: '27 HAZİRAN - 3 TEMMUZ HAFTANIN YILDIZI', date: '2025-07-03T16:10:20' },
  { id: '6', text: 'Yeni personel eğitimi duyurusu', date: '2025-07-02T11:30:00' },
  { id: '7', text: 'Stok sayımı hatırlatması', date: '2025-07-01T18:00:15' },
  { id: '8', text: 'Bayram temizliği planlaması', date: '2025-06-30T14:22:05' },
  { id: '1', text: 'CIPS MISIR TACO SHOTS 30 G DORITOS', date: '2025-07-08T17:09:49' },
  { id: '2', text: '27 HAZİRAN - 3 TEMMUZ KASA AKTİVİTESİ 7', date: '2025-07-08T17:47:44' },
  { id: '3', text: '1000 G NUT MASTER %100 YERFISTIĞI', date: '2025-07-08T17:47:40' },
  { id: '4', text: 'Aske listeleri - 03.07.2025', date: '2025-07-08T17:12:17' },
  { id: '5', text: '27 HAZİRAN - 3 TEMMUZ HAFTANIN YILDIZI', date: '2025-07-03T16:10:20' },
  { id: '6', text: 'Yeni personel eğitimi duyurusu', date: '2025-07-02T11:30:00' },
  { id: '7', text: 'Stok sayımı hatırlatması', date: '2025-07-01T18:00:15' },
  { id: '8', text: 'Bayram temizliği planlaması', date: '2025-06-30T14:22:05' },
];

// Alt dock ikonları
const dockItems = [
  { text: 'Ekran Alıntısı', icon: <Screenshot /> },
  { text: 'e-Posta', icon: <Email /> },
  { text: 'Spark', icon: <FlashOn /> },
  { text: 'Güvenlik', icon: <Security /> },
  { text: 'Mağaza Terminal', icon: <Computer /> },
  { text: 'Terminal Güncelle', icon: <Settings /> },
];

// Animasyon için Keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;




// Ana Bileşen
export default function A101KioskDashboard() {
  const currentDate = new Date('2025-07-02T09:08:00');
  const [activeSlide, setActiveSlide] = useState(0);

  // Slider'ı manuel olarak değiştiren fonksiyonlar
  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % sliderContent.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);
  };

  const getShortcuts = async () => {
    const getShortcuts = await GetNewShortcuts(9900);
    console.log(getShortcuts);
  }
  useEffect(() => {
    getShortcuts()
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f4f6f8', overflow: 'hidden', maxHeight: '100%' }}>
      {/* ÜST APP BAR */}
      {/*     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#fff', color: '#263238' }}>
        <Toolbar>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/A101_logo.svg/1200px-A101_logo.svg.png" alt="A-101 Logo" style={{ height: 30, marginRight: 16 }} />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Kiosk Arayüzü
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, textAlign: 'right' }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Turgut Aydın Üsküdar İstanbul - F240</Typography>
              <Typography variant="caption" color="textSecondary">TERMINAL: MGYT45TRD</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{currentDate.toLocaleDateString('tr-TR')}</Typography>
              <Typography variant="caption" color="textSecondary">{currentDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</Typography>
            </Box>
            <AccountCircle sx={{ color: '#0079c2', fontSize: 32 }} />
          </Box>
        </Toolbar>
      </AppBar>
 */}
      {/* ANA İÇERİK */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 3, mb: 4, overflow: 'hidden' }}>
        <Grid container spacing={3} sx={{ height: '100%' }}>

          {/* Sol Panel (Slider ve Kısayollar) - 8 birim */}
          <Grid item size={8}>
            <Grid container spacing={3}>

              {/* Slider Banner: xs={12} prop'u sayesinde bu bölüm her zaman tam bir satırı kaplar. */}
              <Grid item size={12}>
                <Paper
                  elevation={4}
                  sx={{
                    position: 'relative',
                    backgroundColor: sliderContent[activeSlide].color,
                    color: 'white',
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: 400,
                    transition: 'background-color 0.5s ease',
                    overflow: 'hidden',
                  }}
                >
                  <Box key={activeSlide} sx={{ animation: `${fadeIn} 0.8s ease-in-out` }}>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                      {sliderContent[activeSlide].title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {sliderContent[activeSlide].subtitle}
                    </Typography>
                  </Box>
                  <IconButton onClick={handlePrevSlide} sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.3)', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
                    <ArrowBackIosNew />
                  </IconButton>
                  <IconButton onClick={handleNextSlide} sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.3)', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
                    <ArrowForwardIos />
                  </IconButton>
                </Paper>
              </Grid>

              {/* Uygulama Kısayolları: Slider tam satırı kapladığı için bunlar otomatik olarak alt satıra geçer. */}
              {appShortcuts.map((app) => (
                <Grid item xs={6} sm={4} md={3} key={app.text}>
                  <Card
                    elevation={2}
                    sx={{
                      textAlign: 'center',
                      backgroundColor: app.color,
                      color: 'white',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': { transform: 'scale(1.05)', boxShadow: 6, cursor: 'pointer' },
                    }}
                  >
                    <CardContent>
                      {app.icon}
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 1 }}>
                        {app.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Sağ Sidebar (Duyuru Panosu) - 4 birim */}
          <Grid item size={4}  >
            <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', height: '90%' }}>
              <Box sx={{ p: 2, backgroundColor: '#333', color: '#fff' }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Notifications /> BÖLGE DUYURU PANOSU
                </Typography>
              </Box>
              <List sx={{
                flexGrow: 1,
                overflowY: 'auto',
                p: 0,
                '&::-webkit-scrollbar': { width: '8px' },
                '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '4px' },
                '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
                maxHeight: 700
              }}>
                {announcements.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <ListItem button>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: '#0079c2', width: 32, height: 32 }}>
                          <Typography sx={{ fontSize: '0.7rem' }}>{index + 1}</Typography>
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        secondary={new Date(item.date).toLocaleString('tr-TR')}
                        primaryTypographyProps={{ fontWeight: '600', fontSize: '0.9rem' }}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ p: 2, borderTop: '1px solid #eee', backgroundColor: '#fafafa' }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                  TÜM ETİKETLERİNİZ GÜNCELDİR
                </Typography>
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
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Box>

      {/* ALT DOCK */}
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {dockItems.map(item => (
            <IconButton key={item.text} sx={{ flexDirection: 'column', color: '#333', borderRadius: 2, p: 1 }}>
              {item.icon}
              <Typography variant="caption" sx={{ fontSize: '0.6rem', mt: 0.5 }}>{item.text}</Typography>
            </IconButton>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
