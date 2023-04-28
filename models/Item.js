// require mongoose
const { Schema, model } = require("mongoose");

// create the model
const itemSchema = new Schema({
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    role: { type: String, required: true},
    cost: { type: Number, required: true },
    caseSize: { type: Number, required: true },
    PAR: { type: Number, required: true },
    currentQuantity: { type: Number },
    maxQuantity: { type: Number },
    image: {
        data: Buffer,
        contentType: String
    },
    lastUpdate: { type: Date }
});

// logic to update the date field whenever the current quantity of an item is changed.
itemSchema.pre("save", function (next) {
    if (this.isModified("currentQuantity")) {
        this.lastUpdate = new Date();
    }
    next();
});

// init Item model
const Item = model('Item', itemSchema);

// export the model
module.exports = { Item, itemSchema };