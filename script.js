class Slider {
    constructor(slider) {
        this.slider = slider;
        this.display = slider.querySelector(".image-display");
        this.navButtons = Array.from(slider.querySelectorAll(".nav-button"));
        this.prevButton = slider.querySelector(".prev-button");
        this.nextButton = slider.querySelector(".next-button");
        this.sliderNavigation = slider.querySelector(".slider-navigation");
        this.currentSlideIndex = 0;
        this.imageCache = {};

        this.initialize();
    }

    initialize() {
        this.setupSlider();
        this.preloadImages();
        this.eventListeners();
    }

    setupSlider() {
        this.showSlide(this.currentSlideIndex);
    }

    showSlide(index, moveFocus = false) {
        this.currentSlideIndex = index;

        const navButtonImg = this.navButtons[this.currentSlideIndex]?.querySelector("img");
        if (navButtonImg) {
            const imgClone = navButtonImg.cloneNode();
            imgClone.alt = navButtonImg.alt;
            this.display.replaceChildren(imgClone);
        }

        this.updateNavButtons(moveFocus);
    }

    updateNavButtons(moveFocus) {
        this.navButtons.forEach((button, buttonIndex) => {
            const isSelected = buttonIndex === this.currentSlideIndex;
            button.setAttribute("aria-selected", String(isSelected));
            button.tabIndex = isSelected ? 0 : -1;

            if (isSelected && moveFocus) {
                button.focus({ preventScroll: true });
            }
        });
    }

    preloadImages() {
        this.navButtons.forEach((button) => {
            const imgElement = button.querySelector("img");
            if (imgElement) {
                const imgSrc = imgElement.src;
                if (!this.imageCache[imgSrc]) {
                    this.imageCache[imgSrc] = new Image();
                    this.imageCache[imgSrc].src = imgSrc;
                }
            }
        });
    }

    eventListeners() {
        document.addEventListener("keydown", (event) => this.handleKeydown(event));

        this.sliderNavigation.addEventListener("click", (event) => {
            const targetButton = event.target.closest(".nav-button");
            const index = targetButton ? this.navButtons.indexOf(targetButton) : -1;
            if (index !== -1) {
                this.showSlide(index, true);
            }
        });

        this.prevButton.addEventListener("click", () => this.handleAction("prev"));
        this.nextButton.addEventListener("click", () => this.handleAction("next"));
    }

    handleKeydown(event) {
        const target = event.target;

        if (target.matches("input, textarea, select") || target.isContentEditable) {
            return;
        }

        const handledKeys = ["ArrowRight", "ArrowLeft", "Home", "End"];
        if (!handledKeys.includes(event.key)) return;

        const focusInside = this.slider.contains(document.activeElement);

        if (!focusInside && !this.isVisible()) return;

        if (focusInside) event.preventDefault();
        this.handleAction(event.key, focusInside);
    }

    isVisible() {
        const rect = this.slider.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    handleAction(action, moveFocus = false) {
        const total = this.navButtons.length;
        if (!total) return;

        if (action === "Home") {
            this.currentSlideIndex = 0;
        } else if (action === "End") {
            this.currentSlideIndex = total - 1;
        } else if (action === "ArrowRight" || action === "next") {
            this.currentSlideIndex = (this.currentSlideIndex + 1) % total;
        } else if (action === "ArrowLeft" || action === "prev") {
            this.currentSlideIndex = (this.currentSlideIndex - 1 + total) % total;
        }

        this.showSlide(this.currentSlideIndex, moveFocus);
    }
}

const sliderElement = document.querySelector(".image-slider");
if (sliderElement) {
    const ImageSlider = new Slider(sliderElement);
}

// Atualização dinâmica do ano no rodapé
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}