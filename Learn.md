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

contract HelloWorld {
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
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Counter {
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
}
```

- `uint` is a primitive datatype for unsigned integers. This is a 256 bit number. The largest number it can store is `2^256 - 1`
- `count` is not initialized. But every variable is default initialized with a default value for that variable. In this case, it'd be `0`.
- `function inc() public` represents a function that is public and can be called from outside the contract - by other contracts or by users.
- `function get() public view returns (uint)` when returning, you must specify the return type under `returns`. If the function doesn't make any modification to any variables in the contract, you can add another modifier called `view`. Notice `inc()` and `dec()` update the variable inside their function body - hence don't have the `view` modifier

```
  run testcases 02.sh
```

## Primitive Data Types

Here we introduce you to some primitive data types available in Solidity.

* `bool` - Boolean type. It can have true/false values
* `uint` - Unsigned integers
* `int` - signed integers
* `address` - address holds the 20 byte value representing the size of an Ethereum address

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;
    
    contract Primitives {
        bool public boo = true;
    
        /*
        uint stands for unsigned integer, meaning non negative integers
        different sizes are available
            uint8   ranges from 0 to 2 ** 8 - 1
            uint16  ranges from 0 to 2 ** 16 - 1
            ...
            uint256 ranges from 0 to 2 ** 256 - 1
        */
        uint8 public u8 = 1;
        uint public u256 = 456;
        uint public u = 123; // uint is an alias for uint256
    
        /*
        Negative numbers are allowed for int types.
        Like uint, different ranges are available from int8 to int256
        
        int256 ranges from -2 ** 255 to 2 ** 255 - 1
        int128 ranges from -2 ** 127 to 2 ** 127 - 1
        */
        int8 public i8 = -1;
        int public i256 = 456;
        int public i = -123; // int is same as int256
    
        // minimum and maximum of int
        int public minInt = type(int).min;
        int public maxInt = type(int).max;
    
        address public addr = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
    
        // Default values
        // Unassigned variables have a default value
        bool public defaultBoo; // false
        uint public defaultUint; // 0
        int public defaultInt; // 0
        address public defaultAddr; // 0x0000000000000000000000000000000000000000
    }
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

## Constants

Constants are variables that cannot be modified.

Their value is hard coded and using constants can save gas cost.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Constants {
    // coding convention to uppercase constant variables
    address public constant MY_ADDRESS = 0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc;
    uint public constant MY_UINT = 123;
}
```

## Immutable
Immutable variables are like constants. Values of immutable variables can be set inside the constructor but cannot be modified afterwards.

Helpful for setting constant variables at time of deployment and not hardcoding like in case of `constant`.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Immutable {
    // coding convention to uppercase constant variables
    address public immutable MY_ADDRESS;
    uint public immutable MY_UINT;

    constructor(uint _myUint) {
        MY_ADDRESS = msg.sender;
        MY_UINT = _myUint;
    }
}
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

Transactions' transaction fees are paid with ether.

Similar to how one dollar is equal to 100 cent, one ether is equal to 10^18 wei.

Solidity has denomination modifiers for `uint`s `wei` and `ether`.
if you define `uint oneEther = 1 ether`, value of `oneEther` will be translated internally to `10^18`.

All transaction fees and payments on ethereum happen in the smallest denomination that is a wei. it is not possible to have a smaller denomination than `1 wei`. you can't have `0.1 wei`.

```
run testcases 05.sh
```

## Gas

_How much ether do you need to pay for a transaction?_
You pay gas spent \* gas price amount of ether, where

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

## if / else

Solidity support conditional statements `if`, `else if` and `else`.  
It also supports a ternary operator.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract IfElse {
    function foo(uint x) public pure returns (uint) {
        if (x < 10) {
            return 0;
        } else if (x < 20) {
            return 1;
        } else {
            return 2;
        }
    }

    function ternary(uint _x) public pure returns (uint) {
        // if (_x < 10) {
        //     return 1;
        // }
        // return 2;

        // shorthand way to write if / else statement
        return _x < 10 ? 1 : 2;
    }
}
```

## for and while loop

Solidity supports `for`, `while`, and `do while` loops.

Don't write loops that are unbounded as this can hit the gas limit, causing your transaction to fail.

For the reason above, `while` and `do while` loops are rarely used.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Loop {
    function loop() public {
        // for loop
        for (uint i = 0; i < 10; i++) {
            if (i == 3) {
                // Skip to next iteration with continue
                continue;
            }
            if (i == 5) {
                // Exit loop with break
                break;
            }
        }

        // while loop
        uint j;
        while (j < 10) {
            j++;
        }
    }
}
```

## Mapping

Maps are created with the syntax `mapping(keyType => valueType)`.

`keyType` can be value types such as `uint`, `address` or `bytes`.

`valueType` can be any type including another mapping or an array.

Mappings are not iterable.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Mapping {
    // Mapping from address to uint
    mapping(address => uint) public myMap;

    function get(address _addr) public view returns (uint) {
        // Mapping always returns a value.
        // If the value was never set, it will return the default value.
        return myMap[_addr];
    }

    function set(address _addr, uint _i) public {
        // Update the value at this address
        myMap[_addr] = _i;
    }

    function remove(address _addr) public {
        // Reset the value to the default value.
        delete myMap[_addr];
    }
}
```

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract NestedMapping {
    // Nested mapping (mapping from address to another mapping)
    mapping(address => mapping(uint => bool)) public nested;

    function get(address _addr1, uint _i) public view returns (bool) {
        // You can get values from a nested mapping
        // even when it is not initialized
        return nested[_addr1][_i];
    }

    function set(
        address _addr1,
        uint _i,
        bool _boo
    ) public {
        nested[_addr1][_i] = _boo;
    }

    function remove(address _addr1, uint _i) public {
        delete nested[_addr1][_i];
    }
}
```

## Array

Array can have a compile-time fixed size or a dynamic size.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Array {
    // Several ways to initialize an array
    uint[] public arr;
    uint[] public arr2 = [1, 2, 3];
    // Fixed sized array, all elements initialize to 0
    uint[10] public myFixedSizeArr;

    function get(uint i) public view returns (uint) {
        return arr[i];
    }

    // Solidity can return the entire array.
    // But this function should be avoided for
    // arrays that can grow indefinitely in length.
    function getArr() public view returns (uint[] memory) {
        return arr;
    }

    function push(uint i) public {
        // Append to array
        // This will increase the array length by 1.
        arr.push(i);
    }

    function pop() public {
        // Remove last element from array
        // This will decrease the array length by 1
        arr.pop();
    }

    function getLength() public view returns (uint) {
        return arr.length;
    }

    function remove(uint index) public {
        // Delete does not change the array length.
        // It resets the value at index to it's default value,
        // in this case 0
        delete arr[index];
    }

    // Deleting an element creates a gap in the array.
    // One trick to keep the array compact is to
    // move the last element into the place to delete.
    function removeCompact(uint index) public {
        // Move the last element into the place to delete
        arr[index] = arr[arr.length - 1];
        // Remove the last element
        arr.pop();
    }
}
```

## Enum

Solidity supports enumerables and they are useful to model choice and keep track of state.

Enums can be declared outside of a contract.

Enums bounds a variable to have one of only a few predefined values.  
This reduces the number of bugs in your code.

In this below example, Status enum is defined to have only five statuses.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Enum {
    // Enum representing shipping status
    enum Status {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }

    // Default value is the first element listed in
    // definition of the type, in this case "Pending"
    Status public status;

    // Returns uint
    // Pending  - 0
    // Shipped  - 1
    // Accepted - 2
    // Rejected - 3
    // Canceled - 4
    function get() public view returns (Status) {
        return status;
    }

    // Update status by passing uint into input
    function set(Status _status) public {
        status = _status;
    }

    // You can update to a specific enum like this
    function cancel() public {
        status = Status.Canceled;
    }

    // delete resets the enum to its first value, 0
    function reset() public {
        delete status;
    }
}
```

### Declaring and importing Enum

File that the enum is declared in

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

enum Status {
    Pending,
    Shipped,
    Accepted,
    Rejected,
    Canceled
}
```

File that imports the enum above

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./EnumDeclaration.sol";

contract Enum {
    Status public status;
}
```

## Structs

You can define your own type by creating a `struct`.

They are useful for grouping together related data.

Structs can be declared outside of a contract and imported in another contract.

In the example below, we declare a Todo struct using `struct` keyword with two attributes text and completed.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Todos {
    struct Todo {
        string text;
        bool completed;
    }

    // An array of 'Todo' structs
    Todo[] public todos;

    function create(string memory _text) public {
        // 3 ways to initialize a struct
        // - calling it like a function
        todos.push(Todo(_text, false));

        // key value mapping
        todos.push(Todo({text: _text, completed: false}));

        // initialize an empty struct and then update it
        Todo memory todo;
        todo.text = _text;
        // todo.completed initialized to false

        todos.push(todo);
    }

    // Solidity automatically created a getter for 'todos' so
    // you don't actually need this function.
    function get(uint _index) public view returns (string memory text, bool completed) {
        Todo storage todo = todos[_index];
        return (todo.text, todo.completed);
    }

    // update text
    function update(uint _index, string memory _text) public {
        Todo storage todo = todos[_index];
        todo.text = _text;
    }

    // update completed
    function toggleCompleted(uint _index) public {
        Todo storage todo = todos[_index];
        todo.completed = !todo.completed;
    }
}
```

### Declaring and importing Struct

File that the struct is declared in

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

struct Todo {
    string text;
    bool completed;
}
```

File that imports the struct above

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./StructDeclaration.sol";

contract Todos {
    // An array of 'Todo' structs
    Todo[] public todos;
}
```

## Data Locations - Storage, Memory and Calldata

The amount of gas you will use during a transaction depends on the data location you use in your smart contract.
Hence, using appropriate location matters for having an optimized code that uses a minimum amount of gas.

Variables are declared as either `storage`, `memory` or `calldata` to explicitly specify the location of the data.

- `storage`
  - variable is a state variable i.e. stored on blockchain
  - it is permanent, persistant data and can be accessed into all functions within the contract
  - it is quite expensive compared to other data locations
- `memory`
  - variable is in memory and it exists while a function is being called
  - it is temporary data and cheaper than the storage location
  - think of it as a RAM of each individual function
- `calldata`
  - special data location that contains function arguments, only available for `external` functions
  - it is non-modifiable and non-persistant data location

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract DataLocations {
    uint[] public arr;
    mapping(uint => address) map;
    struct MyStruct {
        uint foo;
    }
    mapping(uint => MyStruct) myStructs;

    function f() public {
        // call _f with state variables
        _f(arr, map, myStructs[1]);

        // get a struct from a mapping
        MyStruct storage myStruct = myStructs[1];
        // create a struct in memory
        MyStruct memory myMemStruct = MyStruct(0);
    }

    function _f(
        uint[] storage _arr,
        mapping(uint => address) storage _map,
        MyStruct storage _myStruct
    ) internal {
        // do something with storage variables
    }

    // You can return memory variables
    function g(uint[] memory _arr) public returns (uint[] memory) {
        // do something with memory array
    }

    function h(uint[] calldata _arr) external {
        // do something with calldata array
    }
}
```

## Function

There are several ways to return outputs from a function.

Public functions cannot accept certain data types as inputs or outputs

Unlike other languages, solidity supports returning multiple return values from a function.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Function {
    // Functions can return multiple values.
    function returnMany()
        public
        pure
        returns (
            uint,
            bool,
            uint
        )
    {
        return (1, true, 2);
    }

    // Return values can be named.
    function named()
        public
        pure
        returns (
            uint x,
            bool b,
            uint y
        )
    {
        return (1, true, 2);
    }

    // Return values can be assigned to their name.
    // In this case the return statement can be omitted.
    function assigned()
        public
        pure
        returns (
            uint x,
            bool b,
            uint y
        )
    {
        x = 1;
        b = true;
        y = 2;
    }

    // Use destructing assignment when calling another
    // function that returns multiple values.
    function destructingAssigments()
        public
        pure
        returns (
            uint,
            bool,
            uint,
            uint,
            uint
        )
    {
        (uint i, bool b, uint j) = returnMany();

        // Values can be left out.
        (uint x, , uint y) = (4, 5, 6);

        return (i, b, j, x, y);
    }

    // Cannot use map for neither input nor output

    // Can use array for input
    function arrayInput(uint[] memory _arr) public {}

    // Can use array for output
    uint[] public arr;

    function arrayOutput() public view returns (uint[] memory) {
        return arr;
    }
}
```

## View and Pure Functions

Getter functions can be declared `view` or `pure`.

`View` function declares that no state will be changed.

`Pure` function declares that no state variable will be changed or read.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract ViewAndPure {
        uint public x = 1;

        // Promise not to modify the state.
        function addToX(uint y) public view returns (uint) {
            return x + y;
        }

        // Promise not to modify or read from the state.
        function add(uint i, uint j) public pure returns (uint) {
            return i + j;
        }
    }
```

## Error

An error will undo all changes made to the state during a transaction.

You can throw an error by calling `require`, `revert` or `assert`.

- `require` is used to validate inputs and conditions before execution.
- `revert` is similar to `require`. See the code below for details.
- `assert` is used to check for code that should never be false. Failing assertion probably means that there is a bug.

Use custom error to save gas.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract Error {
        function testRequire(uint _i) public pure {
            // Require should be used to validate conditions such as:
            // - inputs
            // - conditions before execution
            // - return values from calls to other functions
            require(_i > 10, "Input must be greater than 10");
        }

        function testRevert(uint _i) public pure {
            // Revert is useful when the condition to check is complex.
            // This code does the exact same thing as the example above
            if (_i <= 10) {
                revert("Input must be greater than 10");
            }
        }

        uint public num;

        function testAssert() public view {
            // Assert should only be used to test for internal errors,
            // and to check invariants.

            // Here we assert that num is always equal to 0
            // since it is impossible to update the value of num
            assert(num == 0);
        }

        // custom error
        error InsufficientBalance(uint balance, uint withdrawAmount);

        function testCustomError(uint _withdrawAmount) public view {
            uint bal = address(this).balance;
            if (bal < _withdrawAmount) {
                revert InsufficientBalance({balance: bal, withdrawAmount: _withdrawAmount});
            }
        }
    }
```

Here is another example

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract Account {
        uint public balance;
        uint public constant MAX_UINT = 2**256 - 1;

        function deposit(uint _amount) public {
            uint oldBalance = balance;
            uint newBalance = balance + _amount;

            // balance + _amount does not overflow if balance + _amount >= balance
            require(newBalance >= oldBalance, "Overflow");

            balance = newBalance;

            assert(balance >= oldBalance);
        }

        function withdraw(uint _amount) public {
            uint oldBalance = balance;

            // balance - _amount does not underflow if balance >= _amount
            require(balance >= _amount, "Underflow");

            if (balance < _amount) {
                revert("Underflow");
            }

            balance -= _amount;

            assert(balance <= oldBalance);
        }
    }
```

## Function Modifier

Modifiers are code that can be run before and / or after a function call.  
They are used to modify the behaviour of a function.

Modifiers can be used to:

- Restrict access
- Validate inputs
- Guard against reentrancy hack

The function body is inserted where the special symbol `_;` appears in the modifier definition.  
So if the condition of modifier is satisfied while calling this function, the function is executed and otherwise, an exception is thrown.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract FunctionModifier {
        // We will use these variables to demonstrate how to use
        // modifiers.
        address public owner;
        uint public x = 10;
        bool public locked;

        constructor() {
            // Set the transaction sender as the owner of the contract.
            owner = msg.sender;
        }

        // Modifier to check that the caller is the owner of
        // the contract.
        modifier onlyOwner() {
            require(msg.sender == owner, "Not owner");
            // Underscore is a special character only used inside
            // a function modifier and it tells Solidity to
            // execute the rest of the code.
            _;
        }

        // Modifiers can take inputs. This modifier checks that the
        // address passed in is not the zero address.
        modifier validAddress(address _addr) {
            require(_addr != address(0), "Not valid address");
            _;
        }

        function changeOwner(address _newOwner) public onlyOwner validAddress(_newOwner) {
            owner = _newOwner;
        }

        // Modifiers can be called before and / or after a function.
        // This modifier prevents a function from being called while
        // it is still executing.
        modifier noReentrancy() {
            require(!locked, "No reentrancy");

            locked = true;
            _;
            locked = false;
        }

        function decrement(uint i) public noReentrancy {
            x -= i;

            if (i > 1) {
                decrement(i - 1);
            }
        }
    }
```

## Events

`Event` is an inheritable member of a contract.  
`Events` allow logging to the Ethereum blockchain. Some use cases for events are:

- Listening for events and updating user interface
- A cheap form of storage

An event generated is not accessible from within contracts, not even the one which created and emitted them.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Event {
    // Event declaration
    // Up to 3 parameters can be indexed.
    // Indexed parameters helps you filter the logs by the indexed parameter
    event Log(address indexed sender, string message);
    event AnotherLog();

    function test() public {
        emit Log(msg.sender, "Hello World!");
        emit AnotherLog();
    }
}
```

## Constructor

A `constructor` is an optional function that is executed upon contract creation.

Some characteristics of a constructor:

- A contract can have only one constructor.
- It is used to initialize state variables of a contract.
- A constructor can be either public or internal.

Here are examples of how to pass arguments to `constructors`.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

// Base contract X
contract X {
    string public name;

    constructor(string memory _name) {
        name = _name;
    }
}

// Base contract Y
contract Y {
    string public text;

    constructor(string memory _text) {
        text = _text;
    }
}

// There are 2 ways to initialize parent contract with parameters.

// Pass the parameters here in the inheritance list.
contract B is X("Input to X"), Y("Input to Y") {

}

contract C is X, Y {
    // Pass the parameters here in the constructor,
    // similar to function modifiers.
    constructor(string memory _name, string memory _text) X(_name) Y(_text) {}
}

// Parent constructors are always called in the order of inheritance
// regardless of the order of parent contracts listed in the
// constructor of the child contract.

// Order of constructors called:
// 1. Y
// 2. X
// 3. D
contract D is X, Y {
    constructor() X("X was called") Y("Y was called") {}
}

// Order of constructors called:
// 1. Y
// 2. X
// 3. E
contract E is X, Y {
    constructor() Y("Y was called") X("X was called") {}
}
```

## Inheritance

Solidity supports multiple inheritance. Contracts can inherit other contract by using the `is` keyword.

Function that is going to be overridden by a child contract must be declared as `virtual`.

Function that is going to override a parent function must use the keyword `override`.

Order of inheritance is important.

You have to list the parent contracts in the order from “most base-like” to “most derived”.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

/* Graph of inheritance
    A
   / \
  B   C
 / \ /
F  D,E

*/

contract A {
    function foo() public pure virtual returns (string memory) {
        return "A";
    }
}

// Contracts inherit other contracts by using the keyword 'is'.
contract B is A {
    // Override A.foo()
    function foo() public pure virtual override returns (string memory) {
        return "B";
    }
}

contract C is A {
    // Override A.foo()
    function foo() public pure virtual override returns (string memory) {
        return "C";
    }
}

// Contracts can inherit from multiple parent contracts.
// When a function is called that is defined multiple times in
// different contracts, parent contracts are searched from
// right to left, and in depth-first manner.

contract D is B, C {
    // D.foo() returns "C"
    // since C is the right most parent contract with function foo()
    function foo() public pure override(B, C) returns (string memory) {
        return super.foo();
    }
}

contract E is C, B {
    // E.foo() returns "B"
    // since B is the right most parent contract with function foo()
    function foo() public pure override(C, B) returns (string memory) {
        return super.foo();
    }
}

// Inheritance must be ordered from “most base-like” to “most derived”.
// Swapping the order of A and B will throw a compilation error.
contract F is A, B {
    function foo() public pure override(A, B) returns (string memory) {
        return super.foo();
    }
}
```

## Shadowing Inherited State Variables

Unlike functions, state variables cannot be overridden by re-declaring it in the child contract.

Let's learn how to correctly override inherited state variables.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Parent {
    string public name = "Contract Parent";

    function getName() public view returns (string memory) {
        return name;
    }
}

