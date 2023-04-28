import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable()
export class JwtService {
    decodeToken(token: string): any | null {
        try {
            return jwt_decode(token);
        } catch (error) {
            return null;
        }
    }
}
