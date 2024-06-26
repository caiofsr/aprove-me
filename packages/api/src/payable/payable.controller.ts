import { AuthGuard } from '@auth/auth.guard';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { ProducerService } from 'src/rabbitmq/producer.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';

type PayableBatch = {
  payables: CreatePayableDto[];
};

@Controller()
export class PayableController {
  constructor(
    private readonly payableService: PayableService,
    private readonly producerService: ProducerService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return this.payableService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.payableService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payableService.update(id, updatePayableDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.payableService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Post('batch')
  async payableBatch(@Body() { payables }: PayableBatch) {
    await this.producerService.sendMessage(payables);
  }
}
