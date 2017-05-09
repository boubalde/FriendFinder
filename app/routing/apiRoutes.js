// ===============================================================================
var friends     = require('../data/friends.js');
var path            = require('path');

// API GET Requests - when users "visit" a page. 
// (ex:localhost:PORT/api/admin...they are shown a JSON of the data in the table) 

var friendDifference = 0;

module.exports = function(app){
    app.get('/api/friends', function(req, res){
        res.json(friends);
    });

    // app.get("/api/tables", function (req, res) {
    //     res.json(tableData);
    // });


app.post('/api/friends', function(req, res){

        var greatMatch = {
            name: "",
            image: "",
            matchDifference: 500
        };
        var hunterData     = req.body;
        var hunterName     = hunterData.name;
        var hunterImage    = hunterData.image;
        var hunterScores   = hunterData.scores;

        var totalDifference = 0;

        //loop through the friends data array of objects to get each friends scores
        var friendsSize = friends.length- 1;
        for(var i = 0; i < friendsSize; i++){
            console.log(friends[i].name);
            totalDifference = 0;

            //loop through that friends score and the users score and calculate the 
            // absolute difference between the two and push that to the total difference variable set above
            for(var j = 0; j < 10; j++){
                // We calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(hunterScores[j]) - parseInt(friends[i].scores[j]));
                // If the sum of differences is less then the differences of the current "best match"
                if (totalDifference <= greatMatch.matchDifference){

                    // Reset the bestMatch to be the new friend. 
                    greatMatch.name = friends[i].name;
                    greatMatch.photo = friends[i].photo;
                    greatMatch.matchDifference = totalDifference;
                }
            }
        }

        friends.push(hunterData);
 
        res.json(greatMatch);
    });
};