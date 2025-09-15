const fs = window.require('fs');
const os = window.require('os');
const path = window.require('path');
const { shell } = window.require('electron'); 

function base64ToBuffer(base64) {
    const cleaned = base64.replace(/^data:application\/pdf;base64,/, '');
    return Buffer.from(cleaned, 'base64');
}

export default function usePdfDownloader() {
    const savePdf = async (base64, defaultName = 'file.pdf') => {

        let targetDir;
        if (process.platform === 'win32') {
            targetDir = 'C:\\etiket';
        } else {
            // Linux 
            targetDir = path.join(os.homedir(), 'etiket');
        }

        // Klasör yoksa oluştur
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const filePath = path.join(targetDir, defaultName);

        try {
            fs.writeFileSync(filePath, base64ToBuffer(base64));
 
            await shell.openPath(filePath);

            return true;
        } catch (err) {
            console.error('PDF kaydetme hatası:', err);
            return false;
        }
    };

    return { savePdf };
}
