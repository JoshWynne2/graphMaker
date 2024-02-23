let barCharts = [];
let data;
let cleanData = [];

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

	cleanData = data.rows.map((row) => row.obj);

	cleanHeightData = heightData.rows.map((row) => row.obj);

	cleanHeightData = cleanHeightData.filter((row) => row.Year == "2022");

	cleanHeightData.map((row) => {
		row[row.Sex] = row.VALUE;
	});

	console.log(cleanHeightData);

	cleanInternetData = internetData.rows.map((row) => row.obj);

	let internetDataIn = {
		data: cleanInternetData,
		xValue: "LABEL",
		yValue: ["Small (10 to 49)", "Medium (50 to 249)", "Large (250 or more)"],
		title: "% of Enterprises Internet Speed",
	};

	let heightDataIn = {
		data: cleanHeightData,
		xValue: "Country of Birth",
		yValue: ["Male", "Female"],
		title: "Average Height by Country",
	};

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

	let downloadTemplate = {
		type: ["horizontal", "grouped", "scaled"],
		titlePadding: 5,
		titleSize: 30,
		chartWidth: 367,
		chartHeight: 311,
		xPos: 597,
		yPos: 600,
		barWidth: 20,
		tickIncrement: 10,
		tickPadding: 22,
		labelPadding: 5,
		labelTextSize: 20,
		labelRotation: 0,
		legendSize: 15,
		legendPadding: 20,
	};

	let topRight = {
		type: ["horizontal", "grouped", "scaled"],
		titlePadding: 25,
		titleSize: 24,
		chartWidth: 220,
		chartHeight: 283,
		xPos: 1041,
		yPos: 346,
		barWidth: 17,
		tickIncrement: 10,
		tickPadding: 22,
		labelPadding: 10,
		labelTextSize: 20,
		labelRotation: 0,
		legendSize: 17,
		legendPadding: 20,
	};

	let topLeft = {
		type: ["horizontal", "grouped", "scaled"],
		titlePadding: 25,
		titleSize: 24,
		chartWidth: 220,
		chartHeight: 283,
		xPos: 141,
		yPos: 346,
		barWidth: 17,
		tickIncrement: 10,
		tickPadding: 22,
		labelPadding: 10,
		labelTextSize: 20,
		labelRotation: 0,
		legendSize: 17,
		legendPadding: 20,
	};

	barCharts.push(new BarChart(internetDataIn, downloadTemplate, excelPallete, true));
	barCharts.push(new BarChart(internetDataIn, topLeft, excelPallete));
	barCharts.push(new BarChart(internetDataIn, topRight, excelPallete));
}

function draw() {
	background("#cecece");
	barCharts.forEach((bar) => bar.render());
}
