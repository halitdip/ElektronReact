// services/main/AuthServices.js

import { ApiHelper } from '@/services/extension/ApiHelper';

export const GetNewShortcuts = async (storeCode) => {
  return ApiHelper([
    {
      name: 'shortcuts',
      detail: 'Kısayollar',
      url: `api/Shortcut/GetNewShortcuts?storecode=${storeCode}`,
      type: 'get',
      site: 'a101kiosk',
      security: 0,
      model: [],
    },
  ]);
}; 