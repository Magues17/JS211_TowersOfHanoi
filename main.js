'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};


//push and pop will be easit to run these arrarys 


// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // remove from old place and add to new place

let lastStack = stacks[startStack].pop();
  // lastStack variable is the last index of the startstack 
  stacks[endStack].push(lastStack);
  // now endstack will be the same array as it was but with the last index of startStack added onto end of it, which changes the array

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
if (stacks[endStack].length == 0) {return true}
  // if the endStack is empty, turn is legal (true)

// if the endStack is empty, turn is legal (true)

  else if (stacks[startStack].slice(-1) < stacks[endStack].slice(-1)) {return true}
  // if the startstack end is less than the endstack end, the turn is legal

  else {return false}
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // this function should win when the array on a stack other than 'a' is 4 , 3 , 2 , 1 
  // 4, 3, 2, 1 is four peices, so b or c must have 4 peices or equal to 4
 if (stacks["b"].length == 4 || stacks["c"].length == 4 ) return true;
 else return false;
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
 // Your code here
  let startingStack = stacks[startStack];
  // this is whatever the user choses to start at each time
  let endingStack = stacks[endStack];
// this is whatever user choses to end at per turn
if (isLegal(startStack, endStack) ) {movePiece(startStack, endStack);
if(checkForWin()) {console.log("Congrats!!!")};
}
else {console.log("Invalid Move!")}
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
