function Casino (numberSlotMachines, initialMoneyCasino) {
	if(numberSlotMachines <= 0 || initialMoneyCasino <=0) {
		console.log('Enter the correct values');
		return;
	}

	window.slotMachine = [];
	var returnSlotMachine = function() {
		var n = initialMoneyCasino/numberSlotMachines;
		var m = parseInt(n);

		if(n%1 != 0) {
			for(var i = 0; i < numberSlotMachines; i +=1) {
				slotMachine[i] = new SlotMachine(m);
			}
			slotMachine[0].initialMoneySlotMachine = m + (n%1)*numberSlotMachines;
		} else { 
			for(var i = 0; i < numberSlotMachines; i +=1) {
				slotMachine[i] = new SlotMachine(n);
			}
		}
		// Choose a lucky machine
		var luckyNum = Math.floor(Math.random() * numberSlotMachines);
		window.slotMachine[luckyNum].lucky();
	};
	returnSlotMachine();

	this.numberSlotMachines = numberSlotMachines;
	this.initialMoneyCasino = initialMoneyCasino;

	this.getTotalMoneyCasino = function() {
		var initialMoneyCasino = window.slotMachine.reduce(function(def, item){
			return def + item.initialMoneySlotMachine;
		},0);
		console.log(initialMoneyCasino);
		return initialMoneyCasino;
	};

	this.getTotalNumberMachines = function() {
		var numberSlotMachines = window.slotMachine.length;
		console.log(numberSlotMachines);
		return numberSlotMachines;
	};

	this.addSlotMachine = function() {
		var half = window.slotMachine.reduce(function(def, item) {
			return Math.max(def, item.initialMoneySlotMachine)
		}, 0);
		var slotMachine2 = window.slotMachine.map(function(item) {
			return item.initialMoneySlotMachine;
		});
		var half2 = parseInt(half/2);

		if((half/2)%1 != 0) {
			window.slotMachine.push(new SlotMachine(half2));
			window.slotMachine[slotMachine2.indexOf(half)].initialMoneySlotMachine = half2 + (half/2%1)*2;
		} else {
			window.slotMachine.push(new SlotMachine(half2));
			window.slotMachine[slotMachine2.indexOf(half)].initialMoneySlotMachine = half2;
		}
		console.log(window.slotMachine);
	};

	this.removeMachine = function(uniqueNumber) {
		if(window.slotMachine.length == 1) {
			console.log('There was one slotMachine');
			return;
		} 

		var removeMoney = window.slotMachine[uniqueNumber].initialMoneySlotMachine;
		window.slotMachine.splice(uniqueNumber, 1);
		var removeMoney2 = removeMoney/window.slotMachine.length;
		var removeMoney3 = parseInt(removeMoney2);

		if(removeMoney2%1 != 0) {
			for(var i = 0; i < slotMachine.length; i += 1) {
				slotMachine[i].initialMoneySlotMachine += removeMoney3;
			}
				slotMachine[0].initialMoneySlotMachine += (removeMoney2%1)*slotMachine.length;
		} else {
			for(var i = 0; i < slotMachine.length; i += 1) {
				slotMachine[i].initialMoneySlotMachine += removeMoney2;
			}
		}
		console.log(window.slotMachine);
	};

	this.takeMoneyFromCasino = function(amountOfMoney) {
		var totalMoneyCasino = this.getTotalMoneyCasino();
		var result = 0;
		var slotMachine2 = window.slotMachine.map(function(item) {
								return item.initialMoneySlotMachine;
							}).sort(function(firstItem, secondItem) {
								return secondItem - firstItem;
							});

		if(amountOfMoney > totalMoneyCasino) {
			console.log('In the casino total ' + totalMoneyCasino);
			return;
		}
		
		del:
		for(var i = 0; i < window.slotMachine.length; i += 1) {
			for(var j = 0; j < window.slotMachine.length; j += 1) {
				if(slotMachine2[i] == window.slotMachine[j].initialMoneySlotMachine && amountOfMoney >= window.slotMachine[j].initialMoneySlotMachine) {
					result += window.slotMachine[j].initialMoneySlotMachine;
					amountOfMoney -= window.slotMachine[j].initialMoneySlotMachine;
					window.slotMachine[j].initialMoneySlotMachine = 0;
					continue del;
				} else if (slotMachine2[i] == window.slotMachine[j].initialMoneySlotMachine && amountOfMoney < window.slotMachine[j].initialMoneySlotMachine) {
					result += amountOfMoney;
					window.slotMachine[j].initialMoneySlotMachine -= amountOfMoney;
					console.log(result);
					return result;
				}
			}
		}
	}
}

