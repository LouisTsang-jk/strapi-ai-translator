// import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { TranslatePanelContainer } from './components/TranslatePanelContainer';
import { App } from './pages/App';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  bootstrap(app: any) {
    try {
      const contentManagerPlugin = app.getPlugin('content-manager');
      if (contentManagerPlugin && contentManagerPlugin.apis) {
        contentManagerPlugin.apis.addEditViewSidePanel([
          {
            name: 'ai-translate-panel',
            title: 'AI Translation',
            Component: TranslatePanelContainer,
          },
        ]);
      }
    } catch (error) {
      console.warn('Failed to register AI translate panel:', error);
    }
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
