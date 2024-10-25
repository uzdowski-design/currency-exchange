import { Injectable } from '@nestjs/common';

export interface Transaction {
  amountEUR: number;
  amountPLN: number;
  rate: number;
  timestamp: Date;
}

@Injectable()
export class TransactionService {
  private transactions: Transaction[] = [];

  saveTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  getAllTransactions(): Transaction[] {
    return this.transactions;
  }
}
