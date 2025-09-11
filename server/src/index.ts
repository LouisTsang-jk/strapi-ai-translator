import type { Core } from '@strapi/strapi';

/**
 * Application methods
 */
import bootstrap from './bootstrap';
import destroy from './destroy';
import register from './register';

/**
 * Plugin server methods
 */
import config from './config';
import contentTypes from './content-types';
import controllers from './controllers';
import middlewares from './middlewares';
import policies from './policies';
import routes from './routes';
import services from './services';

interface PluginServerMethods {
  register: (context: { strapi: Core.Strapi }) => void | Promise<void>;
  bootstrap: (context: { strapi: Core.Strapi }) => void | Promise<void>;
  destroy: (context: { strapi: Core.Strapi }) => void | Promise<void>;
  config: any;
  controllers: any;
  routes: any;
  services: any;
  contentTypes: any;
  policies: any;
  middlewares: any;
}

const plugin: PluginServerMethods = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares,
};

export default plugin;
