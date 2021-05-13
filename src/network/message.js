import { request } from "./request";

export function getAllMessage() {
  return request({
    url: "/admin/message/list",
  });
}

export function deleteOne(messageId) {
  return request({
    url: `/admin/message/${messageId}/delete`,
    method: "post",
  });
}

export function getCategory() {
  return request({
    url: "/category/list",
  });
}

export function getArticleByCate(categoryId) {
  return request({
    url: `/articleCategory/${categoryId}`,
  });
}

export function getArticleByTitle(filterValue) {
  return request({
    url: "/article/search",
    params: {
      titleKeywords: filterValue,
    },
  });
}

export function getArticleByContent(filterValue) {
  return request({
    url: "/article/search",
    params: {
      contentKeywords: filterValue,
    },
  });
}
