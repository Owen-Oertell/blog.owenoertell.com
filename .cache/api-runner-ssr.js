var plugins = [{
      plugin: require('/Users/owenoertell/Documents/Programming/personalWebsites/blog.owenoertell.com/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n          {\n            site {\n              siteMetadata {\n                site_url: url\n                title\n                description: subtitle\n              }\n            }\n          }\n        ","feeds":[{"query":"\n              {\n                allMarkdownRemark(\n                  limit: 1000,\n                  sort: { order: DESC, fields: [frontmatter___date] },\n                  filter: { frontmatter: { template: { eq: \"post\" }, draft: { ne: true } } }\n                ) {\n                  edges {\n                    node {\n                      html\n                      fields {\n                        slug\n                      }\n                      frontmatter {\n                        title\n                        date\n                        template\n                        draft\n                        description\n                      }\n                    }\n                  }\n                }\n              }\n            ","output":"/rss.xml","title":"Owen Oertell | Blog"}]},
    },{
      plugin: require('/Users/owenoertell/Documents/Programming/personalWebsites/blog.owenoertell.com/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[],"offsetY":0,"className":"anchor"},
    },{
      plugin: require('/Users/owenoertell/Documents/Programming/personalWebsites/blog.owenoertell.com/node_modules/gatsby-plugin-google-gtag/gatsby-ssr'),
      options: {"plugins":[],"trackingIds":["UA-73379983-2"],"pluginConfig":{"head":true}},
    },{
      plugin: require('/Users/owenoertell/Documents/Programming/personalWebsites/blog.owenoertell.com/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"query":"\n          {\n            site {\n              siteMetadata {\n                siteUrl: url\n              }\n            }\n            allSitePage(\n              filter: {\n                path: { regex: \"/^(?!/404/|/404.html|/dev-404-page/)/\" }\n              }\n            ) {\n              edges {\n                node {\n                  path\n                }\n              }\n            }\n          }\n        ","output":"/sitemap.xml","createLinkInHead":true},
    },{
      plugin: require('/Users/owenoertell/Documents/Programming/personalWebsites/blog.owenoertell.com/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Owen Oertell | Blog","short_name":"Owen Oertell | Blog","start_url":"/","background_color":"#FFF","theme_color":"#F7A046","display":"standalone","icon":"static/logo.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"28a94a65e3b0e8bb643e36dffbfb039e"},
    },{
      plugin: require('/Users/owenoertell/Documents/Programming/personalWebsites/blog.owenoertell.com/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[],"workboxConfig":{"runtimeCaching":[{"urlPattern":{},"handler":"CacheFirst"},{"urlPattern":{},"handler":"StaleWhileRevalidate"},{"urlPattern":{},"handler":"StaleWhileRevalidate"},{"urlPattern":{},"handler":"StaleWhileRevalidate"}]}},
    },{
      plugin: require('/Users/owenoertell/Documents/Programming/personalWebsites/blog.owenoertell.com/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/owenoertell/Documents/Programming/personalWebsites/blog.owenoertell.com/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
