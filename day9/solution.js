const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const fs = require('fs');
const input = fs.readFileSync('./day9/input.txt', 'utf8');

// format input
const list = input
		.split('\r\n')
		.map(i => Number(i));

// dirty dirty brute force
function isSumOfLast(num, values){
	for(let n of values){
		for(let o of values){
			if (o === n) continue;
			if(o + n === num) return true;
		}
	}
	return false;
}

// numbers in sequence to check
const sequence = 25;

let i = sequence + 1;
while (isSumOfLast(list[i], list.slice(i-sequence, i))) {
	i++;
}

// part 1 solution
const sumToFind = list[i];
console.log('sumToFind', sumToFind );

let sum = 0;
let bottom = -1, top = 1;
// dirty brute force try all the combos
while(sum != sumToFind){
	bottom++;
	top = bottom;
	sum = list[bottom];
	while(sum < sumToFind ){
		top++;
		sum += list[top];
	}
}

let range = list.slice(bottom, top+1).sort((a, b)=>{
  return a - b;
});

// part 2 solution
console.log(range[0] + range[range.length-1]);
