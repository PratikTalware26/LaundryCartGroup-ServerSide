const {default: mongoose} = require("mongoose");

async function getConnection(){
    await mongoose.connect("mongodb+srv://shivasharma:shivasharma@cluster0.kxdn1z0.mongodb.net/?retryWrites=true&w=majority")
};

module.exports = getConnection;