const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username : { type : String, required : true, unique : true },
    password : { type : String, required : true },
    email : { type : String, required : true, unique : true },
    // kakaoId : { type : String },
    // githubId : { type : String },
    // googleId : { type : String },
    // nickname : { type : String },
},
    { timestamps : true }
);

// 회원가입 시 비밀번호 해시
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

// 로그인 시 비밀번호 비교
userSchema.methods.comparePassword = function (inputPassword) {
return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);