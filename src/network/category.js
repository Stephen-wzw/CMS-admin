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

export function addCategory(data) {
  return request({
    url: `/admin/category/add`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data", //设置headers
    },
    data
  });
}

export function editCategory(data, categoryId) {
  return request({
    url: `/admin/category/${categoryId}/edit`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data", //设置headers
    },
    data
  });
}
