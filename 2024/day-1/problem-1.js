const fs = require("fs");
const readline = require("readline");

async function part1() {
	let { list1, list2 } = await readInput("input.txt");
	let diff = 0;
	list1 = sortList(list1);
	list2 = sortList(list2);
	diff = diff + findDiff(list1, list2);
	console.log("total diff", diff);
}

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
		let list1 = [];
		let list2 = [];

		// Event: 'line' triggers for each line
		rl.on("line", (line) => {
			lines++;
			// Split the line into numbers using whitespace as a separator
			let [num1, num2] = line.trim().split(/\s+/).map(Number);
			// console.log(`Number 1: ${num1}, Number 2: ${num2}`);
			list1.push(num1);
			list2.push(num2);
			// console.log("lines", lines);
		});

		// Event: 'close' triggers when the stream ends
		rl.on("close", () => {
			console.log("Finished reading file line by line");
			resolve({ list1, list2 });
		});
	});
}

function part2() {}

function sortList(list) {
	return list.sort((a, b) => a - b);
}

function findDiff(list1, list2) {
	let totalDiff = 0;
	for (let i = 0; i < list1.length; i++) {
		totalDiff = totalDiff + Math.abs(list1[i] - list2[i]);
	}
	return totalDiff;
}

function main() {
	part1();
}

main();
