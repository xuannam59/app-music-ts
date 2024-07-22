// Preview image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  })
}

// Play try audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
  const uploadInputAudio = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  const uploadAudioSource = uploadAudioPlay.querySelector("source");

  uploadInputAudio.addEventListener("change", (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      uploadAudioSource.src = URL.createObjectURL(file);
      uploadAudioPlay.load();
    }
  })
}