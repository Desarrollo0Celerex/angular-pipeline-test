import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

    /**
     * Decode a token
     * @param  token Token to decode
     * @return       Token data if the decoding was success, otherwise null
     */
    decodeToken(token: string): any | null {
        try {
            return jwt_decode(token);
        } catch(error) {
            return null;
        }
    }
}
