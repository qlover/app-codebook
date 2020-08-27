// 通用的响应实体类型

export interface RetCode {
  code: number;
}

export interface Message {
  [key: "msg" | "error"]: string;
}

export interface ByKey extends RetCode, Message {
  [key: string]: any;
}

export interface Error {
  error?: string;
}

export interface Msg extends Error {}

export interface Single {}
