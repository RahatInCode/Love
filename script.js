const noButton = document.querySelector(".no-btn");
const yesButton = document.querySelector(".yes-btn");
const responseText = document.querySelector(".response");
const photoUpload = document.getElementById("photoUpload");
const photoGallery = document.querySelector(".photo-gallery");

// Load existing photos from local storage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const photos = JSON.parse(localStorage.getItem("photos")) || [];
    photos.forEach(photo => createPhotoCard(photo));
});

// Make the "No" button move away
noButton.addEventListener("mouseover", () => {
    const offsetX = Math.random() * (window.innerWidth - noButton.offsetWidth);
    const offsetY = Math.random() * (window.innerHeight - noButton.offsetHeight);
    noButton.style.position = "absolute";
    noButton.style.left = `${offsetX}px`;
    noButton.style.top = `${offsetY}px`;
});

// Show message when "Yes" button is clicked
yesButton.addEventListener("click", () => {
    responseText.innerHTML = "I love you too cutie! Jantam tumi amay vlo basho! 💖🥰💞";
    responseText.style.opacity = 1;
});

// Trigger file input when upload label is clicked
document.querySelector(".upload-label").addEventListener("click", () => {
    photoUpload.click();
});

// Handle file uploads
photoUpload.addEventListener("change", () => {
    const files = photoUpload.files;
    const photos = JSON.parse(localStorage.getItem("photos")) || [];

    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Create photo card element and store the photo data
            const photoData = e.target.result;
            createPhotoCard(photoData);
            photos.push(photoData);
            localStorage.setItem("photos", JSON.stringify(photos));
        };

        reader.readAsDataURL(file);
    });
});

// Function to create a photo card and append it to the gallery
function createPhotoCard(photoData) {
    // Create photo card element
    const photoCard = document.createElement("div");
    photoCard.classList.add("photo-card");

    // Add image to card
    const img = document.createElement("img");
    img.src = photoData;
    photoCard.appendChild(img);

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-icon");
    deleteButton.innerHTML = "❌"; // Delete icon
    deleteButton.addEventListener("click", () => {
        photoCard.remove();
        removePhotoFromStorage(photoData);
    });
    photoCard.appendChild(deleteButton);

    // Append photo card to gallery
    photoGallery.appendChild(photoCard);
}

// Remove a photo from local storage
function removePhotoFromStorage(photoData) {
    let photos = JSON.parse(localStorage.getItem("photos")) || [];
    photos = photos.filter(photo => photo !== photoData);
    localStorage.setItem("photos", JSON.stringify(photos));
}
