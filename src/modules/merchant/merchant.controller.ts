import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';


@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  async create(@Body() createMerchantDto: CreateMerchantDto) {
    return await this.merchantService.create(createMerchantDto);
  }

  @Get()
  async findAll() {
    return await this.merchantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.merchantService.findOne(id);
  }



  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.merchantService.remove(id);
  }

  @Put(':id')
  async update(@Param('id') id: string,  @Body() updateMerchantDto: CreateMerchantDto) {
    return await this.merchantService.update(id, updateMerchantDto);
  }
}