// Shadowing is disallowed in Solidity 0.6
// This will not compile
// contract B is Parent {
//     string public name = "Contract B";
// }

contract Child is Parent {
    // This is the correct way to override inherited state variables.
    constructor() {
        name = "Contract Child";
    }

    // C.getName returns "Contract Child"
}
```

## Calling Parent Contracts

Parent contracts can be called directly, or by using the keyword `super`.

By using the keyword `super`, all of the immediate parent contracts will be called.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

/* Inheritance tree
   A
 /  \
B   C
 \ /
  D
*/

contract A {
    // This is called an event. You can emit events from your function
    // and they are logged into the transaction log.
    // In our case, this will be useful for tracing function calls.
    event Log(string message);

    function foo() public virtual {
        emit Log("A.foo called");
    }

    function bar() public virtual {
        emit Log("A.bar called");
    }
}

contract B is A {
    function foo() public virtual override {
        emit Log("B.foo called");
        A.foo();
    }

    function bar() public virtual override {
        emit Log("B.bar called");
        super.bar();
    }
}

contract C is A {
    function foo() public virtual override {
        emit Log("C.foo called");
        A.foo();
    }

    function bar() public virtual override {
        emit Log("C.bar called");
        super.bar();
    }
}

contract D is B, C {
    // Try:
    // - Call D.foo and check the transaction logs.
    //   Although D inherits A, B and C, it only called C and then A.
    // - Call D.bar and check the transaction logs
    //   D called C, then B, and finally A.
    //   Although super was called twice (by B and C) it only called A once.

    function foo() public override(B, C) {
        super.foo();
    }

    function bar() public override(B, C) {
        super.bar();
    }
}
```

