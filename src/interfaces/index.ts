export interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors: Error[];
  error: string;
  error_description: string;
}

interface Error {
  code: string;
  message: string;
}

export type ResponseData = AccessTokenResponse | ErrorResponse;
