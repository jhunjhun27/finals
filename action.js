
        // Initialize Swiper for bottom navigation
        const swiperBottomNav = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            centeredSlides: true,
            slideToClickedSlide: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        // Function to update background image based on slide
        function updateBackgroundImage(imageName) {
            const container = document.getElementById('mainContent');
            container.style.backgroundImage = `url(${imageName})`;
        }

        // Function to update movie details based on slide
        function updateMovieDetails(title, description) {
            const movieTitleElement = document.getElementById('Title');
            const movieDescriptionElement = document.getElementById('Description');
            movieTitleElement.textContent = title;
            movieDescriptionElement.textContent = description;
        }

        // Show movie details overlay on slide change
        swiperBottomNav.on('slideChange', function() {
            const currentSlide = swiperBottomNav.slides[swiperBottomNav.activeIndex];
            const title = currentSlide.getAttribute('data-title');
            const description = currentSlide.getAttribute('data-description');
            updateMovieDetails(title, description);
            const imageName = currentSlide.getAttribute('data-image');
            updateBackgroundImage(imageName);
            const movieDetailsContainer = document.getElementById('DetailsContainer');
            movieDetailsContainer.style.display = 'block';
        });

        // Handle "See More" button click to navigate to another page
        const seeMoreButton = document.getElementById('seeMoreButton');
        seeMoreButton.addEventListener('click', function() {
            const currentSlide = swiperBottomNav.slides[swiperBottomNav.activeIndex];
            const href = currentSlide.getAttribute('data-href');
            // Navigate to the specified HTML page for details
            window.location.href = href;
        });

        // Set initial background image and movie details when page loads
        window.addEventListener('DOMContentLoaded', (event) => {
            const initialSlide = swiperBottomNav.slides[swiperBottomNav.activeIndex];
            const initialBackgroundImage = initialSlide.getAttribute('data-image');
            const initialTitle = initialSlide.getAttribute('data-title');
            const initialDescription = initialSlide.getAttribute('data-description');
            if (initialBackgroundImage && initialTitle) {
                updateBackgroundImage(initialBackgroundImage);
                updateMovieDetails(initialTitle, initialDescription);
                document.getElementById('DetailsContainer').style.display = 'block';
            } else {
                console.error('Initial slide data attributes are missing.');
            }
        });
 