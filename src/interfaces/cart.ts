export default interface Cart {
  type: string;
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
    customer: {
      typeId: string;
      id: string;
    };
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
    customer: {
      typeId: string;
      id: string;
    };
  };
  customerId: string;
  lineItems: LineItem[];
  cartState: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: string;
  shipping: [];
  customLineItems: [];
  discountCodes: [];
  directDiscounts: [];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  refusedGifts: [];
  origin: string;
  itemShippingAddresses: [];
  totalLineItemQuantity: number;
}

interface LineItem {
  id: string;
  productId: string;
  name: {
    [key: string]: string;
  };
  productType: {
    typeId: string;
    id: string;
    version: number;
  };
  productSlug: {
    [key: string]: string;
  };
  variant: {
    id: number;
    prices: Price[];
    images: Image[];
    attributes: Attribute[];
    assets: [];
  };
  price: Price;
  quantity: number;
  discountedPricePerQuantity: [];
  perMethodTaxRate: [];
  addedAt: string;
  lastModifiedAt: string;
  state: {
    quantity: number;
    state: {
      typeId: string;
      id: string;
    };
  }[];
  priceMode: string;
  lineItemMode: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  taxedPricePortions: [];
}

interface Price {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  discounted: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discount: {
      typeId: string;
      id: string;
    };
  };
}

interface Image {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface Attribute {
  name: string;
  value: string;
}
