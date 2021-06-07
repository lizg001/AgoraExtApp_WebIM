const { name } = require('./package');
const {getPaths, edit, removeWebpackPlugin} = require('@rescripts/utilities')
const path = require('path')
const {env} = process

if(env.HX_EXPORT_JS_LIBRARY) {
    module.exports = [{
        webpack: (config) => {
            // config.output.library = `${name}-[name]`;
            config.entry = path.resolve(__dirname, './src/index_lib.js')
            config.output.libraryTarget = 'umd';
            config.output.filename = 'index.js'
            delete config.output.chunkFilename
            // config.output.jsonpFunction = `webpackJsonp_${name}`;
            // config.output.globalObject = 'window';
            delete config.optimization.splitChunks
            delete config.optimization.runtimeChunk
            return config;
        },
    
        devServer: (_) => {
            const config = _;
    
            config.headers = {
                'Access-Control-Allow-Origin': '*',
            };
            config.historyApiFallback = true;
            config.hot = false;
            config.watchContentBase = false;
            config.liveReload = false;
    
            return config;
        },
    },
        config => {
            const matcher = node =>
                node && !!node.test && !!node.use && node.test.test('.css')
            const paths = getPaths(matcher, config)
            return edit(
                matchedSelection => {
                    let copy = {...matchedSelection}
                    copy.use = [{loader: 'style-loader'}].concat(matchedSelection.use.splice(1,2))
                    return copy
                },
                paths,
                config
            )
        },
        config => {
            const matcher = node =>
                node && !!node.test && node.test.length > 0 && node.loader && node.loader.includes('url-loader')
            const paths = getPaths(matcher, config)
            return edit(
                matchedSelection => {
                    let copy = {...matchedSelection}
                    delete copy.options.name
                    return copy
                },
                paths,
                config
            )
        },
        config => {
            const withoutIgnorePlugin = removeWebpackPlugin('InlineChunkHtmlPlugin', config)
            return withoutIgnorePlugin
        },
        config => {
            const withoutIgnorePlugin = removeWebpackPlugin('HtmlWebpackPlugin', config)
            return withoutIgnorePlugin
        },
        config => {
            const withoutIgnorePlugin = removeWebpackPlugin('InterpolateHtmlPlugin', config)
            return withoutIgnorePlugin
        },
        config => {
            const withoutIgnorePlugin = removeWebpackPlugin('ManifestPlugin', config)
            return withoutIgnorePlugin
        },
        config => {
            const withoutIgnorePlugin = removeWebpackPlugin('MiniCssExtractPlugin', config)
            return withoutIgnorePlugin
        },
    
        config => {
            console.log(config)
            return config
        }
    ]
} else {
    module.exports = {
        webpack: (config) => {
            config.output.library = `${name}-[name]`;
            config.output.libraryTarget = 'umd';
            config.output.jsonpFunction = `webpackJsonp_${name}`;
            config.output.globalObject = 'window';
            return config
        },
    
        devServer: (_) => {
            const config = _;
    
            config.headers = {
                'Access-Control-Allow-Origin': '*',
            };
            config.historyApiFallback = true;
            config.hot = false;
            config.watchContentBase = false;
            config.liveReload = false;
    
            return config;
        },
    }
}

