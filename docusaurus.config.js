// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '全域数字化经营平台',
  tagline: '助力中小企业全面数字化转型',
  favicon: 'https://cangjiangkeji.oss-cn-beijing.aliyuncs.com/WechatIMG50.jpg',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'freemenL', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      metadata: [
        {name: 'keywords', content: '数字化转型, 小程序开发, 系统开发'},
        {name: 'twitter:card', content: 'summary_large_image'},
      ],
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '山西仓江科有限公司',
        logo: {
          alt: 'My Site Logo',
          src: 'https://cangjiangkeji.oss-cn-beijing.aliyuncs.com/WechatIMG50.jpg',
        },
        items: [],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '企业信息',
            items: [
              {
                label: '营业执照',
                to: '/docs/information/business-license',
              },
              {
                label: '计算机软著',
                to: '/docs/information/soft-works',
              },
            ],
          },
          {
            title: '企业声明',
            items: [
              {
                label: '法律声明',
                to: '/docs/legal/legal-notice',
              }
            ],
          },
          {
            title: '联系我们',
            items: [
              {
                label: '联系方式',
                to: '/docs/phone/lianxifangshi',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/freemenL',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 山西仓江科技有限公司`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
