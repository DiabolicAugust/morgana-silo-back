import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './interfaces/signUp.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './interfaces/signIn.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto): Promise<string> {
    const user = await this.userService.createUser(data);
    const token = await this.jwtService.signAsync({ sub: user.id });
    return token;
  }

  async signIn(data: SignInDto): Promise<string> {
    const user = await this.userService.getUserByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.signAsync({ sub: user.id });
    return token;
  }
}
