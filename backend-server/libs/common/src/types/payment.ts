export interface CustomPaymentStates {}
export interface PaymentStates {}

export type PaymentState =
    | 'Created'
    | 'Error'
    | 'Cancelled'
    | keyof CustomPaymentStates
    | keyof PaymentStates;
