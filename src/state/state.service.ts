import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StateService {

  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(createStateDto: CreateStateDto) {
    return await this.prisma.state.create({
      data:createStateDto
    });
  }

  async findAll(page: number = 1) {
    return await this.prisma.state.findMany({
      take: 10,
      skip: 10 * (page - 1),
    });
  }

  async findOne(uuid: string) {
    const result = await this.prisma.state.findUnique({
      where: {
        uuid: uuid
      }
    });

    if(!result)
    {
      throw new NotFoundException('Register not found!');
      
    }

    return result;
  }

  async update(uuid: string, updateStateDto: UpdateStateDto) {
    try {
      return await this.prisma.state.update({
        data: updateStateDto,
        where: {
          uuid: uuid
        }
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Register not found!');
      
    }
  }

  remove(id: number) {
    return `This action removes a #${id} state`;
  }
}
