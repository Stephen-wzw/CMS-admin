import { request } from "./request";
import qs from "qs";

export function getAbout() {
  return request({
    url: "/admin/about",
  });
}

export function updateAbout(form) {
  return request({
    url: "/admin/about/update",
    method: "post",
    data: qs.stringify(form),
  });
}
