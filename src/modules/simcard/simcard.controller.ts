import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreateSimcardDto } from './dto/create-simcard.dto';
import { UpdateSimcardDto } from './dto/update-simcard.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { SimcardService } from './simcard.service';
import { GetAllSimcardQueryDto } from './dto/get-all-simcard-query.dto';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';

@Controller('simcard')
export class SimcardController {
  constructor(
    private readonly simcardService: SimcardService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllSimcardQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.simcardService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.simcardService.findOne(id);
  }

  @Post()
  create(@Body() createSimcardDto: CreateSimcardDto) {
    return this.simcardService.create(createSimcardDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) simcardId: number,
    @Body() updateSimcardDto: UpdateSimcardDto,
  ) {
    return this.simcardService.update(simcardId, updateSimcardDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) simcardId: number) {
    return this.simcardService.remove(simcardId);
  }
}
