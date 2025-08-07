// src/hooks/useScrcpy.ts
export async function startScrcpy(deviceId?: string) {
  const res = await (window as any).api.startScrcpy(deviceId)
  if (!res.success) throw new Error(res.message)
}
export async function stopScrcpy() {
  const res = await (window as any).api.stopScrcpy()
  if (!res.success) throw new Error(res.message)
}
