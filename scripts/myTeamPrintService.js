let MyPlayersService = {
    myTeamPlayerTable: document.getElementById("myTeamPlayerTable"),

    // This function parses the array data into an JavaScript object and then removes the player in the myTeam html

    removePlayerFromTeam: function (id) {
        let myTeamPlayers = JSON.parse(localStorage.getItem("players"));

        for (let player of myTeamPlayers) {
            if (player.id == id) {
                myTeamPlayers.splice(myTeamPlayers.findIndex(player => player.id == id), 1);
                localStorage.setItem("players", JSON.stringify(myTeamPlayers));
            }
        }
        MyPlayersService.printMyPlayers();
    },

    // This function prints out the myTeamPlayer Table 
    // It loads the data from the localstorage to the empty array then goes trough it and prints out the table
    
    printMyPlayers: function () {
        if (MyPlayersService.myTeamPlayerTable !== null) {
            MyPlayersService.myTeamPlayerTable.innerHTML = '';
            let myTeamPlayers = [];
            myTeamPlayers = JSON.parse(localStorage.getItem("players"));
            for (let player of myTeamPlayers) {
                MyPlayersService.myTeamPlayerTable.innerHTML += `
            <tr>
                    <td>${player.id} </td>
                    <td>${player.first_name} ${player.last_name}</td>
                    <td>${player.position}</td>
                    <td>${player.team.full_name}</td>
                    <td>${player.team.city}</td>
                    <td> <button onClick="MyPlayersService.removePlayerFromTeam('${player.id}')">Remove player</button> </td>
            </tr>
            `;
            }
        }
    },

}
MyPlayersService.printMyPlayers();