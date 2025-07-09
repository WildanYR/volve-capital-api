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
import { ProductVariantService } from './product-variant.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { GetAllProductVariantQueryDto } from './dto/get-all-product-variant-query.dto';

@Controller('product-variant')
export class ProductVariantController {
  constructor(
    private readonly productVariantService: ProductVariantService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllProductVariantQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.productVariantService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.productVariantService.findOne(id);
  }

  @Post()
  create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return this.productVariantService.create(createProductVariantDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) productVariantId: number,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return this.productVariantService.update(
      productVariantId,
      updateProductVariantDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) productVariantId: number) {
    return this.productVariantService.remove(productVariantId);
  }
}
