const { default: mongoose } = require('mongoose');

const Game = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: true
    },
}, { timestamps: true })

const UserSchema = new mongoose.Schema(
        {
            name: {
                type: String,
            },
            email: {
                type: String,
            },
            phone: {
                type: String,
            },
            address: {
                type: String,
            },
            password: {
                type: String,
            },
        },
        {
            timeStamps: true,
        }
        );

const userSchema = mongoose.model('User', UserSchema);

const gameSchema =  mongoose.model('game', Game)

module.exports = {
    userSchema,
    gameSchema
}