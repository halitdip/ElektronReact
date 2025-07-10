// src/services/extension/HttpClientServices.js

import axios from 'axios';

// Burada domain bazlı base URL tanımları yapabilirsiniz. 
const BASE_URLS = {
    a101kiosk: 'http://10.7.2.21:8039/', 
    // eğer başka siteler varsa buraya ekleyin: : 192.168.1.105
    // örn: other: 'https://api.othersite.com/'
};

/**
 * UniterApiService:
 *  - method: 'get' | 'post' | 'put' | 'delete' | vs.
 *  - site: 'kiosk' | diğer tanımlı anahtarlar
 *  - url: 'api/auth/login' gibi relative path
 *  - data: request body (JSON)
 *  - security: 0 veya 1 → 1 ise Authorization header beklenir
 *  - token: eğer security = 1, burada JWT verirsiniz; null ise header eklenmez
 */
export default async function UniterApiService(
    method,
    site,
    url,
    data = null,
    security = 0,
    token = null
) {
    try {
        if (!BASE_URLS[site]) {
            throw new Error(`Bilinmeyen site parametresi: ${site}`);
        }

        const baseURL = BASE_URLS[site];


        const fullURL = baseURL + url; // Örneğin 'http://localhost:3001/' + 'api/auth/login'

        const headers = {
            'Content-Type': 'application/json',
        };
        console.log("tokennnn", token)
        if (security === 1 && token) {
            headers.Authorization = `Bearer ${token}`;
        }
        console.log(fullURL)
        // Axios isteği
        const response = await axios({
            method: method,
            url: fullURL,
            headers,
            data: data,
        });

        // Axios 2xx dönerse data’i return et
        return {
            isError: false,
            status: response.status,
            data: response.data,
        };
    } catch (error) {

        // Eğer sunucu 4xx/5xx döndüyse, error.response mevcuttur
        if (error.response) {
            return {
                isError: true,
                status: error.response.status,
                message:
                    error.response.data?.message ||
                    error.response.data?.title ||
                    'Sunucudan hata alındı.',
            };
        }
        // Diğer durumlar (network error, vs.)
        return {
            isError: true,
            status: 500,
            message: error.message || 'Bilinmeyen bir hata oluştu.',
        };
    }
}
