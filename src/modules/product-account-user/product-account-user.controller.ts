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
import { ProductAccountUserService } from './product-account-user.service';
import { CreateProductAccountUserDto } from './dto/create-product-account-user.dto';
import { UpdateProductAccountUserDto } from './dto/update-product-account-user.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { GetAllProductAccountUserQueryDto } from './dto/get-all-product-account-user-query.dto';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';

@Controller('product-account-user')
export class ProductAccountUserController {
  constructor(
    private readonly productAccountUserService: ProductAccountUserService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllProductAccountUserQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.productAccountUserService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.productAccountUserService.findOne(id);
  }

  @Post()
  create(@Body() createProductAccountUserDto: CreateProductAccountUserDto) {
    return this.productAccountUserService.create(createProductAccountUserDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) productAccountUserId: number,
    @Body() updateProductAccountUserDto: UpdateProductAccountUserDto,
  ) {
    return this.productAccountUserService.update(
      productAccountUserId,
      updateProductAccountUserDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) productAccountUserId: number) {
    return this.productAccountUserService.remove(productAccountUserId);
  }
}
