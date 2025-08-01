// Common API Types
// This file can be extended with shared API interfaces and types

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status?: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  totalItemCount: number;
  currentPage: number;
}
