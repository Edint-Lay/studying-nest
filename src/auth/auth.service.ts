import {
  Injectable,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../models/entities/user.entity';
import { PostUserDto } from 'src/models/dtos/user/post.user.dto';
import { LoginUserDto } from 'src/models/dtos/user/login.user.dto'; 
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async signup(postUserDto: PostUserDto): Promise<void> {
    try {
      const { username, password, passwordCheck } = postUserDto;
      if (password !== passwordCheck)
        throw new BadRequestException('비밀번호가 일치하지 않습니다.');

      const hash = await bcrypt.hash(password, 10);
      if (!hash) throw new NotImplementedException('hasing failed.');

      const postUser = this.usersRepository.create({
        username,
        password: hash,
      });
      await this.usersRepository.save(postUser);
    } catch (err) {
      if (err.code === '23505') throw new ConflictException('EXIST USERNAME');
      else console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    try {
      const { username, password } = loginUserDto;

      const findUserByUserName = await this.usersRepository.findOne({
        where: {
          username: username,
        },
      });
      if (!findUserByUserName.username)
        throw new UnauthorizedException('존재하지 않는 아이디 입니다.');

      const hashed = await bcrypt.compare(
        password,
        findUserByUserName.password,
      );
      if (!hashed) throw new ConflictException('NOT COMPARE PASSWORD');

      const token = await this.jwtService.sign({ username }, {
        privateKey: process.env.JWT_SECRET_KEY,
        expiresIn : "1h"
      });

      return { token: token };
    } catch (err) {
        console.log(err);
        throw new InternalServerErrorException()
    }
  }
}
