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

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  lastKey?: string;
  totalPages?: number;
  totalCount?: number;
  PrevPageLink?: string;
  NextPageLink?: string;
}

export const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    throw error;
  }
  throw new Error(error as string);
};
