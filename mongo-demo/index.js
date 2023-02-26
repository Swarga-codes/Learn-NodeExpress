const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Connected to mongo db...'))
.catch(err=>console.error('Couldnt connect to mongo db',err))