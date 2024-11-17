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
    let userRating = 0;
    
    function calculateAverageRating() {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (reviews.length > 0) ? (totalRating / reviews.length).toFixed(1) : 0;
        return averageRating;
        return totalRating;
    }

    function updateAverageRating() {
        const averageRating = calculateAverageRating();
        const averageRatingElement = document.getElementById('average-rating');
        averageRatingElement.textContent = `${averageRating} out of 5!`;
    }

    function countRatings() {
        const ratingCount = {1: 0, 2: 0, 3: 0, 4: 0,5: 0};
        reviews.forEach(review => {
            ratingCount[review.rating]++;
        });
        return ratingCount;
    }

    function updateRatingSummary() {
        const ratingCounts = countRatings(); 
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`count-${i}`).textContent = ratingCounts[i];
        }
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

    function renderReviews() {
        const reviewContainer = document.getElementById('review-box-container');
        reviewContainer.innerHTML = '';
        reviews.forEach(review => {
            reviewContainer.innerHTML += createReviewHTML(review);
        });
        updateAverageRating();
        updateRatingSummary();
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

        if (userRating == 0) {
            alert("Please Select Rating!");
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
const openThePopup = document.getElementById("openForm")
function openReviewPopup() {
    reviewPopUp.style.display = 'block';
}
function closeReviewPopUp() {
    reviewPopUp.style.display = 'none';
}
closeReviewPopUp();
openThePopup.addEventListener('click',openReviewPopup);
closePopup.addEventListener('click',closeReviewPopUp);
submitReview.addEventListener('click', closeReviewPopUp);
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
        if (event.target === popupOverlassy) {
            closePopupFunc();
        }
    });
});
