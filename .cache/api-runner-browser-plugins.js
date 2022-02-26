module.exports = [{
      plugin: require('../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":960,"withWebp":true,"linkImagesToOriginal":true,"showCaptions":false,"markdownCaptions":false,"sizeByPixelDensity":false,"backgroundColor":"white","quality":50,"tracedSVG":false,"loading":"lazy","disableBgImageOnAlpha":false,"disableBgImage":false},
    },{
      plugin: require('../node_modules/gatsby-remark-autolink-headers/gatsby-browser.js'),
      options: {"plugins":[],"offsetY":0,"className":"anchor"},
    },{
      plugin: require('../node_modules/gatsby-plugin-netlify-cms/gatsby-browser.js'),
      options: {"plugins":[],"modulePath":"/Users/owenoertell/Documents/Programming/personalWebsites/blog.owenoertell.com/src/cms/index.js"},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-gtag/gatsby-browser.js'),
      options: {"plugins":[],"trackingIds":["UA-73379983-2"],"pluginConfig":{"head":true}},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Owen Oertell","short_name":"Owen Oertell","start_url":"/","background_color":"#FFF","theme_color":"#F7A046","display":"standalone","icon":"static/logo.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"28a94a65e3b0e8bb643e36dffbfb039e"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[],"workboxConfig":{"runtimeCaching":[{"urlPattern":{},"handler":"CacheFirst"},{"urlPattern":{},"handler":"StaleWhileRevalidate"},{"urlPattern":{},"handler":"StaleWhileRevalidate"},{"urlPattern":{},"handler":"StaleWhileRevalidate"}]}},
    },{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/@sentry/gatsby/gatsby-browser.js'),
      options: {"plugins":[],"tracesSampleRate":1},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
