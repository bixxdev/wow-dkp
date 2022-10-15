var express = require('express');
var app = express();
const router = express.Router();
const path = require("path");
app.set("view engine", "ejs");

let dkpJson = require('./json/dkp.json');
dkpJson = dkpJson.standings.roster[0].standings.player;

let dkpArray = [];

dkpJson.forEach(player => {
    let shortJson = {
        name: player.name,
        points: player.points
    }

    dkpArray.push(shortJson);

    dkpArray = dkpArray.sort((a, b) => {
        if (a.points > b.points) {
          return -1;
        }
      });
});


app.route("/")
.get( (req,res) => {
    console.log("GET /");
    /** ejs */
    res.render('index', {
        players: dkpArray
    });
})

app.use('/', router)
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is up and running on port 3000.");
}) 