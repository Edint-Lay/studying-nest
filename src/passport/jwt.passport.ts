import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategyPassport extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {
    super({
      /** JWT SECRET KEY, TOKEN이 유효한지 CHECK할 때 사용 */
      secretOrKey: process.env.JWT_SECRET_KEY,
      /** TOKEN이 어디서 가져올 지 Header에서 가져올 때 Bearer라는 값을 가지고 있는지 확인 (공식) */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const { username } = payload;
    const user: Users = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
