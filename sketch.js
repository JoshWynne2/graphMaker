let barCharts = [];
let internetData;
let cleanInternetData;

let energyData;
let cleanEnergyData;

let drivingData;
let cleanDrivingData;

let hospitalData;
let cleanHospitalData;

let populationData;
let cleanPopulationData;
function preload() {
	internetData = loadTable("data/2.csv", "csv", "header");

	energyData = loadTable("data/energyProduction.csv", "csv", "header");

	drivingData = loadTable("data/drivingTests.csv", "csv", "header");

	hospitalData = loadTable("data/hospitalAdmissions.csv", "csv", "header");

	populationData = loadTable("data/population.csv", "csv", "header");
}

function setup() {
	createCanvas(window.innerWidth * 1.5, window.innerHeight * 1.5);

	textAlign(LEFT, CENTER);
	angleMode(DEGREES);

	cleanEnergyData = energyData.rows.map((row) => row.obj);

	cleanDrivingData = drivingData.rows.map((row) => row.obj);

	cleanInternetData = internetData.rows.map((row) => row.obj);
	
	cleanHospitalData = hospitalData.rows.map((row) => row.obj);

	cleanPopulationData = populationData.rows.map((row) => row.obj);

	let hospitalDataIn = {
		data: cleanHospitalData,
		xValue: "Year",
		yValue: ["All socio-economic groups"],
		title: "People Admited to hospital by year",
	};

	let populationDataIn = {
		data: cleanPopulationData,
		xValue: "All ages",
		yValue: ["Population"],
		title: "Population of people aged 15 and over"
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
		title: "Limited Energy Production per Year",
	};

	let colourPallete1 = [["#15232d", "#ffffff"], "#000000", "#000000"];

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

	let chart3 = {
		type: ["vertical", "stacked", "scaled"],
		titlePadding: 25,
		titleSize: 24,
		chartWidth: 600,
		chartHeight: 286,
		xPos: 1364,
		yPos: 354,
		barWidth: 10,
		tickIncrement: 2000,
		tickPadding: 6,
		labelPadding: 3,
		labelTextSize: 15,
		labelRotation: 90,
		legendSize: 10,
		legendPadding: 29,
	};

	let awesomecolour = [
		["#FCA17D", "#DA627D", "#9A348E", "#25107B"],
		"#000000",
		"#000000",
	];

	let chart4 = {
		type: ["horizontal", "stacked", "scaled"],
		titlePadding: 25,
		titleSize: 24,
		chartWidth: 700,
		chartHeight: 361,
		xPos: 200,
		yPos: 1229,
		barWidth: 40,
		tickIncrement: 100000,
		tickPadding: 15,
		labelPadding: 11,
		labelTextSize: 19,
		labelRotation: 0,
		legendSize: 26,
		legendPadding: 29,
	};

	barCharts.push(new BarChart(hospitalDataIn, hospitalTemplate, awesomecolour));
	barCharts.push(new BarChart(energyDataIn, energyTemplate, awesomecolour));
	barCharts.push(new BarChart(energyDataIn2, energy2template, awesomecolour));
	barCharts.push(new BarChart(hospitalDataIn, chart3, awesomecolour));
	barCharts.push(new BarChart(internetDataIn, topLeft, awesomecolour));
	barCharts.push(new BarChart(populationDataIn, chart4, awesomecolour));
}

function draw() {
	background("#f9dbbd");
	barCharts.forEach((bar) => bar.render());
}
