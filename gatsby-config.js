const activeEnv = process.env.NODE_ENV;
require("dotenv").config({
  path: `.env.${activeEnv}`,
});

console.log(`Using environment: "${activeEnv}"`);

module.exports = {
  siteMetadata: {
    title: `Neo New Card maker`,
    description: `Create custom trading card game cards online.`,
    author: `Yemachu`,
  },
  pathPrefix: `/site`,
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-eslint`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    /*{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },*/
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Neo New Card maker`,
        display: `standalone`,
        short_name: `Card maker`,
        start_url: `/`,
        background_color: `#3f51b5`,
        theme_color: `#3f51b5`,
        theme_color_in_head: false,
        display: `minimal-ui`,
        icon: `src/images/Icon.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
