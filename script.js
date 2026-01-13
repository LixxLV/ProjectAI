// const URL = "https://teachablemachine.withgoogle.com/models/WoP7tAcZ0/";

// let model;
// let isModelReady = false;

// // Show loading status while model loads
// document.getElementById("status").innerText = "⏳ Loading model...";

// // Load model
// async function loadModel() {
//   const modelURL = URL + "model.json";
//   const metadataURL = URL + "metadata.json";

//   model = await tmImage.load(modelURL, metadataURL);
//   isModelReady = true;

//   document.getElementById("status").innerText =
//     "✅ Model ready. Upload an image.";
// }

// loadModel();

// // Handle image upload
// document.getElementById("imageUpload").addEventListener("change", function (event) {

//   if (!isModelReady) {
//     document.getElementById("status").innerText =
//       "⏳ Model is still loading, please wait...";
//     return;
//   }

//   const image = document.getElementById("preview");
//   image.src = URL.createObjectURL(event.target.files[0]);
//   image.style.display = "block";

//   document.getElementById("status").innerText =
//     "🔍 Predicting image...";

//   image.onload = async function () {
//     const prediction = await model.predict(image);

//     let output = "<h3>Prediction Result</h3>";

//     prediction.forEach(p => {
//       const percent = (p.probability * 100).toFixed(2);
//       output += `
//         <div>${p.className}: ${percent}%</div>
//         <div class="bar">
//           <div class="fill" style="width:${percent}%">${percent}%</div>
//         </div>
//       `;
//     });

//     document.getElementById("result").innerHTML = output;
//   };
// });


const MODEL_URL = "https://teachablemachine.withgoogle.com/models/WoP7tAcZ0/";

let model;
let isModelReady = false;

// Status awal
document.getElementById("status").innerText = "⏳ Loading model...";

// Load model
async function loadModel() {
  const modelURL = MODEL_URL + "model.json";
  const metadataURL = MODEL_URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  isModelReady = true;

  document.getElementById("status").innerText =
    "✅ Model ready. Upload an image.";
}

loadModel();

// Handle image upload
document.getElementById("imageUpload").addEventListener("change", function (event) {

  if (!isModelReady) {
    document.getElementById("status").innerText =
      "⏳ Model still loading, please wait...";
    return;
  }

  const image = document.getElementById("preview");

  // ✅ FIX DI SINI
  image.src = window.URL.createObjectURL(event.target.files[0]);
  image.style.display = "block";

  document.getElementById("status").innerText = "🔍 Predicting image...";

  image.onload = async function () {
    const prediction = await model.predict(image);

    let output = "<h3>Prediction Result</h3>";

    prediction.forEach(p => {
      const percent = (p.probability * 100).toFixed(2);
      output += `
        <div>${p.className}: ${percent}%</div>
        <div class="bar">
          <div class="fill" style="width:${percent}%">${percent}%</div>
        </div>
      `;
    });

    document.getElementById("result").innerHTML = output;
  };
});

