import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma/prisma.service';
import { postalCodeValidator } from './actions/user.encrypt-password.action';


@Injectable()
export class AddressService {

  constructor(private readonly prisma: PrismaService){}

  async create(createAddressDto: CreateAddressDto) {

    createAddressDto.postal_code = postalCodeValidator(createAddressDto.postal_code);
    
    try 
    {

      return await this.prisma.address.create({
        data: createAddressDto
      });

    } 
    catch (error) 
    {
      throw new BadRequestException('Register not created!');
    }
    
  }

  async findAll(page: number = 1) {
    return await this.prisma.address.findMany({
      take: 10,
      skip: 10 * (page - 1),
      include: {
        city: {
          include: {
            state: true
          }
        }
      }

    });  
  }

  async findOne(uuid: string) {
    try 
    {
      return await this.prisma.address.findUnique({
        where: {
          uuid: uuid,
        }
      });
      
    } catch (error) 
    {
      throw new NotFoundException('Register not found!');
    }
    
  }

  async update(uuid: string, updateAddressDto: UpdateAddressDto) {
    if(updateAddressDto?.postal_code)
    {
      updateAddressDto.postal_code = postalCodeValidator(updateAddressDto.postal_code);
    }
    try 
    {
      return await this.prisma.address.update({
        where: {
          uuid: uuid
        },
        data: updateAddressDto
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
      return await this.prisma.address.delete({
        where: {
          uuid: uuid
        }
      });
      
    } 
    catch (error) 
    {
      throw new NotFoundException('Register not deleted!');
    }
  }
  
}
