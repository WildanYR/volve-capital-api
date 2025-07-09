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
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { GetAllTransactionQueryDto } from './dto/get-all-transaction-query.dto';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllTransactionQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.transactionService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.transactionService.findOne(id);
  }
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) transactionId: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(transactionId, updateTransactionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) transactionId: number) {
    return this.transactionService.remove(transactionId);
  }
}
