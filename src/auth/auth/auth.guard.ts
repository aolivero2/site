import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { readFile } from 'fs/promises';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService, private userService: UsersService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      let publicKey = await readFile(this.configService.get<string>("JWT_PUBLIC_KEY_FILE"))
      const payload = await this.jwtService.verifyAsync(token, {secret: publicKey});

      const user = await this.userService.findByUsername(payload.sub);

      if (!user) throw new UnauthorizedException();

      request['user'] = user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
