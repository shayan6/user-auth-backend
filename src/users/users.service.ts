import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async getUserWithEmail(email: string): Promise<User> {

        return await this.userRepository.findOne({ where: { email: email } })

    }

    async getAllUser(): Promise<User[]> {

        const users = await this.userRepository.find()

        users.map((user) => delete user.password)

        return users

    }

    async getUserById(userId: string) {

        const user = await this.userRepository.findOne({ where: { id: userId }, relations: { comments: true } })

        return user

    }

}
