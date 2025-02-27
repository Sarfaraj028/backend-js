import mongoose, {Schema} from "mongoose";
import  jsonWebToken  from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    avatar: {
        type: String, // cloudinary url
        required: true
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshToken: {
        type: String
    }
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare("password", this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        email: this.email, 
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.envACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })

    //
}

export const User = mongoose.model("User", userSchema)