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
import { CreateEWalletTopupDto } from './dto/create-ewallet-topup.dto';
import { UpdateEWalletTopupDto } from './dto/update-ewallet-topup.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { EWalletTopupService } from './ewallet-topup.service';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { GetAllEwalletTopupQueryDto } from './dto/get-all-ewallet-topup-query.dto';

@Controller('ewallet-topup')
export class EWalletTopupController {
  constructor(
    private readonly eWalletTopupService: EWalletTopupService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllEwalletTopupQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.eWalletTopupService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.eWalletTopupService.findOne(id);
  }

  @Post()
  create(@Body() createEWalletTopupDto: CreateEWalletTopupDto) {
    return this.eWalletTopupService.create(createEWalletTopupDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) eWalletTopupId: number,
    @Body() updateEWalletTopupDto: UpdateEWalletTopupDto,
  ) {
    return this.eWalletTopupService.update(
      eWalletTopupId,
      updateEWalletTopupDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) eWalletTopupId: number) {
    return this.eWalletTopupService.remove(eWalletTopupId);
  }
}
