const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/empform')
.then(()=>{
    console.log('connect');
})
.catch((error)=>{
    console.log(error);
})