## Visibility

Functions and state variables have to declare whether they are accessible by other contracts.

Functions can be declared as

- `public` - any contract and account can call
- `private` - only inside the contract that defines the function
- `internal` - only inside contract that inherits an `internal` function
- `external` - only other contracts and accounts can call

State variables can be declared as `public`, `private`, or `internal` but not `external`.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract BaseVisibility {
    // Private function can only be called
    // - inside this contract
    // Contracts that inherit this contract cannot call this function.
    function privateFunc() private pure returns (string memory) {
        return "private function called";
    }

    function testPrivateFunc() public pure returns (string memory) {
        return privateFunc();
    }

    // Internal function can be called
    // - inside this contract
    // - inside contracts that inherit this contract
    function internalFunc() internal pure returns (string memory) {
        return "internal function called";
    }

    function testInternalFunc() public pure virtual returns (string memory) {
        return internalFunc();
    }

    // Public functions can be called
    // - inside this contract
    // - inside contracts that inherit this contract
    // - by other contracts and accounts
    function publicFunc() public pure returns (string memory) {
        return "public function called";
    }

    // External functions can only be called
    // - by other contracts and accounts
    function externalFunc() external pure returns (string memory) {
        return "external function called";
    }

    // This function will not compile since we're trying to call
    // an external function here.
    // function testExternalFunc() public pure returns (string memory) {
    //     return externalFunc();
    // }

    // State variables
    string private privateVar = "my private variable";
    string internal internalVar = "my internal variable";
    string public publicVar = "my public variable";
    // State variables cannot be external so this code won't compile.
    // string external externalVar = "my external variable";
}

