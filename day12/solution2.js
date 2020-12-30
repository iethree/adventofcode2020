const fs = require('fs');
const input = fs.readFileSync('./day11/input.txt', 'utf8');

// format input
let seats = input
		.split('\r\n')
		.map(i => Array.from(i))
		.map(i => i.map(j => j=='L' ? 0 : '.'));

function countVisibleOccupied(row, col){
	return (
		checkSight([row,col], [-1,-1]) +
		checkSight([row,col], [-1, 0]) +
		checkSight([row,col], [-1, 1]) +
		checkSight([row,col], [ 0,-1]) +
		checkSight([row,col], [ 0, 1]) +
		checkSight([row,col], [ 1,-1]) +
		checkSight([row,col], [ 1, 0]) +
		checkSight([row,col], [ 1, 1]) );
}

function checkSight(base, vector){
	let [x,y] = base;
	current = '.';
	x += vector[0];
	y += vector[1];

	while(seats[x] && seats[x][y] !== undefined ){
		if(seats[x][y] === 1) {
			return 1;
		} else if (seats[x][y] === 0){
			return 0;
		}
		x += vector[0];
		y += vector[1];
	}
	return 0;
}

let stable = false;

function nextSymbol(row, col){
	if(seats[row][col] === '.') return '.';

	const lastValue = seats[row][col];
	let nextValue;

	let adjacentOccupied = countVisibleOccupied(row, col);
	
	if (adjacentOccupied === 0 && !lastValue) nextValue = 1;
	else if(adjacentOccupied >= 5 && lastValue) nextValue = 0;
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







	
