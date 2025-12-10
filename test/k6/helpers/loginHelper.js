// Helper para login
import http from 'k6/http';
import { getBaseUrl } from './baseUrlHelper.js';

export function login(email, senha) {
    const url = `${getBaseUrl()}/auth/login`;
    const payload = JSON.stringify({ 
          email: email, 
          password: senha 
        });
    const params = { 
        headers: { 'Content-Type': 'application/json' } };
    const res = http.post(url, payload, params);
    return res;
}
