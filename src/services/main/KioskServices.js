// services/main/AuthServices.js

import { ApiHelper } from '@/services/extension/ApiHelper';

export const GetNewShortcuts = async (storeCode, code2) => {
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
    {
      name: 'GetLabelDownloadStatus',
      detail: 'Etiket Güncel Kontrolü',
      url: `api/Label/GetLabelDownloadStatus?storecode=${code2}`,
      type: 'get',
      site: 'a101kiosk',
      security: 0,
      model: [],
    },
  ]);
};

export const GetLabelsWithLastDay = async (storeCode) => {
  return ApiHelper([
    {
      name: 'getLabel',
      detail: 'Kısayollar',
      url: `api/Label/GetLabelsWithLastDay?storecode=${storeCode}`,
      type: 'get',
      site: 'a101kiosk',
      security: 0,
      model: [],
    }
  ]);
}; 