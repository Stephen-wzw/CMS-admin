import { request } from "./request";

export function getAllArticle() {
  return request({
    url: "/admin/article/list",
  });
}

export function deleteOne(articleId) {
  return request({
    url: `/admin/article/${articleId}/delete`,
    method: "post",
  });
}

export function recover(articleId) {
  return request({
    url: `/admin/article/${articleId}/recover`,
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
