import { request } from "./request";
import qs from "qs";

export function login(form) {
  return request({
    url: "/admin/loginVerify",
    method: "post",
    data: qs.stringify(form),
  });
}
