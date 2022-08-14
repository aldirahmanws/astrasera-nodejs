const sentry = require("@sentry/node");

const Campaign = require("../models/campaignModel")

exports.list = async () => {
    try {
        const campaigns = await Campaign.find()
        return {
            status: true,
            message: "Success to get campaign",
            data: campaigns
        }
    } catch (error) {
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to get campaign"
        }
    }
}
exports.create = async (dataCampaign) => {
    try {
        const campaign = new Campaign(dataCampaign)
        await campaign.save()

        return {
            status: true,
            message: "Success to create campaign"
        }
    } catch (error) {
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to create campaign"
        }
    }
}
exports.read = async (campaignId) => {
    try {
        const campaign = await Campaign.findById(campaignId)
        if(!campaign){
            return {
                status: false,
                message: "Campaign not found"
            }
        }

        return {
            status: true,
            message: "Success to get detail campaign",
            data: campaign
        }
    } catch (error) {
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to get detail campaign"
        }
    }
}
exports.update = async (campaignId,dataCampaign) => {
    try {
        const campaign = await Campaign.findById(campaignId)
        if(!campaign){
            return {
                status: false,
                message: "Campaign not found"
            }
        }
        await Campaign.updateOne(
            {
                _id: campaign._id,
            },
            {
                $set: dataCampaign,
            }
        );
        return {
            status: true,
            message: "Success to update campaign"
        }
    } catch (error) {
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to update campaign"
        }
    }
}
exports.delete = async (campaignId) => {
    try {
        const campaign = await Campaign.findById(campaignId)
        if(!campaign){
            return {
                status: false,
                message: "Campaign not found"
            }
        }
        await Campaign.remove({ _id: campaign._id });
        return {
            status: true,
            message: "Success to delete campaign"
        }
    } catch (error) {
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to delete campaign"
        }
    }
}