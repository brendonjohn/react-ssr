import React from 'react';
import ReactDOMServer from 'react-dom/server';
import cheerio from 'cheerio';
import {
  convertAttrToString,
  getHeadHtml,
} from './helpers';

const Head = require('./head');

export default (app: React.ReactElement, pageId: string, props: string) => {
  const html = ReactDOMServer.renderToString(app);

  const $ = cheerio.load(html);
  const scriptTags = $.html($('body script'));
  const bodyWithoutScriptTags = ($('body').html() || '').replace(scriptTags, '');

  return `<!DOCTYPE html><html${convertAttrToString($('html').attr())}><head>${getHeadHtml(Head.rewind())}<link rel="stylesheet" href="/_react-ssr/${pageId}.css"></head><body${convertAttrToString($('body').attr())}><div id="react-ssr-root">${bodyWithoutScriptTags}</div><script id="react-ssr-script" src="/_react-ssr/${pageId}.js" data-props="${props}"></script>${scriptTags}</body></html>`;
};
