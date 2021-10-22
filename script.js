let btnList = document.querySelectorAll('.btn');
let result = document.getElementById('result');
let resetBtn = document.getElementById('reset-button');
let deleteBtn = document.getElementById('delete-button');
let equalBtn = document.getElementById('equal-button');

result.innerText = 0;

btnList.forEach(element => {
	element.addEventListener('click', event => {
		if(result.innerText === "Invalid Input") result.innerText = '';
		let value = event.target.innerText;			
		result.innerText += value;
		if(result.innerText.includes('0')) {
			if(result.innerText.indexOf('0') === 0) removeInvalidZero(0);
			else if(!Number(result.innerText.charAt(result.innerText.indexOf('0') - 1))) removeInvalidZero(result.innerText.indexOf('0'));
		}
	}, false);
});

equalBtn.addEventListener('click', event => {
	if(result.innerText == 0 || result.innerText === '') {
		resetCalculator();
		return;
	}
	let lastIndexVal = parseInt(result.innerText.split('')[result.innerText.length - 1]);
	if(!Number(lastIndexVal) && lastIndexVal != 0) {
		displayInvalidInputError();
		return;
	}
	if((result.innerText.includes('+') || result.innerText.includes('-')) 
		&& (result.innerText.includes('*') || result.innerText.includes('/'))) {
		displayInvalidInputError();
		return;
	}
	if(result.innerText.includes('+') && result.innerText.includes('-')) {
		let resArr = result.innerText.split('');
		let jointOperatorCount = 0;
		for(let i=0; i<resArr.length; i++) {
			if((!Number(resArr[i-1]) && !Number(resArr[i])) || (!Number(resArr[i+1]) && !Number(resArr[i]))) {
				displayInvalidInputError();
				return;
			}
		}
	}

	try {
		result.innerText = eval(result.innerText);
	}
	catch (exception) {
		displayInvalidInputError();
	}
}, false);

resetBtn.addEventListener('click', event => {
	resetCalculator();
});

deleteBtn.addEventListener('click', event => {
	if(result.innerText === 'Invalid Input' || result.innerText == '') {
		resetCalculator();
		return;
	}
	deleteLastVal = result.innerText.split('');
	deleteLastVal.splice(deleteLastVal.length - 1, 1);
	result.innerText = deleteLastVal.join('');
	if(result.innerText == '') resetCalculator();
}, false);

removeInvalidZero = function(index) {
	invalidValue = result.innerText.split('');
	invalidValue.splice(index, 1);
	result.innerText = invalidValue.join('');
}

resetCalculator = function() {
	result.innerText = 0;
}

displayInvalidInputError = function() {
	result.innerText = 'Invalid Input';
}