export async function getVersionHook() {
    return await (window as any).api.getAppVersion()
}
export async function getTerminalVersionHook() {
    return await (window as any).api.getTerminalVersion()
}