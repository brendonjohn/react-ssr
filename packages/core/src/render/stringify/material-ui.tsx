import React from 'react';
import ReactDOMServer from 'react-dom/server';
import cheerio from 'cheerio';
import {
  convertAttrToString,
  getHeadHtml,
} from './helpers';

const Head = require('./head');
const { ServerStyleSheets } = require('@material-ui/core/styles');

export default (app: React.ReactElement, script: string) => {
  const sheets = new ServerStyleSheets();
  const html = ReactDOMServer.renderToString(sheets.collect(app));
  const $ = cheerio.load(html);
  const css = sheets.toString();

  return `
<!DOCTYPE html>
<html${convertAttrToString($('html').attr())}>
  <head>
    ${getHeadHtml(Head.rewind())}
    <style id="jss-server-side">${css}</style>
  </head>
  <body${convertAttrToString($('body').attr())}>
    <div id="react-ssr-root">${$('body').html() || ''}</div>
    <script src="${script}"></script>
  </body>
</html>
`;
};
