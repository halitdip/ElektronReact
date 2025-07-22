import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';

export default function LabelTable({ rows = [] }) {
  const handleDownload = (row) => {
    const blob = new Blob([JSON.stringify(row, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `label-${row.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Etiket Adı</TableCell>
          <TableCell>Eklenme Tarihi</TableCell>
          <TableCell>Etiket Tipi</TableCell>
          <TableCell>Fiyat Geçerlilik Gün</TableCell>
          <TableCell>İndirildi</TableCell>
          <TableCell>İndirilme Tarihi</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.etiketAdi}</TableCell>
            <TableCell>{row.eklenmeTarihi}</TableCell>
            <TableCell>{row.etiketTipi}</TableCell>
            <TableCell>{row.fiyatGecerlilikGun}</TableCell>
            <TableCell>{row.indirildi ? 'Evet' : 'Hayır'}</TableCell>
            <TableCell>{row.indirilmeTarihi}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleDownload(row)}
              >
                İndir
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
