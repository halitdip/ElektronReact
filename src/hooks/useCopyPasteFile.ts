// src/hooks/useDbCopy.ts
import fs from 'fs';
import path from 'path';

export async function copyPasteFile(src: string, dest: string) {
    try {
        // Gerekirse dest klasörü yoksa oluştur:
        await fs.promises.mkdir(path.dirname(dest), { recursive: true });
        // Dosyayı kopyala:
        await fs.promises.copyFile(src, dest);
        console.log('DB başarıyla kopyalandı!');
    } catch (err) {
        console.error('Kopyalama hatası:', err);
    }
}