contract ChildVisibility is BaseVisibility {
    // Inherited contracts do not have access to private functions
    // and state variables.
    // function testPrivateFunc() public pure returns (string memory) {
    //     return privateFunc();
    // }

    // Internal function call be called inside child contracts.
    function testInternalFunc() public pure override returns (string memory) {
        return internalFunc();
    }
}
```

## Interface

You can interact with other contracts by declaring an `Interface`.

Interface

- cannot have any functions implemented
- can inherit from other interfaces
- all declared functions must be external
- cannot declare a constructor
- cannot declare state variables

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract Counter {
        uint public count;

        function increment() external {
            count += 1;
        }
    }

    interface ICounter {
        function count() external view returns (uint);

        function increment() external;
    }

    contract MyContract {
        function incrementCounter(address _counter) external {
            ICounter(_counter).increment();
        }

        function getCount(address _counter) external view returns (uint) {
            return ICounter(_counter).count();
        }
    }

    // Uniswap example
    interface UniswapV2Factory {
        function getPair(address tokenA, address tokenB)
            external
            view
            returns (address pair);
    }

    interface UniswapV2Pair {
        function getReserves()
            external
            view
            returns (
                uint112 reserve0,
                uint112 reserve1,
                uint32 blockTimestampLast
            );
    }

    contract UniswapExample {
        address private factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
        address private dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
        address private weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

        function getTokenReserves() external view returns (uint, uint) {
            address pair = UniswapV2Factory(factory).getPair(dai, weth);
            (uint reserve0, uint reserve1, ) = UniswapV2Pair(pair).getReserves();
            return (reserve0, reserve1);
        }
    }
```

