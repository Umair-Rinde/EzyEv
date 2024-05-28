export interface CustomFulfillmentStates {}
export interface FulfillmentStates {}

export type FulfillmentState =
    | 'Created'
    | 'Pending'
    | 'Cancelled'
    | keyof CustomFulfillmentStates
    | keyof FulfillmentStates;
