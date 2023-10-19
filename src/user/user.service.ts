import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(uuid: string) {
    
    const user = await this.prisma.user.findUnique({
      where: {
        uuid:uuid
      }
    });
    
    if(!user)
    {
      throw new NotFoundException('Register not found!');
    }

    return user;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    try 
    {
      return await this.prisma.user.update({
        where: {
          uuid:uuid
        },
        data: updateUserDto
      });
      
    } 
    catch (error) 
    {
      throw new NotFoundException('Register not updated!');
    }
  }

  async remove(uuid: string) {
    try 
    {
      await this.prisma.user.delete({
        where: {
          uuid: uuid
        }
      });
      
      return `${uuid} is removed!`;
    } 
    catch (error) 
    {
      throw new NotFoundException("Register not deleted!");
      
    }
  }

}
