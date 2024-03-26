import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {

        const user = await this.userService.getUserWithEmail(email)

        if (user && (await bcrypt.compare(password, user.password))) {

            const { password, ...others } = user

            return others

        }

        return null

    }

    async register(registerDto: RegisterDto) {

        const user = await this.userRepository.findOne({ where: { email: registerDto.email } })

        if (user) {
            throw new ConflictException('Email already exist')
        }

        const newUser = this.userRepository.create(registerDto)

        await this.userRepository.save(newUser)

        return newUser

    }

    async login(loginDto: LoginDto) {

        const user = await this.userRepository.findOne({ where: { email: loginDto.email } })

        if (!user) {
            throw new NotFoundException('Email not found')
        }

        const comparePassword = await bcrypt.compare(loginDto.password, user.password)

        if (!comparePassword) {
            throw new UnauthorizedException('Password has been wrong')
        }

        const access_token = this.jwtService.sign({ id: user.id, email: user.email })

        const refresh_token = this.jwtService.sign({ id: user.id, email: user.email }, { expiresIn: '7d' })

        delete user.password

        return { ...user, access_token: access_token, refresh_token: refresh_token }


    }

    signRefreshToken(user: User) {

        return { access_token: this.jwtService.sign({ id: user.id, email: user.email }) }

    }

}
