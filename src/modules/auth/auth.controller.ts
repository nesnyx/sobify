import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserRole } from '../users/entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  async login(@Body() body: LoginDto) {
    const newUser = await this.authService.login(body.email, body.password);
    return {
      success: true,
      data: newUser
    }
  }

  @Post("register")
  async register(@Body() body: CreateUserDto) {
    const newUser = await this.authService.register(UserRole.BARISTA, body);
    return {
      success: true,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }
  }

  @Post("/register/customer")
  async registerCustomr(@Body() body: CreateUserDto) {
    const newUser = await this.authService.register(UserRole.CUSTOMER, body);
    return {
      success: true,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async me(@Req() req) {
    return {
      success: true,
      data: req.user
    }
  }

  @Get("/env")
  getEnv() {
    return {
      jwtSecret: process.env.JWT_SECRET_KEY || 'not set'
    }
  }


}