## Payable

Functions and addresses declared `payable` can receive `ether` into the contract.

`msg.value` variable can be used to access the amount of ether sent to a `payable` function.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract Payable {
        // Payable address can receive Ether
        address payable public owner;

        // Payable constructor can receive Ether
        constructor() payable {
            owner = payable(msg.sender);
        }

        // Function to deposit Ether into this contract.
        // Call this function along with some Ether.
        // The balance of this contract will be automatically updated.
        function deposit() public payable {}

        // Call this function along with some Ether.
        // The function will throw an error since this function is not payable.
        function notPayable() public {}

        // Function to withdraw all Ether from this contract.
        function withdraw() public {
            // get the amount of Ether stored in this contract
            uint amount = address(this).balance;

            // send all Ether to owner
            // Owner can receive Ether since the address of owner is payable
            (bool success, ) = owner.call{value: amount}("");
            require(success, "Failed to send Ether");
        }

        // Function to transfer Ether from this contract to address from input
        function transfer(address payable _to, uint _amount) public {
            // Note that "to" is declared as payable
            (bool success, ) = _to.call{value: _amount}("");
            require(success, "Failed to send Ether");
        }
    }
```

## Sending Ether (transfer, send, call)

### How to send Ether?

You can send Ether to other contracts by

- `transfer` (2300 gas, throws error)
- `send` (2300 gas, returns bool)
- `call` (forward all gas or set gas, returns bool)

### How to receive Ether?

A contract receiving Ether must have at least one of the functions below

- `receive() external payable`
- `fallback() external payable`

`receive()` is called if `msg.data` is empty, otherwise `fallback()` is called.

### Which method should you use?

`call` in combination with re-entrancy guard is the recommended method to use after December 2019.

Guard against re-entrancy by

- making all state changes before calling other contracts
- using re-entrancy guard modifier

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract ReceiveEther {
        /*
        Which function is called, fallback() or receive()?

               send Ether
                   |
             msg.data is empty?
                  / \
                yes  no
                /     \
    receive() exists?  fallback()
             /   \
            yes   no
            /      \
        receive()   fallback()
        */

        // Function to receive Ether. msg.data must be empty
        receive() external payable {}

        // Fallback function is called when msg.data is not empty
        fallback() external payable {}

        function getBalance() public view returns (uint) {
            return address(this).balance;
        }
    }

    contract SendEther {
        function sendViaTransfer(address payable _to) public payable {
            // This function is no longer recommended for sending Ether.
            _to.transfer(msg.value);
        }

        function sendViaSend(address payable _to) public payable {
            // Send returns a boolean value indicating success or failure.
            // This function is not recommended for sending Ether.
            bool sent = _to.send(msg.value);
            require(sent, "Failed to send Ether");
        }

        function sendViaCall(address payable _to) public payable {
            // Call returns a boolean value indicating success or failure.
            // This is the current recommended method to use.
            (bool sent, bytes memory data) = _to.call{value: msg.value}("");
            require(sent, "Failed to send Ether");
        }
    }
```

