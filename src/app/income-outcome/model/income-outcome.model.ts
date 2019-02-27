export interface Item {
  description: string;
  amount: number;
  income: boolean;
  uid?: string;
}

export interface IOData {
  outcomeAmount: number;
  incomeAmount: number;
  outcomeCount: number;
  incomeCount: number;
}
