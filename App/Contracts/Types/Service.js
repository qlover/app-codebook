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

export type InterceptorType = {
  onfulfilled: (Function) => Promise<any>,
  onrejected: (Function) => Promise<any>,
  args?: any,
};

export type RequestInterceptorType = {
  request: Array<InterceptorType>,
  response: Array<InterceptorType>,
};

export type RequestOptions = {
  headers: object,
  delay: number,
  timeout: number,
  interceptor?: RequestInterceptorType,
};