## Fallback

`fallback` is a function that does not take any arguments and does not return anything.

It is executed either when

- a function that does not exist is called or
- Ether is sent directly to a contract but `receive()` does not exist or `msg.data` is not empty

`fallback` has a 2300 gas limit when called by `transfer` or `send`.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract Fallback {
        event Log(uint gas);

        // Fallback function must be declared as external.
        fallback() external payable {
            // send / transfer (forwards 2300 gas to this fallback function)
            // call (forwards all of the gas)
            emit Log(gasleft());
        }

        // Helper function to check the balance of this contract
        function getBalance() public view returns (uint) {
            return address(this).balance;
        }
    }

    contract SendToFallback {
        function transferToFallback(address payable _to) public payable {
            _to.transfer(msg.value);
        }

        function callFallback(address payable _to) public payable {
            (bool sent, ) = _to.call{value: msg.value}("");
            require(sent, "Failed to send Ether");
        }
    }
```

## Call

`call` is a low level function to interact with other contracts.

This is the recommended method to use when you're just sending Ether via calling the `fallback` function.

However it is not the recommend way to call existing functions.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract Receiver {
        event Received(address caller, uint amount, string message);

        fallback() external payable {
            emit Received(msg.sender, msg.value, "Fallback was called");
        }

        function foo(string memory _message, uint _x) public payable returns (uint) {
            emit Received(msg.sender, msg.value, _message);

            return _x + 1;
        }
    }

    contract Caller {
        event Response(bool success, bytes data);

        // Let's imagine that contract B does not have the source code for
        // contract A, but we do know the address of A and the function to call.
        function testCallFoo(address payable _addr) public payable {
            // You can send ether and specify a custom gas amount
            (bool success, bytes memory data) = _addr.call{value: msg.value, gas: 5000}(
                abi.encodeWithSignature("foo(string,uint256)", "call foo", 123)
            );

            emit Response(success, data);
        }

        // Calling a function that does not exist triggers the fallback function.
        function testCallDoesNotExist(address _addr) public {
            (bool success, bytes memory data) = _addr.call(
                abi.encodeWithSignature("doesNotExist()")
            );

            emit Response(success, data);
        }
    }
```

## Delegatecall

`delegatecall` is a low level function similar to `call`.

When contract `A` executes `delegatecall` to contract `B`, `B`'s code is executed

with contract `A`'s storage, `msg.sender` and `msg.value`.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    // NOTE: Deploy this contract first
    contract B {
        // NOTE: storage layout must be the same as contract A
        uint public num;
        address public sender;
        uint public value;

        function setVars(uint _num) public payable {
            num = _num;
            sender = msg.sender;
            value = msg.value;
        }
    }

    contract A {
        uint public num;
        address public sender;
        uint public value;

        function setVars(address _contract, uint _num) public payable {
            // A's storage is set, B is not modified.
            (bool success, bytes memory data) = _contract.delegatecall(
                abi.encodeWithSignature("setVars(uint256)", _num)
            );
        }
    }
```

## Function Selector

When a function is called, the first 4 bytes of `calldata` specifies which function to call.

This 4 bytes is called a function selector.

Take for example, this code below. It uses `call` to execute `transfer` on a contract at the address `addr`.

```
    addr.call(abi.encodeWithSignature("transfer(address,uint256)", 0xSomeAddress, 123))
```

The first 4 bytes returned from `abi.encodeWithSignature(....)` is the function selector.

Perhaps you can save a tiny amount of gas if you precompute and inline the function selector in your code?

Here is how the function selector is computed.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract FunctionSelector {
        /*
        "transfer(address,uint256)"
        0xa9059cbb
        "transferFrom(address,address,uint256)"
        0x23b872dd
        */
        function getSelector(string calldata _func) external pure returns (bytes4) {
            return bytes4(keccak256(bytes(_func)));
        }
    }
```

## Calling Other Contract

Contract can call other contracts in 2 ways.

The easiest way to is to just call it, like `A.foo(x, y, z)`.

Another way to call other contracts is to use the low-level `call`.

