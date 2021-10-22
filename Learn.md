# Solidity by example
This quest is based on the examples see in the popular repository [solidity-by-example.org](https://solidity-by-example.org)

In this quest we're going to write code in simple increments and understand the basics of the Solidity programming language and its syntax. 

This quest assumes that you are aware of _what is Ethereum_ and are looking to build dapps. Solidity is the language in which you write decentralized apps (aka dapps). 

This Quest is best suited for those who like to learn the syntax before the concepts.

## Hello world
Write this code and run the test cases. Let's get a quick grasp of the programming language and syntax.
```
// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.3 and less than 0.9.0
pragma solidity ^0.8.3;

contract SolidityByExample {
    string public greet = "Hello World!";
}
```

- `pragma` defines which version of the compiler to use to compile this program (aka smart contract). Solidity language is rapidly improving and using the correct compiler version is important to avoid code incompatibility. 
- Like a class, we use `contract` in solidity
- Solidity is a typed language, `string` is a primitive data type.

```
run testcases 01.sh
```

## First Application
We'll create an application to increment or decrement a simple counter and see it's value.
```
    uint public count;

    // Function to get the current count
    function get() public view returns (uint) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        count -= 1;
    }
```

- `uint` is a primitive datatype for unsigned integers. This is a 256 bit number. The largest number it can store is `2^256 - 1`
- `count` is not initialized. But every variable is default initialized with a default value for that variable. In this case, it'd be `0`.
- `function inc() public` represents a function that is public and can be called from outside the contract - by other contracts or by users. 
- `function get() public view returns (uint)` when returning, you must specify the return type under `returns`. If the function doesn't make any modification to any variables in the contract, you can add another modifier called `view`. Notice `inc()` and `dec()` update the variable inside their function body - hence don't have the `view` modifier

```
  run testcases 02.sh
```

## Variables
```
contract Variables {
    // State variables are stored on the blockchain.
    string public text = "Hello";
    uint public num = 123;

    function doSomething() public {
        // Local variables are not saved to the blockchain.
        uint i = 456;

        // Here are some global variables
        uint timestamp = block.timestamp; // Current block timestamp
        address sender = msg.sender; // address of the caller
    }
}
```

There are 3 types of variables in Solidity
### local
- declared inside a function
- not stored on the blockchain
- if modificaitions are made only to the local variables, the function can be modified to `view`. 
### state
- declared outside a function
- stored on the blockchain database
- once a state variable is changed, the change will persist. The new updated value will be available to future calls.
### global 
- provides information about the blockchain
- These are populated by Ethereum for every function call. `block` and `msg` are some popular global variables. `block` represents information about the block (as in "block"chain) in which this transaction will be present. Every functioncall is a transaction and it must be present in a block to be considered as _executed_. `msg` is the object that is populated by Ethereum with information about the user calling a function. `msg.sender` is the user's address who called the function. `msg.value` is how much money was sent to this function - functions on Ethereum can accept money too in ETH. 

```
run testcases 03.sh
```

## Reading and writing a State Variable
```
contract SimpleStorage {
    // State variable to store a number
    uint public num;

    // You need to send a transaction to write to a state variable.
    function set(uint _num) public {
        num = _num;
    }

    // You can read from a state variable without sending a transaction.
    function get() public view returns (uint) {
        return num;
    }
}
```
We saw earlier saw that each function call is a new transaction. Every transaction has a transaction fees. 
To write or update a state variable you need to send a transaction & pay the fees. 

On the other hand, you can read state variables, for free, without any transaction fee.

```
run testcases 04.sh
```

## Ether and Wei
```
contract EtherUnits {
    uint public oneWei = 1 wei;
    // 1 wei is equal to 1
    bool public isOneWei = 1 wei == 1;

    uint public oneEther = 1 ether;
    // 1 ether is equal to 10^18 wei
    bool public isOneEther = 1 ether == 1e18;
}
```

Transactions' transaction fees  are paid with ether.

Similar to how one dollar is equal to 100 cent, one ether is equal to 10^18 wei.

Solidity has denomination modifiers for `uint`s `wei` and `ether`.
if you define `uint oneEther = 1 ether`, value of `oneEther` will be translated internally to `10^18`. 

All transaction fees and payments on ethereum happen in the smallest denomination that is a wei. it is not possible to have a smaller denomination than `1 wei`. you can't have `0.1 wei`. 

```
run testcases 05.sh
```

## Gas

*How much ether do you need to pay for a transaction?*
You pay gas spent * gas price amount of ether, where

`gas` is a unit of computation
`gas` spent is the total amount of `gas` used in a transaction
`gas price` is how much ether you are willing to pay per gas

Transactions (or function calls) are said to have executed only 
Transactions with higher gas price have higher priority to be included in a block.

Unspent gas will be refunded.

Gas Limit
There are 2 upper bounds to the amount of gas you can spend

gas limit (max amount of gas you're willing to use for your transaction, set by you)
block gas limit (max amount of gas allowed in a block, set by the network)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Gas {
    uint public i = 0;

    // Using up all of the gas that you send causes your transaction to fail.
    // State changes are undone.
    // Gas spent are not refunded.
    function forever() public {
        // Here we run a loop until all of the gas are spent
        // and the transaction fails
        while (true) {
            i += 1;
        }
    }
}
```








