//Pop-Up JS
document.addEventListener('DOMContentLoaded', function () {
    const popupOverlay = document.getElementById('popupOverlay');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const signUp = document.getElementById('signUp')
    const emailInput = document.getElementById('emailInput');

    function openPopup() {
        popupOverlay.style.display = 'block';
    }

    function closePopupFunc() {
        popupOverlay.style.display = 'none';
    }

    openPopup();

    closePopup.addEventListener('click', closePopupFunc);

    signUp.addEventListener('click', closePopupFunc);

    popupOverlay.addEventListener('click', function (event) {
        if (event.target === popupOverlay) {
            closePopupFunc();
        }
    });
});

/*Testimonials JS*/
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    const testimonialsContainer = document.getElementById('testimonials-container');
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;
    let currentIndex = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    testimonialsContainer.addEventListener('mousemove', (event) => {
        const containerWidth = testimonialsContainer.offsetWidth;
        const hoverX = event.clientX - testimonialsContainer.getBoundingClientRect().left;

        if (hoverX < containerWidth / 2) {
            testimonialsContainer.classList.add('left-hover');
            testimonialsContainer.classList.remove('right-hover');
        } else {
            testimonialsContainer.classList.add('right-hover');
            testimonialsContainer.classList.remove('left-hover');
        }
    });

    testimonialsContainer.addEventListener('mouseleave', () => {
        testimonialsContainer.classList.remove('left-hover', 'right-hover');
    });

    testimonialsContainer.addEventListener('click', (event) => {
        const containerWidth = testimonialsContainer.offsetWidth;
        const clickX = event.clientX - testimonialsContainer.getBoundingClientRect().left;

        if (clickX < containerWidth / 2 && currentIndex > 0) {
            currentIndex--;
        } else if (clickX >= containerWidth / 2 && currentIndex < totalTestimonials - 1) {
            currentIndex++;
        }
        updateSlider();
    });
});


/*Product (Shop) Page*/
/*enlarges the small images on the side*/
function enlargeSmall(smallImg) {
    var fullImg = document.getElementById("imageBig");
    fullImg.src = smallImg.src;
}
/* Change color of the  text  */
function changeColor(color) {
    document.getElementById("color-text").textContent = color;
}
/* Load page with chosen color of the product  */
function loadpage(color) {
    // Using window.location.href
    if (color == "Red") {
        window.location.href = "shop.html";
    }
    if (color == "Green") {
        window.location.href = "shopgreen.html";
    }
    if (color == "Orange") {
        window.location.href = "shoporange.html";
    }

}
//FAQ JS
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
    question.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        const toggleSign = this.querySelector('.toggle-sign');

        if (answer.style.display === "block" || answer.classList.contains('open')) {
            answer.style.display = "none";
            answer.classList.remove('open');
            toggleSign.textContent = "+";
        } else {
            answer.style.display = "block";
            answer.classList.add('open');
            toggleSign.textContent = "−";
        }
    });
});
//Review JS

