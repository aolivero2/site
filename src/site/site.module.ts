import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Site } from './entities/site.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Site]), JwtModule, ConfigModule, UsersModule],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
