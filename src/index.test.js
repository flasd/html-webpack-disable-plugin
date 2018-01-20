/* eslint-env es6, node, mocha */
const HtmlWebpackDisablePlugin = require('./index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MemoryFS = require('memory-fs');
const path = require('path');
const webpack = require('webpack');
const { expect } = require('chai');

const fs = new MemoryFS();


describe('HtmlWebpackDisablePlugin', () => {
    it ('should contain the "apply" functions as a property of its prototype', () => {
        expect(HtmlWebpackDisablePlugin).to.respondsTo('apply');
        expect(HtmlWebpackDisablePlugin.prototype).to.have.property('apply');
        expect(HtmlWebpackDisablePlugin.prototype.apply).to.be.a('function');
    });

    it('should supress the html file correctly on a webpack build', (done) => {
        const currentConfig = {
            entry: './src/index.js',

            output: {
                path: path.join(process.cwd(), '.tmp/'),
                filename: 'ignore-me-please.js',
            },

            plugins: [
                new HtmlWebpackPlugin(),
                new HtmlWebpackDisablePlugin()
            ],
        };

        const compiler = webpack(currentConfig);
        compiler.outputFileSystem = fs;

        compiler.run((error, stats) => {
            if (error) {
                done(error);
            }
            
            const emitedHtml = stats.toJson({ assets: true }).assets
                .find(asset => asset.name === 'index.html');

            if (emitedHtml) {
                done(new Error('Emitted HTML file when it shouldt'));
            } else {
                done();
            }
        });
    });

    it('should emit the html file when the plugin is not included', (done) => {
        const currentConfig = {
            entry: './src/index.js',

            output: {
                path: path.join(process.cwd(), '.tmp/'),
                filename: 'ignore-me-please.js',
            },

            plugins: [
                new HtmlWebpackPlugin(),
            ],
        };

        const compiler = webpack(currentConfig);
        compiler.outputFileSystem = fs;

        compiler.run((error, stats) => {
            if (error || stats.hasErrors()) {
                done(error);
            }

            const emitedHtml = stats.toJson({ assets: true }).assets
                .find(asset => asset.name === 'index.html');


            if (!emitedHtml) {
                done(new Error('Failed to emitted HTML file when it should'));
            } else {
                done();
            }
        });
    });

    it('should supress the html file even when theres no chunks', (done) => {
        const currentConfig = {
            entry: 'bogus',

            output: {
                path: path.join(process.cwd(), '.tmp/'),
                filename: 'ignore-me-please.js',
            },

            plugins: [
                new HtmlWebpackPlugin(),
                new HtmlWebpackDisablePlugin(),
            ],
        };

        const compiler = webpack(currentConfig);
        compiler.outputFileSystem = fs;

        compiler.run((error, stats) => {
            if (error) {
                return done(error);
            }

            const emitedHtml = stats.toJson({ assets: true }).assets
                .find(asset => asset.name === 'index.html');


            if (emitedHtml) {
                done(new Error('Html file emitted, plugin failed.'));
            } else {
                done();
            }
        });
    });
});
