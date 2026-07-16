export type TransactionAction = 'INCREASE' | 'DECREASE';

export interface Transaction {
  uuid: string;
  date: string;
  amount: number;
  action: TransactionAction;
  note: string | null;
  debtorName: string;
  correctedTransactionUuid: string | null;
  resultingAmount: number;
  resultingAction: TransactionAction;
  isLatestInChain: boolean;
}

export interface TransactionInsert {
  date: string;
  amount: number;
  action: TransactionAction;
  note: string | null;
}

export interface TransactionUpdate {
  date: string;
  amount: number;
  action: TransactionAction;
  note: string | null;
}

export interface TransactionFilters {
  action?: TransactionAction;
  fromDate?: string;
  toDate?: string;
  debtType?: 'I_OWE' | 'OWED_TO_ME';
}