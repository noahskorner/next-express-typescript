import app from './app';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const server = next({ dev });
const handle = server.getRequestHandler();

server
  .prepare()
  .then(() => {
    app.get('*', (req, res) => {
      return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server now listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
