import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encryptAction } from './actions/user.encrypt-password.action';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await encryptAction(createUserDto.password);
    return await this.prisma.user.create({
      data:createUserDto
    });
  }

  async findAll(page: number = 1) {
    return await this.prisma.user.findMany({
      take: 10,
      skip: 10 * (page - 1),
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
