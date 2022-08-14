const server = require("../server");
const axios = require("axios");
const { expect } = require("chai");
const Campaign = require("../src/models/campaignModel")
describe("Campaigns", () => {
    beforeEach((done) => {
        Campaign.remove({}, (err) => {
            done()
        })
    })
    describe("/GET", () => {
        it("Should get all campaigns", (done) => {
            axios({
                method: "get",
                url: `${process.env.BASE_URL}/campaign/list`,
                timeout: 1000 * 60,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data.status).to.be.true;
                done();
            });
        });
    });
    describe("/POST", () => {
        it("Should not POST a campaign without description", (done) => {
            axios({
                method: "post",
                url: `${process.env.BASE_URL}/campaign/create`,
                timeout: 1000 * 60,
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    name: "Bedah rumah",
                    shortDescription: "Membantu memperbaiki rumah",
                    goalAmount: 50000000,
                },
            }).catch((error) => {
                expect(error.response.status).to.equal(400)
                expect(error.response.data.status).to.be.false
                done()
            });
        });
        it("Should POST a campaign", (done) => {
            axios({
                method: "post",
                url: `${process.env.BASE_URL}/campaign/create`,
                timeout: 1000 * 60,
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    name: "Bedah rumah",
                    shortDescription: "Membantu memperbaiki rumah",
                    description: "Membantuk memperbaiki rumah yang sudah rusak",
                    goalAmount: 50000000,
                },
            }).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.data.status).to.be.true
                done()
            });
        });
    });
});
