"use strict"

// External dependencies.
const csvtojson = require("csvtojson");
const request = require("request");

// CSV file to be used.
const csvFilePath = "./example.csv";

/**
 * Coverts CSV file to JSON formatted data, then sends a POST request
 * to Kinvey Backend to get the data inserted into a Collection.
 * 
 * @todo: Add the KID.
 * @todo: Add the Authorization header.
 */
const convertToJSON = function () {
    csvtojson()
        .fromFile(csvFilePath)
        .then(function (jsonObj) {
            jsonObj = { body: jsonObj };
            request.post(
                {
                    url: "https://baas.kinvey.com/rpc//custom/prepareDataAndPassToBL",
                    body: jsonObj,
                    json: true,
                    headers: {
                        "Authorization": "xxx"
                    }
                },
                function (error, response) {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    console.log(response.body);
                }
            );
        });
};

convertToJSON();