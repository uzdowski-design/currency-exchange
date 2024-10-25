import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export default function TransactionTable({
  transactions
}: Readonly<{
  transactions: {
    amountEUR: number;
    amountPLN: number;
    rate: number;
    timestamp: string;
  }[];
}>) {
  return (
    <Table className="max-w-xl mx-auto">
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">EUR</TableHead>
          <TableHead className="text-center">Rate</TableHead>
          <TableHead className="text-center">PLN</TableHead>
          <TableHead className="text-center">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions
          .sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .slice(0, 10)
          .map((transaction, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">
                {transaction.amountEUR.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                {transaction.rate.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                {transaction.amountPLN.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                {new Date(transaction.timestamp).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
