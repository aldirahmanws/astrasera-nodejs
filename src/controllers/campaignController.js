const sentry = require("@sentry/node");

const campaignService = require("../services/campaignService");

exports.list = async (req, res, next) => {
    try {
        const campaigns = await campaignService.list();
        if (!campaigns.status) {
            return res.status(400).json(campaigns);
        }
        return res.status(200).json(campaigns);
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
};
exports.create = async (req, res, next) => {
    try {
        const { body } = req;
        if (
            !body.name ||
            !body.shortDescription ||
            !body.description ||
            !body.goalAmount
        ) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields",
            });
        }
        const campaign = {
            name: body.name,
            shortDescription: body.shortDescription,
            description: body.description,
            goalAmount: body.goalAmount,
        };

        const createCampaign = await campaignService.create(campaign);
        if (!createCampaign.status) {
            return res.status(400).json(createCampaign);
        }
        return res.status(200).json(createCampaign);
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
};
exports.read = async (req, res, next) => {
    try {
        const { params } = req;
        if (!params.id) {
            return res.status(400).json({
                status: false,
                message: "Campaign ID not found",
            });
        }
        var campaignId = params.id;

        const readCampaign = await campaignService.read(campaignId);
        if (!readCampaign.status) {
            return res.status(400).json(readCampaign);
        }
        return res.status(200).json(readCampaign);
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
};
exports.update = async (req, res, next) => {
    try {
        const { body, params } = req;
        if (!params.id) {
            return res.status(400).json({
                status: false,
                message: "Campaign ID not found",
            });
        }
        if (
            !body.name ||
            !body.shortDescription ||
            !body.description ||
            !body.goalAmount
        ) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields",
            });
        }
        var campaignId = params.id;
        const campaign = {
            name: body.name,
            shortDescription: body.shortDescription,
            description: body.description,
            goalAmount: body.goalAmount,
        };

        const updateCampaign = await campaignService.update(
            campaignId,
            campaign
        );
        if (!updateCampaign.status) {
            return res.status(400).json(updateCampaign);
        }
        return res.status(200).json(updateCampaign);
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { params } = req;
        if (!params.id) {
            return res.status(400).json({
                status: false,
                message: "Campaign ID not found",
            });
        }
        var campaignId = params.id;

        const deletedCampaign = await campaignService.delete(campaignId);
        if (!deletedCampaign.status) {
            return res.status(400).json(deletedCampaign);
        }
        return res.status(200).json(deletedCampaign);
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
};
