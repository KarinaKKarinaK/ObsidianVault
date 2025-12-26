***Each note includes:***

- Definition
    
- When to use
    
- Tradeoffs
    
- Linked notes

### `Big-O Analysis`

##### Asymptotic Notation (Ch. 2)

- **Big-O (`O`)**: Upper bound – algorithm never worse than this (like ≤).
    
- **Big-Ω (`Ω`)**: Lower bound – algorithm never better than this (like ≥).
    
- **Big-Θ (`Θ`)**: Tight bound – algorithm always scales like this (like =).
    
##### Analogy:

- O = “at most”; Big-O means "less than or equal to (<=)"
    
- Ω = “at least”; Big-Omega means "greater or equal to (>=)"
    
- Θ = “exactly this growth”; Big-Theta means "equal to (=)"
    


https://www.bigocheatsheet.com/

![[Screenshot 2025-12-20 at 8.20.46 PM.png]]
![[Pasted image 20251220202008.png]]



### `Stack vs Heap`

**Very short:**

- **Stack** → _Last In, First Out (LIFO)_; automatic memory, fast, used for function calls and local variables.
    
- **Heap** → _Manual/dynamic allocation_ (no fixed order); flexible size, used for objects/data that must live longer than a function call.

### `Immutability`

Immutability is ==the state of being unchangeable, referring to data or objects that cannot be modified after their creation==. Instead of altering an existing object, any changes require creating a entirely new, updated instance. This concept improves security, stability, and multi-threading efficiency in programming. 

**Key Aspects of Immutability:**

- **Definition:** An object's state is fixed from the moment it is initialized. it refers to data that can only be written, not modified or deleted.
- **Functional/Object-Oriented Programming:** If a variable needs to change, a new copy must be created, rather than modifying the original value.
- **Examples:** Common examples include `String` classes in Java, Python tuples, and primitive data types.

### `Functional vs OOP`

Functional Programming (FP) and Object-Oriented Programming (OOP) are distinct paradigms where ==FP uses pure functions and immutable data, while OOP encapsulates state within objects to manage complexity==. FP is ideal for data transformation and fixed operations, whereas OOP excels in modeling real-world entities with complex interactions.

![[Pasted image 20251226212759.png]]