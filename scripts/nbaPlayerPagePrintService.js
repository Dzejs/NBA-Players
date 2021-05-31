const nbaPlayerTableService = {
    playerTableBody : document.getElementById("playerTableBody"),
    myTeamButton : document.getElementById("myTeamButton"),
    userNameSpan : document.getElementById("userNameSpan"),

    // This function prints all the players in the main table and all the buttons to add them to the myTeam html 
    // Also it calls the setUserName to get the users input and displays it on the page

    printPlayersInTable : function (cachedData) {
        this.setUserName();
        for(let player of cachedData) {
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
        }    
    },

    // This function gets the input from the user and displays it on the page as userName

    setUserName : function () {
       this.userNameSpan.innerHTML = `${localStorage.getItem("userName")}`;
    },

    // This function adds all the players the user wants to be in his dream team 
    // It parses the data from the localStorage to an JavaScrpt object then checks if the uses has added more than 12 players 
    // It also checks if the user has already added that player if he has he cant add the same player to the team

    addPlayerToMyTeam : function(id) {
        let myTeamPlayers = [];
        myTeamPlayers = JSON.parse(localStorage.getItem("players"));
        
        if (myTeamPlayers.length > 12) {
            alert("You cant pick more than 12 players");
        }
        else if (myTeamPlayers.some(player => player.id == id)) {
            alert("You have already chosen that player");
        }
        else {
            for (let player of ApiService.cachedData) {
                if (player.id == id) {
                    myTeamPlayers.push(player);
                    localStorage.setItem("players", JSON.stringify(myTeamPlayers));
                }
            }
        }
    },
    
    // This is the function with the event that takes us to the last html page 

    myTeamRedirect: function() {
        this.myTeamButton.addEventListener("click", function () {
            document.location = `../html/myTeam.html`;
        });
    }
}

nbaPlayerTableService.myTeamRedirect();