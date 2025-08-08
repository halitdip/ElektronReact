// src/hooks/useDbCopy.ts
export async function insertInventory(target: string, data: any[]) {
    console.log(target, data)
    return await (window as any).api.insertInventory_(target, data);
}
