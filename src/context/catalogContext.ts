import { createContext, Dispatch, SetStateAction } from 'react';

interface CatalogValue {
  catalog: string;
  setCatalog: Dispatch<SetStateAction<string>>;
}

const CatalogContext = createContext<CatalogValue | null>(null);

export default CatalogContext;
