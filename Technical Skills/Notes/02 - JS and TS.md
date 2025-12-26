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