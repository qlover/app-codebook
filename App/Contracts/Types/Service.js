export type RequestIon = {
  method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE",
  api: string,
};

export type Sort = {
  sort: string,
  sortBy?: 0 | 1,
};

export type Paginate = {
  page?: number,
  limit: number,
};
