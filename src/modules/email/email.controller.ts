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
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { GetAllEmailQueryDto } from './dto/get-all-email-query.dto';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllEmailQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.emailService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.emailService.findOne(id);
  }

  @Post()
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) emailId: number,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    return this.emailService.update(emailId, updateEmailDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) emailId: number) {
    return this.emailService.remove(emailId);
  }
}
