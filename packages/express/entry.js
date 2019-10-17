import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReactHtmlParser from 'react-html-parser';
import cheerio from 'cheerio';
import Page from './__REACT_SSR_PAGE_NAME__';

const props = JSON.parse('__REACT_SSR_PROPS__');
const html = ReactDOMServer.renderToString(<Page {...props} />);

const hydrateByEmotion = (html) => {
  const { hydrate } = require('emotion');
  const { extractCritical } = require('emotion-server');
  const { ids } = extractCritical(html);
  hydrate(ids);
};

const hasHtml = 0 <= html.indexOf('html');
const ssrId = document.body.dataset.ssrId;

if (hasHtml) {
  switch (ssrId) {
    case 'emotion':
      hydrateByEmotion(html);
      break;

    default:
      // const $ = cheerio.load(html);
      // const body = $('body').html();
      ReactDOM.hydrate((
        <Page {...props} />
      ), document);
      break;
  }
} else {
  switch (ssrId) {
    case 'emotion':
        hydrateByEmotion(html);
      break;

    default:
      ReactDOM.hydrate((
        <Page {...props} />
      ), document.getElementById('react-ssr-root'));
      break;
  }
}