import type { Dayjs } from 'dayjs';

export type UserType = {
  id: number;
  name: string;
  allow_edit: boolean;
};

export type User = Omit<UserType, 'allow_edit' | 'id'> & {
  _id: string;
  email: string;
  password: string;
  type_id: number;
  type?: string;
  last_visit_date: string;
};

export type UpdateUser = Omit<User, 'last_visit_date' | 'type'>;

export type CreateUser = Omit<UpdateUser, '_id'>;

export interface UsersFilters {
  name?: string;
  type_id?: number;
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
