require('babel-register')({
  presets: ['env', 'react', 'stage-2', 'es2015', 'stage-0'],
});

const path = require('path');
const ejs = require('ejs');
const express = require('express');
const renderStatic = require('./src/renderStatic').default;
const routes = require('./src/routes').default;
const { createStore } = require('./src/store');

const app = express();

app.disable('x-powered-by');
app.use(express.static('public'));

routes.forEach((route) => {
  app.get(route.path, async (req, res) => {
    const store = createStore();

    if (typeof route.getData === 'function') {
      try {
        await route.getData(store, req.params);
      } catch (e) {
        console.error(e);
      }
    }

    const templateData = {
      content: renderStatic(store, req.url),
      state: store.getState(),
    };

    try {
      const html = await ejs.renderFile(path.resolve(__dirname, 'src/index.ejs'), templateData);
      res.send(html);
    } catch (e) {
      res.status(500).send(e);
    }
  });
});

app.listen(process.env.PORT || 3000);
