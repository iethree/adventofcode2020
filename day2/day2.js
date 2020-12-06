const input = require('./input.json');
const log = require('logchalk');

let cnt = 0;
for(let i of input){
	let pos1 = i[0]-1;
	let pos2 = i[1]-1;
	log.info(i[3][pos1], i[3][pos2], i[2], (i[3][pos1] == i[2] || i[3][pos2] == i[2]) && i[3][pos1] != i[3][pos2]);
	if ((i[3][pos1] === i[2] || i[3][pos2] === i[2]) && i[3][pos1] != i[3][pos2]) cnt++;
}

log.info(cnt);