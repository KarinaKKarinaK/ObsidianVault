## Lecture 1: Introduction and Prolog Basics

### I. Theory: Artificial Intelligence and Intelligent Agents

#### A. The Scope of AI

Artificial Intelligence (AI) encompasses various disciplines, including:

- Computer Vision (Perception).
- Machine Learning.
- Planning & Search.
- Natural Language Processing (NLP).
- Knowledge Representation.
- **Agents & Robotics**.

#### B. The Intelligent Agent Paradigm

An **agent** is anything that can be viewed as perceiving its environment through **sensors** and acting upon that environment through **effectors**.

- **Internal Agent Structure:** Agent = architecture + program.
- **Core Business of AI:** Designing agent architectures and programs.

#### C. Characteristics of Intelligent Agents (Wooldridge & Jennings, 1995)

Intelligent agents are defined by four core abilities:

1. **Reactive:** Ability to receive information and respond.
2. **Pro-active:** Ability to take the initiative.
3. **Social:** Ability to communicate and cooperate.
4. **Autonomous:** Agents control their own processes.

#### D. Cognitive Agents and the Intentional Stance

A **cognitive agent** is anything that can be usefully viewed as a system that possesses internal mental states such as **beliefs, desires, goals, intentions, plans, expectations, hopes, fears, joy, etc.**. This is known as the **Intentional Stance** (Dennett 1987).

- **Our Notion of Cognitive Agent:** Agents should have the following basic capabilities:
    
    1. **Event Processing:** Processing events like percepts and messages.
    2. **Knowledge Representation:** Maintaining a model of the environment and other agents (often using Prolog).
    3. **Decision-Making:** Selecting an action based on beliefs, knowledge, and/or goals.
- **Intentional Systems Language**:
    
    - **First-order:** `bel(p)` (the agent believes that $p$); `goal(p)` (the agent has a goal that $p$).
    - **Second-order:** `bel(A; bel(B; p))` (A believes that B believes that $p$); `goal(A; goal(B; p))` (A wants that B wants that $p$).

### II. Theory and Practice: Prolog Basics

#### A. Prolog as a Logic-Based Language

Prolog is a **logic-based programming language** that focuses on the description of a problem rather than the procedure for solving it. This is known as **declarative programming**, contrasting with imperative/procedural programming.

- **Goal of Prolog:** To represent knowledge efficiently through **facts and rules**, and to retrieve and infer knowledge from this representation given a **query**.
- Prolog uses **reasoning** for problem solving and is ideal for keeping track of states.

#### B. Prolog Framework and Components

A Prolog system consists of a **Knowledge Base** (KB) and **Queries**:

1. **Knowledge Base:** Stores **Facts** and **Rules** in `.pl` files.
2. **Queries:** Posted from the shell, starting with `?-`.

#### C. Definitions of Prolog Syntax

| Concept                | Definition                                                                    | Rules/Characteristics                                                                                                                         |
| :--------------------- | :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **Atom**               | Basic building block. Sequence of letters/digits/underscores.                 | Starts with a lower-case letter, or enclosed in single quotes, or a string of special characters (e.g., `:-`). Atoms are constants and terms. |
| **Number**             | Any sequence of numbers, possibly containing a dot.                           | Numbers are constants.                                                                                                                        |
| **Constant**           | Includes both atoms and numbers.                                              |                                                                                                                                               |
| **Variable**           | Sequence of letters/digits/underscores.                                       | Starts with an upper-case letter or an underscore.                                                                                            |
| **Anonymous Variable** | The variable `_`.                                                             | Used when the value of a variable is not needed.                                                                                              |
| **Term**               | Defined recursively.                                                          | Constants and variables are terms; $f(t_1, \dots, t_k)$ is a term if $f$ is an atom and each $t_i$ is a term.                                 |
| **Ground Term**        | A term that contains no variables.                                            |                                                                                                                                               |
| **Compound Term**      | A term $f(t_1, \dots, t_k)$.                                                  |                                                                                                                                               |
| **Functor**            | The atom $f$ in a compound term.                                              |                                                                                                                                               |
| **Arity**              | The number of arguments $k$.                                                  |                                                                                                                                               |
| **Signature**          | Notation $f/k$ (e.g., `has_wheels/1`).                                        |                                                                                                                                               |
| **Predicate**          | Any constant or compound term.                                                |                                                                                                                                               |
| **Fact (Knowledge)**   | A predicate immediately followed by a dot (`.`).                              |                                                                                                                                               |
| **Rule**               | $A_0 :- A_1, \dots, A_n.$ ($A_0$ is the head, $A_1, \dots, A_n$ is the body). | Rules are always universal (e.g., $p(X)$ holds for all $X$).                                                                                  |
| **Clause**             | Any fact or rule.                                                             |                                                                                                                                               |
| **Query (Goal)**       | `?- p.`.                                                                      | Queries are existential (e.g., `?- p(X)` corresponds to $\exists X p(X)$).                                                                    |

