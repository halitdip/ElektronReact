// src/hooks/useDbCopy.ts
export async function insertInventoryHook(target: string, data: any[]) {
    
    return await (window as any).api.insertInventoryTable(target, data);
}
