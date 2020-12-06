const input = require('./input.json');
const log = require('logchalk');

function part1(){
	for (let i of input){
		for (let j of input){
			if(i==j) continue;
			if(i+j == 2020) {
				log.info(i * j);
				return;
			}
		}
	}
}

function part2(){
	for (let i of input){
		for (let j of input){
			if(i==j) continue;
				for (let k of input) {
					if(j==k) continue;
					if(i+j+k == 2020) {
						log.info(i * j * k);
						return;
					}
				}
				
		}
	}
};
part2();