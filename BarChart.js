class BarChart {
	constructor(obj, dev = false) {
		this.data = obj.data;
		this.horizontal = obj.horizontal;

		this.yValue = obj.yValue;
		this.xValue = obj.xValue;

		this.chartWidth = obj.chartWidth;
		this.chartHeight = obj.chartHeight;
		this.xPos = obj.xPos;
		this.yPos = obj.yPos;
		this.axisLineColour = obj.axisLineColour;
		this.barWidth = obj.barWidth;
		this.barColour = obj.barColour;

		this.labelTextSize = obj.labelTextSize;
		this.labelPadding = obj.labelPadding;
		this.labelRotation = obj.labelRotation;
		this.labelColour = obj.labelColour;

		this.labels = this.data.map((d) => d[this.xValue]);
		this.dataMax = max(this.data.map((row) => +row[this.yValue]));

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

				var element = document.createElement('a');
				element.setAttribute('href', 'data:application/json;,' + JSON.stringify(save));
				element.setAttribute('download', "template.json");

				element.style.display = 'none';
				document.body.appendChild(element);

				element.click();
				console.log(JSON.stringify(save));

				document.body.removeChild(element);
			});
		}
	}

	render() {
		// render sliders if dev mode
		if (this.dev) this.renderSettings();

		push();
		translate(this.xPos, this.yPos);

		// draw axis lines
		stroke(this.axisLineColour);
		line(0, 0, 0, -this.chartHeight);
		line(0, 0, this.chartWidth, 0);

		//calculate gap
		let gap =
			(this.chartWidth - this.data.length * this.barWidth) / (this.data.length + 1);
		push();

		if (this.horizontal) {
			textAlign(RIGHT, CENTER);
			gap =
				(this.chartHeight - this.data.length * this.barWidth) /
				(this.data.length + 1);

			translate(0, -gap - this.barWidth);
		} else {
			translate(gap, 0);
		}

		for (let i = 0; i < this.data.length; i++) {
			let scale = this.chartHeight / this.dataMax;
			let barHeight = this.data[i][this.yValue] * scale;

			// draw bar
			fill(this.barColour);
			if (this.horizontal) {
				rect(0, 0, barHeight, this.barWidth);
			} else {
				rect(0, 0, this.barWidth, -barHeight);
			}

			// draw label
			push();

			translate(this.barWidth / 2, this.labelPadding);

			textSize(this.labelTextSize);
			fill(this.labelColour);
			noStroke();
			if (this.horizontal) {
				rotate(-this.labelRotation);
				text(this.labels[i], -20, 0);
			} else {
				rotate(this.labelRotation);
				text(this.labels[i], 0, 0);
			}

			pop();

			if (this.horizontal) {
				translate(0, -gap - this.barWidth);
			} else {
				translate(gap + this.barWidth, 0);
			}
		}
		pop();

		// draw vertical elements
		// line(0, 0, -20, 0);
		// line(0, -20, -20, -20);
		// line(0, -40, -20, -40);

		let tickGap = this.chartHeight / 5;
		let tickIncrement = this.dataMax / 5;
		for (let i = 0; i <= 5; i++) {
			stroke(0);

			if (this.horizontal) {
				line(tickGap * i, 0, tickGap * i, 20);
			} else {
				line(0, -tickGap * i, -20, -tickGap * i);
			}

			textSize(this.labelTextSize);
			fill(this.labelColour);
			noStroke();
			if (this.horizontal) {
				textAlign(CENTER, TOP);
				text((tickIncrement * i).toFixed(0), tickGap * i, 20);
			} else {
				textAlign(RIGHT, CENTER);
				text((tickIncrement * i).toFixed(2), -20, -tickGap * i);
			}
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
