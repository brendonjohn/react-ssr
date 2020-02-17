This package is internally used by [@react-ssr/express](https://npm.im/@react-ssr/express) and [@react-ssr/nestjs-express](https://npm.im/@react-ssr/nestjs-express).

## Overview

- SSR (Server Side Rendering) as a view template engine
- Dynamic
  - `props`
    - Passing the server data to the React client `props`
    - Suitable for dynamic routes like blogging
  - `Head` component for better SEO
- Developer Experience
  - HMR (Hot Module Replacement) when `process.env.NODE_ENV !== 'production'`
  - Automatically reflect to the browser as soon as you save the scripts and even if styles

## Packages

| package | version |
| --- | --- |
| [@react-ssr/core](https://github.com/saltyshiomix/react-ssr/blob/master/packages/core/README.md) | ![@react-ssr/core](https://img.shields.io/npm/v/@react-ssr/core.svg) ![downloads](https://img.shields.io/npm/dt/@react-ssr/core.svg) |
| [@react-ssr/express](https://github.com/saltyshiomix/react-ssr/blob/master/packages/express/README.md) | ![@react-ssr/express](https://img.shields.io/npm/v/@react-ssr/express.svg) ![downloads](https://img.shields.io/npm/dt/@react-ssr/express.svg) |
| [@react-ssr/nestjs-express](https://github.com/saltyshiomix/react-ssr/blob/master/packages/nestjs-express/README.md) | ![@react-ssr/nestjs-express](https://img.shields.io/npm/v/@react-ssr/nestjs-express.svg) ![downloads](https://img.shields.io/npm/dt/@react-ssr/nestjs-express.svg) |
| [@react-ssr/static](https://github.com/saltyshiomix/react-ssr/blob/master/packages/static/README.md) | ![@react-ssr/static](https://img.shields.io/npm/v/@react-ssr/static.svg) ![downloads](https://img.shields.io/npm/dt/@react-ssr/static.svg) |

## Usage

### With @react-ssr/express

Install it:

```bash
$ npm install --save @react-ssr/core @react-ssr/express express react react-dom
```

And add a script to your package.json like this:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

Then, populate files below inside your project:

**`.babelrc`**:

```json
{
  "presets": [
    "@brendonjohn/react-ssr-express/babel"
  ]
}
```

**`server.js`**:

```js
const express = require('express');
const register = require('@react-ssr/express/register');

const app = express();

(async () => {
  // register `.jsx` or `.tsx` as a view template engine
  await register(app);

  app.get('/', (req, res) => {
    const message = 'Hello World!';
    res.render('index', { message });
  });

  app.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
})();
```

**`views/index.jsx`**:

```jsx
export default function Index({ message }) {
  return <p>{message}</p>;
}
```

Finally, just run `npm start` and go to `http://localhost:3000`, and you'll see `Hello World!`.

### With @react-ssr/nestjs-express

Install it:

```bash
# install NestJS dependencies
$ npm install --save @nestjs/core @nestjs/common @nestjs/platform-express

# install @react-ssr/nestjs-express
$ npm install --save @react-ssr/core @react-ssr/nestjs-express react react-dom
```

And add a script to your package.json like this:

```json
{
  "scripts": {
    "start": "ts-node --project tsconfig.server.json server/main.ts"
  }
}
```

Then, populate files below inside your project:

**`.babelrc`**:

```json
{
  "presets": [
    "@brendonjohn/react-ssr-nestjs-express/babel"
  ]
}
```

**`tsconfig.json`**:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "strict": true,
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  },
  "exclude": [
    "node_modules",
    "ssr.config.js",
    ".ssr"
  ]
}
```

**`tsconfig.server.json`**:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs"
  },
  "include": [
    "server"
  ]
}
```

**`server/main.ts`**:

```ts
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import register from '@react-ssr/nestjs-express/register';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // register `.tsx` as a view template engine
  await register(app);

  app.listen(3000, async () => {
    console.log(`> Ready on http://localhost:3000`);
  });
})();
```

**`server/app.module.ts`**:

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  controllers: [
    AppController,
  ],
})
export class AppModule {}
```

