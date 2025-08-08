// src/main/handlers/file.js
const { ipcMain } = require('electron');
const fs = require('fs').promises;
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
/* import { getTodayYYYYMMDD } from '../../utils/date'; */

function registerFileHandlers() {
  ipcMain.handle('copy-paste-file', async (_, src, dest) => {
    try {
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.copyFile(src, dest);
      return { success: true };
    } catch (err) {
      console.error('Kopyalama hatası:', err);
      return { success: false, message: err.message };
    }
  });


  ipcMain.handle('insert-inventory', async (_, dbPath, items) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
      if (err) console.error('DB açılırken hata:', err);
    });

    try {
      await new Promise((resolve, reject) => {
        db.serialize(() => {
          // 1) Transaction başlat
          db.run('BEGIN TRANSACTION;', beginErr => {
            if (beginErr) return reject(beginErr);

            // 2) Prepared statement
            const stmt = db.prepare(`
            INSERT INTO InventoryInfo
              (Barcode, ProductCode, ProductName,
               Unit, UnitPerPackage, InventoryType,
               InventorySubType, InventoryDate, StoreCode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
          `, prepErr => {
              if (prepErr) return reject(prepErr);
            });
 
            (async () => {
              try {
                for (const item of items) {
                  await new Promise((res, rej) => {
                    stmt.run(
                      item.barcode,
                      item.productCode,
                      String(item.productName).replace(/'/g, "''"),
                      item.unitOfMeasure,
                      Number(item.piecesinBox),
                      'P',
                      1,
                      (() => {
                        const d = new Date();
                        const yy = d.getFullYear();
                        const mm = String(d.getMonth() + 1).padStart(2, '0');
                        const dd = String(d.getDate()).padStart(2, '0');
                        return `${yy}-${mm}-${dd}`;
                      })(),
                      'F240',
                      function (runErr) {
                        if (runErr) return rej(runErr);
                        res(undefined);
                      }
                    );
                  });
                }

                // 4) Statement’i kapat
                stmt.finalize(finalizeErr => {
                  if (finalizeErr) return reject(finalizeErr);

                  // 5) Transaction’ı commit et
                  db.run('COMMIT;', commitErr => {
                    if (commitErr) return reject(commitErr);
                    resolve();
                  });
                });
              } catch (e) {
                // Hata olursa rollback
                db.run('ROLLBACK;', () => reject(e));
              }
            })();
          });
        });
      });

      return { success: true };
    } catch (err) {
      console.error('DB yazma hatası:', err);
      return { success: false, message: err.message };
    } finally {
      db.close();
    }
  });

}

module.exports = { registerFileHandlers };
