
const csv = require('csv-parser'),
    fs = require('fs');


let results = [];

fs.createReadStream('matches.csv')
    .pipe(csv())
    .on('data', (data) => {
        if (['2016', '2017'].includes(data.SEASON) && data.TOSS_DECISION === 'field') {
            results.push(data);
        }
    })
    .on('end', () => {
        results = results.reduce((acc, obj) => {
            const property = obj['SEASON'];
            acc[property] = acc[property] || [];
            acc[property].push(obj.TOSS_WINNER)
            return acc;
        }, {})
        for (prop in results) {
            var counts = {};
            let countArray = []
            for (var i = 0; i < results[prop].length; i++) {
                counts[results[prop][i]] = 1 + (counts[results[prop][i]] || 0);
            }
            results[prop] = {};
            Object.keys(counts).forEach(value => { countArray.push([value, counts[value]]) });
            countArray = countArray.sort((a, b) => a[0] < b[0] ? 1 : -1).slice(0, 4);
            countArray.forEach((item, index) => {
                results[prop][index] = item;
            })
        }
        results.json(results)
    });



