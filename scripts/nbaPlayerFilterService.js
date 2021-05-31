const nbaFilterService = {
    filterInput: document.getElementById("filterInput"),
    filterButton: document.getElementById("filterButton"),
    dropDownFilter: document.getElementById("dropDownFilter"),
    ascendingButton: document.getElementById("ascendingButton"),
    descendingButton: document.getElementById("descendingButton"),
    playerTableBody : document.getElementById("playerTableBody"),
    resetButton : document.getElementById("resetButton"),
    // This function is a helper function that prints out the filtered data in almost all the functions below
    // It is connected with the printFilteredDataHelper so it can iterate trough the data

    printPlayers : function (player) {
        this.playerTableBody.innerHTML += `
            <tr>
                    <td>${player.id} </td>
                    <td>${player.first_name} ${player.last_name}</td>
                    <td>${player.position}</td>
                    <td>${player.team.full_name}</td>
                    <td>${player.team.city}</td>
                    <td> <button onClick="nbaPlayerTableService.addPlayerToMyTeam('${player.id}')">Add to my team </button> </td>
            </tr>
        `;
    },
    printFilteredDataHelper : function (cachedData) {
        this.playerTableBody.innerHTML = "";
        for(const player of cachedData) {
            nbaFilterService.printPlayers(player);
        }
    },

    // This function takes the cachedData and calls the helper function above 
    // It is used to reset the table if the user wants to get back to the normal state 

    resetButtonRegisterListener : function (cachedData) {
        this.resetButton.addEventListener("click", function(){
            nbaFilterService.printFilteredDataHelper(cachedData);
        })
    },

    // This function checks all the players for the first and last name and then checks the input from the user
    // If the user input is the same as the full name from the object then it prints that out using the helper function above
    // If not then an error message is printed 

    filteredPlayer: function (players) {
        for (const player of players) {
            let fullName = `${player.first_name} ${player.last_name}`;
            let val = filterInput.value;
            if (val === fullName) {
                this.printPlayers(player);
                break;
            }
            else{
                this.playerTableBody.innerHTML = `<div style ="color: red"> <br/ >There is no player with that name please try again!</div>`;
            }
        }
    },
    // This function is used when the user clicks on the filter button and then prints the filtered user in the html or an error message

    filterInput: function (players) {
        this.filterButton.addEventListener("click", function () {
            nbaFilterService.playerTableBody.innerHTML = ``;
            nbaFilterService.filteredPlayer(players);
        });
    },
    // This is an individual filter for the position C and F of the dropDown it prints the players who play that position

    dropDownCFilter: function (players) {
        for (const player of players) {
            if (player.position === "C" || player.position === "C-F" || player.position === "C-G") {
                nbaFilterService.printPlayers(player);
            }
        }
    },
    // This is an individual filter for the position F and C of the dropDown it prints the players who play that position

    dropDownFFilter: function (players) {
        for (const player of players) {
            if (player.position === "F" || player.position === "F-C" || player.position === "F-G") {
                nbaFilterService.printPlayers(player);
            }
        }
    },
    // This is an individual filter for the position G and C of the dropDown it prints the players who play that position
    dropDownGFilter: function (players) {
        for (const player of players) {
            if (player.position === "G" || player.position === "G-C" || player.position === "G-F") {
                nbaFilterService.printPlayers(player);
            }
        }
    },
    // This is the event that checks which position in the dropDown has been clicked and then calls the functions above accordingly

    registerEventDropDown: function (players) {
        this.dropDownFilter.addEventListener("change", function (e) {
            if (e.target.value === "C") {
                nbaFilterService.playerTableBody.innerHTML = ``;
                nbaFilterService.dropDownCFilter(players);
            }
            else if (e.target.value === "F") {
                nbaFilterService.playerTableBody.innerHTML = ``;
                nbaFilterService.dropDownFFilter(players);
            }
            else if (e.target.value === "G") {
                nbaFilterService.playerTableBody.innerHTML = ``;
                nbaFilterService.dropDownGFilter(players);
            }
        });
    },

    // This function sorts the players by Ascending names (A to Z) and calls the helper function to print them accordingly

    filterByNameAscending: function (players) {
        this.playerTableBody.innerHTML = ``;
        let sortedAscending = players.sort((player1, player2) => {
            if (player1.first_name < player2.first_name) return -1;
            if (player1.first_name > player2.first_name) return 1;
            else return 0;
        });
        nbaFilterService.printFilteredDataHelper(sortedAscending)
    },

    // This function sorts the players by Descending names (Z to A) and calls the helper function to print them accordingly

    filterByNameDescending: function (players) {
        this.playerTableBody.innerHTML = ``;
        let sortedDescending = players.sort((player1, player2) => {
            if (player1.first_name > player2.first_name) return -1;
            if (player1.first_name < player2.first_name) return 1;
            else return 0;
        });
        nbaFilterService.printFilteredDataHelper(sortedDescending);
    }, 

    // This is the function that has the events for the filterByNameAscending and filterByNameDescending functions
    
    registerEventFilterByName: function (players) {
        nbaFilterService.ascendingButton.addEventListener("click", function () {
           nbaFilterService.filterByNameAscending(players);
        });
        nbaFilterService.descendingButton.addEventListener("click", function () {
           nbaFilterService.filterByNameDescending(players);
        });
    }
}
