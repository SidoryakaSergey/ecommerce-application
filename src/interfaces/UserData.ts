export default interface UserData {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: Address[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: unknown[];
  authenticationMode: string;
}

interface Address {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface UserInfo {
  billingCity: string;
  billingCountry: string;
  billingDefault: boolean;
  billingPostalCode: string;
  billingStreet: string;
  email: string;
  firstName: string;
  lastName: string;
  shippingCity: string;
  shippingCountry: string;
  shippingDefault: boolean;
  shippingPostalCode: string;
  shippingStreet: string;
}
