// src/hooks/useDbCopy.ts
//preload.js fonksiyonlarıyla çalışır
export async function copyPasteFile(src: string, dest: string) {
    // TS hatasını bastırmak için:
    return await (window as any).api.copyPasteFile(src, dest)
}