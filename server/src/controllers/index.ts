import type { Core } from '@strapi/strapi';
import controller from './controller';

type Controllers = {
  controller: (context: { strapi: Core.Strapi }) => any;
};

const controllers: Controllers = {
  controller,
};

export default controllers;
