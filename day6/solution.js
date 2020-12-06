const groups = require('./input.json');

function countGroupYes(group){
	const yeses = {};
	// for each person in the group
	for (let person of group) {
		// add each answer to the hashmap if new
		for (let ans of Array.from(person)){
			if(!yeses[ans]) yeses[ans] = 1;
		}
	};

	return Object.keys(yeses).length;
}

function countAllYes(group){
	const yeses = {};

	// create hashmap of the counts of all the yes answers
	for (let person of group) {
		for (let ans of Array.from(person)){
			if(!yeses[ans]) yeses[ans] = 1; // add each answer to the hashmap if new
			else yeses[ans] += 1; // otherwise increment group count
		}
	};

	// count the number of questions where the whole group answered yes
	let allYes = 0;
	for(let answer in yeses){
		if(yeses[answer]===group.length){
			allYes++;
		}
	}

	return allYes;
}

let count = 0;

for (let group of groups){
	count += countGroupYes(group);
}

console.log('total yeses', count);

count = 0;
for (let group of groups){
	count += countAllYes(group);
}

console.log('total all yeses', count);
