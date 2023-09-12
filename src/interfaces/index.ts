export interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token?: string;
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

export interface AccessAdminToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface RawData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: {
    country: string;
    city: string;
    postalCode: string;
    streetName: string;
  }[];
  defaultShippingAddress?: number;
  shippingAddresses: number[];
  defaultBillingAddress?: number;
  billingAddresses: number[];
}

export type ResponseData = AccessTokenResponse | ErrorResponse;
