//import React from 'react'
import React, { useEffect, useState, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');

var fs = require('fs');
var upload;

var model;
const { Image } = require('image-js');


export function handleSearch(event)
{

    console.log("===");
    
    upload = event.target.files[0];
    console.log(upload);

    console.log("reading image");


    var file = new Blob([upload], {type: upload.type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, upload.name);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = upload.name;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }

    // image location is now at chrome://settings/downloads/ upload.name
    // image name is upload.name

    // apply tensor here, reading from the downloads folder or something like that 

    //const [model, setModel] = useState();

    console.log(file)

    const reader = new FileReader();
    var img = new Image();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        img.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }

    /*
    //window.addEventListener('load', (event) => {
        tf.ready().then(() => {
            try {
                model = cocoSsd.load();
                //setModel(model);
                console.log("setloadedModel");
            } catch (err) {
                console.log(err);
                console.log("failed load model");
            }
        });
    //});
    */



    (async () => {
        //const img = document.getElementById('img');

        // Load the model.
        const model = await cocoSsd.load();

        // Classify the image.
        const predictions = await model.detect(img);

        console.log('Predictions: ');
        console.log(predictions);
    })();

    /*

    async function getPredictions() {
        console.log(img)
        const model =  await cocoSsd.load();
        const predictions = await model.classify(img);
        console.log('Predictions: ');
        console.log(predictions);
        return '';
    }
    getPredictions()

    *\




    /*
    async function loadModel() {
        try {
            model = await cocoSsd.load();
            console.log("setloadedModel");
        } catch (err) {
            console.log(err);
            console.log("failed load model");
        }
    }
    loadModel();

    var img = document.createElement("img");
    img.src = "https://picsum.photos/200/301";
    img.id = "img"
    document.body.appendChild(img);

    async function predictionFunction() {
        const prediction = await model.predict(document.getElementById("img"));
        console.log(prediction);
    }
    predictionFunction()

    console.log(img)
    console.log("d")

    /*
        var img = document.createElement("img");
        img.src = "https://picsum.photos/200/301";
        img.id = "img"
        document.body.appendChild(img);
        console.log(upload.type)

        console.log(img)
    *\












    /*
       let image = Image.load(document.getElementById('img').src);

           let grey = image.grey();

           const predictions2 = model.detect(grey);
           console.log('dsdada');
           console.log(predictions2);

           //document.getElementById('result').src = grey.toDataURL();

       //var url = URL.createObjectURL(file)


       //img2 = tf.fromPixels(img2)

       const predictions = model.detect(img);
       console.log(predictions);
    */

}