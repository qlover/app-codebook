import { Message } from "../Contracts/RetJson";
import {
  API_DICT_GET,
  API_DICTS_ADD,
  API_DICTS_UPDATE,
  API_DICTS_GET,
  API_DICTS_DELTE,
} from "../Config/api";
import { Paginate, Sort } from "../Contracts/Types/Service";
import BaseService from "./BaseService";

/** Interface and Types */
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

/** Class */
export default class DictService extends BaseService {
  constructor() {
    super();
  }

  getList(paginate: Paginate, sort: Sort): Promise<RetGetList> {
    return this.request(API_DICTS_GET, { ...paginate, ...sort });
  }

  getDict(id: number): Promise<RetGetDict> {
    return this.request(API_DICT_GET, { id });
  }

  deleteDict(id: number[]): Promise<RetDeleteDict> {
    return this.request(API_DICTS_DELTE, { id: id.join(",") });
  }

  addDict(dict: DictEntity): Promise<RetAddDict> {
    return this.request(API_DICTS_ADD, dict);
  }

  updateDict(dict: DictEntity): Promise<RetUpdateDict> {
    return this.request(API_DICTS_UPDATE, dict);
  }
}

/** default */

export const _DictEntity = {
  title: "",
  website: "",
  username: "",
  password: "",
  phone: "",
  email: "",
};
