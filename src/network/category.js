import { request } from "./request";

export function getCategory() {
  return request({
    url: "/category/list",
  });
}

export function deleteOne(categoryId) {
  return request({
    url: `/admin/category/${categoryId}/delete`,
    method: "post",
  });
}
