import * as cocoSsd from "@tensorflow-models/coco-ssd";

require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");

var upload;

export function handleSearch(event) {
  console.log("===");

  upload = event.target.files[0];
  console.log(upload);

  console.log("reading image");

  var file = new Blob([upload], { type: upload.type });
  console.log(file);
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, upload.name);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = upload.name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  // image location is now at chrome://settings/downloads/ upload.name
  // image name is upload.name

  // apply tensor here, reading from the downloads folder or something like that

  //const [model, setModel] = useState();

  console.log("creating reader");
  var img = document.createElement("img");
  console.log(img);
  printFile(file);
  const reader = new FileReader();

  async function printFile(file) {
    console.log("In print File");
    const reader = new FileReader();
    console.log("read as data url");
    await reader.readAsDataURL(file);
    console.log("finished");

    reader.onload = function (evt) {
      console.log("onload");
      console.log(evt.target.result);
      img.src = evt.target.result;

      console.log("==========");
      console.log(img);
    };
  }

  reader.addEventListener(
    "load",
    function () {
      reader.readAsDataURL(file);
      console.log("===");
      console.log(reader.result);
      console.log(".....");
      // convert image file to base64 string
      img.src = reader.result;
    },
    false
  );

  (async () => {
    //const img = document.getElementById('img');

    // Load the model.
    const model = await cocoSsd.load();

    // Classify the image.
    const predictions = await model.detect(img);

    console.log(img);
    console.log("Predictions: ");
    console.log(predictions);
  })();
}
