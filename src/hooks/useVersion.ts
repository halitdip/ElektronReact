export async function getVersionHook() { 
    return await (window as any).api.getAppVersion()
}