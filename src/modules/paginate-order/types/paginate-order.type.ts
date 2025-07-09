export interface IPaginationData {
  currentPage: number;
  totalPage: number;
  limit: number;
  totalItems: number;
}

export interface IOrderByData {
  orderBy: string;
  orderDirection: string;
}

export interface IPaginateOrderResponse<T> {
  items: T[];
  paginationData: IPaginationData;
  orderData: IOrderByData;
}
