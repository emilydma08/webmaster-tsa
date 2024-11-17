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

/*Product (Shop) Page*/
/*enlarges the small images on the side*/
function enlargeSmall(smallImg){
    var fullImg= document.getElementById("imageBig");
    fullImg.src = smallImg.src;
}

//FAQ JS
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
    question.addEventListener('click', function() {
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
document.addEventListener('DOMContentLoaded', () => {
    let selectedDateOrder = 'all';
    document.getElementById('dateFilters').addEventListener('change', (event) => {
        selectedDateOrder = event.target.value;
        renderReviews();
    });
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
        }
    ];

    function calculateTotalRatingCount() {
        const ratings = countRatings();
        let totalRatings = 0;
        for (let rating in ratings) {
            totalRatings += ratings[rating];
        }
        return totalRatings;
    }

    function calculateAverageRating() {
        const totalRatings = calculateTotalRatingCount();
        const totalRatingSum = reviews.reduce((sum, review) => {
            return review.rating !== 0 ? sum + review.rating : sum;
        }, 0);
        const averageRating = totalRatings > 0 ? (totalRatingSum / totalRatings).toFixed(1) : 0;
        return averageRating;
    }

    function countRatings() {
        const ratingCount = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
        reviews.forEach(review => {
            if (review.rating !== 0) {
                ratingCount[review.rating]++;
            }
        });
        return ratingCount;
    }

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

    function updateAverageRating() {
        const averageRating = calculateAverageRating();
        const averageRatingElement = document.getElementById('average-rating');
        averageRatingElement.textContent = `${averageRating} out of 5!`;
    }


    function updatePercentageSummary() {
        const percentageCounts = calculatePercentage();
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`count-${i}`).textContent = percentageCounts[i] + "%";
        }
    }

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

    function renderReviews() {
        const reviewContainer = document.getElementById('review-box-container');
        reviewContainer.innerHTML = '';
        const reversedReviews = reviews.reverse();
        let sortedReviews = [...reversedReviews];  
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

    renderReviews();

    const stars = document.querySelectorAll("#star-rating .star");
    stars.forEach(star => {
        star.addEventListener('click', function() {
            userRating = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => s.innerHTML = "&#9734;");
            for (let i = 0; i < userRating; i++) {
                stars[i].innerHTML = "&#9733;";
            }
        });
    });

    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (userRating === 0) {
            alert("Please select a rating!");
            return;
        }

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
        renderReviews();
        reviewForm.reset();
        stars.forEach(s => s.innerHTML = '&#9734;');
        userRating = 0;
    });
});

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
