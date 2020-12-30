const fs = require('fs');
const input = fs.readFileSync('./day11/input.txt', 'utf8');

// format input
let seats = input
		.split('\r\n')
		.map(i => Array.from(i))
		.map(i => i.map(j => j=='L' ? 0 : '.'));

function countAdjacentOccupied(row, col){
	let total = 0;
	for(let r = -1; r <= 1; r++) {
		if(!seats[row+r]) continue;
		for (let c = -1; c <= 1; c++){
			if(r === 0 && c === 0) continue;
			seats[row+r][col+c]===1 && total++;
		}
	}
	return total;
}

let stable = false;

function nextSymbol(row, col){
	if(seats[row][col] === '.') return '.';

	const lastValue = seats[row][col];
	let nextValue;

	let adjacentOccupied = countAdjacentOccupied(row, col);
	
	if (adjacentOccupied === 0 && !lastValue) nextValue = 1;
	else if(adjacentOccupied >= 4 && lastValue) nextValue = 0;
	else nextValue = lastValue;
	
	if (nextValue !== lastValue) stable = false;

	return nextValue;
}


while (stable === false){
	stable = true;
	seats = seats.map((e,r)=>e.map((f,c)=>nextSymbol(r,c)));
}



console.log(
	seats.reduce((sum, r)=> sum + r.reduce((s, c)=> c===1 ? s+1 : s, 0), 0)
);


function printSeats(arr){
	for(let r of arr){
		console.log(r.join(' '))
	}
	console.log( '--------------------');
}







	
