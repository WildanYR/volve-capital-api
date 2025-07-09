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
import { PlatformProductService } from './platform-product.service';
import { CreatePlatformProductDto } from './dto/create-platform-product.dto';
import { UpdatePlatformProductDto } from './dto/update-platform-product.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { GetAllPlatformProductQueryDto } from './dto/get-all-platform-product.query.dto';

@Controller('platform-product')
export class PlatformProductController {
  constructor(
    private readonly platformProductService: PlatformProductService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllPlatformProductQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.platformProductService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.platformProductService.findOne(id);
  }

  @Post()
  create(@Body() createPlatformProductDto: CreatePlatformProductDto) {
    return this.platformProductService.create(createPlatformProductDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) platformProductId: number,
    @Body() updatePlatformProductDto: UpdatePlatformProductDto,
  ) {
    return this.platformProductService.update(
      platformProductId,
      updatePlatformProductDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) platformProductId: number) {
    return this.platformProductService.remove(platformProductId);
  }
}
