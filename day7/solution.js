const fs = require('fs');
const rulesInput = fs.readFileSync('./day7/input.txt', 'utf8');

// format rules input into an object with color keys and an array of colors inside
const ruleArray = rulesInput
		.split('\r\n')
		.map(r => r.split(' bags contain '))
		.map(r=>([r[0], r[1]?.includes('no other') ? [] : r[1]?.match(/([a-z]+ [a-z]+)/g)] )) 

const rules = Object.fromEntries(ruleArray);

// form a new object with color keys and arrays of colors that color can be in directly
const canBeIn = {};
for(let outer in rules){
	for(let i of rules[outer]){
		if(!canBeIn[i]) canBeIn[i] = [outer];
		else canBeIn[i].push(outer);
	}
}

// recursively form a list of all bags that can be in a certain color
function containerList(color){
	let containers = canBeIn[color];

	if(containers?.length){
		return [...containers, ...containers.reduce((list, container)=> ([...list, ...containerList(container)]), [])];
	} else {
		return [];
	}
}

// How many bag colors can eventually contain at least one shiny gold bag?
// print out the number of unique bag colors
console.log('colors of bags that can contain a shiny gold bag', containerList('shiny gold').filter(getUnique).length);

function getUnique(value, index, self) {
  return self.indexOf(value) === index;
}
