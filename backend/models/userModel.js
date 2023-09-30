const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true , unique: true},
        password: { type: String, required: true },
        image: { 
            type: String, 
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
         }
    },
    {
        timestamps: true,
    }
);

// check if the entered password match with existing one
userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// bcrypt before saving the password
userModel.pre('save', async function (next) {
    if(!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;

