/* eslint-disable prettier/prettier */
export type Product = {
  productId: number;
  categoryId: number;
  regionId: number;
  productName: string;
  category: string;
  region: string;
  salesTotal: number;
  month: string;
  soldQuantity: number;
};

export type Region = {
  regionId: number;
  regionName: string;
  salesTotal: number;
  coordinates: number[];
};

export type Category = {
  categoryId: number;
  categoryName: string;
};

export type TableConfig = {
  cardTitle: string;
  tableHead: string[];
  tableBody: Array<Array<string | number>>;
};

export type StoreConfig = {
  regions: Region[];
  categories: Category[];
  products: Product[];
  isLoading: boolean;
  error: Error
}

export type Error = {
  status: boolean,
  message: string
}