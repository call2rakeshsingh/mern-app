const mongoose = require('mongoose')






mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB).then(
    console.log("Database is connected now")
).catch((err) => {
    console.log(`Facing problem to connect database and this is the ${err}`)
})