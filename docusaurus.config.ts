import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import type { Options as DocsOptions } from '@docusaurus/plugin-content-docs';

const config: Config = {
  title: 'Fictionlab Documentation',
  tagline: 'Documentation, tutorials & manuals for robots',
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        href: '/img/branding/favicon/favicon-96x96.png',
        sizes: '96x96',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/img/branding/favicon/favicon.svg',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'shortcut icon',
        href: '/img/branding/favicon/favicon.ico',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/branding/favicon/apple-touch-icon.png',
        sizes: '180x180',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    },
  ],
  // Set the production url of your site here
  url: 'https://docs.fictionlab.pl',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          id: 'leo-rover',
          path: 'docs/leo-rover',
          routeBasePath: '/leo-rover',
          sidebarPath: './sidebars/LeoSidebars.ts',
          editUrl: 'https://github.com/fictionlab/docs/edit/development/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Leo Rover 1.9',
            },
            '1.8': {
              label: 'Leo Rover 1.8',
            },
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: null,
          priority: null,
        },
        gtag: {
          trackingID: 'G-KLVJP3SWPW',
          anonymizeIP: true,
        },
        googleTagManager: {
          containerId: 'GTM-5ZBFQ5RC',
        },
      } satisfies Preset.Options,
    ],
  ],
  stylesheets: [
    {
      href: '/assets/katex/katex.min.css',
      type: 'text/css',
    },
  ],

  themeConfig: {
    algolia: {
      appId: 'H6BESWXMON',
      apiKey: '94b54b551433d306dade3f9cdb84b92b',
      indexName: 'fictionlab',
      contextualSearch: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'fictionlab logo',
        src: 'img/branding/logo/Logotype_basic field_grey.svg',
        srcDark: 'img/branding/logo/Logotype_basic field_white.svg',
        width: 130,
      },
      items: [
        {
          type: 'dropdown',
          label: 'Robots',
          position: 'left',
          items: [
            {
              label: 'Leo Rover',
              to: '/leo-rover',
            },
            {
              label: 'Rapha Rover',
              to: '/rapha-rover',
            },
          ],
        },
        {
          label: 'Integrations',
          position: 'left',
          to: '/integrations',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          docsPluginId: 'leo-rover',
        },
        {
          href: 'https://www.leorover.tech/shop',
          label: 'Online Store',
          position: 'right',
        },
        {
          href: 'https://github.com/fictionlab/docs',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://fictionlab.pl',
          label: 'Home',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Company',
          items: [
            {
              label: 'About us',
              href: 'https://www.leorover.tech/about-us',
            },
            {
              label: 'Blog',
              href: 'https://www.leorover.tech/blog',
            },
            {
              label: 'Tutorials',
              href: 'https://www.leorover.tech/developers',
            },
            {
              label: 'Online store',
              href: 'https://www.leorover.tech/shop',
            },
            {
              label: 'Terms and conditions',
              href: 'https://www.leorover.tech/terms-and-conditions',
            },
          ],
        },
        {
          title: 'Find us on:',
          items: [
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/@leorover6230',
            },
            {
              label: 'Linkedin',
              href: 'https://www.linkedin.com/company/leorover/',
            },
            {
              label: 'Online forum',
              href: 'https://forum.fictionlab.pl/',
            },
            {
              label: 'Facebook Community Group',
              href: 'https://www.facebook.com/groups/leorover',
            },
          ],
        },
        {
          items: [
            {
              html: `
              <a href="https://fictionlab.pl" target="_blank" rel="noreferrer noopener" style="padding-bottom: 1rem; display: block;">
                <img src= /img/branding/logo/logotype_white.svg alt="Fictionlab" width="200" height="38" />
              </a>
            `,
            },
            {
              html: `
              Software is shared under MIT license. <br>
              CAD and mechanics design files are shared under Creative Commons BY-NC-SA.
              `,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fictionlab sp. z o.o.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'powershell', 'yaml', 'arduino'],
    },
    announcementBar: {
      id: 'announcementBar_work-in-progress',
      content: `Leo Rover 1.9 is out! 🎉 Check out the <a href="/leo-rover/documentation/changelog">release notes</a>!
      <br />Get yours: <a href="https://www.leorover.tech/shop/leo-rover-developer-kit">Developer kit</a> | 
      <a href="https://www.leorover.tech/shop/leo-rover-assembled">Assembled</a>`,
      backgroundColor: '#c57b2c',
      textColor: '#ffffff',
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      'content-docs',
      {
        id: 'rapha-rover',
        path: 'docs/rapha-rover',
        routeBasePath: 'rapha-rover',
        sidebarPath: './sidebars/RaphaSidebars.ts',
        editUrl: 'https://github.com/fictionlab/docs/edit/development/',
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        showLastUpdateTime: true,
      } satisfies DocsOptions,
    ],
    [
      'content-docs',
      {
        id: 'integrations',
        path: 'docs/integrations',
        routeBasePath: 'integrations',
        sidebarPath: './sidebars/integrationsSidebar.ts',
        editUrl: 'https://github.com/fictionlab/docs/edit/development/',
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        showLastUpdateTime: true,
      } satisfies DocsOptions,
    ],
    [
      'content-docs',
      {
        id: 'guidelines',
        path: 'docs/guidelines',
        routeBasePath: 'guidelines',
        sidebarPath: './sidebars/guidelinesSidebar.ts',
        editUrl: 'https://github.com/fictionlab/docs/edit/development/',
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        showLastUpdateTime: true,
      } satisfies DocsOptions,
    ],
  ],
};

export default config;
