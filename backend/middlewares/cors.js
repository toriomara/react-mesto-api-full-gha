const whitelist = [
  'http://localhost:3000',
  'https://toriomara.nomoredomains.rocks',
  'http://toriomara.nomoredomains.rocks',
];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = { corsOptions };
