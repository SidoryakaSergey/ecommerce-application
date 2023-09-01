interface User {
  typeId: string;
  id: string;
}

interface Category {
  typeId: string;
  id: string;
}

interface Price {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  discounted?: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
  };
}

interface Image {
  url: string;
  label: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface Attribute {
  name: string;
  value: string | number;
}

interface MasterVariant {
  id: number;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets: [];
}

export interface MasterData {
  current: {
    name: {
      'en-US': string;
    };
    categories: Category[];
    categoryOrderHints: object;
    slug: {
      'en-US': string;
    };
    metaTitle: {
      'de-DE': string;
      'en-US': string;
    };
    masterVariant: MasterVariant;
    variants: [];
    searchKeywords: object;
  };
  staged: {
    name: {
      'en-US': string;
    };
    categories: Category[];
    categoryOrderHints: object;
    slug: {
      'en-US': string;
    };
    metaTitle: {
      'de-DE': string;
      'en-US': string;
    };
    masterVariant: MasterVariant;
    variants: [];
    searchKeywords: object;
  };
  published: boolean;
  hasStagedChanges: boolean;
}

export interface ProductsArr {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: User;
  };
  createdBy: {
    isPlatformClient: boolean;
    user: User;
  };
  productType: {
    typeId: string;
    id: string;
  };
  masterData: MasterData;
  masterVariant?: MasterVariant;
  name?: {
    'en-US': string;
  };
  priceMode: string;
  lastVariantId?: number;
}

export interface ResponseProducts {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ProductsArr[];
}


