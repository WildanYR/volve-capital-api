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
import { EWalletTypeService } from './ewallet-type.service';
import { CreateEWalletTypeDto } from './dto/create-ewallet-type.dto';
import { UpdateEWalletTypeDto } from './dto/update-ewallet-type.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { GetAllEwalletTypeQueryDto } from './dto/get-all-ewallet-type-query.dto';

@Controller('ewallet-type')
export class EWalletTypeController {
  constructor(
    private readonly eWalletTypeService: EWalletTypeService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllEwalletTypeQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.eWalletTypeService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.eWalletTypeService.findOne(id);
  }

  @Post()
  create(@Body() createEWalletTypeDto: CreateEWalletTypeDto) {
    return this.eWalletTypeService.create(createEWalletTypeDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) eWalletTypeId: number,
    @Body() updateEWalletTypeDto: UpdateEWalletTypeDto,
  ) {
    return this.eWalletTypeService.update(eWalletTypeId, updateEWalletTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) eWalletTypeId: number) {
    return this.eWalletTypeService.remove(eWalletTypeId);
  }
}
