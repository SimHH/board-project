const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String }, 
    email: { type: String, required: true, unique: true },
    provider: {
      type: String,
      enum: ["local", "google", "kakao", "github"],
      required: true,
    },
    googleId: { type: String },
    kakaoId: { type: String },
    githubId: { type: String },

  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

userSchema.methods.comparePassword = function (inputPassword) {
return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);