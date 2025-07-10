// src/services/extension/ApiHelper.js

import UniterApiService from './HttpClientServices';
/* import AsyncStorage from '@react-native-async-storage/async-storage'; */
import { startLoading, stopLoading } from './loadingService';
// logoutFunction parametresini kaldırın ve getLogoutFunction'ı import edin 

export const ApiHelper = async (requests) => { // logoutFunction parametresini kaldırdık
  const loader = typeof requests[0].loader === 'boolean' ? requests[0].loader : true
  if (loader)
    startLoading();

  try {
    if (!Array.isArray(requests)) {
      throw new Error('ApiHelper parametresi dizi olmalıdır.');
    }

    const needAuth = requests.some((req) => req.security === 1);
    let jwtToken = null;
    /* if (needAuth) {
      jwtToken = await AsyncStorage.getItem('accessToken');
    } */

    const settled = await Promise.allSettled(
      requests.map(async (req) => {
        try {
          const apiResponse = await UniterApiService(
            req.type,
            req.site,
            req.url,
            req.model,
            req.security,
            jwtToken
          );

          if (apiResponse.isError) { 
            return {
              [req.name]: {
                isError: true,
                status: apiResponse.status,
                message: `${req.detail} - ${apiResponse.message}`,
              },
            };
          }

          return {
            [req.name]: {
              isError: false,
              status: apiResponse.status,
              data: apiResponse.data,
            },
          };
        } catch (innerError) {
          return {
            [req.name]: {
              isError: true,
              status: innerError.status || 500,
              message: `${req.detail} - ${innerError.message}`,
            },
          };
        }
      })
    );

    const merged = {};
    settled.forEach((res) => {
      if (res.status === 'fulfilled' && res.value) {
        Object.assign(merged, res.value);
      }
    });

    return merged;
  } catch (error) {
    throw error;
  } finally {
    if (loader)
      stopLoading();
  }
};

