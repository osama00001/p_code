import {mongoose,Schema,model} from "mongoose"
import validator from 'validator';

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

      coverImage:{
        type: String,
      },
      password:{
        type: String,
        required: true,
      },
      refreshToken:{
        type: String,
        required: true,
      },
      watchHistory:[
        {type: Schema.Types.ObjectId,ref:'Videos'}
      ]
},{timestamps: true})

const UserModel = model("User",userSchema)


export default UserModel