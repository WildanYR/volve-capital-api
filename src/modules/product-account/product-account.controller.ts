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
import { ProductAccountService } from './product-account.service';
import { CreateProductAccountDto } from './dto/create-product-account.dto';
import { UpdateProductAccountDto } from './dto/update-product-account.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { GetAllProductAccountQueryDto } from './dto/get-all-product-account-query.dto';

@Controller('product-account')
export class ProductAccountController {
  constructor(
    private readonly productAccountService: ProductAccountService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllProductAccountQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.productAccountService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.productAccountService.findOne(id);
  }

  @Post()
  create(@Body() createProductAccountDto: CreateProductAccountDto) {
    return this.productAccountService.create(createProductAccountDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) productAccountId: number,
    @Body() updateProductAccountDto: UpdateProductAccountDto,
  ) {
    return this.productAccountService.update(
      productAccountId,
      updateProductAccountDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) productAccountId: number) {
    return this.productAccountService.remove(productAccountId);
  }
}
