import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RefreshJwtStrategy } from './strategy/refresh-token.strategy';

@Module({

  imports: [

    PassportModule,

    TypeOrmModule.forFeature([User]),

    UsersModule,

    JwtModule.register({

      secret: 'secret-key',
      signOptions: { expiresIn: '1m' }

    })

  ],

  controllers: [
    AuthController
  ],

  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy
  ]

})
export class AuthModule { }
