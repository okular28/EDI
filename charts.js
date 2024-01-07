let myChart=document.getElementById('chart').getContext('2d'); // getting the canvas id

// creating a chart with temporary data
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

// resetting the load animation onclick (deleting the class from the element and adding it again)
const element = document.getElementById('load');
function load(){
    element.classList.remove('load');
    void element.offsetWidth;
    element.classList.add('load');
}

// data fetching async function
async function fetchData() {
    const url = "https://my.api.mockaroo.com/ediproject.json?key=4ac89830";
    const response = await fetch(url);
    const dataPoints = await response.json();
    console.log(dataPoints);
    return dataPoints;
}
let lol = fetchData(); // assigning fetched data promise into a variable as an object

// function for updating the chart with new data (updateChart() is called upon refreshing the page and onclick on "Chart 1" button)
function updateChart(){
    lol.then(dataPoints => {
        let empNum = []; // temporary arrays for later use
        let compName = []; // temporary arrays for later use
        let tempData = stockChart.data; // assigning chart data into temporary variable (probably redundant)
        stockChart.destroy(); // deleting the chart
        stockChart = new Chart(myChart,{ // creating new chart and assigning data to it
            type: 'bar',
            data: tempData
        });
        stockChart.data.datasets[0]['data'] = []; // resetting data
        stockChart.data.datasets[0]['label'] = 'Number of employees - Top 10 '
        stockChart.data.labels = [];
        stockChart.data.datasets[0]['backgroundColor'] = [ // assigning colours to bars
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

        dataPoints.forEach(rec =>{ // using temporary arrays to store company names and numbers of employees
            compName.push(rec.company_name);
            empNum.push(rec.number_of_employees);
        })
        dataPoints.forEach( function (){ // for each company in our data find the biggest number of employees
            let empNumMax = Math.max.apply(Math, empNum);
            let indCompName = empNum.indexOf(empNumMax); // find the index of this number
            if (stockChart.data.labels.length < 10){ // push the number and company name into chart and delete data from temporary arrays 10x
                stockChart.data.datasets[0]['data'].push(empNumMax);
                stockChart.data.labels.push(compName[indCompName]);
                empNum.splice(indCompName, 1);
                compName.splice(indCompName, 1);
            }
        })
        stockChart.update(); // update chart data
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
        let sectors = {} // temporary auxiliary object
        dataPoints.forEach(rec =>{
            let x = JSON.stringify(rec.stock_market) // stringify stock market name
            if(!sectors.hasOwnProperty(x)){ // check if object has stock market name as a key
                sectors[x] = 1; // No, add it to object and set value to one
            } else {
                sectors[x] ++; // Yes, add 1 to value
            }
        })
        for (const [key, value] of Object.entries(sectors)) { // push data into chart
            stockChart.data.datasets[0]['data'].push(value);
            stockChart.data.labels.push(key.replace(/"/g,''));
        }
        console.log(sectors);
        stockChart.update(); // update
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
        dataPoints.forEach(rec =>{ // same principle as stock market function but for countries
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
        stockChart.update(); // update
    })
}

function tableCreator() { // function for creating table with fetched data
    lol.then(dataPoints => {
        const table = document.getElementById("table"); // get table element id
        const tableHeadings = Object.keys(dataPoints[0]); // get table heading from first object in our data
        let headingsRow = document.createElement("tr") // variable for creating headings tr element
        tableHeadings.forEach( heading =>{
            let cell = document.createElement("th") // variable for creating th element
            cell.innerText = `${heading}`; // insert each value from each object of our data into created cells
            cell.style.border = "1px solid #85c1e9";
            cell.style.padding = "5px";
            headingsRow.style.backgroundColor = "#85c1e9";
            headingsRow.style.color = "#555";
            headingsRow.appendChild(cell); // add heading cells to the row
            });
            table.appendChild(headingsRow); // add row to the table
        dataPoints.forEach(dataPointsObj =>{
            const tableRow = Object.values(dataPointsObj) // get values from each object
            let row = document.createElement("tr") // variable for creating tr element
            tableRow.forEach( tableCell =>{
                let cell = document.createElement("td") // variable for creating td element
                cell.innerText = `${tableCell}`; // insert each value from each object of our data into created cells
                cell.style.border = "1px solid #85c1e9";
                cell.style.color = "#555";
                cell.style.padding = "5px";
                row.style.border = "1px solid #85c1e9";
                row.appendChild(cell); // add cells to the row
            });
            table.appendChild(row); // add row to the table
        })
    })
}

updateChart(); // calling function to replace chart with temporary data to 1st chart with fetched data
tableCreator(); // call function to create table with fetched data