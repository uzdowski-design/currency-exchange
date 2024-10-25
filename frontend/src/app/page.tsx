'use client';

import { SyntheticEvent, useState, useEffect } from 'react';

import { BadgeEuro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import TransactionTable from '@/components/TransactionTable';

export default function Home() {
  const [rate, setRate] = useState(null);
  const [amountEUR, setAmountEUR] = useState('');
  const [amountPLN, setAmountPLN] = useState('');
  interface Transaction {
    amountEUR: number;
    amountPLN: number;
    rate: number;
    timestamp: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchExchangeRate = async () => {
    const response = await fetch('http://localhost:4000/exchange-rate');
    const data = await response.json();
    setRate(data.rate);
    setAmountEUR('1');
    setAmountPLN(String(data.rate.toFixed(2)));
  };

  const fetchAllTransactions = async () => {
    const response = await fetch('http://localhost:4000/transaction');
    const data = await response.json();
    setTransactions(data);
  };

  const handleSUbmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!amountEUR) return;
    const response = await fetch('http://localhost:4000/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amountEUR: parseFloat(amountEUR) })
    });
    const data = await response.json();
    setRate(data.rate);
    setAmountPLN(data.amountPLN.toFixed(2));
    setTransactions((prevTransactions: Transaction[]) => [
      ...prevTransactions,
      data
    ]);
  };

  useEffect(() => {
    fetchExchangeRate();
    fetchAllTransactions();
  }, []);

  return (
    <main className="flex flex-col items-center gap-4 max-w-4xl mx-auto h-full p-6">
      <h1 className="text-5xl">Currency Exchange</h1>
      <p className="text-2xl">Check the current EUR to PLN rate</p>
      <BadgeEuro size={52} />
      {rate && (
        <div className="flex gap-20">
          <p>1 EUR = {parseFloat(rate).toFixed(2)} PLN</p>
          <p>1 PLN = {(1 / parseFloat(rate)).toFixed(2)} EUR</p>
        </div>
      )}
      <form onSubmit={handleSUbmit} className="flex items-center gap-4">
        <div className="text-center uppercase">
          <Label htmlFor="euro">Amount in EUR</Label>
          <Input
            id="euro"
            type="text"
            value={amountEUR}
            onChange={(e) => setAmountEUR(e.target.value)}
          />
        </div>
        <Button type="submit">Convert</Button>
        <div className="text-center uppercase">
          <Label htmlFor="pln">Amount in PLN</Label>
          <Input id="pln" type="number" value={amountPLN} readOnly />
        </div>
      </form>
      <h2 className="text-3xl underline mt-4">Transactions</h2>
      <TransactionTable transactions={transactions} />
    </main>
  );
}
