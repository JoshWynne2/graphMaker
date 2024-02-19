class BarChart {
	constructor(obj, dev = false) {
		this.data = obj.data;
		this.type = obj.type;
		/*
			type is an ENUM of the following combination of names as strings:
				vertical/horizontal
				group/stacked
				this.d/100%

			this is the default set:
				["vertical", "cascade", "this.d"]

			if type.includes("vertical"){
				default
			} else {
				blow your head off
			}

		*/

		this.yValue = obj.yValue;
		// yValue is an array containing the names of each datapoint in the row

		this.xValue = obj.xValue;

		this.chartWidth = obj.chartWidth;
		this.chartHeight = obj.chartHeight;
		this.xPos = obj.xPos;
		this.yPos = obj.yPos;
		this.axisLineColour = obj.axisLineColour;
		this.barWidth = obj.barWidth;
		this.barColours = obj.barColours;

		this.labelTextSize = obj.labelTextSize;
		this.labelPadding = obj.labelPadding;
		this.labelRotation = obj.labelRotation;
		this.labelColour = obj.labelColour;

		this.tickIncrement = 5;
		this.legendSize = obj.legendSize;

		this.labels = this.data.map((d) => d[this.xValue]);

		this.dataMax = 0;
		for (let i = 0; i < this.yValue.length; i++) {
			this.dataMax += max(this.data.map((row) => +row[this.yValue[i]]));
		}

		// increases datamax so its divisable by the tick increment
		this.adjDataMax = this.calcAdjDataMax(this.dataMax, this.tickIncrement);

		this.scale;

		if (dev) {
			this.dev = true;

			this.chartWidthSlider = createSlider(150, 600, this.chartWidth, 1);
			this.chartWidthSlider.position(10, 50);
			this.chartHeightSlider = createSlider(150, 600, this.chartHeight, 1);
			this.chartHeightSlider.position(10, 100);

			this.xPosSlider = createSlider(0, width, this.xPos, 1);
			this.xPosSlider.position(10, 150);
			this.yPosSlider = createSlider(0, height, this.yPos, 1);
			this.yPosSlider.position(10, 200);

			this.barWidthSlider = createSlider(10, 100, this.barWidth, 1);
			this.barWidthSlider.position(10, 250);

			this.labelTextSizeSlider = createSlider(10, 50, this.labelTextSize, 1);
			this.labelTextSizeSlider.position(10, 300);
			this.labelPaddingSlider = createSlider(0, 50, this.labelPadding, 1);
			this.labelPaddingSlider.position(10, 350);
			this.labelRotationSlider = createSlider(0, 360, this.labelRotation, 1);
			this.labelRotationSlider.position(10, 400);

			this.downloadButton = createButton("download template");
			this.downloadButton.position(20, 450);
			this.downloadButton.mousePressed(() => {
				let save = {
					data: "replace",
					horizontal: this.horizontal,
					yValue: this.yValue,
					xValue: this.xValue,
					chartWidth: this.chartWidth,
					chartHeight: this.chartHeight,
					xPos: this.xPos,
					yPos: this.yPos,
					axisLineColour: "replace",
					barWidth: this.barWidth,
					barColour: "replace",
					labelTextSize: this.labelTextSize,
					labelPadding: this.labelPadding,
					labelRotation: this.labelRotation,
					labelColour: "replace",
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

		// draw axis lines
		stroke(this.axisLineColour);
		line(0, 0, 0, -this.chartHeight);
		line(0, 0, this.chartWidth, 0);

		//calculate gap
		let gap = this.calculateGap();

		push();
		this.renderBars(gap);
		pop();

		this.renderTicks();
		this.renderLegend();
		pop();
	}

	calculateGap() {
		if (this.type.includes("horizontal")) {
			return (
				(this.chartHeight - this.data.length * this.barWidth) /
				(this.data.length + 1)
			);
		}
		// default vertical
		return (
			(this.chartWidth - this.data.length * this.barWidth) / (this.data.length + 1)
		);
	}

	renderBars(gap) {
		if (this.type.includes("horizontal")) {
			translate(0, -gap - this.barWidth);
		} else {
			translate((gap + this.barWidth) / 2, 0);
		}

		for (let i = 0; i < this.data.length; i++) {
			// draw bar
			push();
			for (let j = 0; j < this.yValue.length; j++) {
				let barHeight = this.data[i][this.yValue[j]] * this.scale;

				fill(this.barColours[j]);
				noStroke();
				if (this.type.includes("horizontal")) {
					rect(0, 0, barHeight, this.barWidth);
					translate(barHeight, 0);
				} else {
					rect(0, 0, this.barWidth, -barHeight);
					translate(0, -barHeight);
				}
			}
			pop();

			// draw label
			push();

			this.renderLabel(i);

			pop();
			if (this.type.includes("horizontal")) {
				translate(0, -gap - this.barWidth);
			} else {
				translate(gap + this.barWidth, 0);
			}
		}
	}

	renderLabel(i) {
		if(this.type.includes("horizontal")){
			translate(this.barWidth / 2 - this.labelPadding, this.barWidth/2);
			textAlign(RIGHT);
		} else {
			translate(this.barWidth / 2, this.labelPadding);
			textAlign(LEFT);
		}

		textSize(this.labelTextSize);
		fill(this.labelColour);
		noStroke();

		rotate(this.labelRotation);
		text(this.labels[i], 0, 0);
	}

	renderTicks() {
		let tickCount = this.adjDataMax / this.tickIncrement;
		let tickGap;
		if (this.type.includes("horizontal")) {
			tickGap = this.chartWidth / tickCount;
		} else {
			tickGap = this.chartHeight / tickCount;
		}

		for (let i = 0; i <= tickCount; i++) {
			stroke(0);

			if (this.type.includes("horizontal")) {
				line(tickGap * i, 0, tickGap * i, 20);
			} else {
				line(0, -tickGap * i, -20, -tickGap * i);
			}

			textSize(this.labelTextSize);
			fill(this.labelColour);
			noStroke();

			if (this.type.includes("horizontal")) {
				textAlign(CENTER, CENTER);
				text(this.tickIncrement * i, tickGap * i, 25);
			} else {
				textAlign(RIGHT, CENTER);
				text(this.tickIncrement * i, -25, -tickGap * i);
			}
		}
	}

	renderLegend() {
		// rect of the colours and their name
		push();
		rectMode(CENTER);
		textAlign(LEFT, CENTER);
		textSize(this.legendSize);
		translate(this.chartWidth + 20, (-this.chartHeight - this.legendSize * 2) / 2);

		for (let i = 0; i < this.yValue.length; i++) {
			fill(this.barColours[i]);
			rect(0, this.legendSize * 1.5 * i, this.legendSize, this.legendSize);
			text(this.yValue[i], this.legendSize * 0.75, this.legendSize * 1.5 * i);
		}

		pop();
	}

	renderSettings() {
		textSize(20);

		this.chartWidth = this.chartWidthSlider.value();
		text("width: " + this.chartWidth, 20, 40);

		this.chartHeight = this.chartHeightSlider.value();
		text("height: " + this.chartHeight, 20, 90);

		this.xPos = this.xPosSlider.value();
		text("x pos: " + this.xPos, 20, 140);

		this.yPos = this.yPosSlider.value();
		text("y pos: " + this.yPos, 20, 190);

		this.barWidth = this.barWidthSlider.value();
		text("bar width: " + this.barWidth, 20, 240);

		this.labelTextSize = this.labelTextSizeSlider.value();
		text("label size: " + this.labelTextSize, 20, 290);

		this.labelPadding = this.labelPaddingSlider.value();
		text("label padding: " + this.labelPadding, 20, 340);

		this.labelRotation = this.labelRotationSlider.value();
		text("label rotation: " + this.labelRotation, 20, 390);
	}
}
