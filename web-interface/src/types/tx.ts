export interface TransactionHistory {
  UID: string;
  event_name: string;
  reciever: string;
  amount: number;
  fee: number;
  src_chain_id: number;
  dest_chain_id: number;
  token_id: number;
  contract: string;
  origin_chain: number;
}

export enum EventTxType {
  SENT_TO_CHAIN = "0xe621d65f178b26d16bdeba15f600baa2baddf0d79865b2a1700aa1e5bea1f409",
  SUBMIT_TX = "0x508f3afa87f72dce865a2321107666b28ac822c23a8c0555fbeb3424cf3de563",
}
