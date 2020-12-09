const fs = require('fs');
const input = fs.readFileSync('./day8/input.txt', 'utf8');

// format instructions into an array of operation and values
// set the nop values to zero since they're red herrings
const opArray = input
		.split('\r\n')
		.map(i => i.split(' '))
		.map((i,k) => ({operation: i[0], value: Number(i[1]), next: i[0] == 'jmp' ? k + Number(i[1]) : k + 1, jump: k + Number(i[1])}));

let total = 0;
let opOrder = [];

let index = opArray.length-1;

// traverse backwards
while (opArray[index]){
	if(opOrder.indexOf(index) !== -1){
		break;
	}
	opOrder.unshift(index);
	index = findStepBefore(index);
}

console.log('dupe back', index, opArray[index]);

// dirty dirty awful inefficient backwards search
function findStepBefore(index){

	// find an instruction that leads to this index
	const regularIndex = opArray.findIndex((i)=>i.next === index);
	if(regularIndex !== -1) return regularIndex;

	// see if we can get there by changing jmp to nop
	const altNop = opArray.findIndex((i, k)=>i.operation == 'jmp' && k+1 == index);
	if(altNop !== -1) return altNop;
	
	// see if we can get there by changing nop to jmp
	const altJump = opArray.findIndex((i, k)=>i.operation == 'jmp' && k+1 == index);
	if(altJump !== -1) return altJump;
	
	return -1; // fail
}

//traverse forwards
index = 0;
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
console.log('dupe forwards', index, opArray[index]);

for(let i of opOrder){
	total += opArray[i].operation == 'acc' ? opArray[i].value : 0;
}
console.log(opOrder);
console.log('total', total);