**`server/app.controller.ts`**:

```ts
import {
  Controller,
  Get,
  Render,
} from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index') // this will render `views/index.tsx`
  public showHome() {
    const user = { name: 'NestJS' };
    return { user };
  }
}
```

**`views/index.tsx`**:

```tsx
interface IndexProps {
  user: any;
}

const Index = ({ user }: IndexProps) => {
  return <p>Hello {user.name}!</p>;
};

export default Index;
```

Then just run `npm start` and go to `http://localhost:3000`, you'll see `Hello NestJS!`.

### With @react-ssr/static

Install it:

```bash
$ npm install --save @react-ssr/static react react-dom
```

And add a script to your package.json like this:

```json
{
  "scripts": {
    "dev": "static",
    "build": "static build"
  }
}
```

Then, populate files below inside your project:

**`.babelrc`**:

```json
{
  "presets": [
    "@brendonjohn/react-ssr-static/babel"
  ]
}
```

**`static.config.js`**:

```js
module.exports = {
  routes: {
    '/': 'index',
  },
};
```

**`views/index.jsx`**:

```jsx
export default function Index() {
  return <p>Hello Static Site</p>;
}
```

Finally, just run `npm run build` and you'll see the static files in the dist directory.

For more information, please see [packages/static](https://github.com/saltyshiomix/react-ssr/tree/master/packages/static).

## Examples

- **@react-ssr/express**
  - `.jsx`
    - [examples/basic-jsx](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-jsx)
    - [examples/basic-custom-views](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-custom-views)
    - [examples/basic-custom-document](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-custom-document)
    - [examples/basic-dynamic-head](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-dynamic-head)
    - [examples/basic-hmr-css](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-hmr-css)
    - [examples/basic-hmr-scss](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-hmr-scss)
    - [examples/basic-blogging](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-blogging)
    - [examples/with-jsx-antd](https://github.com/saltyshiomix/react-ssr/tree/master/examples/with-jsx-antd)
    - [examples/with-jsx-bulma](https://github.com/saltyshiomix/react-ssr/tree/master/examples/with-jsx-bulma)
    - [examples/with-jsx-emotion](https://github.com/saltyshiomix/react-ssr/tree/master/examples/with-jsx-emotion)
    - [examples/with-jsx-material-ui](https://github.com/saltyshiomix/react-ssr/tree/master/examples/with-jsx-material-ui)
    - [examples/with-jsx-semantic-ui](https://github.com/saltyshiomix/react-ssr/tree/master/examples/with-jsx-semantic-ui)
    - [examples/with-jsx-styled-components](https://github.com/saltyshiomix/react-ssr/tree/master/examples/with-jsx-styled-components)
  - `.tsx`
    - [examples/basic-tsx](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-tsx)
- **@react-ssr/nestjs-express**
  - [examples/basic-nestjs](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-nestjs)
  - [examples/basic-nestjs-nodemon](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-nestjs-nodemon)
- **@react-ssr/static**
  - `.jsx`
    - [examples/basic-jsx-static](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-jsx-static)
    - [examples/with-jsx-static-bulma](https://github.com/saltyshiomix/react-ssr/tree/master/examples/with-jsx-static-bulma)
  - `.tsx`
    - [examples/basic-tsx-static](https://github.com/saltyshiomix/react-ssr/tree/master/examples/basic-tsx-static)

## Starters

- [react-ssr-jsx-starter](https://github.com/saltyshiomix/react-ssr-jsx-starter)
- [react-ssr-tsx-starter](https://github.com/saltyshiomix/react-ssr-tsx-starter)
- [react-ssr-nestjs-starter](https://github.com/saltyshiomix/react-ssr-nestjs-starter)

## Articles

[Introducing an Alternative to NEXT.js](https://dev.to/saltyshiomix/introducing-an-alternative-to-next-js-12ph)

[[Express] React as a View Template Engine?](https://dev.to/saltyshiomix/express-react-as-a-view-template-engine-h37)
