import { mongoose, Schema, model } from "mongoose"
import validator from 'validator';
import bcrypt from "bcrypt"

const userSchema = new Schema({

    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Please provide a valid email address',
        },
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
    },

    coverImage: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    watchHistory: [
        { type: Schema.Types.ObjectId, ref: 'Videos' }
    ]
}, { timestamps: true })

userSchema.pre('save', async function (next) { // this line
    const user = this;
    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
});

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function (user) {
    return await jwt.sign({_id:this._id, username: this.userName, email: this.email, image: this.avatar, fullName: this.fullName }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
}

userSchema.methods.generateRefreshToken = async function (user) {
    return await jwt.sign({ _id:this._id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
}

const UserModel = model("User", userSchema)


export default UserModel