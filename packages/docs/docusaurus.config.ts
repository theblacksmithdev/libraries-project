import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Blacksmith UI Hooks',
  tagline: '75 production-ready React hooks',
  favicon: 'img/favicon.ico',
  url: process.env.SITE_URL || 'https://blacksmith-ui.dev',
  baseUrl: process.env.BASE_URL || '/',
  organizationName: 'oluwatobimaxwell',
  projectName: 'libraries-project',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/oluwatobimaxwell/libraries-project/tree/master/packages/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Blacksmith UI Hooks',
      logo: {
        alt: 'Blacksmith UI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'hooksSidebar',
          position: 'left',
          label: 'Hooks',
        },
        {
          href: 'https://github.com/oluwatobimaxwell/libraries-project',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/oluwatobimaxwell/libraries-project',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} Blacksmith UI. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsRouteBasePath: '/docs',
        indexBlog: false,
      },
    ],
  ],
};

export default config;