function SlotMachine (initialMoneySlotMachine) {
	this.initialMoneySlotMachine = initialMoneySlotMachine;

	this.getTotalMoneyMachine = function() {
		var total = this.initialMoneySlotMachine;
		this.initialMoneySlotMachine = 0;
		console.log(total);
		return total;
	};

	this.takeMoneyMachine = function(amountOfMoney) {
		var totalMoneyMachine = this.initialMoneySlotMachine;

		if(amountOfMoney > totalMoneyMachine) {
			console.log('In the machine total ' + totalMoneyMachine);
			return;
		}

		var moneyLeft = this.initialMoneySlotMachine - amountOfMoney;
		this.initialMoneySlotMachine = moneyLeft;
		console.log(amountOfMoney);
		return amountOfMoney;
	}

	this.putMoneyMachine = function(amountOfMoney) {
		this.initialMoneySlotMachine += amountOfMoney;
	}

	this.play = function(amountOfMoney) {
		if(this.initialMoneySlotMachine == 0) {
			console.log('No money');
			console.log('Take your money ' + amountOfMoney);
			return amountOfMoney;
		}

		this.putMoneyMachine(amountOfMoney);

		var slotOne = Math.floor(Math.random() * 10);
	    var slotTwo = Math.floor(Math.random() * 10);
	    var slotThree = Math.floor(Math.random() * 10);
	    var prize = 0;
	    var threeDigitNumber = '' + slotOne + slotTwo + slotThree;
	    console.log('The number ' + threeDigitNumber);

	    if (slotOne == this.one && slotTwo == this.two && slotThree == this.three) {
			this.play(amountOfMoney);
		} else if(slotOne == 7 && slotTwo == 7 && slotThree == 7) {
	    	prize = this.initialMoneySlotMachine;
	    	this.initialMoneySlotMachine = 0;
	    } else if(slotOne == slotTwo || slotTwo == slotThree || slotOne == slotThree) {
	    	prize = amountOfMoney*2;
	    	this.initialMoneySlotMachine -= prize;
	    } else if(slotOne == slotTwo && slotTwo == slotThree) {
	    	prize = amountOfMoney*5;
	    	this.initialMoneySlotMachine -= prize;
	    } else {
	    	prize;
	    }
	    console.log('Your prize is ' + prize);
	    return prize;
	}
}
// Method for a lucky machine
SlotMachine.prototype.lucky = function () {
		this.one = 7;
		this.two = 7;
		this.three = 7;
    }

var casino = new Casino(4, 80000);

// Simulation of the program
var getMoneyCasino = document.getElementById('getMoneyCasino');
var getNumberMachines = document.getElementById('getNumberMachines');
var addMachine = document.getElementById('addMachine');
var removeMachine = document.getElementById('removeMachine');
var takeMoneyCasino = document.getElementById('takeMoneyCasino');
var getMoneyMachine = document.getElementById('getMoneyMachine');
var takeMoney = document.getElementById('takeMoney');
var putMoney = document.getElementById('putMoney');
var playGame = document.getElementById('playGame');

getMoneyCasino.addEventListener('click', casino.getTotalMoneyCasino);

getNumberMachines.addEventListener('click', casino.getTotalNumberMachines);

addMachine.addEventListener('click', casino.addSlotMachine);

removeMachine.addEventListener('click', function() {
	var numRemove = prompt('Which machine will you want to remove? From 0 to ' + (slotMachine.length - 1));
	if(!numRemove) {
		return;
	} else if(numRemove > slotMachine.length - 1) {
		console.log('There is no such machine');
		return;
	}
	casino.removeMachine(parseInt(numRemove));
});

takeMoneyCasino.addEventListener('click', function() {
	var numMoneyCasino = prompt('How much money will you want to take?');
	if(!numMoneyCasino) {return;}
	casino.takeMoneyFromCasino(parseInt(numMoneyCasino));
});

getMoneyMachine.addEventListener('click', function() {
	var numMachine = prompt('From which machine to withdraw all money? From 0 to ' + (slotMachine.length - 1));
	if(!numMachine) {
		return;
	} else if(numMachine > slotMachine.length - 1) {
		console.log('There is no such machine');
		return;
	}
	slotMachine[parseInt(numMachine)].getTotalMoneyMachine();
});

takeMoney.addEventListener('click', function() {
	var numMachine = prompt('From which machine to withdraw money? From 0 to ' + (slotMachine.length - 1));
	var numMoneyMachine = prompt('How much money will you want to take?');
	if(!numMachine || !numMoneyMachine) {
		return;
	} else if(numMachine > slotMachine.length - 1) {
		console.log('There is no such machine');
		return;
	}
	slotMachine[parseInt(numMachine)].takeMoneyMachine(parseInt(numMoneyMachine));
});

putMoney.addEventListener('click', function() {
	var numMachine = prompt('In which machine do you want to put money? From 0 to ' + (slotMachine.length - 1));
	var numMoneyMachine = prompt('How much money do you want to put in machine?');
	if(!numMachine || !numMoneyMachine) {
		return;
	} else if(numMachine > slotMachine.length - 1) {
		console.log('There is no such machine');
		return;
	}
	slotMachine[parseInt(numMachine)].putMoneyMachine(parseInt(numMoneyMachine));
});

playGame.addEventListener('click', function() {
	var numMachine = prompt('On which machine would you like to play? From 0 to ' + (slotMachine.length - 1));
	var numMoneyMachine = prompt('How much money do you want to put in machine?');
	if(!numMachine || !numMoneyMachine) {
		return;
	} else if(numMachine > slotMachine.length - 1) {
		console.log('There is no such machine');
		return;
	}
	slotMachine[parseInt(numMachine)].play(parseInt(numMoneyMachine));
});


