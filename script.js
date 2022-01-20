const formElement = document.getElementById("formElement");
const videoElement = document.getElementById("previewVideo");
const previewImageElement = document.getElementById("previewImage");
const fileUploadElement = document.getElementById("uploadFile");
const similarityElement = document.getElementById("similarity");
const resultElement = document.getElementById("result");
const titleElement = document.getElementById("title");


formElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    let data = await fetch("https://api.trace.moe/search", {
                method: "POST",
                body: new FormData(formElement),
    }
    ).then(e => {return e.json()})
    console.log(data.result);
    videoElement.src = data.result[0].video; 
    similarityElement.innerText = "Similarity:" + Math.round(data.result[0].similarity * 100) / 100;
    formElement.style.animationName = "moveOut";
    resultElement.style.animationName = "moveIn";
    titleElement.innerText = data.result[0].filename.substr(0, data.result[0].filename.indexOf(" - ")) + "\n Episode: " + data.result[0].episode;
});

fileUploadElement.addEventListener("change", e => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onload = () => {
        previewImageElement.src = reader.result;
    }
    reader.readAsDataURL(file);
})