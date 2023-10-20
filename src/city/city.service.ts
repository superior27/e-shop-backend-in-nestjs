import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CityService {

  constructor(private readonly prisma: PrismaService){}

  async create(createCityDto: CreateCityDto) {
    
    try 
    {
      return await this.prisma.city.create({
        data: createCityDto,
        include: {
          state: true
        }
      })
      
    } catch (error) 
    {
      throw new BadRequestException('Register not created!');  
    }

  }

  async findAll(page: number = 1) {
    return await this.prisma.city.findMany({
      take: 10,
      skip: 10 * (page - 1),
      include: {
        state: true
      }
    });
  }

  async findOne(uuid: string) {
    
    const city = this.prisma.city.findUnique({
      where: {
        uuid: uuid
      }
    });
    
    if(!city)
    {
      throw new BadRequestException('Register not found!');
    }

    return city;
  }

  async update(uuid: string, updateCityDto: UpdateCityDto) {
    try 
    {
      return await this.prisma.city.update({
        where: {
          uuid: uuid
        },
        data: updateCityDto,
        include: {
          state: true
        }
      });
      
    } 
    catch (error) 
    {
      throw new BadRequestException('Register not updated!');
      
    }
    
  }

  async remove(uuid: string) {
    try 
    {
      await this.prisma.city.delete({
        where: {
          uuid: uuid
        }
      });
    
      return `${uuid} is removed!`
      
    } 
    catch (error) 
    {
      throw new BadRequestException('Register not deleted!');
    }
    
  }

  async findAllByState(page: number = 1, state_uuid: string) {
    return await this.prisma.city.findMany({
      take: 10,
      skip: 10 * (page - 1),
      include: {
        state: true
      },
      where: {
        state: {
          uuid: state_uuid
        }
      }
    });
  }
}
