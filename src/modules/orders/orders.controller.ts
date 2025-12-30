import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post("agent")
  createAgent(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createAgent(createOrderDto);
  }

  @Post()
  async create(@Body() createOrderDto : CreateOrderItemDto){
    return await this.ordersService.create(createOrderDto)
  }

  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(id);
  }
}
