const mongoose = require('mongoose');
require('dotenv').config()
mongoose.set('strictQuery', true);
async function connect() {
    try {
        //connect to monggo by script tab
       
        await mongoose.connect('mongodb+srv://nguyenreactapp:'+process.env.CONNECT_MONGO_DB+'@react-app.w7zofwv.mongodb.net/test');
        console.log("connect ok !!!");
    } catch (error) {
        console.log("connect failure !!!");
    }
}
module.exports = { connect };