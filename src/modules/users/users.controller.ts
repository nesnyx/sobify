import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';



@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Put()
  async updateProfile(@Body() name: string, @Param("id") id: string) {
    const updateProfile = await this.usersService.updateProfile(id, name);
    return {
      success: true,
      data: updateProfile
    }
  }


}
