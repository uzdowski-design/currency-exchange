import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import axios from 'axios';
import { Cache } from 'cache-manager';

@Injectable()
export class ExchangeRateService {
  private readonly apiUrl = process.env.API_URL;
  private readonly apiKey = process.env.API_KEY;
  private readonly cacheKey = 'exchange_rate';
  private readonly cacheTTL = 60 * 1000; // in miliseconds

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
