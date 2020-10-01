import * as jwt from 'jsonwebtoken';

export interface AuthenticationData {
    id: string
};

export class Authenticator {
    public generateToken(data: AuthenticationData): string {
        return jwt.sign(
            data,
            process.env.JWT_KEY as string,
            {expiresIn: process.env.JWT_EXPIRES_IN as string}
        )
    }

    public getData(token: string): AuthenticationData {
        const data = jwt.verify(
            token,
            process.env.JWT_KEY as string
        ) as any
        return {
            id: data.id
        }
    }
}