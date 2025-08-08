import { ApiHelper } from '@/services/extension/ApiHelper';

export const loginService = async (model) => {
    return ApiHelper([
        {
            name: 'Login',
            detail: 'Giriş',
            url: `api/Terminal/TerminalLogin`,
            type: 'post',
            site: 'a101',
            security: 0,
            model: model,
        }
    ]);
};
