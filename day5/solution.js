const passes = require('./input.json');

function getSeatId(boardingPass){
	// split input into row and col parts
	const rowDeterminers = Array.from(boardingPass.slice(0,7));
	const colDeterminers = Array.from(boardingPass.slice(7,10));

	// binary search the rows with a reducer
	// results should always be max === min
	const [row] = rowDeterminers.reduce(([min, max], r)=>{
		return r === 'F' 
			? [min, max-Math.ceil((max-min)/2)]
		  : [min+Math.ceil((max-min)/2), max]	
	}, [0,127]);

	// binary search the columns in the same way
	const [col] = colDeterminers.reduce(([min, max], c)=>{
		return c === 'L' 
			? [min, max-Math.ceil((max-min)/2)]
		  : [min+Math.ceil((max-min)/2), max]	
	}, [0,7]);

	// calculate seat Id
	return (row * 8) + col;
}

// part 1 find the greatest seat id
const maxId = passes.reduce((max, pass)=>{
	let id = getSeatId(pass);
	return id > max ? id : max;
}, 0);
console.log('max seat id', maxId);

// part 2: find your seat

// calculate all seat Ids and sort
const allIds = passes.map(pass=>getSeatId(pass)).sort(function(a, b) {
  return a - b;
});

// scan through and exit the loop when you find a gap
for(cnt = 0; cnt < allIds.length; cnt++){
	if (allIds[cnt]+1 !== allIds[cnt+1]) {
		console.log('your seat id:', allIds[cnt]+1);
		break;
	}
}
