const mongoose = require('mongoose');

const dotenv =require('dotenv');

dotenv.config();

// const mongoURI = "mongodb+srv://foodpa:pu8Z5rq5Dyov0dn7@cluster0.5ri0bhc.mongodb.net/food?retryWrites=true&w=majority"
// pu8Z5rq5Dyov0dn7
module.exports = function (callback) {
    mongoose.connect(process.env.mongoURI, { useNewUrlParser: true }, async (err, result) => {
       
        if (err) console.log("mongoUri" + err)
        else {
            // var database =
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("food_items");
            // console.log("food collection",foodCollection.find({}))
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("Categories");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);

                })
            });
            
        }
    })
};
