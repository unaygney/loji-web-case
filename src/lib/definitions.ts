export interface Inputs {
  email: string;
  password: string;
}
export interface RegisterInputs {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateFormData {
  description?: string;
  debtName: string;
  lenderName: string;
  debAmount: number;
  interestRate: number;
  paymentStart: Date;
  installment: number;
  amount: number;
}

export interface PaymentPlan {
  paymentAmount: number;
  paymentDate: string;
}

// export interface Debts {
//   id: string;
//   createdAt: string;
//   updatedAt: string;
//   isActive: boolean;
//   debtName: string;
//   lenderName: string;
//   debtAmount: number;
//   interestRate: number;
//   amount: number;
//   paymentStart: string;
//   installment: number;
//   description: string;
//   userId: string;
// }

// export interface ApiError {
//   message: string;
// }
