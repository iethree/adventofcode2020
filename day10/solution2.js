const fs = require('fs');
const input = fs.readFileSync('./day10/input.txt', 'utf8');

// format input
const adapters = input
		.split('\r\n')
		.map(i => Number(i))
		.sort((a,b)=> a-b); // sort
adapters.push(adapters[adapters.length-1]+3); // computer is highest + 3

adapters.unshift(0)// base adapter

counts = [null,0,0,0];

a=1;
const diffs = [];
// collect the differences between them all
while(a < adapters.length){
	if(adapters[a] - adapters[a-1] == 1){
		diffs.push(1);
	} else {
		diffs.push(adapters[a] - adapters[a-1])
	}
	counts[adapters[a] - adapters[a-1]]++;
	a++;
}

// part 1 solution
console.log(counts);
console.log(counts[1]*counts[3])

const oneSets = diffs.join('').split('3');

const oneSetCounts = [0,0,0,0,0,0,0];

for (let s of oneSets){
	oneSetCounts[s.length]++;
}

console.log(
	Math.pow(2, oneSetCounts[2]) * 
	Math.pow(4, oneSetCounts[3]) *
	Math.pow(6, oneSetCounts[4]) * 
	Math.pow(8, oneSetCounts[5]) 

);


// 2x1 = 2 combos
// 3x1 = 4 combos
// 4x1 = 6 combos










	
