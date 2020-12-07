const fs = require('fs');
const rulesInput = fs.readFileSync('./day7/input.txt', 'utf8');

let regex = /(\d+) ([a-z]+ [a-z]+)/g;

// format rules input into an object with color keys and an array of color: quantity pairs
const ruleArray = rulesInput
		.split('\r\n')
		.map(r => r.split(' bags contain '))
		.map(r=>([r[0], Array.from(r[1]?.matchAll(regex) ?? [] ).map(f=>({color: f[2], quantity: Number(f[1])})) ]) );

const rules = Object.fromEntries(ruleArray);

// recursively count the number of bags inside each bag
function countBagsInside(color){
	let bagsInside = rules[color];

	if(bagsInside?.length){
		return bagsInside.reduce((total, bag) => total + bag.quantity + bag.quantity * countBagsInside(bag.color), 0);
	} else {
		return 0;
	}
}

console.log(countBagsInside('shiny gold'));
