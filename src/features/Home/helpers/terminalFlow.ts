import { getTerminalVersionHook, getVersionHook } from '../../../hooks/useVersion'
const sendStatus = (status, message) => {
    return { status: status, message: message };
}

const VersionCheck = async (addLog) => {
    try {
        const terminalVersion = await getTerminalVersionHook();
        const appVersion = await getVersionHook();
        console.log(terminalVersion, appVersion)
        addLog(`Versiyon kontrolü Başlatıldı. terminal V : ${terminalVersion.version},App V : ${appVersion.version}`, 'info');

        return sendStatus(true, `Versiyonlar Uyumsuz.`)
    } catch (e: any) {
        addLog(`Versiyon kontrolü yapılamadı: ${e?.message || e}`, 'info');
        return sendStatus(false, `Versiyon/Meta kontrolü yapılamadı: ${e?.message || e}`)
    }

}
export const preflight = async (addLog): Promise<{ status: boolean; message: string }> => {

    return VersionCheck(addLog);

    addLog('Ön kontroller başarılı.', 'success');
    return sendStatus(true, 'Kontroller başarılı. İşleme devam ediliyor…')
};
