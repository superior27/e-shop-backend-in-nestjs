import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1) {
    page = isNaN(+page) ? 1 : Math.trunc(page);
    return this.stateService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') uuid: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.update(uuid, updateStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateService.remove(+id);
  }
}
