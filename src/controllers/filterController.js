const sentry = require("@sentry/node");

const filterService = require("../services/filterService");

exports.filter = async (req, res, next) => {
    try {
        const resultFilter = await filterService.filter()
        if(!resultFilter.status){
            return res.status(400).json(resultFilter)
        }
        return res.status(200).json(resultFilter.data)
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
}