import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';
import { ExchangeRateController } from './exchange-rate/exchange-rate.controller';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [ExchangeRateController, TransactionController],
  providers: [ExchangeRateService, TransactionService],
})
export class AppModule {}