#### D. Prolog Operators and Examples

- **Implication:** `:-` defines implication ($A \rightarrow B$ corresponds to $B :- A$).
- **Conjunction (AND):** `,` defines conjunction.
- **Disjunction (OR):** `;` defines disjunction.
- **Negation:** Use **`\+`** (Negation as failure). `not(:Goal)` is true if `Goal` cannot be proven, but `\+` is preferred.

**Example KB**:

```
nao(hero).
aibo(daisy).
aibo(cooper).
pepper(ada).
ugv(charlie).
has_wheels(R) :- pepper(R);ugv(R).
social(R) :- nao(R);aibo(R);pepper(R).
```

- `?- has_wheels(charlie).` $\rightarrow$ `true.`.
- `?- aibo(R).` $\rightarrow$ `R = daisy ; R = cooper.`.
- `?- has_wheels(R), social(R).` (Finds social robots with wheels) $\rightarrow$ `R = ada.`.
- `?- has_wheels(R), \+ social(R).` (Finds non-social robots with wheels) $\rightarrow$ `R = charlie.`.

---

## Lecture 2: Prolog Unification and Search

### I. Unification

**Unification** is the process of solving a (logical) equation. **Matching** is Prolog’s method for unification.

#### A. The Matching Operator (`=/2`)

- `=/2` is the built-in matching predicate (it is **not** an equality operator).
- `\=/2` checks for terms that do not match.
- Prolog binds variables using the **most general unifier**.

#### B. Conditions for Matching ($t_1 = t_2$)

Two terms match if and only if:

1. $t_1$ and $t_2$ are **identical constants** (e.g., `?- life = life. true.`).
2. If one is a variable and the other is not, the variable is **instantiated** with the term (e.g., `?- X = a. X = a.`). This applies if both are variables or in reverse.
3. If $t_1$ and $t_2$ are **compound terms**, they match if:
    - They have the **same outermost functor** and arity.
    - Each corresponding argument $r_i$ matches with $s_i$.
    - Variable instantiations are **compatible** (a variable cannot be assigned different terms which are not variables).

**Practical Examples**:

- `?- X = a, X=b.` $\rightarrow$ `false` (incompatible binding).
- `?- f(X,g(a)) = f(b,g(Z)).` $\rightarrow$ `X = b, Z = a.`.
- `?- f(X,a) = f(b,X).` $\rightarrow$ `false` (X cannot unify with both `a` and `b`).
- `?- X+3 = 5+Y.` $\rightarrow$ `X = 5, Y = 3.` (Unification works structurally; arithmetic is _not_ evaluated).

### II. Search (Deduction and Proofs)

Searching for a proof involves a multi-step process: query submission, finding rules/facts, proving the rule body, and continuing until no alternatives remain.

#### A. Principles of Prolog Search

1. **Backward Chaining:** Starting from the goal, select a rule/fact whose head matches the goal. If a rule is matched, try to derive the rule's body from **left to right**.
2. **Linear Traversal:** Traverse the logic program from **top to bottom** to select appropriate rules.
3. **Backtracking:** If the current goal fails, backtrack to the closest choice point (where alternative rules exist) and try the next available rule.

