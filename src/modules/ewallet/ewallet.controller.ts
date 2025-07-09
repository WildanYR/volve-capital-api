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
import { EWalletService } from './ewallet.service';
import { CreateEWalletDto } from './dto/create-ewallet.dto';
import { UpdateEWalletDto } from './dto/update-ewallet.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { GetAllEwalletQueryDto } from './dto/get-all-ewallet-query.dto';

@Controller('ewallet')
export class EWalletController {
  constructor(
    private readonly ewalletService: EWalletService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllEwalletQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.ewalletService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.ewalletService.findOne(id);
  }

  @Post()
  create(@Body() createEWalletDto: CreateEWalletDto) {
    return this.ewalletService.create(createEWalletDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) ewalletId: number,
    @Body() updateEWalletDto: UpdateEWalletDto,
  ) {
    return this.ewalletService.update(ewalletId, updateEWalletDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) ewalletId: number) {
    return this.ewalletService.remove(ewalletId);
  }
}
