import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Grid,
  InputAdornment,
  Pagination,
} from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; 
import ListIcon from '@mui/icons-material/List'; 
function createData(
  magaza,
  fizikselSayimTarihi,
  sapRaporlamaTarihi,
  urunKodu,
  malzemeKisaMetni,
  depolamaKosulu,
  toplamiFiiliMiktar,
  sayimMiktari,
  sayimSaati,
  temelOlcuBirimi,
  sayimTutar,
  yoldakiMiktar,
  noksanTutar
) {
  return {
    magaza,
    fizikselSayimTarihi,
    sapRaporlamaTarihi,
    urunKodu,
    malzemeKisaMetni,
    depolamaKosulu,
    toplamiFiiliMiktar,
    sayimMiktari,
    sayimSaati,
    temelOlcuBirimi,
    sayimTutar,
    yoldakiMiktar,
    noksanTutar,
  };
}
 
function Row(props) {
  const { row } = props;

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        ...(row.sayimMiktari === 0 && {
          backgroundColor: '#FFF2CC', 
        }),
      }}
    >
      <TableCell component="th" scope="row">
        {row.magaza}
      </TableCell>
      <TableCell>{row.fizikselSayimTarihi}</TableCell>
      <TableCell>{row.sapRaporlamaTarihi}</TableCell>
      <TableCell>{row.urunKodu}</TableCell>
      <TableCell>{row.malzemeKisaMetni}</TableCell>
      <TableCell align="right">{row.depolamaKosulu}</TableCell>
      <TableCell align="right">{row.toplamiFiiliMiktar}</TableCell>
      <TableCell align="right">
        {row.sayimMiktari === 0 ? (
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            {row.sayimMiktari}
          </span>
        ) : (
          row.sayimMiktari
        )}
      </TableCell>
      <TableCell>{row.sayimSaati}</TableCell>
      <TableCell>{row.temelOlcuBirimi}</TableCell>
      <TableCell align="right">{row.sayimTutar}</TableCell>
      <TableCell align="right">{row.yoldakiMiktar}</TableCell>
      <TableCell align="right">{row.noksanTutar}</TableCell>
    </TableRow>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    magaza: PropTypes.string.isRequired,
    fizikselSayimTarihi: PropTypes.string.isRequired,
    sapRaporlamaTarihi: PropTypes.string.isRequired,
    urunKodu: PropTypes.string.isRequired,
    malzemeKisaMetni: PropTypes.string.isRequired,
    depolamaKosulu: PropTypes.number.isRequired,
    toplamiFiiliMiktar: PropTypes.number.isRequired,
    sayimMiktari: PropTypes.number.isRequired,
    sayimSaati: PropTypes.string.isRequired,
    temelOlcuBirimi: PropTypes.string.isRequired,
    sayimTutar: PropTypes.number.isRequired,
    yoldakiMiktar: PropTypes.number.isRequired,
    noksanTutar: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(
    '8012 - Atatürk cd Mahmutlar Antalya',
    '05-06-2025',
    '04-06-2025',
    '10029P9',
    'KÖFTE DANA IZGARA 400 G BEZLER',
    14,
    0,
    0,
    '05.06.2025 10:28',
    'ADT',
    450.00,
    0,
    0
  ),
  createData(
    '245A - Kuluckpark Mahmutlar Antalya',
    '04-06-2025',
    '03-06-2025',
    '10029P9',
    'KÖFTE DANA IZGARA 400 G BEZLER',
    14,
    2,
    0,
    '04.06.2025 14:05',
    'ADT',
    450.00,
    0,
    0
  ),
  createData(
    '6079 - Kervansaray Cd Mahmutlar Antalya',
    '04-06-2025',
    '03-06-2025',
    '1003437',
    'KUŞBAŞI DANA 400 G',
    14,
    0,
    0,
    '04.06.2025 14:56',
    'ADT',
    450.00,
    0,
    0
  ), 
];

export default function CollapsibleTable() {
  const [envanterTipi, setEnvanterTipi] = React.useState('');
  const [bolgeKodu, setBolgeKodu] = React.useState('9901');
  const [magazaKodu, setMagazaKodu] = React.useState('');
  const [fizikselSayimTarihi, setFizikselSayimTarihi] =   React.useState('01.06.2025');
  const [bitisTarihi, setBitisTarihi] = React.useState('30.06.2025');

  const totalRecords = rows.length;  

  const handlePageChange = (event, value) => {
    console.log('Page changed to:', value);
     
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        Sayım Listele
      </Typography>
 
      <Paper elevation={1} sx={{ padding: 2, marginBottom: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid>
            <TextField
              select
              fullWidth
              label="Envanter Tipi"
              value={envanterTipi}
              onChange={(e) => setEnvanterTipi(e.target.value)}
              size="small"
              defaultValue="BS Kısmi Envanter"
            >
              <MenuItem value="BS Kısmi Envanter">BS Kısmi Envanter</MenuItem> 
            </TextField>
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Bölge Kodu"
              value={bolgeKodu}
              onChange={(e) => setBolgeKodu(e.target.value)}
              size="small"
              placeholder="9901"
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Mağaza Kodu"
              value={magazaKodu}
              onChange={(e) => setMagazaKodu(e.target.value)}
              size="small"
              placeholder="Mağaza Kodu Giriniz"
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Fiziksel Sayım Tarihi"
              value={fizikselSayimTarihi}
              onChange={(e) => setFizikselSayimTarihi(e.target.value)}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                fullWidth
                label="Bitiş Tarihi"
                value={bitisTarihi}
                onChange={(e) => setBitisTarihi(e.target.value)}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton color="primary">
                <SearchIcon />
              </IconButton>
              <IconButton color="primary">
                <ListIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
          <Button variant="outlined" sx={{ textTransform: 'none' }}>
            Mağaza Seçiniz
          </Button>
          <Button variant="outlined" sx={{ textTransform: 'none' }}>
            Fiziksel Sayım Tarihi
          </Button>
          <Button variant="outlined" sx={{ textTransform: 'none' }}>
            Tüm Tarihler
          </Button>
        </Box>
      </Paper>
 
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 1,
        }}
      >
        <Typography variant="body2">
          Toplam Kayıt: <span style={{ fontWeight: 'bold' }}>{totalRecords}</span>
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#1976d2', color: 'white', textTransform: 'none' }}
          startIcon={<SearchIcon />}
        >
          Ara
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
            <TableRow>
              <TableCell>Mağaza</TableCell>
              <TableCell>Fiziksel Sayım Tarihi</TableCell>
              <TableCell>SAP Raporlama Tarihi</TableCell>
              <TableCell>Ürün Kodu</TableCell>
              <TableCell>Malzeme Kısa Metni</TableCell>
              <TableCell align="right">Depolama Koş.</TableCell>
              <TableCell align="right">Toplam Fiili Miktar</TableCell>
              <TableCell align="right">Sayım Miktarı</TableCell>
              <TableCell>Sayım Saati</TableCell>
              <TableCell>Temel Ölçü Birimi</TableCell>
              <TableCell align="right">Sayım Tutar</TableCell>
              <TableCell align="right">Yoldaki Miktarı</TableCell>
              <TableCell align="right">Noksan Tutarı</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.urunKodu + row.magaza} row={row} />  
            ))}
          </TableBody>
        </Table>
      </TableContainer>
 
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={3} 
          page={1} 
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
        />
        <TextField
          select
          value={20}
          size="small"
          sx={{ marginLeft: 2, width: 70 }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </TextField>
      </Box>
    </Box>
  );
}