// services/main/AuthServices.js

import { ApiHelper } from '@/services/extension/ApiHelper';

export const GetPartialInvProducts = async (storeCode) => {
  return ApiHelper([
    {
      name: 'GetPartialInvProducts',
      detail: 'InvProducts',
      url: `api/Terminal/GetPartialInvProducts/${storeCode}`,
      type: 'get',
      site: 'a101',
      security: 0,
      model: [],
    }
  ]);
};
