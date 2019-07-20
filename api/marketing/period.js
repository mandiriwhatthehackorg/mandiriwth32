const get = (params) => {
    //API ini digunakan untuk melihat promosi merchant yang tersedia di Bank Mandiri sesuai dengan periode promosi
    return {
        url: `${apigateway}/MarketingAPI/1.0/promotion/period`,
        method: `GET`,
        header: {
            token: params.bearer_token,
            "CONTENT-TYPE": application / json
        }
    }
}

module.exports = {
    period_get: get
};