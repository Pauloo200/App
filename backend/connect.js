require('../configuração');
const mongoose = require('mongoose');

function connectMongoDb() {
    mongoose.connect(dbURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'conexão error:'));
    db.once('open', () => {
      console.log('[INFO] JAPA APIS conectado na db!');
    });
};

module.exports.connectMongoDb = connectMongoDb;
