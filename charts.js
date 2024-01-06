let myChart=document.getElementById('chart').getContext('2d');

let stockChart = new Chart(myChart, {
    type:'bar', //bar, horizizontalBar, pie, line, doughnut, radar, polarArea
    data:{
        labels:[],
        datasets:[{
            label:'Number of employees - Top 10 ',
            data:[
            ],
            backgroundColor:[
                '#050f16',
                '#0a1e2c',
                '#102e42',
                '#153d58',
                '#1a4c6e',
                '#1f5b83',
                '#246a99',
                '#2a7aaf',
                '#2f89c5',
                '#3498db',
                '#48a2df',
                '#5dade2',
                '#71b7e6',
                '#85c1e9'
            ],
            hoverOffset:4
        }]
    },
    options:{}
});

const element = document.getElementById('load')
function load(){
    element.classList.remove('load');
    void element.offsetWidth;
    element.classList.add('load');
}

async function fetchData() {
    const url = "https://my.api.mockaroo.com/ediproject.json?key=4ac89830";
    const response = await fetch(url);
    const dataPoints = await response.json();
    console.log(dataPoints);
    return dataPoints;
}
let lol = fetchData();

function updateChart(){
    lol.then(dataPoints => {
        let empNum = [];
        let compName = [];
        let tempData = stockChart.data;
        stockChart.destroy();
        stockChart = new Chart(myChart,{
            type: 'bar',
            data: tempData
        });
        stockChart.data.datasets[0]['data'] = [];
        stockChart.data.datasets[0]['label'] = 'Number of employees - Top 10 '
        stockChart.data.labels = [];
        stockChart.data.datasets[0]['backgroundColor'] = [
            '#050f16',
            '#0a1e2c',
            '#102e42',
            '#153d58',
            '#1a4c6e',
            '#1f5b83',
            '#246a99',
            '#2a7aaf',
            '#2f89c5',
            '#3498db',
            '#48a2df',
            '#5dade2',
            '#71b7e6',
            '#85c1e9'
        ];

        dataPoints.forEach(rec =>{
            compName.push(rec.company_name);
            empNum.push(rec.number_of_employees);
        })
        dataPoints.forEach(rec =>{
            let empNumMax = Math.max.apply(Math, empNum);
            let indCompName = empNum.indexOf(empNumMax);
            if (stockChart.data.labels.length < 10){
                stockChart.data.datasets[0]['data'].push(empNumMax);
                stockChart.data.labels.push(compName[indCompName]);
                empNum.splice(indCompName, 1);
                compName.splice(indCompName, 1);
            }
        })
        stockChart.update();
    })
}
function updateChart2(){
    lol.then(dataPoints => {
        let tempData = stockChart.data;
        stockChart.destroy();
        stockChart = new Chart(myChart,{
            type: 'doughnut',
            data: tempData
        });
        stockChart.data.datasets[0]['data'] = [];
        stockChart.data.datasets[0]['label'] = 'Number of companies in each stock sector '
        stockChart.data.labels = [];
        stockChart.data.datasets[0]['backgroundColor'] = [
            '#85c1e9',
            '#050f16'
        ];
        let sectors = {}
        dataPoints.forEach(rec =>{
            let x = JSON.stringify(rec.stock_market)
            if(!sectors.hasOwnProperty(x)){
                sectors[x] = 1;
            } else {
                sectors[x] ++;
            }
        })
        for (const [key, value] of Object.entries(sectors)) {
            stockChart.data.datasets[0]['data'].push(value);
            stockChart.data.labels.push(key.replace(/"/g,''));
        }
        console.log(sectors);
        stockChart.update();
    })
}

function updateChart3(){
    lol.then(dataPoints => {
        let tempData = stockChart.data;
        stockChart.destroy();
        stockChart = new Chart(myChart,{
            type: 'bar',
            data: tempData
        });
        stockChart.data.datasets[0]['data'] = [];
        stockChart.data.datasets[0]['label'] = 'Number of companies in each country '
        stockChart.data.labels = [];
        stockChart.data.datasets[0]['backgroundColor'] = [
            '#050f16',
            '#0a1e2c',
            '#102e42',
            '#153d58',
            '#1a4c6e',
            '#1f5b83',
            '#246a99',
            '#2a7aaf',
            '#2f89c5',
            '#3498db',
            '#48a2df',
            '#5dade2',
            '#71b7e6',
            '#85c1e9',
            '#71b7e6',
            '#5dade2',
            '#48a2df',
            '#3498db',
            '#2f89c5',
            '#2a7aaf',
            '#246a99',
            '#1f5b83',
            '#1a4c6e',
            '#153d58',
            '#102e42',
            '#0a1e2c',
            '#050f16',
        ];
        let countries = {}
        dataPoints.forEach(rec =>{
            let x = JSON.stringify(rec.country)
            if(!countries.hasOwnProperty(x)){
                countries[x] = 1;
            } else {
                countries[x] ++;
            }
        })
        for (const [key, value] of Object.entries(countries)) {
            stockChart.data.datasets[0]['data'].push(value);
            stockChart.data.labels.push(key.replace(/"/g,''));
        }
        console.log(countries);
        stockChart.update();
    })
}

function tableCreator() {
    lol.then(dataPoints => {
        const table = document.getElementById("table");
        const tableHeadings = Object.keys(dataPoints[0]);
        tableHeadings.forEach( heading =>{
            const headingCell = `<th>${heading}</th>`
            document.querySelector('tr').insertAdjacentHTML('beforeend', headingCell);
        })
        dataPoints.forEach(dataPointsObj =>{
            const tableRow = Object.values(dataPointsObj)
            let row = document.createElement("tr")
            tableRow.forEach( tableCell =>{
                let cell = document.createElement("td")
                cell.innerText = `${tableCell}`;
                row.appendChild(cell);
            });
            table.appendChild(row);
        })
    })
}

updateChart();
tableCreator();