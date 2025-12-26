Great guide to concepts: https://roadmap.sh/javascript

JavaScript was initially created by Brendan Eich of NetScape and was first announced in a press release by Netscape in 1995.

## Variables (almsot same as in Java)

Variable declarations define **how a variable behaves in memory and scope**.  
In JavaScript, `var`, `let`, and `const` not only create variables, but also control **where the variable is accessible (scope)**, **whether it can be reassigned**, and **how JavaScript handles it during execution (hoisting)**.

### `var`

- **Function-scoped** (not block-scoped)
    
- Can be **redeclared** and **reassigned**
    
- **Hoisted** (initialized as `undefined`)
    
- Can cause bugs → **avoid in modern JS**

### `let`

- **Block-scoped** (`{}`)
    
- Can be **reassigned**
    
- Cannot be redeclared in the same scope
    
- Safer replacement for `var`

### `const`

- (also) **block-scoped**
    
- Cannot be **reassigned** or **redeclared**
    
- Must be **initialized**
    
- Use by default

---

#### Hoisting

**Hoisting** in JavaScript means that **variable and function declarations are moved to the top of their scope during execution**.

- `var` → hoisted and initialized as `undefined`
    
- `let` / `const` → hoisted but **not accessible** before declaration (temporal dead zone)
    
- Function declarations → fully hoisted

```javascript
console.log(x); // undefined
var x = 5;

console.log(y); // ❌ error
let y = 5;

```


# Variable Scopes
***This is taken from the linked website.****

Variable scope determines the accessibility of variables in different parts of your code. JavaScript has three main types of scopes:

- **Global scope:** Variables declared outside of any function or block have global scope. They can be accessed and modified from anywhere in your code.
    
- **Function scope:** Variables declared inside a function have function scope. They are only accessible within that function.
    
- **Block scope:** Variables declared with `let` or `const` inside a block (e.g., inside an `if` statement or a loop) have block scope. They are only accessible within that block.
    

A **local scope** generally refers to either function scope or block scope, meaning the variable is only accessible within a limited region of the code.

Finally, **module scopes** provide a way to encapsulate variables within a module, preventing them from polluting the global scope and allowing for better organization and reusability of code.