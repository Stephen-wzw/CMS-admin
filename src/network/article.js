import { request } from "./request";
import qs from "qs";

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

export function deleteAll(articleIds) {
  return request({
    url: `/admin/articles/${articleIds}/delete`,
    method: "post",
  });
}

export function recover(articleId) {
  return request({
    url: `/admin/article/${articleId}/recover`,
    method: "post",
  });
}

export function postArticle(articleForm) {
  return request({
    url: `/admin/article/add`,
    method: "post",
    data: qs.stringify(articleForm),
  });
}

export function getArticleById(articleId) {
  return request({
    url: `/admin/article/${articleId}`,
  });
}

export function updateArticle(articleForm, articleId) {
  return request({
    url: `/admin/article/${articleId}/update`,
    method: "post",
    data: qs.stringify(articleForm),
  });
}

export function searchArticle(filterForm) {
  return request({
    url: `/admin/article/search`,
    method: "get",
    params: {
      categoryId: filterForm.category,
      articleTitle: filterForm.title,
      articleContent: filterForm.content,
      articleCreationTimeBegin: filterForm.date1,
      articleCreationTimeOver: filterForm.date2,
      articleStatus: filterForm.isDelete,
    },
  });
}
