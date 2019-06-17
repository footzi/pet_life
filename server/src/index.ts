import { createConnection } from 'typeorm';
import express from 'express';
import passport from 'passport';
import multer from 'multer';
import router from './routers';
import initNext from './next';
import AuthController from './controllers/Auth';
import SignUpController from './controllers/Signup';
import CustomController from './controllers/Custom';

const config = require('../../server.config.json');

const app = express();
const upload: multer.Instance = multer();

app.use((req, res, next): void => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(config.static));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api', router);
app.get('/api/test', (req, res) => {
  res.send('hello api test');
});
app.get('/test', (req, res) => {
  res.send('hello');
});

app.get('/custom', AuthController.auth, CustomController.test);
// app.get('/login', upload.none(), passport.authenticate('local'), (req, res) => {
//     res.send('login')
// });

createConnection(config.database)
  .then((): void => {
    initNext();
    console.log(`> Database connection to ${config.database.host}`);

    app.listen(config.port.api, config.host.api, (): void => {
      console.log(`> Api listening on http://${config.host.api}:${config.port.api}`);
    });
  })
  .catch((error: string): void => {
    console.log(`> Error connection to database ${error}`);
  });
