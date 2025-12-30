import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { UpdateMenuDto } from './dto/update-menu.dto';


@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private menuRepository: Repository<MenuItem>
  ) { }
  async create(createMenuDto: CreateMenuDto) {
    const newMenuItem = this.menuRepository.create(createMenuDto)
    return await this.menuRepository.save(newMenuItem);
  }

  async findAll() {
    return await this.menuRepository.find();
  }

  async findOne(id: string) {
    const existing = await this.menuRepository.findOne({ where: { id: id } })
    if (!existing) {
      throw new NotFoundException("Menu not found")
    }
    return existing
  }

  async remove(id: string) {
    return await this.menuRepository.delete({
      id: id
    })
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    const existing = await this.menuRepository.findOne({ where: { id: id } })
    if (!existing) {
      throw new NotFoundException("Menu not found")
    }
    const updated = this.menuRepository.merge(existing, updateMenuDto);
    return await this.menuRepository.save(updated);
  }

  async updateAvailability(id: string, isAvailable: boolean) {
    const existing = await this.menuRepository.findOne({ where: { id: id } })
    if (!existing) {
      throw new NotFoundException("Menu not found")
    }
    existing.isAvailable = isAvailable;
    return await this.menuRepository.save(existing);
  }
}