//Runs when page is loaded
document.addEventListener('DOMContentLoaded', () => {
    let typeRating = [];
    //Responding to rating checkboxes changing
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const rating = parseInt(event.target.value);
            if (event.target.checked) {
                if (!typeRating.includes(rating)) {
                    typeRating.push(rating);
                }
            } else {
                typeRating = typeRating.filter(item => item !== rating);
            }
            renderReviews();
        });
    });

    //Responding to data filter being selected
    let selectedDateOrder = 'all';
    document.getElementById('dateFilters').addEventListener('change', (event) => {
        selectedDateOrder = event.target.value;
        renderReviews();
    });
    //Initial reviews from Amazon
    const reviews = [
        {
            name: "Savannah Hadley",
            username: "@savvyhads",
            profileImg: "assets/profile1.jpg",
            rating: 5,
            date: "Reviewed in the United States on August 4, 2024",
            size: "7-8 Women/5.5-6.5 Men",
            color: "Red",
            comment: "They are super uncomfortable at first but once they are a little worn they are fine. Wouldn't go for a long walk or anything but fine to keep by the door to go outside or run an errand. Got them for the beach & love em."
        },
        {
            name: "	Yolanda R",
            username: "@yol_r",
            profileImg: "assets/profile2.jpg",
            rating: 5,
            date: "Reviewed in the United States on August 12, 2024",
            size: "11-12 Women/10-11 Men",
            color: "Red",
            comment: "I bought these because they make me smile. Simple as that.\nNot meant for outside wear. If the front scrapes on the ground, color is scraped off of the sandal. But other than that they're great."
        },
        {
            name: "satisfied customer",
            username: "@...",
            profileImg: "assets/ProfileImage.png",
            rating: 5,
            date: "Reviewed in the United States on August 21, 2024",
            size: "Size: 10-11 Women/8.5-9.5 Men",
            color: "Red",
            comment: "These guys are amazing and my oldest loves them. I will be buying a few more pairs as they're incredible."
        },
        {
            name: "Lacie K",
            username: "@loopsandlaces",
            profileImg: "assets/ProfileImage.png",
            rating: 3,
            date: "Reviewed in the United States on September 12, 2024",
            size: "Size: 10-11 Women/8.5-9.5 Men",
            color: "Red",
            comment: "They are super uncomfortable and just slip off but they are so silly I still like them"
        }
    ];

    //Amount of Ratings Submitted
    function calculateTotalRatingCount() {
        const ratings = countRatings();
        let totalRatings = 0;
        for (let rating in ratings) {
            totalRatings += ratings[rating];
        }
        return totalRatings;
    }

    //Average Rating across all submitted ratings
    function calculateAverageRating() {
        const totalRatings = calculateTotalRatingCount();
        const totalRatingSum = reviews.reduce((sum, review) => {
            return review.rating !== 0 ? sum + review.rating : sum;
        }, 0);
        const averageRating = totalRatings > 0 ? (totalRatingSum / totalRatings).toFixed(1) : 0;
        return averageRating;
    }
    //Dictionary of total ratings per rating type (1-5)
    function countRatings() {
        const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(review => {
            if (review.rating !== 0) {
                ratingCount[review.rating]++;
            }
        });
        return ratingCount;
    }
    //Calculates Percentage of Each rating type submitted
    function calculatePercentage() {
        const percentages = {};
        const total = calculateTotalRatingCount();
        const ratings = countRatings();
        for (let i = 1; i <= 5; i++) {
            if (ratings[i] > 0 && total > 0) {
                percentages[i] = parseFloat((100 * (ratings[i] / total)).toFixed(0));
            } else {
                percentages[i] = 0;
            }
        }
        return percentages;
    }
    //Updating webpage with average rating
    function updateAverageRating() {
        const averageRating = calculateAverageRating();
        const averageRatingElement = document.getElementById('average-rating');
        averageRatingElement.textContent = `${averageRating} out of 5!`;
    }

    //Updating webpage with percentages
    function updatePercentageSummary() {
        const percentageCounts = calculatePercentage();
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`count-${i}`).textContent = percentageCounts[i] + "%";
        }
    }

    /** 
     * Function is called green bars because 
     * the rating bars were initially created to 
     * be green for the percentage of rating type 
     * and red for the remaining portion of the bar. 
     * **/
    //Updates the bar to be yellow as corresponding to rating type currency
    function updateGreenBars() {
        const percentages = calculatePercentage();
        for (let i = 1; i <= 5; i++) {
            const percentBar = document.getElementById(`PercentBar${i}`);
            const percent = percentages[i];
            const redPercent = 100 - percent;

            if (percentBar) {
                percentBar.style.width = '100%';
                percentBar.innerHTML = `<div class="green-bar" style="width: ${percent}%;"></div><div class="red-bar" style="width: ${redPercent}%;"></div>`;
            }
        }
    }
    //renders reviews: chooses reviews that correspond to chosen checkboxes, filters reviews for the filter chosen, calls the update functions to update values on the webpage
    function renderReviews() {
        const reviewContainer = document.getElementById('review-box-container');
        reviewContainer.innerHTML = '';
        const reversedReviews = [...reviews].reverse();
        let filteredReviews = reversedReviews.filter(review => {
            return typeRating.length == 0 || typeRating.includes(review.rating);
        });
        let sortedReviews = [...filteredReviews];
        if (selectedDateOrder !== 'all') {
            sortedReviews = sortedReviews.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (selectedDateOrder === "Oldest to Newest") {
                    return dateA - dateB;
                } else if (selectedDateOrder === "Newest to Oldest") {
                    return dateB - dateA;
                }
                return 0;
            });
        }

        sortedReviews.forEach(review => {
            reviewContainer.innerHTML += createReviewHTML(review);
        });

        updateAverageRating();
        updatePercentageSummary();
        updateGreenBars();
    }
    //Function that creates a new review
    function createReviewHTML(review) {
        return `
            <div class="review-box">
                <div class="box-top">
                    <div class="profile">
                        <div class="profile-img">
                            <img src="${review.profileImg}" alt="${review.name}">
                        </div>
                        <div class="name-user">
                            <strong>${review.name}</strong>
                            <span>${review.username}</span>
                        </div>
                        <div class="review">
                            ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
                        </div>
                    </div>
                </div>
                <div class="bottom-box">
                    <div class="client-details">
                        <span>${review.date}</span>
                        <span>Size: ${review.size}</span>
                        <span>Color: ${review.color}</span>
                    </div>
                    <div>
                        <p>${review.comment}</p>
                    </div>
                </div>
            </div>
        `;
    }

    //Re rendering reviews 
    renderReviews();

    //Drawing the stars in each review as it corresponds to userRating
    const stars = document.querySelectorAll("#star-rating .star");
    stars.forEach(star => {
        //makes each star in form clickable and calculates userRating from whether the user clicked the star or not
        star.addEventListener('click', function () {
            userRating = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => s.innerHTML = "&#9734;");
            for (let i = 0; i < userRating; i++) {
                stars[i].innerHTML = "&#9733;";
            }
        });
    });

    //when the user submits a review
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (userRating === 0) {
            //Prevents an incomplete review from being submitted
            return;
        }
        //creating a new review and pushing it
        const userFullName = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const rating = userRating;
        const color = document.getElementById('color').value;
        const size = document.getElementById('size').value;
        const comment = document.getElementById('comment').value;
        const date = `Reviewed in the United States on ${new Date().toLocaleDateString()}`;

        const newReview = {
            name: userFullName,
            username: "@" + username,
            profileImg: "assets/ProfileImage.png",
            rating,
            date,
            size,
            color,
            comment
        };

        reviews.push(newReview);
        //Rerender and reset
        renderReviews();
        reviewForm.reset();
        stars.forEach(s => s.innerHTML = '&#9734;');
        userRating = 0;
    });
});

//Opening and Closing the popup when certain things are pressed
const reviewPopUp = document.getElementById('reviewPopUp');
const closePopup = document.getElementById('x-out');
const submitReview = document.getElementById("submitButton");
const openThePopup = document.getElementById("openForm");

function openReviewPopup() {
    reviewPopUp.style.display = 'block';
}

function closeReviewPopUp() {
    reviewPopUp.style.display = 'none';
}

closeReviewPopUp();
openThePopup.addEventListener('click', openReviewPopup);
closePopup.addEventListener('click', closeReviewPopUp);
submitReview.addEventListener('click', closeReviewPopUp);



