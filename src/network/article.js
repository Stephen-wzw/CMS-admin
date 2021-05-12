import { request } from "./request";

export function getAllArticle() {
  return request({
    url: "/admin/article/list",
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
