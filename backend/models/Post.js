const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title : { type : String, required : true },
        content : {type : String, required : true },
        author : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        fileUrl : {type : String, required : false},
    },
    { timestamps : true }
);

module.exports = mongoose.model("Post", postSchema);