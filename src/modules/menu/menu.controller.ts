import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { UpdateMenuDto } from './dto/update-menu.dto';



@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("admin")
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    const newMenu = await this.menuService.create(createMenuDto);
    return ResponseHelper.created(newMenu, 'Menu created successfully');
  }

  @Get()
  async findAll() {
    return ResponseHelper.success(await this.menuService.findAll(), 'Menus retrieved successfully');
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return ResponseHelper.success(await this.menuService.findOne(id), 'Menu retrieved successfully');
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("admin","barista")
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.menuService.remove(id)
    return ResponseHelper.success('Menu deleted successfully');
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("admin","barista")
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    const updatedMenu = await this.menuService.update(id, updateMenuDto);
    return ResponseHelper.success(updatedMenu, 'Menu updated successfully');
  }
  
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("admin", "barista")
  @Patch(':id/availability')
  async updateAvailability(@Param('id') id: string, @Body('isAvailable') isAvailable: boolean) {
    const updatedMenu = await this.menuService.updateAvailability(id, isAvailable);
    return ResponseHelper.success(updatedMenu, 'Menu availability updated successfully');
  }


}
