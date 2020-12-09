const fs = require('fs');
const input = fs.readFileSync('./day8/input.txt', 'utf8');

// format instructions into an array of operation and values
// set the nop values to zero since they're red herrings
const opArray = input
		.split('\r\n')
		.map(i => i.split(' '))
		.map(i => ({operation: i[0], value: i[0] == 'nop' ? 0 : Number(i[1])}));

let total = 0;
let index = 0;

// loop through the array, setting each executed operation to 'stop'
// looping until we get to a stop instruction
while (opArray[index].operation !== 'stop'){
	if (opArray[index].operation === 'jmp') { // on jump, set the new index
		opArray[index].operation = 'stop';
		index += opArray[index].value;
	} else { // otherwise add the value and increment the index by 1
		opArray[index].operation = 'stop';
		total += opArray[index].value;
		index++;
	}
}

//part 1
console.log('total', total);
		
