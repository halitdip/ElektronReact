declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
interface Window {
  api: {
    startScrcpy: (deviceId?: string) => Promise<{ success: boolean; message?: string }>;
    stopScrcpy: () => Promise<{ success: boolean; message?: string }>;
    getAppVersion: () => Promise<{ version: string }>;
    copyPasteFile: (src: string, dest: string) => Promise<{ success: boolean; message?: string }>;
    minimizeWindow: () => Promise<void>;
    closeWindow: () => Promise<void>;
    insertInventory: () => Promise<void>;

  };
}