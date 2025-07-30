import React, { useState, useMemo } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import { GetLabelDownload } from '../services/main/KioskServices'
import usePdfDownloader from '@/hooks/usePdfDownloader';


export default function LabelTable({ rows = [] }) {

  const { savePdf } = usePdfDownloader();

  const handleDownload = async (id) => {
    const response = await GetLabelDownload(id);
    if (response.labelDownload.isError) {
      alert("Etiket verileri alınamadı !");
      return;
    }
    const base64 = response.labelDownload.data.base64;
    const success = await savePdf(base64, `etiket-${id}.pdf`);
    if (!success) {
      alert('Dosya kayıt edilemedi.lütfen daha sonra tekrar deneyiniz..');
    }
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow
          sx={{
            '& > th': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }
          }}
        >
          <TableCell>Etiket Türü</TableCell>
          <TableCell>Oluşturulma Tarihi</TableCell>
          <TableCell>Boyut</TableCell>
          <TableCell>Fiyat Geçerlilik Başlangıç</TableCell>
          <TableCell>Durum</TableCell>
          <TableCell>İndirilme Tarihi</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow
            key={row.id}
            sx={{
              backgroundColor: idx % 2 === 0 ? '#fafafa' : '#f0f0f0',
              '& > td': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }
            }}
          >
            <TableCell>{row.etiketAdi}</TableCell>
            <TableCell>{row.eklenmeTarihi}</TableCell>
            <TableCell>{row.etiketTipi}</TableCell>
            <TableCell>{row.fiyatGecerlilikGun}</TableCell>
            <TableCell sx={{ color: row.indirildi ? 'green' : 'red' }}>
              {row.indirildi ? 'İndirildi' : 'İndirilmedi'}
            </TableCell>
            <TableCell>{row.indirilmeTarihi}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleDownload(row.id)}
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
