const csv = require('csv-parser'),
    fs = require('fs');


let seasonData = {};
let matchIDs = {}

fs.createReadStream('deliveries.csv')
    .pipe(csv())
    .on('data', data => {
        matchIDs[data.MATCH_ID] = matchIDs[data.MATCH_ID] || {}
        matchIDs[data.MATCH_ID][data.BOWLER] = matchIDs[data.MATCH_ID][data.BOWLER] || { balls: 0, 'total runs': 0 };
        matchIDs[data.MATCH_ID][data.BOWLER].balls++;
        matchIDs[data.MATCH_ID][data.BOWLER]['total runs'] += parseInt(data.TOTAL_RUNS, 10) - parseInt(data.BYE_RUNS, 10) - parseInt(data.LEGBYE_RUNS, 10);
    })
    .on('end', () => {
        fs.createReadStream('matches.csv')
            .pipe(csv())
            .on('data', data => {
                seasonData[data.SEASON] = seasonData[data.SEASON] || {};
                for (const bowlerName in matchIDs[data.MATCH_ID]) {
                    if (seasonData[data.SEASON].hasOwnProperty(bowlerName)) {
                        seasonData[data.SEASON][bowlerName]['balls'] += matchIDs[data.MATCH_ID][bowlerName]['balls'];
                        seasonData[data.SEASON][bowlerName]['total runs'] += matchIDs[data.MATCH_ID][bowlerName]['total runs'];
                    } else {
                        seasonData[data.SEASON][bowlerName] = matchIDs[data.MATCH_ID][bowlerName];
                    }
                }
            })
            .on('end', () => {
                for(let season in seasonData){ {
                    let temp = [];
                    for(let bowlerName in seasonData[season]){
                        seasonData[season][bowlerName].economy = parseInt((parseInt(seasonData[season][bowlerName]['total runs'], 10) * 600)/parseInt(seasonData[season][bowlerName]['balls']),10)/100;
                        temp.push([bowlerName, seasonData[season][bowlerName]])
                    }
                    seasonData[season] = temp;
                }};
                res.json(seasonData)
            });

    });


