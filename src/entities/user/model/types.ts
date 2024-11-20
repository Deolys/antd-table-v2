import type { Dayjs } from 'dayjs';

export type UserType = {
  id: number;
  name: string;
  allow_edit: boolean;
};

export type User = Omit<UserType, 'allow_edit' | 'id'> & {
  _id: string;
  email: string;
  password?: string;
  type_id: number;
  type?: string;
  project?: string;
  description?: string;
  map_data?: Map<string, string>;
  last_visit_date: string;
};

export type UpdateUser = Omit<User, 'last_visit_date' | 'type'> & { type_id?: number };

export type CreateUser = Omit<UpdateUser, '_id'>;

export interface UsersFilters {
  email?: string;
  name?: string;
  type_id?: number;
  project?: string;
  dateRange: string[] | Dayjs[];
}

export type FilterQuery = UsersFilters & {
  skip: number;
  limit: number;
};

export interface FilterResponse {
  data?: User[];
  count?: number;
  error?: string;
}
