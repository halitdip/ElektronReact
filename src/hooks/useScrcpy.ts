// src/hooks/useScrcpy.ts

export function startScrcpy(deviceId?: string) {
  return (window as any).api.startScrcpy(deviceId)
    .then(res => {
      if (!res.success) console.error('scrcpy başlatılamadı:', res.message);
    });
}

export function stopScrcpy() {
  return (window as any).api.stopScrcpy()
    .then(res => {
      if (!res.success) console.error('scrcpy durdurulamadı:', res.message);
    });
}
