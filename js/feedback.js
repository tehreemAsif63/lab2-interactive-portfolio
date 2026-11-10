
const feedbackForm = document.getElementById("feedbackForm");

const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const topicInput = document.getElementById("topic");
const commentsInput = document.getElementById("comments");
const websiteInput = document.getElementById("website");

const fullNameError = document.getElementById("fullNameError");
const emailError = document.getElementById("emailError");
const topicError = document.getElementById("topicError");
const commentsError = document.getElementById("commentsError");
const websiteError = document.getElementById("websiteError");

const characterCounter = document.getElementById("characterCounter");
const formStatus = document.getElementById("formStatus");


// shwoingan error message
function showFieldError(input, errorElement, message) {
    input.classList.add("error");
    input.classList.remove("valid");
    input.setAttribute("aria-invalid", "true");
    errorElement.textContent = message;
}


// clearing an error message
function clearFieldError(input, errorElement) {
    input.classList.remove("error");
    input.setAttribute("aria-invalid", "false");
    errorElement.textContent = "";
}


// validating full name
function validateFullName() {
    const name = fullNameInput.value.trim();
    const namePattern = /^[\p{L}\s'-]+$/u;

    clearFieldError(fullNameInput, fullNameError);

    if (name.length < 2 || !namePattern.test(name)) {
        showFieldError(
            fullNameInput,
            fullNameError,
            "Please enter a valid name with at least 2 characters."
        );
        return false;
    }

    fullNameInput.classList.add("valid");
    return true;
}


// validating email
function validateEmail() {
    clearFieldError(emailInput, emailError);

    if (!emailInput.checkValidity()) {
        showFieldError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );
        return false;
    }

    emailInput.classList.add("valid");
    return true;
}


// validating topic
function validateTopic() {
    clearFieldError(topicInput, topicError);

    if (topicInput.value === "") {
        showFieldError(
            topicInput,
            topicError,
            "Please choose a topic."
        );
        return false;
    }

    topicInput.classList.add("valid");
    return true;
}


// validating comments
function validateComments() {
    const comments = commentsInput.value.trim();

    clearFieldError(commentsInput, commentsError);

    if (comments.length < 15) {
        showFieldError(
            commentsInput,
            commentsError,
            "Please enter at least 15 characters."
        );
        return false;
    }

    commentsInput.classList.add("valid");
    return true;
}


// validating optional website
function validateWebsite() {
    clearFieldError(websiteInput, websiteError);

    if (websiteInput.value === "") {
        return true;
    }

    if (!websiteInput.checkValidity()) {
        showFieldError(
            websiteInput,
            websiteError,
            "Please enter a valid website URL."
        );
        return false;
    }

    websiteInput.classList.add("valid");
    return true;
}


// updating the comments character counter
function updateCharacterCounter() {
    const count = commentsInput.value.trim().length;

    characterCounter.textContent =
        count + " characters (minimum 15)";

    if (count >= 15) {
        characterCounter.classList.add("valid");
    } else {
        characterCounter.classList.remove("valid");
    }
}


// resetting the form's visual states
function resetForm() {
    clearFieldError(fullNameInput, fullNameError);
    clearFieldError(emailInput, emailError);
    clearFieldError(topicInput, topicError);
    clearFieldError(commentsInput, commentsError);
    clearFieldError(websiteInput, websiteError);

    updateCharacterCounter();
    formStatus.textContent = "";
}


// updating counter and clearing the error when comments are long enough
commentsInput.addEventListener("input", function () {
    updateCharacterCounter();

    if (commentsInput.value.trim().length >= 15) {
        clearFieldError(commentsInput, commentsError);
        commentsInput.classList.add("valid");
    }
});

// clearing validation messages when the Clear button is used
feedbackForm.addEventListener("reset", function () {
    setTimeout(resetForm, 0);
});

// Validating fields when the user leaves them
fullNameInput.addEventListener("blur", validateFullName);
emailInput.addEventListener("blur", validateEmail);
topicInput.addEventListener("blur", validateTopic);
commentsInput.addEventListener("blur", validateComments);
websiteInput.addEventListener("blur", validateWebsite);

// checking the form when submitted
feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameIsValid = validateFullName();
    const emailIsValid = validateEmail();
    const topicIsValid = validateTopic();
    const commentsAreValid = validateComments();
    const websiteIsValid = validateWebsite();

    if (
        !nameIsValid ||
        !emailIsValid ||
        !topicIsValid ||
        !commentsAreValid ||
        !websiteIsValid
    ) {
        return;
    }

    const name = fullNameInput.value.trim();

    feedbackForm.reset();

    setTimeout(function () {
        resetForm();

        formStatus.textContent =
            "Thanks for your feedback, " + name + "!";

        setTimeout(function () {
            formStatus.textContent = "";
        }, 4000);

    }, 0);
});
