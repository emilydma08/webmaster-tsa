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