#### B. Search Outcomes and Standardization

- **Success:** Occurs when the query becomes empty (no more goals to deduce).
- **Failure:** Occurs when a goal cannot be matched by any remaining rule or fact, and no alternatives are left to backtrack to.
- **Standardization of Variables:** When a rule is selected, Prolog renames variables (e.g., to `_G4`) to prevent clashes with variables in the original query or other rules.

#### C. The Search Tree

The search procedure generates a **search tree**:

- The root is labelled with the query $Q$.
- Nodes are labelled with sub-queries.
- Child nodes are ordered based on the rule's position in the program.
- Edges are labelled with variable instantiations.

**Search Tree Branches**:

1. **Successful branches** (end with the empty clause).
2. **Failing branches (dead ends)**.
3. **Infinite branches** (caused by recursive loops without a base case or termination condition).

---

## Lecture 3: Prolog Datatypes

### I. Data Representation in Prolog

Prolog uses a relational representation. Data structures are defined as terms.

- **Basic Terms:** Atoms, numbers, variables, lists, and compound terms.
- **Compound Term:** $f(t_1, \dots, t_k)$. $f$ is the functor, $k$ is the arity. The term is **ground** if it contains no uninstantiated variables.

### II. Negation (`\+`) and Finite Failure

Prolog uses **Negation as Finite Failure**.

- **Definition:** `\+ G` is derived from program $P$ if and only if the search tree of $P$ for goal $G$ is **finitely failed**.
- **Finitely Failed:** A search tree is finitely failed if it contains **no successful branch** and **no infinite branch**.
- **Crucial Difference:** `\+ p` in Prolog means "there is not enough information to derive $p$," unlike logical negation ($\neg p$) which means "proposition $p$ is false".

### III. Numbers and Arithmetic

Prolog terms that appear arithmetic often are not evaluated during standard unification.

|Operator Type|Operator|Functionality|Example|Citation|
|:--|:--|:--|:--|:--|
|**Arithmetic Functors**|`+/2`, `*/2`, `mod/2`|Defines mathematical structure (but does not calculate).|`?- 4 + 3 = 7.` $\rightarrow$ `false`.||
|**Evaluation Operator**|**`is /2`**|Evaluates the expression on the right and unifies the result with the variable/number on the left.|`?- X is 2 + 2.` $\rightarrow$ `X=4.`.||
|**Comparison Operators**|**`=:= /2`** (equality), **`=\= /2`** (inequality)|Force numerical evaluation of terms on both sides.|`?- 4 + 3 =:= 5 + 2.` $\rightarrow$ `true.`.||

- **Constraint on `is` and Comparison:** Variables used in the arithmetic expression (the right side of `is`, or either side of comparison operators) must be **sufficiently instantiated** before evaluation.
    - _Example:_ `?- 4 is X + 2.` $\rightarrow$ ERROR.

### IV. Lists

Lists are fundamental data structures defined recursively.

- **Structure:** `[Head | Tail]`.
    - The **head** is a term.
    - The **tail** is a list itself.
    - The **empty list** is `[]`.
- **Example:** `[A, X|B]=Y.` where `Y =` results in `A = 1, X = 2, B =`.
- **Built-in Predicates:** `member/2`, `append/3`, `nth0/3`.

### V. Variables and Instantiation Patterns

- **Anonymous Variable (`_`):** Used to ignore a variable position. Each instance of `_` acts as a unique variable.
- **Instantiation Patterns:** Used in documentation to specify which arguments must be supplied as input:
    - **`+X`:** $X$ is an input variable and must be instantiated.
    - **`?Y`:** $Y$ does not have to be instantiated.

---

## Lecture 4: Prolog Recursion

### I. Theory of Recursion

- A predicate is defined **recursively** if there is at least one rule in its definition from which the predicate itself is reachable.
- Recursion requires a **termination condition** (Base Clause).

#### A. Rules of Thumb for Recursive Programming

