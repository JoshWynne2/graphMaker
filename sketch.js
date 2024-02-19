let barCharts = [];
let data;
let cleanData = [];
let numRows;

function preload() {
	data = loadTable("data/combined.csv", "csv", "header");
}

function setup() {
	createCanvas(800, 800);
	
	textAlign(LEFT, CENTER);
	angleMode(DEGREES);

	numRows = data.rows.length;
	// for(let i=0;i<numRows;i++){
	//     cleanData.push(data.rows[i].obj)
	// }

	cleanData = data.rows.map((row) => row.obj);
	console.log(cleanData);

	let barChart01 = {
		data: cleanData,
		type: ["vertical", "grouped", "scaled"],
		yValue: ["Male", "Female"],
		xValue: "Age_Group",
		chartWidth: 400,
		chartHeight: 350,
		xPos: 250,
		yPos: 400,
		barWidth: 20,
		barColours: ["#193449", "#38586f"],
		axisLineColour: "#282828",
		tickIncrement: 5,
		labelTextSize: 20,
		labelPadding: 10,
		labelRotation: 0,
		labelColour: "#000000",
		legendSize: 20,
	};

	// barCharts.push(new BarChart(cleanData,80,80,50,350,"#ff0000"));
	barCharts.push(new BarChart(barChart01, true));
	// barCharts.push(new BarChart(cleanData, 200, 200, 250, 450, "#d9d9d9"));
	// barCharts.push(new BarChart(cleanData,400,400,50,450,"#d9d9d9"))
}

function draw() {
	background(175);
	barCharts.forEach((bar) => bar.render());
}
