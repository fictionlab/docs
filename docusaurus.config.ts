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

  // Markdown settings
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Language metadata
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
              label: 'Raph Rover',
              to: '/raph-rover',
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
          type: 'docsVersionDropdown',
          position: 'right',
          docsPluginId: 'integrations',
        },
        {
          href: 'https://www.leorover.tech/shop',
          label: 'Online Shop',
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
              label: 'Online shop',
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
              label: 'Facebook',
              href: 'https://www.facebook.com/fictionlabpl',
              className: 'footer-facebook-link',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/@leorover6230',
              className: 'footer-youtube-link',
            },
            {
              label: 'Linkedin',
              href: 'https://www.linkedin.com/company/fictionlab1',
              className: 'footer-linkedin-link'
            },
            {
              label:'Github',
              href: 'https://github.com/fictionlab',
              className: 'footer-github-link',
            },
            {
              label: 'Discord Community',
              href: 'https://discord.gg/57DdtCnhCc',
              className: 'footer-discord-link',
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
      content: `Leo Rover 1.9 is out! 🎉 Check out the <a href="/leo-rover/documentation/changelog">release notes</a>! Get yours: <a href="https://www.leorover.tech/shop/leo-rover-developer-kit">Developer kit</a> | <a href="https://www.leorover.tech/shop/leo-rover-assembled">Assembled</a>`,
      backgroundColor: '#c57b2c',
      textColor: '#ffffff',
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      'content-docs',
      {
        id: 'raph-rover',
        path: 'docs/raph-rover',
        routeBasePath: 'raph-rover',
        sidebarPath: './sidebars/RaphSidebars.ts',
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
        lastVersion: 'current',
        versions: {
          current: {
            label: 'ROS 2 Jazzy',
          },
          noetic: {
            label: 'ROS 1 Noetic',
          },
        },
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
