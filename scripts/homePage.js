const submit = document.getElementById("submit");

// This event stores an empty array in the localstorage and calls a function that validates the inpit and takes you to the next html page

submit.addEventListener("click", () => {
    let playersArray = [];
    localStorage.setItem("players", JSON.stringify(playersArray));
    homePageService.inputValueValidation();
});