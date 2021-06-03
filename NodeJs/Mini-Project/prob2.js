const csv = require('csv-parser'),
    fs = require('fs');


let seasonData = {};
let matchIDs = {}




fs.createReadStream('deliveries.csv')
    .pipe(csv())
    .on('data', data => {
        matchIDs[data.MATCH_ID] = matchIDs[data.MATCH_ID] || {}
        matchIDs[data.MATCH_ID][data['BATTING_TEAM']] = matchIDs[data.MATCH_ID][data['BATTING_TEAM']] || { 'count4': 0, 'count6': 0, 'total runs': 0 };
        matchIDs[data.MATCH_ID][data['BATTING_TEAM']]['count4'] += data.BATSMAN_RUNS === '4' ? 1 : 0;
        matchIDs[data.MATCH_ID][data['BATTING_TEAM']]['count6'] += data.BATSMAN_RUNS === '6' ? 1 : 0;
        matchIDs[data.MATCH_ID][data['BATTING_TEAM']]['total runs'] += parseInt(data.TOTAL_RUNS, 10);
    })
    .on('end', () => {
        fs.createReadStream('matches.csv')
            .pipe(csv())
            .on('data', data => {
                seasonData[data.SEASON] = seasonData[data.SEASON] || {};
                for (const teamName in matchIDs[data.MATCH_ID]) {
                    if (seasonData[data.SEASON].hasOwnProperty(teamName)) {
                        seasonData[data.SEASON][teamName]['count4'] += matchIDs[data.MATCH_ID][teamName]['count4'];
                        seasonData[data.SEASON][teamName]['count6'] += matchIDs[data.MATCH_ID][teamName]['count6'];
                        seasonData[data.SEASON][teamName]['total runs'] += matchIDs[data.MATCH_ID][teamName]['total runs'];
                    } else {
                        seasonData[data.SEASON][teamName] = matchIDs[data.MATCH_ID][teamName];
                    }
                }
            })
            .on('end', () => {
                resizeBy.json(seasonData);

            });
    });



