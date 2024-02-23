class BarChart {
	constructor(dataIn, template, colourPallete, dev = false) {
		this.data = dataIn.data;
		
		this.title = dataIn.title;
		this.titleSize = template.titleSize;
		this.titlePadding = template.titlePadding;

		this.type = template.type;
		/*
			type is an ENUM of the following combination of names as strings:
				vertical/horizontal
				group/stacked
				scaled/100%

			this is the default set:
				["vertical", "stacked", "scaled"]

			if type.includes("vertical"){
				default
			} else {
				blow your head off
			}
		*/

		this.yValue = dataIn.yValue;
		// yValue is an array containing the names of each datapoint in the row
		this.xValue = dataIn.xValue;

		this.chartWidth = template.chartWidth;
		this.chartHeight = template.chartHeight;
		this.xPos = template.xPos;
		this.yPos = template.yPos;

		this.barWidth = template.barWidth;
		this.barColours = colourPallete[0];
		this.axisLineColour = colourPallete[1];

		this.labelColour = colourPallete[2];
		this.labelTextSize = template.labelTextSize;
		this.labelPadding = template.labelPadding;
		this.labelRotation = template.labelRotation;

		this.tickIncrement = template.tickIncrement;
		this.legendSize = template.legendSize;
		this.legendPadding = template.legendPadding;
		this.tickPadding = template.tickPadding;

		this.labels = this.data.map((d) => d[this.xValue]);
		console.log(this.labels);

		this.gap = 0;

		this.dataMax = 0;
		this.dataMaxs = [];


		if (this.type.includes("grouped")) {
				
			// adds the max value of each column to datamaxs array
			for (let i = 0; i < this.yValue.length; i++) {
				this.dataMaxs.push(max(this.data.map((row) => +row[this.yValue[i]])));
			}
			// if its grouped you only need the highest already set in
			this.dataMax = max(this.dataMaxs);
		} else {
			// the array will only have as many entries as yvalues being passed in
			// add the max number of each column together
			for (let i = 0; i < this.data.length; i++) {
				let total = 0;
				for (let j = 0; j < this.yValue.length; j++) {
					total += this.data[i][this.yValue[j]];
				}
				this.dataMaxs.push(total);
			}

			this.dataMax = max(this.dataMaxs);
		}

		// increases datamax so its divisable by the tick increment
		this.adjDataMax = this.calcAdjDataMax(this.dataMax, this.tickIncrement);

		this.scale;

		if (this.type.includes("100%")) {
			this.adjDataMax = 100;
		}

		if (dev) {
			this.dev = true;

			this.type1Select = createSelect();
			this.type1Select.position(10, 50);
			this.type1Select.option("vertical");
			this.type1Select.option("horizontal");
			this.type2Select = createSelect();
			this.type2Select.position(110, 50);
			this.type2Select.option("stacked");
			this.type2Select.option("grouped");
			this.type3Select = createSelect();
			this.type3Select.position(210, 50);
			this.type3Select.option("scaled");
			this.type3Select.option("100%");

			this.chartWidthSlider = createSlider(150, 600, this.chartWidth, 1);
			this.chartWidthSlider.position(10, 100);
			this.chartHeightSlider = createSlider(150, 600, this.chartHeight, 1);
			this.chartHeightSlider.position(10, 150);

			this.xPosSlider = createSlider(0, width, this.xPos, 1);
			this.xPosSlider.position(10, 200);
			this.yPosSlider = createSlider(0, height, this.yPos, 1);
			this.yPosSlider.position(10, 250);

			this.barWidthSlider = createSlider(10, 100, this.barWidth, 1);
			this.barWidthSlider.position(10, 300);

			this.tickIncrementSlider = createSlider(1, 25, this.tickIncrement, 1);
			this.tickIncrementSlider.position(10, 350);
			this.tickPaddingSlider = createSlider(0, 50, this.tickPadding, 1);
			this.tickPaddingSlider.position(10, 400);

			this.legendSizeSlider = createSlider(10, 100, this.legendSize, 1);
			this.legendSizeSlider.position(10, 450);
			this.legendPaddingSlider = createSlider(10, 100, this.legendPadding, 1);
			this.legendPaddingSlider.position(10, 500);

			this.labelTextSizeSlider = createSlider(10, 50, this.labelTextSize, 1);
			this.labelTextSizeSlider.position(10, 550);
			this.labelPaddingSlider = createSlider(0, 50, this.labelPadding, 1);
			this.labelPaddingSlider.position(10, 600);
			this.labelRotationSlider = createSlider(0, 360, this.labelRotation, 1);
			this.labelRotationSlider.position(10, 650);

			this.titleSizeSlider = createSlider(0, 100, this.titleSize, 1);
			this.titleSizeSlider.position(10, 700);
			this.titlePaddingSlider = createSlider(0, 50, this.titlePadding, 1);
			this.titlePaddingSlider.position(10, 750);

			this.downloadButton = createButton("download template");
			this.downloadButton.position(20, 800);
			this.downloadButton.mousePressed(() => {
				let save = {
					type: this.type,
					titlePadding: this.titlePadding,
					titleSize: this.titleSize,
					chartWidth: this.chartWidth,
					chartHeight: this.chartHeight,
					xPos: this.xPos,
					yPos: this.yPos,
					barWidth: this.barWidth,
					tickIncrement: this.tickIncrement,
					tickPadding: this.tickPadding,
					labelPadding: this.labelPadding,
					labelTextSize: this.labelTextSize,
					labelPadding: this.labelPadding,
					labelRotation: this.labelRotation,
					legendSize: this.legendSize,
					legendPadding: this.legendPadding,
				};

				var element = document.createElement("a");
				element.setAttribute(
					"href",
					"data:application/json;," + JSON.stringify(save)
				);
				element.setAttribute("download", "template.json");

				element.style.display = "none";
				document.body.appendChild(element);

				element.click();
				console.log(JSON.stringify(save));

				document.body.removeChild(element);
			});
		}
	}

	calcAdjDataMax(max, inc) {
		max = Math.ceil(max);
		
		while (max % inc != 0) {
			max++;
		}
		return max;
	}

	render() {
		// render sliders if dev mode
		if (this.dev) this.renderSettings();

		// calculate scale;
		if (this.type.includes("horizontal")) {
			this.scale = this.chartWidth / this.adjDataMax;
		} else {
			this.scale = this.chartHeight / this.adjDataMax;
		}

		push();

		// change orgin to 0,0 of the graph
		translate(this.xPos, this.yPos);

		this.renderBars(this.gap);

		// draw axis lines
		stroke(this.axisLineColour);
		line(0, 0, 0, -this.chartHeight);
		line(0, 0, this.chartWidth, 0);

		//calculate gap
		this.gap = this.calculateGap();

		this.renderTicks();
		this.renderLegend();
		this.renderTitle();
		pop();
	}

	calculateGap() {
		// default vertical
		let gap =
			(this.chartWidth - this.data.length * this.barWidth) / (this.data.length + 1);

		if (this.type.includes("grouped")) {
			gap =
				(this.chartWidth -
					this.barWidth * this.yValue.length * this.data.length) /
				(this.data.length + 1);
		}

		if (this.type.includes("horizontal")) {
			gap =
				(this.chartHeight - this.data.length * this.barWidth) /
				(this.data.length + 1);

			if (this.type.includes("grouped")) {
				gap =
					(this.chartHeight -
						this.data.length * (this.barWidth * this.yValue.length)) /
					(this.data.length + 1);
			}
		}

		if (gap < 0) {
			gap = 0;
		}
		return gap;
	}

	renderBars(gap) {
		push();

		// loop on rows
		for (let i = 0; i < this.data.length; i++) {
			// make gap
			if (this.type.includes("grouped")) {
				if (this.type.includes("horizontal")) {
					translate(0, -gap - this.barWidth * this.yValue.length);
				} else {
					if (i != 0) {
						translate(this.barWidth * this.yValue.length + gap, 0);
					} else {
						translate(gap, 0);
					}
				}
			} else {
				if (this.type.includes("horizontal")) {
					translate(0, -gap - this.barWidth);
				} else {
					if (i != 0) {
						translate(this.barWidth + gap, 0);
					} else {
						translate(gap, 0);
					}
				}
			}

			// draw bar
			push();

			// calculate barMax
			let barMax = 0;
			if (this.type.includes("100%")) {
				for (let j = 0; j < this.yValue.length; j++) {
					let barvalue = this.data[i][this.yValue[j]];
					barMax += +barvalue;
				}
			}

			// loop on values
			for (let j = 0; j < this.yValue.length; j++) {
				// calculate barheight
				let barHeight = this.data[i][this.yValue[j]] * this.scale;

				if (this.type.includes("100%")) {
					if (this.type.includes("horizontal")) {
						barHeight =
							(this.data[i][this.yValue[j]] / barMax) * this.chartWidth;
					} else {
						barHeight =
							(this.data[i][this.yValue[j]] / barMax) * this.chartHeight;
					}
				}

				fill(this.barColours[j % this.barColours.length]);
				// moding I makes the program will no longer die if I have more yValues than colours

				noStroke();

				// draw rectangle and move for stacked/group
				if (this.type.includes("grouped")) {
					if (this.type.includes("horizontal")) {
						rect(0, 0, barHeight, this.barWidth);
						translate(0, this.barWidth);
					} else {
						rect(0, 0, this.barWidth, -barHeight);
						translate(this.barWidth, 0);
					}
				} else {
					if (this.type.includes("horizontal")) {
						rect(0, 0, barHeight, this.barWidth);
						translate(barHeight, 0);
					} else {
						rect(0, 0, this.barWidth, -barHeight);
						translate(0, -barHeight);
					}
				}
			}
			pop();

			push();

			// draw label
			this.renderLabel(i);

			pop();
		}
		pop();
	}

	renderLabel(i) {
		if (this.type.includes("grouped")) {
			if (this.type.includes("horizontal")) {
				translate(-this.labelPadding, (this.barWidth * this.yValue.length) / 2);
				textAlign(RIGHT);
			} else {
				translate((this.barWidth * this.yValue.length) / 2, this.labelPadding);
				textAlign(LEFT);
			}
		} else {
			if (this.type.includes("horizontal")) {
				translate(-this.labelPadding, this.barWidth / 2);
				textAlign(RIGHT);
			} else {
				translate(this.barWidth / 2, this.labelPadding);
				textAlign(LEFT);
			}
		}

		textSize(this.labelTextSize);
		fill(this.labelColour);
		noStroke();

		rotate(this.labelRotation);
		text(this.labels[i], 0, 0);
	}

	renderTicks() {
		let tickCount = this.adjDataMax / this.tickIncrement;

		if (this.type.includes("100%")) {
			tickCount = 100 / this.tickIncrement;
		}

		let tickGap;
		if (this.type.includes("horizontal")) {
			tickGap = this.chartWidth / tickCount;
		} else {
			tickGap = this.chartHeight / tickCount;
		}

		for (let i = 0; i <= tickCount; i++) {
			stroke(0);

			if (this.type.includes("horizontal")) {
				line(tickGap * i, 0, tickGap * i, this.tickPadding);
			} else {
				line(0, -tickGap * i, -this.tickPadding, -tickGap * i);
			}

			textSize(this.labelTextSize);
			fill(this.labelColour);
			noStroke();

			if (this.type.includes("horizontal")) {
				textAlign(CENTER, CENTER);
				text(this.tickIncrement * i, tickGap * i, this.tickPadding * 1.5);
			} else {
				textAlign(RIGHT, CENTER);
				text(this.tickIncrement * i, -this.tickPadding * 1.5, -tickGap * i);
			}
		}
	}

	renderLegend() {
		// rect of the colours and their name
		push();
		rectMode(CENTER);
		textAlign(LEFT, CENTER);
		textSize(this.legendSize);
		translate(
			this.chartWidth + this.legendPadding,
			(-this.chartHeight - this.legendSize * 2) / 2
		);

		for (let i = 0; i < this.yValue.length; i++) {
			fill(this.barColours[i]);
			rect(0, this.legendSize * 1.5 * i, this.legendSize, this.legendSize);
			text(this.yValue[i], this.legendSize * 0.75, this.legendSize * 1.5 * i);
		}

		pop();
	}

	renderTitle(){
		push();
		translate(this.chartWidth/2, -this.chartHeight);
		textAlign(CENTER);
		textSize(this.titleSize);
		text(this.title, 0,-this.titlePadding);
		pop();
	}

	renderSettings() {
		textSize(20);

		if (this.type.includes("grouped")) {
			this.dataMax = max(this.dataMaxs);
		} else {
			// sum of everything in the array, there are some cases i can see this being bad?
			this.dataMax = this.dataMaxs.reduce((e, x) => e + x, 0);
		}

		// increases datamax so its divisable by the tick increment
		this.adjDataMax = this.calcAdjDataMax(this.dataMax, this.tickIncrement);

		if (this.type.includes("100%")) {
			this.adjDataMax = 100;
		}

		this.type = [
			this.type1Select.value(),
			this.type2Select.value(),
			this.type3Select.value(),
		];
		text("Type ", 20, 30);

		this.chartWidth = this.chartWidthSlider.value();
		text("Width: " + this.chartWidth, 20, 90);

		this.chartHeight = this.chartHeightSlider.value();
		text("Height: " + this.chartHeight, 20, 140);

		this.xPos = this.xPosSlider.value();
		text("xPos: " + this.xPos, 20, 190);

		this.yPos = this.yPosSlider.value();
		text("yPos: " + this.yPos, 20, 240);

		this.barWidth = this.barWidthSlider.value();
		text("Bar width: " + this.barWidth, 20, 290);

		this.tickIncrement = this.tickIncrementSlider.value();
		text("Tick Increment: " + this.tickIncrement, 20, 340);

		this.tickPadding = this.tickPaddingSlider.value();
		text("Tick Padding: " + this.tickPadding, 20, 390);

		this.legendSize = this.legendSizeSlider.value();
		text("Legend size: " + this.legendSize, 20, 440);

		this.legendPadding = this.legendPaddingSlider.value();
		text("Legend padding: " + this.legendPadding, 20, 490);

		this.labelTextSize = this.labelTextSizeSlider.value();
		text("label size: " + this.labelTextSize, 20, 540);

		this.labelPadding = this.labelPaddingSlider.value();
		text("label padding: " + this.labelPadding, 20, 590);

		this.labelRotation = this.labelRotationSlider.value();
		text("label rotation: " + this.labelRotation, 20, 640);
		
		this.titleSize = this.titleSizeSlider.value();
		text("Title size: " + this.titleSize, 20, 690);
		
		this.titlePadding = this.titlePaddingSlider.value();
		text("Title padding: " + this.titlePadding, 20, 740);
	}
}
