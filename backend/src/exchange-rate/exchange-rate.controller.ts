import { Controller, Get } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';

@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get()
  async getExchangeRate() {
    const rate = await this.exchangeRateService.getExchangeRate();
    return { rate };
  }
}
