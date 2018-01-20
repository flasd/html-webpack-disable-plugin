'use strict';

function HtmlWebpackDisablePlugin() {}

HtmlWebpackDisablePlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-alter-chunks', function (chunks) {
            if (chunks.length > 0) {
                chunks[0].files = ['false.hot-update.js'];
            } else {
                chunks.push({
                    files: ['false.hot-update.js'],
                    names: ['haha'],
                    size: 137,
                    entry: 'try me',
                    hash: 'wont emit baby'
                });
            }

            return chunks;
        });
    });
};

module.exports = HtmlWebpackDisablePlugin;