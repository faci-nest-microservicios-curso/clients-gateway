import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { NATS_SERVICE } from '../config';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import type { AuthResponse } from './interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) { }

    async registerUser(createUserDto: CreateUserDto): Promise<AuthResponse> {
        try {
            return await firstValueFrom(
                this.client.send<AuthResponse>(
                    { cmd: 'auth.register.user' },
                    createUserDto,
                ),
            );
        } catch (error) {
            throw new RpcException(error as object);
        }
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<AuthResponse> {
        try {
            return await firstValueFrom(
                this.client.send<AuthResponse>(
                    { cmd: 'auth.login.user' },
                    loginUserDto,
                ),
            );
        } catch (error) {
            throw new RpcException(error as object);
        }
    }

    async verifyUser(token: string): Promise<AuthResponse> {
        try {
            return await firstValueFrom(
                this.client.send<AuthResponse>(
                    { cmd: 'auth.verify.user' },
                    { token },
                ),
            );
        } catch (error) {
            throw new RpcException(error as object);
        }
    }
}
