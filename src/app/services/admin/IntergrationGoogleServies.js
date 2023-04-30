const googleApi = require("../../helpers/googleApi");

class IntergrationGoogleServices {
    async getAllFileInFolder(request, response, next) {
        try {
            if (request) {
                let data = await googleApi.listFiles(process.env.FORDER_IMAGE_PRODUCT);
                return data;
            }
        } catch (error) {
            console.log(error)
            return 'error'
        }
    }

}
module.exports = new IntergrationGoogleServices();