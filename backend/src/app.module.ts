import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';
import { ExchangeRateController } from './exchange-rate/exchange-rate.controller';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register(),
  ],
  controllers: [ExchangeRateController, TransactionController],
  providers: [ExchangeRateService, TransactionService],
})
export class AppModule {}
