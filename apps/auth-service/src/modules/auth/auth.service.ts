import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { compare, hash } from 'bcrypt';

import { UsersService } from '../users/users.service';

import { getConfig } from 'src/shared/config/config.helper';

import type {
  AuthPayload,
  SessionPayload,
  SignInData,
  SignUpData,
  UserWithoutPassword,
} from '@challenge/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(signInData: SignInData): Promise<AuthPayload> {
    const { email, password } = signInData;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.generateToken(user.id, 'access');
    const refreshToken = await this.generateToken(user.id, 'refresh');

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      },
      accessToken,
      refreshToken,
    };
  }

  async signUp(signUpData: SignUpData): Promise<AuthPayload> {
    const { email, username, password } = signUpData;

    const SALT = 10;

    const emailTaken = await this.usersService.findByEmail(email);
    if (emailTaken) {
      throw new ConflictException('This email is already in use.');
    }

    const usernameTaken = await this.usersService.findByUsername(username);
    if (usernameTaken) {
      throw new ConflictException('This username is already in use.');
    }

    const hashedPassword = await hash(password, SALT);

    const createdUser = await this.usersService.create({
      email,
      username,
      password: hashedPassword,
    });

    const accessToken = await this.generateToken(createdUser.id, 'access');
    const refreshToken = await this.generateToken(createdUser.id, 'refresh');

    return {
      user: {
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
        createdAt: createdUser.createdAt,
      },
      accessToken,
      refreshToken,
    };
  }

  async refresh(userId: string): Promise<SessionPayload> {
    const accessToken = await this.generateToken(userId, 'access');

    const activeUser = await this.usersService.findById(userId);

    return {
      accessToken,
      user: {
        id: activeUser.id,
        email: activeUser.email,
        username: activeUser.username,
        createdAt: activeUser.createdAt,
      },
    };
  }

  async findActiveUser(userId: string): Promise<{ user: UserWithoutPassword }> {
    const user = await this.usersService.findById(userId);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      },
    };
  }

  private generateToken(
    userId: string,
    type: 'access' | 'refresh',
  ): Promise<string> {
    const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = getConfig(
      this.configService,
    );

    const payload = { sub: userId };
    const options: JwtSignOptions =
      type === 'refresh'
        ? { expiresIn: '7d', secret: JWT_REFRESH_SECRET }
        : { expiresIn: '15m', secret: JWT_ACCESS_SECRET };

    return this.jwtService.signAsync(payload, options);
  }
}
