module.exports = {
  title: "Vivliostyle",
  tagline: "CSS Typesetting",
  url: "https://docs.vivliostyle.org",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "vivliostyle", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Vivliostyle",
      logo: {
        alt: "Vivliostyle Logo",
        src: "img/logo.png"
      },
      links: [
        { to: "docs/user-guide", label: "User Guide", position: "left" },
        { to: "docs/api", label: "API", position: "left" },
        {
          href: "https://github.com/vivliostyle/vivliostyle",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "User Guide",
              to: "docs/user-guide"
            },
            {
              label: "API References",
              to: "docs/api"
            }
          ]
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus"
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus"
            }
          ]
        },
        {
          title: "Social",
          items: [
            {
              label: "Blog",
              to: "blog"
            },
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus"
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus"
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/facebook/docusaurus/edit/master/website/"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ]
};
