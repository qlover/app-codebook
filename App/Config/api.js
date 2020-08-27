import { RequestIon } from "../Contracts/Types/Service";

// 用户登录
export const API_USER_LOGIN: RequestIon = { method: "POST", api: "/login" };
export const API_USER_REGISTER: RequestIon = { method: "POST", api: "/signup" };

// 字典
export const API_DICT_GET: RequestIon = { method: "GET", api: "/dict" };
export const API_DICTS_GET: RequestIon = { method: "GET", api: "/dicts" };
export const API_DICTS_ADD: RequestIon = { method: "POST", api: "/dict" };
export const API_DICTS_DELTE: RequestIon = { method: "DELETE", api: "/dicts" };
export const API_DICTS_UPDATE: RequestIon = { method: "PUT", api: "/dict" };
