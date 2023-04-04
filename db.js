const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const { connection } = await mongoose.connect("mongodb+srv://emanuelone:85740014@cluster0.ogcs0.gcp.mongodb.net/gamr?retryWrites=true&w=majority");
        console.log(`MongoDB is connected: ${connection.host}`);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDatabase;
