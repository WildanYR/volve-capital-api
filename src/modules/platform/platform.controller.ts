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
import { PlatformService } from './platform.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { GetAllPlatformQueryDto } from './dto/get-all-platform-query.dto';

@Controller('platform')
export class PlatformController {
  constructor(
    private readonly platformService: PlatformService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllPlatformQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.platformService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.platformService.findOne(id);
  }

  @Post()
  create(@Body() createPlatformDto: CreatePlatformDto) {
    return this.platformService.create(createPlatformDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) platformId: number,
    @Body() updatePlatformDto: UpdatePlatformDto,
  ) {
    return this.platformService.update(platformId, updatePlatformDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) platformId: number) {
    return this.platformService.remove(platformId);
  }
}