1. Try to **avoid left-recursion**.
2. Make the recursive call as far as possible to the **right** in a rule.
3. Try to put the **base clause before the recursive clause**.

#### B. Recursion and Lists

Recurring down a list (using the `[Head | Tail]` structure) is the standard technique for list processing in Prolog.

**Practical Examples**

- **`member(X, L)`** (Built-in):
    
    - _Base clause:_ `member(X, [X | _ ]).` (X is the head).
    - _Recursive clause:_ `member(X, [ _ | Tail]) :- member(X, Tail).` (X is in the tail).
- **`append(X, Y, Z)`** (Built-in):
    
    - _Base clause:_ `append([], X, X).` (If first list is empty, result is the second list).
    - _Recursive clause:_ `append([X|Y], Z, [X|W]) :- append(Y, Z, W).`.
    - _Functionality:_ Can be used to concatenate (`?- append([a,b], [c,d], L).`), or to split a list (`?- append(X,Y, [a,b,c,d]).`).
- **`sublist(S, L)` (using `append/3`)**:
    
    - A single clause solution: `sublist(S,L) :- append(_, L2, L), append(S, _, L2).`.
- **`length(List, N)`**:
    
    - _Base case:_ `length([], 0).`.
    - _Recursive clause:_ `length([_|Tail], N) :- length(Tail, P), N is P + 1.`.

---

## Lecture 5: MARBEL First Agent Steps

### I. MARBEL Agent Architecture

MARBEL is an agent programming framework where agents are defined with events, beliefs, actions, and decisions as first-class citizens.

#### A. The Agent Execution Cycle

The agent execution cycle defines how an agent operates:

1. **Start (Init Module):** Initialize the database state.
2. **Process Channels:** Process percepts (sensory inputs) and messages.
3. **Process Updates (Update Module):** Update the database state by applying update rules.
4. **Select Action (Decision Module):** Action selection/strategy by applying decision rules.
5. **Perform Action:** Request execution of the selected action (built-in or environment action).

#### B. MARBEL Files and Configuration

- **MAS File (`.mas2g`):** Contains the agent definition and the launch policy.
    - **Agent Definition:** Specifies which modules are used (e.g., `use helloWorld for decisions.`).
    - **Launch Policy:** Determines when and how agents are launched (e.g., `launch helloWorldAgent.`).
    - **Environment Connector:** Must specify the external environment JAR file (e.g., `use "HelloWorldEnvironment-1.3.0.jar".`).
    - **Percept Subscription:** Agents subscribe to percepts (e.g., `replace on/2.`).
- **Module File (`.mod2g`):** Contains the agent program (action rules) and requires a `use` clause referencing a Prolog file.
- **Prolog File (`.pl`):** Declares predicates and defines Prolog rules. Dynamic predicates must be declared using `:- dynamic predicate/arity.` (e.g., `:- dynamic printedText/1.`).

#### C. Action Rules and Built-in Actions

- **Action Rule Form:** `if <Prolog query> then <action> (+ <action2> \dots)`.
    - The query serves as the precondition.
    - **Groundedness Constraint:** All variables used in the `<action>` part **MUST** be used and instantiated (grounded) by the `<Prolog query>` part.
- **Built-in Internal Actions**:
    - **`insert(<conjunction>)`:** Adds facts to the agent's database.
    - **`delete(<conjunction>)`:** Removes facts from the agent's database.
    - **`+` Operator:** Used to combine multiple actions (e.g., `delete(p(X)) + insert(q(Y))`).
    - **`print(<Term>)`:** Prints to the console.
    - **`log(<Parameter>)`:** Writes logging information.
- **Exit Condition:** Decision modules can specify `exit=noaction` to terminate the module (and agent) when no action rule is selected.

---

## Lecture 6: MARBEL The Order of Things (Blocks World)

### I. Blocks World (BW) Environment

BW is a classic AI planning problem.

