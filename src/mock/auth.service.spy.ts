import { User } from '@interfaces/user.interface';
import { Register } from '@interfaces/register.interface';
import { Status } from '@interfaces/status.interface';

import {of} from 'rxjs';

export class AuthServiceSpy {
    token = '';
    user: User;
    fakeUser = {
        token: '1a2d3s3f',
        user: {
            id: 1,
            account_number: 1,
            first_name: 'Test',
            last_name: 'Test',
            created: '2020-03-17T08:48:43.053+00:00'
        }
    };

    constructor() {}

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
        const cookieToken = AuthServiceSpy.getCookie('token');
        this.token = cookieToken === '' ? token : cookieToken;
        return of(this.fakeUser);
    }

    public getAuthorizationToken(): string {
        return this.token ? this.token : AuthServiceSpy.getCookie('token');
    }

    public setStatus(status: Status): void {
        this.token = status.token;
        AuthServiceSpy.saveToken(this.token);
        this.user = status.user;
    }

    public isAuthorized(): boolean {
        return this.user && !!this.user.id;
    }

    public register(requestBody: Register) {
        return of(this.fakeUser);
    }
}
