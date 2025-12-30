import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';


@Injectable()
export class CustomersService {
  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }



  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
