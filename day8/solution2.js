const fs = require('fs');
const input = fs.readFileSync('./day8/input.txt', 'utf8');

// format instructions into an array of operation and values
// set the nop values to zero since they're red herrings
const opArray = input
		.split('\r\n')
		.map(i => i.split(' '))
		.map((i,k) => ({operation: i[0], value: Number(i[1]), next: i[0] == 'jmp' ? k + Number(i[1]) : k + 1, jump: k + Number(i[1])}));

let total = 0;
let brokenOpOrder = [];
let index = opArray.length-1;



//traverse forwards
index = 0;

while (brokenOpOrder.indexOf(index) == -1){
	brokenOpOrder.push(index);
	index = opArray[index].next;
}

console.log(brokenOpOrder);

// for(let i of opOrder){
// 	total += opArray[i].operation == 'acc' ? opArray[i].value : 0;
// }
console.log('total', total);