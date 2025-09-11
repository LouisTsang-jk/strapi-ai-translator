import type { Core } from '@strapi/strapi';
import service from './service';

type Services = {
  service: (context: { strapi: Core.Strapi }) => any;
};

const services: Services = {
  service,
};

export default services;
