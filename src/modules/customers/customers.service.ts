import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) { }
  async create(createCustomerDto: CreateCustomerDto) {
    const newCustomer = this.customerRepository.create(createCustomerDto)
    return await this.customerRepository.save(newCustomer);
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: string) {
    const existingCustomer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return existingCustomer;
  }


  async remove(id: string) {
    const existingCustomer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return await this.customerRepository.remove(existingCustomer);
  }

  async update(id: string, customer: CreateCustomerDto) {
    const existingCustomer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    const updateCustomer = this.customerRepository.merge(existingCustomer, customer);
    return await this.customerRepository.save(updateCustomer);

  }
}
