const axios = require("axios");
var osmtogeojson = require('osmtogeojson');

class service {

    constructor(callback){
        this.callback = callback;
    }

    OpenStreetMap = async (bbox) => {

        if (bbox) {
            var osm_data = await this.ApiMap(bbox);
            var geojson = osmtogeojson(osm_data);

            return geojson;
        } else {

            this.callback(400,'bbox is required, and must be of the form min_lon,min_lat,max_lon,max_lat');
        }
    }

    ApiMap = async (bbox) => {

        var res = await axios
            .get('https://www.openstreetmap.org/api/0.6/map',{
                params : bbox
            })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                this.callback(400,error);
            });
        return res;
    }
}

module.exports = service;