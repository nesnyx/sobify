import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt-strategy';

@Module({
  imports:[TypeOrmModule.forFeature([User]),PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
      secret: String(process.env.JWT_SECRET_KEY),
      signOptions: { expiresIn: '1h' }})],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
})
export class UsersModule {}
