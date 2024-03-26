import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({

  imports: [

    TypeOrmModule.forRoot({

      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Shayan786%',
      database: 'users',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true

    }),

    UsersModule,

    CommentsModule,

    AuthModule,

  ],

})
export class AppModule { }
