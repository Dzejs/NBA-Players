const homePageService = {
    userName: document.getElementById("userName"),
    errorMessage: document.getElementById("errorMessage"),

    // This is an validation function for userInput to check if the string has 0 or less than 3 chars if the input is above 3 chars then it loads the next html

    inputValueValidation: function () {
        if (this.userName.value.length === 0) {
            console.log(this.userName.value)
            this.errorMessage.innerHTML = `<span> *This field is required </span>`;
        }
        else if (this.userName.value.length < 3) {
            this.errorMessage.innerHTML = `<span> *Minimum 3 characters for the user name </span>`;
        }
        else {
            document.location = "/html/nbaPlayerPage.html";
            localStorage.setItem("userName", this.userName.value);
        }
    }
}