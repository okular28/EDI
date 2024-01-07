// fetch('curl -H "X-API-Key: 4ac89830" https://my.api.mockaroo.com/ediproject.json')
// console.log(fetch('https://my.api.mockaroo.com/ediproject.json?key=4ac89830'))
// async function logData() {
//     const response = await fetch("https://my.api.mockaroo.com/ediproject.json?key=4ac89830");
//     const data = await response.json();
//     console.log(data);
// }
//
// logData()

fetch("https://my.api.mockaroo.com/ediproject.json?key=4ac89830")
    .then(res => {
        return res.json();
    })
    .then(data => {
        data.forEach(companies => {
            const markup = `<ul>${companies.company_name}</ul>`;

            document.querySelector('ul').insertAdjacentHTML("beforeend", markup)
        })
        console.log(data[15])
        console.log(data)
    })
    .catch(error => console.log(error))

<script>
fetch("https://my.api.mockaroo.com/ediproject.json?key=4ac89830")
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data)
        let dataChart1 = []
        let myChart=document.getElementById('stock_chart').getContext('2d');

        let stockChart = new Chart(myChart, {
            type:'doughnut', //bar, horizizontalBar, pie, line, doughnut, radar, polarArea
            data:{
                labels:[],
                datasets:[{
                    label:'Number of employees - Top 10 ',
                    data:[
                        // data[0].stock_market_capitalization,
                        // data[1].stock_market_capitalization,
                        // data[2].stock_market_capitalization,
                        // data[3].stock_market_capitalization,
                        // data[4].stock_market_capitalization,
                        // data[5].stock_market_capitalization,
                        // data[6].stock_market_capitalization,
                        // data[7].stock_market_capitalization,
                        // data[8].stock_market_capitalization,
                        // data[9].stock_market_capitalization

                    ],
                    backgroundColor:[
                        'rgba(224, 75, 90)',
                        'rgba(228, 151, 86)',
                        'rgba(91, 48, 90)',
                        'rgba(154, 76, 104)',
                        '#3277DB',
                        'rgba(41, 48, 90)',
                        'rgba(41, 118, 90)',
                        'rgba(41, 48, 160)',
                        'rgba(41, 248, 90)',
                        'rgba(41, 148, 90)',
                    ],
                    hoverOffset:4
                }]
            },
            options:{}
        });
        // for (const value in data) {
        //     if (data.hasOwnProperty(company_name)) {
        //         stockChart.data.labels.push(`${company_name[value]}`);
        //     }
        // }
        for(let i = 0; i < 10; i++){
            stockChart.data.labels.push(data[i].company_name);
            // stockChart.data.datasets[0].push(data[i].number_of_employees);
            // dataChart1.push(data[i].stock_market_capitalization);
            dataChart1.push(data[i].number_of_employees);
            // console.log(data[i].number_of_employes)
        }

        // data.forEach(companies => {
        //     stockChart.data.labels.push(companies.company_name);
        //     dataChart1.push(companies.stock_market_capitalization);
        //     dataChart1.push(15);
        // })
        stockChart.data.datasets[0]['data'] = dataChart1;
        console.log(stockChart.data.datasets[0]['data'])
        console.log(stockChart.data.labels)
    })
    .catch(error => console.log(error))
</script>

// write JSON string to a file
function download(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
download(JSON.stringify(data), 'json.txt', 'text/plain');