This method is not recommended.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract Callee {
        uint public x;
        uint public value;

        function setX(uint _x) public returns (uint) {
            x = _x;
            return x;
        }

        function setXandSendEther(uint _x) public payable returns (uint, uint) {
            x = _x;
            value = msg.value;

            return (x, value);
        }
    }

    contract Caller {
        function setX(Callee _callee, uint _x) public {
            uint x = _callee.setX(_x);
        }

        function setXFromAddress(address _addr, uint _x) public {
            Callee callee = Callee(_addr);
            callee.setX(_x);
        }

        function setXandSendEther(Callee _callee, uint _x) public payable {
            (uint x, uint value) = _callee.setXandSendEther{value: msg.value}(_x);
        }
    }
```

## Contract that Creates other Contracts

Contracts can be created by other contracts using the `new` keyword. Since 0.8.0, `new` keyword supports `create2` feature by specifying `salt` options.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract Car {
        address public owner;
        string public model;
        address public carAddr;

        constructor(address _owner, string memory _model) payable {
            owner = _owner;
            model = _model;
            carAddr = address(this);
        }
    }

    contract CarFactory {
        Car[] public cars;

        function create(address _owner, string memory _model) public {
            Car car = new Car(_owner, _model);
            cars.push(car);
        }

        function createAndSendEther(address _owner, string memory _model) public payable {
            Car car = (new Car){value: msg.value}(_owner, _model);
            cars.push(car);
        }

        function create2(address _owner, string memory _model, bytes32 _salt) public {
            Car car = (new Car){salt: _salt}(_owner, _model);
            cars.push(car);
        }

        function create2AndSendEther(address _owner, string memory _model, bytes32 _salt) public payable {
            Car car = (new Car){value: msg.value, salt: _salt}(_owner, _model);
            cars.push(car);
        }

        function getCar(uint _index)
            public
            view
            returns (
                address owner,
                string memory model,
                address carAddr,
                uint balance
            )
        {
            Car car = cars[_index];

            return (car.owner(), car.model(), car.carAddr(), address(car).balance);
        }
    }
```

## Try Catch

`try / catch` can only catch errors from external function calls and contract creation.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    // External contract used for try / catch examples
    contract Foo {
        address public owner;

        constructor(address _owner) {
            require(_owner != address(0), "invalid address");
            assert(_owner != 0x0000000000000000000000000000000000000001);
            owner = _owner;
        }

        function myFunc(uint x) public pure returns (string memory) {
            require(x != 0, "require failed");
            return "my func was called";
        }
    }

    contract Bar {
        event Log(string message);
        event LogBytes(bytes data);

        Foo public foo;

        constructor() {
            // This Foo contract is used for example of try catch with external call
            foo = new Foo(msg.sender);
        }

        // Example of try / catch with external call
        // tryCatchExternalCall(0) => Log("external call failed")
        // tryCatchExternalCall(1) => Log("my func was called")
        function tryCatchExternalCall(uint _i) public {
            try foo.myFunc(_i) returns (string memory result) {
                emit Log(result);
            } catch {
                emit Log("external call failed");
            }
        }

        // Example of try / catch with contract creation
        // tryCatchNewContract(0x0000000000000000000000000000000000000000) => Log("invalid address")
        // tryCatchNewContract(0x0000000000000000000000000000000000000001) => LogBytes("")
        // tryCatchNewContract(0x0000000000000000000000000000000000000002) => Log("Foo created")
        function tryCatchNewContract(address _owner) public {
            try new Foo(_owner) returns (Foo foo) {
                // you can use variable foo here
                emit Log("Foo created");
            } catch Error(string memory reason) {
                // catch failing revert() and require()
                emit Log(reason);
            } catch (bytes memory reason) {
                // catch failing assert()
                emit LogBytes(reason);
            }
        }
    }
```

## Import

You can import local and external files in Solidity.

### Local

Here is our folder structure.

    └── Import.sol
    └── Foo.sol

Foo.sol

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract Foo {
        string public name = "Foo";
    }
```

Import.sol

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    // import Foo.sol from current directory
    import "./Foo.sol";

    contract Import {
        // Initialize Foo.sol
        Foo public foo = new Foo();

        // Test Foo.sol by getting it's name.
        function getFooName() public view returns (string memory) {
            return foo.name();
        }
    }
```

## Library

Libraries are similar to contracts, but you can't declare any state variable and you can't send ether.

A library is embedded into the contract if all library functions are internal.

Otherwise the library must be deployed and then linked before the contract is deployed.

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    library SafeMath {
        function add(uint x, uint y) internal pure returns (uint) {
            uint z = x + y;
            require(z >= x, "uint overflow");

            return z;
        }
    }

    library Math {
        function sqrt(uint y) internal pure returns (uint z) {
            if (y > 3) {
                z = y;
                uint x = y / 2 + 1;
                while (x < z) {
                    z = x;
                    x = (y / x + x) / 2;
                }
            } else if (y != 0) {
                z = 1;
            }
            // else z = 0 (default value)
        }
    }

    contract TestSafeMath {
        using SafeMath for uint;

        uint public MAX_UINT = 2**256 - 1;

        function testAdd(uint x, uint y) public pure returns (uint) {
            return x.add(y);
        }

        function testSquareRoot(uint x) public pure returns (uint) {
            return Math.sqrt(x);
        }
    }

    // Array function to delete element at index and re-organize the array
    // so that their are no gaps between the elements.
    library Array {
        function remove(uint[] storage arr, uint index) public {
            // Move the last element into the place to delete
            require(arr.length > 0, "Can't remove from empty array");
            arr[index] = arr[arr.length - 1];
            arr.pop();
        }
    }

    contract TestArray {
        using Array for uint[];

        uint[] public arr;

        function testArrayRemove() public {
            for (uint i = 0; i < 3; i++) {
                arr.push(i);
            }

            arr.remove(1);

            assert(arr.length == 2);
            assert(arr[0] == 0);
            assert(arr[1] == 2);
        }
    }
```

