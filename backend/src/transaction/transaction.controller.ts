import { Controller, Post, Body, Get } from '@nestjs/common';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';
import { TransactionService, Transaction } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly exchangeRateService: ExchangeRateService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  async createTransaction(@Body('amountEUR') amountEUR: number) {
    const rate = await this.exchangeRateService.getExchangeRate();
    const amountPLN = amountEUR * rate;
    const transaction: Transaction = {
      amountEUR,
      amountPLN,
      rate,
      timestamp: new Date(),
    };
    this.transactionService.saveTransaction(transaction);
    return transaction;
  }

  @Get()
  getAllTransactions() {
    return this.transactionService.getAllTransactions();
  }
}
