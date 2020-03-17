import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@interfaces/user.interface';
import { Register } from '@interfaces/register.interface';
import { Status } from '@interfaces/status.interface';

@Injectable()
export class AuthService {
    token = '';
    user: User;

    constructor(private httpClient: HttpClient) {}

    static saveToken(token: string): void {
        if (token) {
            const encodedToken = token.indexOf('"') === -1 ? encodeURIComponent(`"${token}"`) : encodeURIComponent(token);
            document.cookie = `token=${encodedToken};secure`;
        }
    }

    static getCookie(cname: string): string {
        let cookieValue = '';
        const name = cname + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const authCookies = decodedCookie.split(';');
        authCookies.forEach(authCookie => {
            while (authCookie.charAt(0) === ' ') {
                authCookie = authCookie.substring(1);
            }
            if (authCookie.indexOf(name) === 0) {
                cookieValue = authCookie.substring(name.length, authCookie.length);
            }
        });
        return typeof cookieValue ? cookieValue.replace(/"/g, '') : cookieValue;
    }

    public setToken(token: string) {
        const cookieToken = AuthService.getCookie('token');
        this.token = cookieToken === '' ? token : cookieToken;
        return this.httpClient.get('me/status');
    }

    public getAuthorizationToken(): string {
        return this.token ? this.token : AuthService.getCookie('token');
    }

    public setStatus(status: Status): void {
        this.token = status.token;
        AuthService.saveToken(this.token);
        this.user = status.user;
    }

    public isAuthorized(): boolean {
        return this.user && !!this.user.id;
    }

    public register(requestBody: Register) {
        return this.httpClient.post('me/register', requestBody);
    }
}