## Hashing with Keccak256

`keccak256` computes the Keccak-256 hash of the input.

Some use cases are:

- Creating a deterministic unique ID from a input
- Commit-Reveal scheme
- Compact cryptographic signature (by signing the hash instead of a larger input)

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract HashFunction {
        function hash(
            string memory _text,
            uint _num,
            address _addr
        ) public pure returns (bytes32) {
            return keccak256(abi.encodePacked(_text, _num, _addr));
        }

        // Example of hash collision
        // Hash collision can occur when you pass more than one dynamic data type
        // to abi.encodePacked. In such case, you should use abi.encode instead.
        function collision(string memory _text, string memory _anotherText)
            public
            pure
            returns (bytes32)
        {
            // encodePacked(AAA, BBB) -> AAABBB
            // encodePacked(AA, ABBB) -> AAABBB
            return keccak256(abi.encodePacked(_text, _anotherText));
        }
    }

    contract GuessTheMagicWord {
        bytes32 public answer =
            0x60298f78cc0b47170ba79c10aa3851d7648bd96f2f8e46a19dbc777c36fb0c00;

        // Magic word is "Solidity"
        function guess(string memory _word) public view returns (bool) {
            return keccak256(abi.encodePacked(_word)) == answer;
        }
    }
```

## Verifying Signature

Messages can be signed off chain and then verified on chain using a smart contract.

### Signature Verification:

#### How to Sign and Verify

Signing:

1. Create message to sign
2. Hash the message
3. Sign the hash (off chain, keep your private key secret)

Verify:

1. Recreate hash from the original message
2. Recover signer from signature and hash
3. Compare recovered signer to claimed signer

```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.3;

    contract VerifySignature {
        /* 1. Unlock MetaMask account
        ethereum.enable()
        */

        /* 2. Get message hash to sign
        getMessageHash(
            0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C,
            123,
            "coffee and donuts",
            1
        )

        hash = "0xcf36ac4f97dc10d91fc2cbb20d718e94a8cbfe0f82eaedc6a4aa38946fb797cd"
        */
        function getMessageHash(
            address _to,
            uint _amount,
            string memory _message,
            uint _nonce
        ) public pure returns (bytes32) {
            return keccak256(abi.encodePacked(_to, _amount, _message, _nonce));
        }

        /* 3. Sign message hash
        # using browser
        account = "copy paste account of signer here"
        ethereum.request({ method: "personal_sign", params: [account, hash]}).then(console.log)

        # using web3
        web3.personal.sign(hash, web3.eth.defaultAccount, console.log)

        Signature will be different for different accounts
        0x993dab3dd91f5c6dc28e17439be475478f5635c92a56e17e82349d3fb2f166196f466c0b4e0c146f285204f0dcb13e5ae67bc33f4b888ec32dfe0a063e8f3f781b
        */
        function getEthSignedMessageHash(bytes32 _messageHash)
            public
            pure
            returns (bytes32)
        {
            /*
            Signature is produced by signing a keccak256 hash with the following format:
            "\x19Ethereum Signed Message\n" + len(msg) + msg
            */
            return
                keccak256(
                    abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
                );
        }

        /* 4. Verify signature
        signer = 0xB273216C05A8c0D4F0a4Dd0d7Bae1D2EfFE636dd
        to = 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C
        amount = 123
        message = "coffee and donuts"
        nonce = 1
        signature =
            0x993dab3dd91f5c6dc28e17439be475478f5635c92a56e17e82349d3fb2f166196f466c0b4e0c146f285204f0dcb13e5ae67bc33f4b888ec32dfe0a063e8f3f781b
        */
        function verify(
            address _signer,
            address _to,
            uint _amount,
            string memory _message,
            uint _nonce,
            bytes memory signature
        ) public pure returns (bool) {
            bytes32 messageHash = getMessageHash(_to, _amount, _message, _nonce);
            bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

            return recoverSigner(ethSignedMessageHash, signature) == _signer;
        }

        function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature)
            public
            pure
            returns (address)
        {
            (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

            return ecrecover(_ethSignedMessageHash, v, r, s);
        }

        function splitSignature(bytes memory sig)
            public
            pure
            returns (
                bytes32 r,
                bytes32 s,
                uint8 v
            )
        {
            require(sig.length == 65, "invalid signature length");

            assembly {
                /*
                First 32 bytes stores the length of the signature

                add(sig, 32) = pointer of sig + 32
                effectively, skips first 32 bytes of signature

                mload(p) loads next 32 bytes starting at the memory address p into memory
                */

                // first 32 bytes, after the length prefix
                r := mload(add(sig, 32))
                // second 32 bytes
                s := mload(add(sig, 64))
                // final byte (first byte of the next 32 bytes)
                v := byte(0, mload(add(sig, 96)))
            }

            // implicitly return (r, s, v)
        }
    }
```
