import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order, StatusOrder } from './entities/order.entity';
import { Customer } from '../customers/entities/customer.entity';
import { OrderItem } from './entities/order-item.entity';
import { MenuItem } from '../menu/entities/menu.entity';


@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order)
  private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectDataSource()
    private readonly dataSource: DataSource) { }

  async createAgent(createOrderDto: CreateOrderDto) {
    try {
      const newCustomer = this.customerRepository.create({
        name: createOrderDto.customerName,
      });
      await this.customerRepository.save(newCustomer)

      const newOrderItem = this.orderItemRepository.create({
        quantity: createOrderDto.quantity,
        pricePerItem: 20000
      })

      await this.orderItemRepository.save(newOrderItem)
      const newOrder = this.orderRepository.create({
        status: 'ON-PROCESS',
        totalAmount: createOrderDto.quantity * 20000
      });
      await this.orderRepository.save(newOrder);
      const newMenuItem = this.menuItemRepository.create({
        name: createOrderDto.productName,
        price: 20000,
        description: 'description',
        category: 'category',
      })
      await this.menuItemRepository.save(newMenuItem)
      return newOrder;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async create(payload: CreateOrderItemDto) {
    const existingMenu = await this.menuItemRepository.findOne({
      where: { id: payload.menuItemId },
    });

    if (!existingMenu) {
      throw new NotFoundException(`Menu item with id ${payload.menuItemId} not found`);
    }

    return await this.dataSource.transaction(async (manager) => {
      const orderRepo = manager.getRepository(Order);
      const orderItemRepo = manager.getRepository(OrderItem);

      const newOrder = orderRepo.create({
        status: StatusOrder.PENDING,
        totalAmount: existingMenu.price * payload.quantity,
      });

      const savedOrder = await orderRepo.save(newOrder);

      const newOrderItem = orderItemRepo.create({
        quantity: payload.quantity,
        pricePerItem: existingMenu.price,
        menuItem: { id: existingMenu.id },
        order: { id: savedOrder.id },
      });

      const savedOrderItem = await orderItemRepo.save(newOrderItem);

      return { order: savedOrder, orderItem: savedOrderItem };
    });
  }

  async findAll() {
    return {
      "data": await this.orderRepository.find({
        relations: {
          items: {
            menuItem: true,
          },
        },
        select: {
          id: true,
          status: true,
          totalAmount: true,
          items: {
            menuItem: true,
            quantity: true,
            pricePerItem: true,
          }
        }
      })
    }
  }

  async findOne(id: string) {
    const existingOrder = await this.orderRepository.findOne({
      where: {
        id: id
      }
    })
    if (!existingOrder) {
      throw new NotFoundException("Order not found")

    }
    return existingOrder
  }

  async remove(id: string) {
    return await this.orderRepository.delete(id)
  }
}
