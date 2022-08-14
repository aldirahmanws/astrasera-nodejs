const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        goalAmount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const campaigns = mongoose.model("Campaigns", campaignSchema)

module.exports = campaigns