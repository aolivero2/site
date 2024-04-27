import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private user: typeof User) {}

    async findByUsername(username: string) {
        return this.user.findOne({
            where: {
                username
            }
        })
    }
}
