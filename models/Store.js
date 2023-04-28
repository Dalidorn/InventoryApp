// dependancies
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// create the model
const storeSchema = new Schema({
    name: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    role: { type: String, required: true },
    contactPhone: { type: Number, required: true },
    contactEmail: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    managerPass: { type: String, required: true, minlength: 8},
    items: {
        type: Schema.Types.ObjectId,
        ref: "Item",
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

// logic to hash the password fields
storeSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    if (this.isNew || this.isModified("managerPass")) {
        const saltRounds = 10;
        this.managerPass = await bcrypt.hash(this.managerPass, saltRounds);
    }

    next();
});

// method for checking password
storeSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// method for checking manager password
storeSchema.methods.isCorrectManagerPassword = async function (managerPass) {
    return await bcrypt.compare(managerPass, this.managerPass);
};

// init Store model
const Store = model('Store', storeSchema);


// export the model
module.exports = { Store, storeSchema };