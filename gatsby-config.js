module.exports = {
  siteMetadata: {
    title: "Manipal Utsav",
    description: "Manipal Utsav - 2019",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Manipal Utsav",
        short_name: "Utsav",
        start_url: "/",
        background_color: "#f5f5f5",
        theme_color: "#f5f5f5",
        display: "minimal-ui",
        icon: "src/images/favicon.png",
      },
    },
    "gatsby-plugin-offline",
  ],
}
