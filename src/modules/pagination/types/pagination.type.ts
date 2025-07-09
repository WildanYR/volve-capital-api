export interface IPagination {
  page: number;
  limit: number;
}

export interface IPaginationData {
  currentPage: number;
  totalPage: number;
  limit: number;
  totalItems: number;
}

export interface IPaginationResponse<T> {
  items: T[];
  paginationData: IPaginationData;
}
