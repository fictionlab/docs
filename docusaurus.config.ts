import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import type { Options as ClientRedirectsOptions } from '@docusaurus/plugin-client-redirects';

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

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fictionlab', // Usually your GitHub org/user name.
  projectName: 'fictionlab.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
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
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/fictionlab/docs/edit/development/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: true,
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
              type: 'docSidebar',
              sidebarId: 'leoSidebar',
              label: 'Leo Rover',
            },
            {
              type: 'docSidebar',
              sidebarId: 'raphaSidebar',
              label: 'Rapha Rover',
            },
          ],
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
      content: `Welcome to the new Fictionlab docs! If you encounter any problems, broken links etc.,
        <br>please open an issue at <a href="https://github.com/fictionlab/docs">fictionlab/docs</a> 
        or write an e-mail to <a href="mailto:contact@fictionlab.pl">contact@fictionlab.pl</a>`,
      backgroundColor: '#c57b2c',
      textColor: '#ffffff',
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // old slug redirects
          {
            from: '/docs/leo-rover/guides/remote-desktop',
            to: '/leo-rover/guides/remote-desktop',
          },
          {
            from: '/docs/category/assembly-manuals',
            to: '/leo-rover/manuals',
          },
          {
            from: '/docs/leo-rover/manuals/wheels-to-meb',
            to: '/leo-rover/manuals/combining-subassemblies',
          },
          {
            from: '/docs/leo-rover/documentation/specification',
            to: '/leo-rover/documentation/specification',
          },
          {
            from: '/docs/leo-rover/getting-started',
            to: '/leo-rover/documentation/getting-started',
          },
          {
            from: '/docs/leo-rover/documentation/known-issues',
            to: '/leo-rover/documentation/known-issues',
          },
          {
            from: '/leo-rover/manuals/tools',
            to: '/leo-rover/manuals/setup',
          },
          {
            from: '/leo-rover/manuals/battery',
            to: '/leo-rover/manuals/back-front-covers',
          },
          {
            from: '/leo-rover/manuals/additional-quarter-and-front-cover',
            to: '/leo-rover/manuals/back-front-covers',
          },
          {
            from: '/leo-rover/manuals/meb-to-frame',
            to: '/leo-rover/manuals/combining-subassemblies',
          },
          {
            from: '/leo-rover/manuals/wheels-to-meb',
            to: '/leo-rover/manuals/combining-subassemblies',
          },
          {
            from: '/leo-rover/manuals/software',
            to: '/leo-rover/manuals/boot-and-firmware',
          },
          {
            from: '/leo-rover/manuals/final-touches',
            to: '/leo-rover/manuals/combining-subassemblies',
          },
          // category redirects
          {
            from: '/category/rover-documentation',
            to: '/leo-rover/documentation',
          },
          {
            from: '/category/assembly-manuals',
            to: '/leo-rover/manuals',
          },
          {
            from: '/category/leo-examples',
            to: '/leo-rover/leo-examples',
          },
          {
            from: '/category/addons',
            to: '/leo-rover/addons',
          },
          {
            from: '/category/integrations',
            to: '/leo-rover/integrations',
          },
          {
            from: '/category/computing-devices',
            to: '/leo-rover/integrations/computing-devices',
          },
          {
            from: '/category/lidars',
            to: '/leo-rover/integrations/lidars',
          },
          {
            from: '/category/positioning-systems',
            to: '/leo-rover/integrations/positioning-systems',
          },
          {
            from: '/category/robotic-arms',
            to: '/leo-rover/integrations/robotic-arms',
          },
          {
            from: '/category/software',
            to: '/leo-rover/integrations/software',
          },
          {
            from: '/category/legacy-pre-leo-18',
            to: '/leo-rover/integrations/legacy',
          },
          {
            from: '/category/guides',
            to: '/leo-rover/guides',
          },
          {
            from: '/category/advanced-guides',
            to: '/leo-rover/advanced-guides',
          },
          {
            from: '/category/archive',
            to: '/leo-rover/archive',
          },
        ],
      } satisfies ClientRedirectsOptions,
    ],
  ],
};

export default config;
