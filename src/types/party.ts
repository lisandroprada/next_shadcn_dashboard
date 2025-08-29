export interface Agent {
  fullName: string;
  address?: string;
  email?: string;
  gender?: 'Male' | 'Female' | 'Non-binary';
  identityCard?: string;
  locality?: string;
  province?: string;
}

export interface ConsortiumDetail {
  expenseName: string;
  expenseAmount: number;
  consortiumId?: string;
}

export interface BankAccount {
  bank: string;
  cbu: string;
  bankId?: string;
  description?: string;
}

export interface Phone {
  number: string;
  type: 'home' | 'work' | 'whatsapp' | 'other';
}

export interface Party {
  _id: string;
  agentType:
    | 'Client'
    | 'Supplier'
    | 'ServiceCompany'
    | 'Consortium'
    | 'Agency'
    | 'Real Estate';
  personType: 'Individual' | 'Legal Entity';
  name: string;
  lastName?: string;
  gender?: 'Female' | 'Male' | 'Non-binary';
  maritalStatus?: string;
  postalCode?: string;
  locality?: string;
  province?: string;
  email: string;
  bankAccounts: BankAccount[];
  photo?: string;
  uid?: string;
  identityCard: string;
  taxId?: string;
  taxType?: string;
  taxIdType?: string;
  taxAddress?: string;
  address?: string;
  workAddress?: string;
  iva?: string;
  billing: boolean;
  supplierMask?: string;
  consortiumDetails: ConsortiumDetail[];
  phone: Phone[];
  active: boolean;
  createdAt: Date;
  agent?: Agent;
  user?: string;
  fullName: string;
}
