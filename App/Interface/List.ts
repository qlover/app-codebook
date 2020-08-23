import { DictEntity } from "./Entity";

export type DictList = {
  current_page: number,
  data: Array<DictEntity>,
  from: string,
  last_page: number,
  per_page: number,
  to: number,
  total: number,
}