'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const articlesAtPage = 2
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */


module.exports = {
  async find(ctx) {
    let entity = await strapi.services.article.find();

    if(ctx.request.header.hash_name) {
      entity = entity.filter(article => article.hashtags.includes(ctx.request.header.hash_name))
    }

    let articles = entity

    if(ctx.request.header.page) {
      articles = articles.slice((ctx.request.header.page * articlesAtPage) - articlesAtPage, ctx.request.header.page * articlesAtPage);
    }

    const data = {
      "articles": articles,
      "numberOfArticles": entity.length
    }

    return sanitizeEntity(data, { model: strapi.models.article });
  },
  async findAuthorsArticles(ctx){
    const { id } = ctx.params;
    const entity = await strapi.services.article.find({ author_id: id });

    let articles = entity

    if(ctx.request.header.page) {
      articles = articles.slice((ctx.request.header.page * articlesAtPage) - articlesAtPage, ctx.request.header.page * articlesAtPage);
    }

    const data = {
      "articles": articles,
      "numberOfArticles": entity.length
    }

    return sanitizeEntity(data, { model: strapi.models.article });
  },
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [article] = await strapi.services.article.find({
      id: ctx.params.id,
      'author_id': ctx.state.user.id,
    });

    if (!article) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.article.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.article.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.article });
  },
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [article] = await strapi.services.article.find({
      id: ctx.params.id,
      'author_id': ctx.state.user.id,
    });

    if (!article) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.article.delete({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.article.delete({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.article });
  },
};
