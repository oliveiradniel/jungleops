export interface TaskFilters {
  page: number;
  size: number;
  orderBy?: 'created-at' | 'term';
  order?: 'asc' | 'desc';
  status?: string;
  priority?: string;
  search?: string;
}
