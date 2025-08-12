export interface PaginatedResponse<T> {
  lastKey: string;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  entities: T[];
}

export interface ApiResponse<T> {
  data: T;
  errors: string[];
  isSuccessful: boolean;
  code: number;
}
