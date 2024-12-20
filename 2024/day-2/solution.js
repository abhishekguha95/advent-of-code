const fs = require("fs");
const { report } = require("process");
const readline = require("readline");

async function readInput(path) {
	return new Promise((resolve, reject) => {
		// Create a readable stream
		const stream = fs.createReadStream(path, { encoding: "utf8" });

		// Use readline to process the stream line by line
		const rl = readline.createInterface({
			input: stream,
			crlfDelay: Infinity, // Handles both Windows (\r\n) and Unix (\n) line endings
		});

		let lines = 0;
		let report;
		const all_reports = [];

		// Event: 'line' triggers for each line
		rl.on("line", (line) => {
			lines++;
			// Split the line into numbers using whitespace as a separator
			report = line.trim().split(/\s+/).map(Number);
			// console.log(report);
			all_reports.push(report);
			// console.log("lines", lines);
		});

		// Event: 'close' triggers when the stream ends
		rl.on("close", () => {
			console.log("Finished reading file line by line");
			resolve(all_reports);
		});
	});
}

function part1(all_reports) {
	// const all_reports = await readInput("input.txt");
	// console.log("all_reports", all_reports);
	let safe_rep_count = 0;
	for (const report of all_reports) {
		if (isReportSafe(report)) {
			console.log("safe", report);
			safe_rep_count++;
		} else {
			console.log("unsafe", report);
		}
	}
	console.log("safe reports", safe_rep_count);
}

function isReportSafe(report) {
	let inc = report[1] > report[0] ? true : false;
	for (let i = 0; i < report.length - 1; i++) {
		if (inc) {
			if (report[i + 1] < report[i]) return false;
		} else {
			if (report[i + 1] > report[i]) return false;
		}
		const diff = Math.abs(report[i + 1] - report[i]);
		if (diff < 1 || diff > 3) return false;
	}
	return true;
}

async function part2() {
	// const all_reports = await readInput("sample.txt");
	const all_reports = await readInput("input.txt");
	// const fixed_reports = [];
	let count = 0;
	for (const report of all_reports) {
		if (removeOneElementAndCheck(report)) count++;
	}
	console.log("safe reports", count);
	// part1(fixed_reports);
}

// function removeOneBadLevel(report) {
// 	let new_report, removeOneBadLevel;
// 	for (let i = 0; i < report.length - 1; i++) {
// 		// removing duplicate element
// 		if (report[i + 1] === report[i]) {
// 			// removeOneBadLevel = true;
// 			// break;
// 			new_report = report.toSpliced(i, 1);
// 			break;
// 			// return new_report;
// 		}
// 		if (i > 0 && i < report.length - 1) {
// 			//removing peaks
// 			if (report[i - 1] < report[i] && report[i] > report[i + 1]) {
// 				// removeOneBadLevel = true;
// 				// break;
// 				new_report = report.toSpliced(i, 1);
// 				break;
// 			}

// 			// removing valleys
// 			if (report[i - 1] > report[i] && report[i] < report[i + 1]) {
// 				// removeOneBadLevel = true;
// 				new_report = report.toSpliced(i, 1);
// 				break;
// 			}
// 			// return new_report;
// 		}

// 		// const inc = report[1] > report[0] ? true : false;
// 		const diff = Math.abs(report[i + 1] - report[i]);
// 		if (diff < 1 || diff > 3) {
// 			new_report = report.toSpliced(i, 1);
// 			// removeOneBadLevel = true;
// 			break;
// 		}
// 	}
// 	if (new_report) {
// 		console.log("new_report", new_report);
// 		return new_report;
// 	}
// 	console.log("report", report);
// 	return report;
// }

function removeOneElementAndCheck(report) {
	if (isReportSafe(report)) return true;

	//remove 1 element and check for all elements
	for (let i = 0; i < report.length; i++) {
		const temp_rep = report.toSpliced(i, 1);

		//if for this ele, removing it makes report safe => return true => as it is possible to omit this one value
		if (isReportSafe(temp_rep)) return true;
	}
	return false;
}

function main() {
	try {
		part2();
	} catch (err) {
		console.error(err);
	}
}

main();
