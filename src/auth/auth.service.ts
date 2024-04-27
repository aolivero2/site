import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async login(username: string, password: string) {
        const user = await this.usersService.findByUsername(username);

        if (!user) throw new ForbiddenException("Bad credentials");

        let match = await bcrypt.compare(password, user.password);

        if (!match) throw new ForbiddenException("Bad credentals");

        const payload = {uid: user.id};

        return {
            user,
            token: await this.jwtService.signAsync(payload, {subject: user.username}),
            token_type: "Bearer"
        }
    }
}
