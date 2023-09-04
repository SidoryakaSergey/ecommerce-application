export default interface RawData {
  version: number;
  actions: Action[];
}

interface Action {
  action: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  addressId?: string;
  address?: Address;
}

interface Address {
  streetName?: string;
  postalCode?: string;
  city?: string;
  country?: string;
}
