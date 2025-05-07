const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        content : { type : String, required : true },
        author : {
            type : mongoose.Schema.Types.ObjectId,
            ref : true,
            required : true,
        },
        post : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post",
            required : true,
        },
    },
    { timestamps : true }
)