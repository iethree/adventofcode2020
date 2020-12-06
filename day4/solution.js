const passports = require('./input2.json');

function passportCounter(passports){
	// turn requirements into object
	// with either min/max vals or regexes
	const required = {
		'byr':{ min: 1920, max: 2002},
		'iyr':{ min: 2010, max: 2020},
		'eyr':{ min: 2020, max: 2030},
		'hgt':{ regex: /(\d+)(cm|in)/ },
		'hcl':{ regex: /\#[0-9a-f]{6}/ },
		'ecl':{ regex: /(amb|blu|brn|gry|grn|hzl|oth)/},
		'pid':{ regex: /^\d{9}$/},
	};

	// special height requirements
	const heightRequirement = {
		'in': {min: 59, max: 76},
		'cm': {min: 150, max: 193},
	};

	// start assuming all valid
	let validCnt = passports.length; 

	// loop through each passport
	for(let p of passports) {

		// check each required field
		for(let r in required){
			
			// if field is missing, subtract one and stop checking
			if(!p[r]){
				validCnt--;
				break;
			}

			// check regex 
			if(required[r].regex && !required[r].regex.test(p[r]) ){
				validCnt--;
				break;

			// check min/max nums
			} else if (p[r] < required[r].min || p[r] > required[r].max ){
				validCnt--;
				break;
			}

			// special height check
			if(r == 'hgt') {
				const [all, height, type] = p[r].match(required['hgt'].regex);
				if(height < heightRequirement[type].min || height > heightRequirement[type].max){
					validCnt--;
					break;
				}
			}
		}
	}
	return validCnt;
}

const valid = passportCounter(passports);

console.log(valid, 'valid passports');