let barCharts = [];
let data;
let cleanData = [];
let numRows;

let heightData;
let cleanHeightData;

let internetData;
let cleanInternetData;

function preload() {
	data = loadTable("data/combined.csv", "csv", "header");

	heightData = loadTable("data/Height.csv", "csv", "header");

	internetData = loadTable("data/2.csv", "csv", "header");
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	textAlign(LEFT, CENTER);
	angleMode(DEGREES);

	numRows = data.rows.length;

	cleanData = data.rows.map((row) => row.obj);

	cleanHeightData = heightData.rows.map((row) => row.obj);

	cleanHeightData = cleanHeightData.filter((row) => row.Year == "2022");

	cleanHeightData.map((row) => {
		row[row.Sex] = row.VALUE;
	});

	console.log(cleanHeightData);

	/*
		what I want height data to look like

		{
			Country of birth: data.country of birth
			Male: data.VALUE
			Female: data.VALUE
			Total: data.VALUE
		}

		they need to be merged
	*/

	// internet

	cleanInternetData = internetData.rows.map((row) => row.obj);
	/*
		I want it to look like this
		{
			Statistic Label: "Speed of 100mb or less",
			All Enterprises: 28.3,
			Small: 30.1,
			Medium: 20.4,
			Large: 16.5
		}
		This is split within 4 rows of the csv
		Ive just made it like this in excel I don't care 

	*/
	let internetDataIn = {
		data: cleanInternetData,
		xValue: "LABEL",
		yValue: ["Small (10 to 49)", "Medium (50 to 249)", "Large (250 or more)"],
	};
	// "Small (10 to 49)"","Medium (50 to 249)"","Large (250 or more)"
	let colourPallete1 = [
		["#15232d", "#ffffff", "#000000", "#000000"],
		"#000000",
		"#000000",
	];

	let excelPallete = [
		["#5b9bd5", "#70ae47", "#fdcc03", "#f90402"],
		"#202020",
		"#000000",
	];

	let roadData = {
		data: cleanData,
		xValue: "Age_Group",
		yValue: ["Male", "Female"],
	};

	let heightDataIn = {
		data: cleanHeightData,
		xValue: "Country of Birth",
		yValue: ["Male", "Female"],
	};
	let barChart01 = {
		type: ["horizontal", "stacked", "100%"],
		chartWidth: 215,
		chartHeight: 350,
		xPos: 450,
		yPos: 600,
		barWidth: 20,
		tickIncrement: 5,
		tickPadding: 20,
		labelTextSize: 20,
		labelPadding: 5,
		labelRotation: 0,
		legendSize: 15,
		legendPadding: 20,
	};

	barCharts.push(new BarChart(internetDataIn, barChart01, excelPallete, true));
}

function draw() {
	background("#cecece");
	barCharts.forEach((bar) => bar.render());
}
