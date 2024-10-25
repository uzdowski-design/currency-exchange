import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import axios from 'axios';
import { Cache } from 'cache-manager';

@Injectable()
export class ExchangeRateService {
  private readonly apiUrl =
    'https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api';
  private readonly apiKey = 'DInGz8W0Wr8t0fYAY21ddL2JMmZ2uHT1hxAxUSTa';
  private readonly cacheKey = 'exchange_rate';
  private readonly cacheTTL = 60 * 1000; // in seconds

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getExchangeRate(): Promise<number> {
    let rate = await this.cacheManager.get<number>(this.cacheKey);

    if (!rate) {
      const response = await axios.get(this.apiUrl, {
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });
      rate = response.data.exchange_rate;
      await this.cacheManager.set(this.cacheKey, rate, this.cacheTTL);
    }

    return rate;
  }
}
