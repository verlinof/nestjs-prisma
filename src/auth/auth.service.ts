import { HttpException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.userService.findByEmail(authDto.email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isMatch = await compare(authDto.password, user.password);
    if (!isMatch) {
      throw new HttpException('Wrong email or password', 401);
    }

    // Hilangkan password sebelum mengembalikan user
    const { password, ...result } = user;
    const payload = { id: user.id, email: user.email };

    return {
      ...result,
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'qwertyuiopasdfghjklzxcvbnm',
        expiresIn: '1d',
      }),
    };
  }
}