|Property|Blocks World Characteristics|Rationale|Citation|
|:--|:--|:--|:--|
|**Observability**|Fully observable|Gripper can see the complete configuration.||
|**Determinism**|Deterministic|Action effects (moves) are completely predictable and always successful.||
|**Dynamics**|Static|Environment only changes when the single gripper moves a block.||
|**Agent Count**|Single Agent|Only one gripper entity.||

_Note: Since the BW is deterministic, static, and single agent, the agent _could_ manually track state changes instead of relying on percept channels, but using channels simplifies programming._

### II. Blocks World Knowledge Representation (Practice)

BW state is represented using the `on/2` predicate, where `table` is a constant.

**Core Predicates**:

- `:- dynamic on/2.`
- `block(X) :- on(X, _).` (A block is anything that sits on something else).
- `clear(X) :- block(X), \+ on(_, X).` (A block is clear if nothing sits on top of it). `clear(table).`.
- **`tower/1` (Recursive definition):**
    - `tower([X]) :- on(X, table).` (Base case: stack of one block).
    - `tower([X,Y|T]) :- on(X,Y), tower([Y|T]).` (Recursive case).

### III. Decision Strategy and The Order of Things

The environment action is `move(X, Y)`. For decision modules, the **order of rules is critical** because the decision module exits after performing the action of the **first applicable rule**.

#### A. Setting the Goal

The goal state can be passed to the agent using:

1. **Module Parameters:** `use stackBuilder(GoalList) for decisions.`.
2. **Agenda:** Using an `init` module to insert the goal as a fact into the database (e.g., `insert(agenda(GoalList))`).

#### B. Blocks World Strategy (Prioritized Rules)

A successful strategy prioritizes constructive moves:

