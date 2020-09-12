const app = require('./server.js');

const port = 3000;

app.listen(port, () => {
  console.log('Survivor Pool listening at ', port);
});