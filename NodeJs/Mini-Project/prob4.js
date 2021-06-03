const csv = require('csv-parser'),
    fs = require('fs');


let seasonData = {};
let matchIDs = {}




fs.createReadStream('deliveries.csv')
    .pipe(csv())
    .on('data', data => {

        matchIDs[data.MATCH_ID] = matchIDs[data.MATCH_ID] || {}
        matchIDs[data.MATCH_ID][data.BATTING_TEAM] = matchIDs[data.MATCH_ID][data.BATTING_TEAM] || {'balls faced':0, 'runs scored':0, 'balls bowled': 0, 'runs conceeded': 0};
        matchIDs[data.MATCH_ID][data.BATTING_TEAM]['balls faced']++;
        matchIDs[data.MATCH_ID][data.BATTING_TEAM]['runs scored'] += parseInt(data.TOTAL_RUNS, 10);

        matchIDs[data.MATCH_ID][data.BOWLING_TEAM] = matchIDs[data.MATCH_ID][data.BOWLING_TEAM] || {'balls faced':0, 'runs scored':0, 'balls bowled': 0, 'runs conceeded': 0};
        matchIDs[data.MATCH_ID][data.BOWLING_TEAM]['balls bowled']++;
        matchIDs[data.MATCH_ID][data.BOWLING_TEAM]['runs conceeded'] += parseInt(data.TOTAL_RUNS, 10);

    })
    .on('end', () => {
        fs.createReadStream('matches.csv')
            .pipe(csv())
            .on('data', data => {
                seasonData[data.SEASON] = seasonData[data.SEASON] || {};
                for(const team in matchIDs[data.MATCH_ID]){
                    // console.log(matchIDs[data.MATCH_ID][team])
                    seasonData[data.SEASON][team] = seasonData[data.SEASON][team] || {'balls faced':0, 'runs scored':0, 'balls bowled': 0, 'runs conceeded': 0};
                    seasonData[data.SEASON][team]['balls faced'] +=  matchIDs[data.MATCH_ID][team]['balls faced']
                    seasonData[data.SEASON][team]['runs scored'] +=  matchIDs[data.MATCH_ID][team]['runs scored']
                    seasonData[data.SEASON][team]['balls bowled'] +=  matchIDs[data.MATCH_ID][team]['balls bowled']
                    seasonData[data.SEASON][team]['runs conceeded'] +=  matchIDs[data.MATCH_ID][team]['runs conceeded']
                }
                
                
            })
            .on('end', () => {
                for(const season in seasonData){
                    let highestRR = 0;
                    let winner = '';
                    for(const team in seasonData[season]){
                        let crr = (seasonData[season][team]['runs scored']*6/seasonData[season][team]['balls faced']) - (seasonData[season][team]['runs conceeded']*6/seasonData[season][team]['balls bowled'])
                        if(crr > highestRR){
                            highestRR = crr;
                            winner = team;
                        }
                    }
                    seasonData[season] = {netRunRate: highestRR, team: winner}
                }
                res.json(seasonData)

            });
    });



