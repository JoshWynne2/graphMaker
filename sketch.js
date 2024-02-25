let barCharts = [];
let data;
let cleanData = [];

let heightData;
let cleanHeightData;

let internetData;
let cleanInternetData;

let energyData;
let cleanEnergyData;

let drivingData;
let cleanDrivingData;
let hospitalData;
let cleanHospitalData;
function preload() {
	data = loadTable("data/combined.csv", "csv", "header");

	heightData = loadTable("data/Height.csv", "csv", "header");

	internetData = loadTable("data/2.csv", "csv", "header");

	energyData = loadTable("data/energyProduction.csv", "csv", "header");

	drivingData = loadTable("data/drivingTests.csv", "csv", "header");
	hospitalData = loadTable("data/hospitalAdmissions.csv", "csv", "header");
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	textAlign(LEFT, CENTER);
	angleMode(DEGREES);

	cleanData = data.rows.map((row) => row.obj);

	cleanEnergyData = energyData.rows.map((row) => row.obj);

	cleanDrivingData = drivingData.rows.map((row) => row.obj);

	cleanInternetData = internetData.rows.map((row) => row.obj);
	cleanHospitalData = hospitalData.rows.map((row) => row.obj);

	let hospitalDataIn = {
		data: cleanHospitalData,
		xValue: "Year",
		yValue: ["All socio-economic groups"],
		title: "People Admited to hospital by year",
	};
	let internetDataIn = {
		data: cleanInternetData,
		xValue: "LABEL",
		yValue: ["Small (10 to 49)", "Medium (50 to 249)", "Large (250 or more)"],
		title: "% of Enterprises Internet Speed",
	};

	let drivingDataIn = {
		data: cleanDrivingData,
		xValue: "Age Group",
		yValue: ["Driving Tests Passed (Number)", "Driving Tests Failed (Number)"],
		title: "WOW",
	};

	let energyDataIn = {
		data: cleanEnergyData,
		xValue: "Year",
		yValue: [
			"Natural gas",
			"Sum of all peat products",
			"Sum of all renewable energies",
			"Wind",
			"Hydro",
			"Biomass",
			// "Landfill gas",
			// "Biogas",
			// "Liquid Biofuel",
			// "Solar",
			// "Geothermal",
			// "Non renewable waste",
		],
		title: "Energy Production per Year",
	};

	let energyDataIn2 = {
		data: cleanEnergyData,
		xValue: "Year",
		yValue: [
			"Natural gas",
			"Sum of all peat products",
			"Sum of all renewable energies",
		],
		title: "Energy Production per Year",
	};

	let colourPallete1 = [
		["#15232d", "#ffffff", "#000000", "#000000"],
		"#000000",
		"#000000",
	];

	let excelPallete = [
		["#5b9bd5", "#70ae47", "#fdcc03", "#f90402", "#7030a0", "#002060"],
		"#202020",
		"#000000",
	];

	let hospitalTemplate = {
		type: ["vertical", "line"],
		titlePadding: 25,
		titleSize: 18,
		chartWidth: 220,
		chartHeight: 300,
		xPos: 1130,
		yPos: 750,
		barWidth: 14,
		tickIncrement: 2000,
		tickPadding: 5,
		labelPadding: 10,
		labelTextSize: 13,
		labelRotation: 90,
		legendSize: 17,
		legendPadding: 24,
	};

	let energyTemplate = {
		type: ["vertical", "stacked", "100%"],
		titlePadding: 25,
		titleSize: 24,
		chartWidth: 660,
		chartHeight: 307,
		xPos: 100,
		yPos: 750,
		barWidth: 20,
		tickIncrement: 10,
		tickPadding: 10,
		labelPadding: 10,
		labelTextSize: 20,
		labelRotation: 90,
		legendSize: 18,
		legendPadding: 30,
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
		xPos: 850,
		yPos: 346,
		barWidth: 17,
		tickIncrement: 10,
		tickPadding: 10,
		labelPadding: 4,
		labelTextSize: 15,
		labelRotation: 0,
		legendSize: 17,
		legendPadding: 20,
	};

	let energy2template = {
		type: ["vertical", "stacked", "scaled"],
		titlePadding: 25,
		titleSize: 24,
		chartWidth: 330,
		chartHeight: 201,
		xPos: 100,
		yPos: 354,
		barWidth: 10,
		tickIncrement: 300,
		tickPadding: 10,
		labelPadding: 3,
		labelTextSize: 11,
		labelRotation: 90,
		legendSize: 10,
		legendPadding: 18,
	};

	barCharts.push(new BarChart(internetDataIn, topLeft, excelPallete));
	barCharts.push(new BarChart(hospitalDataIn, hospitalTemplate, excelPallete));
	barCharts.push(new BarChart(energyDataIn, energyTemplate, excelPallete));
	barCharts.push(new BarChart(energyDataIn2, energy2template, excelPallete));
}

function draw() {
	background(175);
	barCharts.forEach((bar) => bar.render());
}
