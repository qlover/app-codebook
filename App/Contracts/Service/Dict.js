import { Message } from "../RetJson";

export interface DictEntity {
  id: number;
  title: string;
  website: string;
  username: string;
  password: string;
  phone: string;
  email: string;
}



export interface DictList {
  current_page: number;
  data: Array<DictEntity>;
  last_page: number;
  total: number;
}

// 以下为 http api  josn 响应对应类型

export interface RetGetDict extends Message {
  code: number;
  dict: DictEntity;
}

export interface RetGetList extends Message {
  code: number;
  dicts: DictList;
}

export interface RetDeleteDict extends Message {
  code: number;
}

export interface RetAddDict extends Message {
  code: number;
  dict: DictEntity;
}

export interface RetUpdateDict extends Message {}

export const _DictEntity =  {
  title: "";
  website: "";
  username: "";
  password: "";
  phone: "";
  email: "";
}