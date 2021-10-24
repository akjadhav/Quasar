import { load } from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

export async function handleSearch(event) {
  var upload = event.target.files[0];
  var file = new Blob([upload], { type: upload.type });
  var img = document.createElement("img");

  const printFile = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);

    reader.onload = (evt) => {
      img.src = evt.target.result;
    };
  };

  printFile(file);

  // Load the model and Classify the image.
  const model = await load();
  const predictions = await model.detect(img);
  return predictions ? predictions[0].class: null
}