|Rule Priority|Strategy|Action Rule (Informal)|
|:--|:--|:--|
|**1 (Highest)**|**Constructive Move:** If block $X$ can be placed on $Y$ (where $Y$ is already part of a goal tower), move it.|`if tower(Goal, [X, Y|
|**2 (Lower)**|**Misplaced Block:** If $X$ is sitting on the wrong block, move it to the table to clear it.|`if tower(Goal, [X|

_Note: Placing the constructive rule first (1 then 2) typically yields a more optimal solution path than placing the unstacking rule first._

---

## Lecture 7: MARBEL - Change is on the Horizon (Tower World)

### I. Tower World (TW) Environment and Durative Actions

TW differs from BW primarily because the environment is dynamic, requiring continuous monitoring via percept channels (`replace on/2`, `replace holding/1`).

|Property|Tower World Characteristics|Rationale|Citation|
|:--|:--|:--|:--|
|**Dynamics**|Dynamic|User can interact via GUI (move/remove blocks).||
|**Agent Count**|Multi Agent|Single gripper + user interference.||
|**Action Type**|Durative|Actions (`pickup`, `putdown`, `nil`) take time to complete.||

#### A. Issues with Durative Actions

1. **Failure:** Durative actions may fail due to interference (e.g., the user removing a block), requiring the agent to monitor success and revise its plan.
2. **Concurrency:** If the agent selects a new action while a previous durative action is in progress, the new action may be ignored or override the previous one. Agents must track their activity and only request a new action if no action is currently in progress.

#### B. Tower World Actions

The three durative actions available are `pickup(X)`, `putdown(X, Y)`, and `nil` (moves gripper to corner).

### II. Tower World Decision Strategy (Practice)

The strategy is built on prioritizing actions that move the agent toward the goal.

|Action Type|Priority|When to Perform|
|:--|:--|:--|
|**`putdown(X, Y)`**|Highest (when holding X)|1. If constructive move is available, put down $X$ on $Y$. 2. Otherwise, put down $X$ on `table`.|
|**`pickup(X)`**|Medium|1. If $X$ can be used constructively. 2. If $X$ is misplaced.|
|**`nil`**|Lowest (Idle)|When there is nothing more to do (goal achieved).|

**MARBEL Implementation (Decision Module)**:

```
if holding(X) then {
   if constructiveMove(X, Y) then putdown(X, Y).
   if true then putdown(X, table).
}
if constructiveMove(X, _) then pickup(X).
if misplaced(X) then pickup(X).
if true then nil.
```

---

## Lecture 8: MARBEL - Finding Dust (Vacuum World)

### I. Vacuum World (VW) Environment and Requirements

The VW aims to clean dust. Key requirements for the agent include:

1. Ensure all dust has been cleaned (`RQ1`).
2. Return to its original starting position (`RQ2`).
3. Self-terminate when back at that position (`RQ3`).

|Property|Vacuum World Characteristics|Rationale|Citation|
|:--|:--|:--|:--|
|**Observability**|Partially observable|Agent can only see six squares (its field of vision).||
|**Determinism**|Deterministic|Action effects are predictable.||
|**Dynamics**|Static (Configurable)|Environment changes only if the agent acts (assuming `generation = "no"`).||

#### A. VW Percepts and Actions

- **Percepts:** `location(X, Y)`, `direction(AbsDir)`, `square(RelLoc, Content)` (Content: `obstacle`, `dust`, or `empty`), and `task(Identifier)` (turn, move, clean, or none).
- **Actions:** `move(AbsDir)` and `clean`. Both are durative.

### II. Channels and State Management

Percept channels require specific handlers based on how often they update:

|Percept Type|Handler|Update Frequency|Example Percepts|Citation|
|:--|:--|:--|:--|:--|
|**Send Once**|`add`|Once, upon connection.|(None explicitly listed in VW)||
|**Send Always**|`replace`|Every agent cycle (delete old, insert new).|`square/2`.||
|**Send on Change**|`update`|Only when change occurs (delete old, insert new).|`task/1`, `location/2`, `direction/1`.||

#### A. Initialization and Update Modules

- **Init Module (`vacuumInit`):** Required for `RQ2` to capture the initial, random `location(X, Y)` and store it as `initialLocation(X, Y)`.
- **Update Module (`vacuumUpdate`):** Required for `RQ1` to process `square` percepts and update the database with new knowledge (e.g., inferring `clean(X, Y)` or `obstacle(X, Y)` locations).

#### B. The `forall...do` Rule

A specialized rule for processing sets of bindings efficiently, often used in update modules.

- **Definition:** The rule computes **all** bindings for `<query>`, instantiates `<action>` with these bindings, and performs all resulting actions.
    
- **Example Usage (in `vacuumUpdate` when `task(none)`)**:
    
    ```
    forall square(here, empty), location(X,Y) do insert( clean(X, Y) ).
    ```
    

### III. Decision Strategy and Rule Order Evaluation

The decision strategy prioritizes important actions, particularly when `task(none)` (the bot is idle).

#### A. Basic Strategy Priority

1. If done, then terminate (`exit-module`).
2. If standing on dust, then `clean`.
3. If possible, `move` towards nearby dust (greedy).
4. Otherwise, `move` (explore randomly).

#### B. Rule Order Evaluation Options

MARBEL allows specifying the order in which rules are selected using the `order=...` clause in the module definition.

|Order Option|Selection Process|Application|Citation|
|:--|:--|:--|:--|
|**`linear`**|Executes the first option of the first applicable rule.|Default for decision modules (if not specified).||
|**`linearall`**|Executes all applicable rules in linear order.|Default for init and update modules.||
|**`linearrandom`**|Random option of the first applicable rule.|Used in the VW decision module example.||
|**`random`**|Selects one option randomly.|||
|**`randomall`**|Executes rules and options randomly.|||

---

### Analogy for Understanding MARBEL Decision Logic

Think of a MARBEL agent's Decision Module like a **prioritized to-do list** for a very obedient assistant. The assistant reads the list from top to bottom (linear traversal). For each item (action rule), they first check if the prerequisite (the Prolog query) is true based on their current knowledge (the database). As soon as they find the _first_ task they are capable of doing, they execute that task and immediately stop reviewing the list for that cycle (exit the module). If the agent had set its rule order using `linearrandom`, it might find the first applicable rule, but then randomly pick one way to execute it if multiple options exist.