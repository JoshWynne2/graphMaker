let barCharts = [];
let data;
let cleanData = [];
let numRows;

function preload() {
	data = loadTable("data/combined.csv", "csv", "header");
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	
	textAlign(LEFT, CENTER);
	angleMode(DEGREES);

	numRows = data.rows.length;
	// for(let i=0;i<numRows;i++){
	//     cleanData.push(data.rows[i].obj)
	// }

	cleanData = data.rows.map((row) => row.obj);
	console.log(cleanData);

	let colourPallete1 = [
		["#15232d","#ffffff","#000000","#000000"],
		"#000000",
		"#000000"
	];

	let excelPallete = [
		["#5b9bd5","#70ae47","#fdcc03","#f90402"],
		"#202020",
		"#000000"
	];

	let roadData = {
		data:cleanData,
		xValue: "Age_Group",
		yValue: ["Male", "Female"]
	}

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

	// barCharts.push(new BarChart(cleanData,80,80,50,350,"#ff0000"));
	barCharts.push(new BarChart(roadData, barChart01, excelPallete, true));
	// barCharts.push(new BarChart(cleanData, 200, 200, 250, 450, "#d9d9d9"));
	// barCharts.push(new BarChart(cleanData,400,400,50,450,"#d9d9d9"))
}

function draw() {
	background("#cecece");
	barCharts.forEach((bar) => bar.render());
}
