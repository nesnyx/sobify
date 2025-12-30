import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchant } from './entities/merchant.entity';
import { Repository } from 'typeorm';


@Injectable()
export class MerchantService {
  constructor(@InjectRepository(Merchant) private readonly merchantRepository: Repository<Merchant>) { }


  async create(createMerchantDto: CreateMerchantDto) {
    const newMerchant = this.merchantRepository.create(createMerchantDto);
    return await this.merchantRepository.save(newMerchant);
  }

  async findAll() {
    return this.merchantRepository.find()
  }

  async findOne(id: string) {
    const existing = await this.merchantRepository.findOne({
      where: {
        id: id
      }
    })
    if (!existing) {
      throw new NotFoundException("Merchant not found")
    }
    return existing
  }


  async remove(id: string) {
    return await this.merchantRepository.delete({
      id: id
    })
  }

  async update(id: string, updateMerchantDto: CreateMerchantDto) {
    const existing = await this.merchantRepository.findOne({ where: { id: id } })
    if (!existing) {
      throw new NotFoundException("Merchant not found")
    }
    const updated = this.merchantRepository.merge(existing, updateMerchantDto);
    return await this.merchantRepository.save(updated);
  }
}
