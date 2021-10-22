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

## 
