const sentry = require("@sentry/node");

const filterData = require("../../filter-data.json");

exports.filter = () => {
    try {
        const show = []
        for (const obj of filterData.data.response.billdetails) {
            for (const denom of obj.body) {    
                var nominal = parseFloat(denom.split(":")[1])
                if(nominal >= 100000){
                    show.push(nominal)
                }
            }
        }
        return {
            status: true,
            message: "success",
            data: show, 
        };
    } catch (error) {
        console.log(error.message);
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to filter data",
        };
    }
};
