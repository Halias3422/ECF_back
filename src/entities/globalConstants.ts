export interface MutationResponse {
  statusCode: number;
  response: string;
}

export interface QueryResponse extends MutationResponse {
  rows: any[];
}
