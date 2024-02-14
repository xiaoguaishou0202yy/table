hover = document.querySelector("#myDiv").insertAdjacentHTML('beforeend',"———————————————"); //add a hover above the table as a line of text
document.querySelector('#myDiv').style.color = 'gray'; //change the color of the hover to gray

//initialize function called when the script loads
function initialize(){
    cities();
};

var cityPop = [ //create a variable called cityPop to store the data of the table
	{ 
		city: 'Madison',
		population: 233209
	},
	{
		city: 'Milwaukee',
		population: 594833
	},
	{
		city: 'Green Bay',
		population: 104057
	},
	{
		city: 'Superior',
		population: 27244
	}
];

//function to create a table with cities and their populations
function cities(){

	//create the table element
	var table = document.createElement("table");

	//create a header row
	var headerRow = document.createElement("tr");

	//add the "City" column
	var cityHeader = document.createElement("th");
	cityHeader.innerHTML = "City";
	headerRow.appendChild(cityHeader);

	//add the "Population" column
	var popHeader = document.createElement("th");
	popHeader.innerHTML = "Population";
	headerRow.appendChild(popHeader);

	//add the row to the table
	table.appendChild(headerRow);

	//use a for loop to add a new row for each city
	for (var i = 0; i < cityPop.length; i++){
		var tr = document.createElement("tr");

		var city = document.createElement("td");
		city.innerHTML = cityPop[i].city; 
		tr.appendChild(city);

		var pop = document.createElement("td");
		pop.innerHTML = cityPop[i].population; 
		tr.appendChild(pop);

		table.appendChild(tr);
	};

	//add the table to the div in index.html
	var mydiv = document.getElementById("myDiv");
	mydiv.appendChild(table);
}

//call the initialize function when the window has loaded
window.onload = initialize();


//function to add city size column
function addColumns(cityPop){
    
    document.querySelectorAll("tr").forEach(function(row, i){ //querySelectorAll returns all objects that meet the selection criteria

    	if (i == 0){
    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>'); //typo; add 'City Size' to the header
    	} else {
    		var citySize; //add values to citySize variable based on population
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium'; //incorrect variable name, 'S' should be capitalized
    		} else {
    			citySize = 'Large';
    		};
			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>'); //just assign a string; method should be used here; lose a '>'; typo
		};
    });
};

//function to add mouseover and click events
function addEvents(){

	document.querySelector("table").addEventListener("mouseover", function(){		

		var color = "rgb(";
		for (var i=0; i<3; i++){ //random color
			var random = Math.round(Math.random() * 255);
			color += random; //"" make random a string 
			if (i<2){
				color += ",";			
			} else {
				color += ")";
		};
		document.querySelector("table").style.color = color; //miss ".style"; assign color to table
		}
	});

	//function to add click events
	function clickme(){
		alert('Hey, you clicked me!');
	};
	document.querySelector("table").addEventListener("click", clickme)
};

addColumns(cityPop); //call the addColumns function
addEvents(); //call the addEvents function


//define callback function
function debugCallback(response){
    document.querySelector("#myDiv").insertAdjacentHTML('beforeend', '<br>GeoJSON data:</br>' + JSON.stringify(response)); //myData is not defined in this function
};

function debugAjax(){ //define function to fetch data and handle it
    var myData

    //use Fetch to retrieve data from 'data/map.geojson'
    fetch('data/map.geojson') //fetch() request returns a full response object
        .then(function(response){
			return response.json(); //parse response as JSON
		})
		.then(function(response){
			myData = response; //store the parsed JSON response in myData variable
            console.log('This is the data:',myData) //log the data to the console 
			debugCallback(myData) //call debugCallback function 
		});

	console.log('This is undefined:', myData); //log 'undefined' to the console

};

window.onload = debugAjax; //call the debugAjax function when the window is fully loaded
