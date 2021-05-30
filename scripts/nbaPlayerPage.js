const ApiService = {
    cachedData : null,
    loader : document.getElementById("loader"),
    // This is the function that is used to call the balldontlie API and the loader accordingly 
    // It uses a setTimeout to wait 1 second before calling all the functios from the other scripts so that we can see the loader since the time to get the data is short
    // And here we also cache the data 

    callNbaApi : function () {
        ApiService.loaderHelper(true);
        fetch(`https://www.balldontlie.io/api/v1/players`)
        .then(promise => {return promise.json()})
        .then(data => {
            setTimeout(() => {
                this.cachedData = data.data;
                console.log(this.cachedData);
                nbaPlayerTableService.printPlayersInTable(this.cachedData);
                nbaFilterService.filterInput(this.cachedData);
                nbaFilterService.registerEventDropDown(this.cachedData);
                nbaFilterService.registerEventFilterByName(this.cachedData);
                nbaFilterService.resetButtonRegisterListener(this.cachedData);
                ApiService.loaderHelper(false);
            }, 1000);     
        });
        
    },
    
    // This function is the toggle loader which is used to display the loader accordingly

    loaderHelper : function (toggle) {
        if(toggle) ApiService.loader.style.display = "block";
        else ApiService.loader.style.display = "none";
    }
}

    
ApiService.callNbaApi();