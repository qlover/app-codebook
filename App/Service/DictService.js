import { DictEntity } from "../Interface/Entity";
import { DictList } from "../Interface/List";
import { Paginate, Sort } from "../Interface/RequestParam";
import {
  API_DICT_GET,
  API_DICTS_ADD,
  API_DICTS_UPDATE,
  API_DICTS_GET,
  API_DICTS_DELTE,
} from "../Config/ServiceApi";
import BaseService from "./BaseService";

export type srotString = "id";

export default class DictService extends BaseService {
  constructor() {
    super();
  }
  getList = (paginate: Paginate, sort: Sort) =>
    this.request(API_DICTS_GET, { ...paginate, ...sort });

  getDict = (id: number) => this.request(API_DICT_GET, { id });

  deleteDict = (id: Aarray<Number>) =>
    this.request(API_DICTS_DELTE, { id: id.join(",") });

  addDict = (dict: DictEntity) => this.request(API_DICTS_ADD, dict);

  updateDict = (dict: DictEntity) => this.request(API_DICTS_UPDATE, dict);
}
