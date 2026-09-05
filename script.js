document.addEventListener("DOMContentLoaded", function () {

    const galleryItems = document.querySelectorAll(".gallery-item");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");

    let visibleItems = Array.from(galleryItems);
    let currentIndex = 0;

    // Filter Images
    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            const filter = this.getAttribute("data-filter");

            galleryItems.forEach(item => {

                if (
                    filter === "all" ||
                    item.classList.contains(filter)
                ) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }

            });

            visibleItems = Array.from(galleryItems).filter(
                item => !item.classList.contains("hide")
            );

        });

    });

    // Open Lightbox
    galleryItems.forEach(item => {

        item.addEventListener("click", function () {

            visibleItems = Array.from(galleryItems).filter(
                item => !item.classList.contains("hide")
            );

            currentIndex = visibleItems.indexOf(this);

            showImage();

            lightbox.classList.add("show");

        });

    });

    function showImage() {

        const image = visibleItems[currentIndex].querySelector("img");

        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;

    }

    // Next
    nextBtn.addEventListener("click", function () {

        currentIndex++;

        if (currentIndex >= visibleItems.length) {
            currentIndex = 0;
        }

        showImage();

    });

    // Previous
    prevBtn.addEventListener("click", function () {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = visibleItems.length - 1;
        }

        showImage();

    });

    // Close
    closeBtn.addEventListener("click", function () {
        lightbox.classList.remove("show");
    });

    // Close by clicking background
    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            lightbox.classList.remove("show");
        }

    });

});