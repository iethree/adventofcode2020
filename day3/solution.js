const hill = require('./input.json');

const width = hill[0].length; // width of the map

function treeCounter(right, down){
	let trees = 0;
	let col = 0;

	// loop through each row
	for (row = 0; row < hill.length; row+=down){
		// if we ran into a tree, increment
		if (hill[row][col] == '#') trees++;

		// move right
		col+=right;

		// if we move past the right of the map, roll back over to the left
		if(col >= width){
			col = col-width;
		}
	}
	return trees;
}

const treeProduct = 
	treeCounter(1,1) *
	treeCounter(3,1) *
	treeCounter(5,1) *
	treeCounter(7,1) *
	treeCounter(1,2);

console.log('treeProduct', treeProduct);