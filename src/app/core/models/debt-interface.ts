export type DebtType = 'I_OWE' | 'OWED_TO_ME';
export type DebtStatus = 'OPEN' | 'ARCHIVED';

export interface Debt {
  uuid: string;
  debtorName: string;
  debtType: DebtType;
  balance: number;
  description: string | null;
  debtStatus: DebtStatus;
}

export interface DebtInsert {
  debtorName: string;
  debtType: DebtType;
  description: string | null;
}

export interface DebtUpdate {
  debtorName: string;
  description: string | null;
}

// Matches backend DebtFilters record — used as query params, field names differ from Debt above
export interface DebtFilters {
  status?: DebtStatus;
  type?: DebtType;
  debtorName?: string;
}