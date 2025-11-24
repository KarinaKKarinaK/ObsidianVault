## **Basic Definitions**

- **Sample Space (S):** Set of all possible outcomes.
    
- **Event (A):** A subset of S.
    
- **Probability:** P(A) = (number of favorable outcomes)/(number of possible outcomes)

![[Screenshot 2025-11-24 at 16.17.48.png]]
## EV
Expected value (EV) is ==the average outcome of a random variable over the long run, calculated as a probability-weighted average of all possible values==. To find it, you multiply each possible outcome by its probability, and then sum up those products. This helps predict the average result of a situation if it were repeated many times, and is a key concept in decision-making under uncertainty.
![[Screenshot 2025-11-24 at 17.15.22.png]]
https://math.libretexts.org/Courses/Prince_Georges_Community_College/MAT_1130_Mathematical_Ideas_Mirtova_Jones_(PGCC%3A_Fall_2022)/03%3A_Probability/3.03%3A_Expected_Value  
![[Screenshot 2025-11-24 at 17.15.07.png]]

## Law of Total Probability

## Bayes' Theorem

![[Screenshot 2025-11-24 at 17.18.28.png]]

Bayes' theorem is ==a statistical formula used to update the probability of a hypothesis when new evidence is introduced==. It calculates the conditional probability of an event A given that event B has occurred, using the formula

![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![[Screenshot 2025-11-24 at 17.06.27.png]]

This theorem is fundamental to Bayesian statistics, allowing for continuous refinement of beliefs and predictions as more data becomes available.
## Markov Chain

A Markov chain is ==a mathematical model for a sequence of possible events where the probability of the next event depends only on the current state, not on the sequence of events that preceded it==. This is known as the "memoryless" property. They are used to model systems like weather patterns, where the next day's weather depends only on today's, or to predict the next word in a sentence based on the current one

##### Key concepts
- **States:** The possible conditions or events in the system (e.g., "sunny" or "cloudy" for weather).
- **Transition probabilities:** The probability of moving from one state to another.
- **Markov assumption:** The future state depends only on the current state.
- **Transition matrix:** A table that contains the probabilities for moving between all possible states. Each row represents a current state, and each column represents a possible next state. The sum of probabilities in each row must equal 1.
- **State vector:** A row matrix that shows the probability distribution of the system across all states at a given time.

#### How it works

1. **Define states:** Identify all possible states the system can be in.
2. **Determine transition probabilities:** Calculate the probability of moving from each state to every other state, and from a state back to itself.
3. **Create a transition matrix:** Organize these probabilities into a matrix.
4. **Predict future states:** Use the current state vector and the transition matrix to calculate the probability distribution of the system for future time steps. 

Applications

- **Natural language processing:** Predicting the next word in a sentence (as in some features of Gmail).
- **Finance:** Modeling stock market prices.
- **Game theory:** Modeling player behavior in a game.

## Kelly Criterion Method

![[Screenshot 2025-11-24 at 17.09.16.png]]
## Game Theory
Game theory for quantitative trading involves using mathematical models to analyze strategic decision-making where outcomes depend on the actions of multiple players (traders, market makers, etc.). Quant traders apply this by modeling markets as "games" to predict opponent behavior, identify optimal strategies to maximize returns while minimizing risk, and exploit the interactions between rational, self-interested players. Classic games like the **[Prisoner's Dilemma](https://www.google.com/search?q=Prisoner%27s+Dilemma&sca_esv=d124881140f2a97d&rlz=1C5CHFA_enCZ969CZ970&sxsrf=AE3TifPV6XEGryCdWl67ptZJq6QcT0gERw%3A1764001227713&ei=y4Ukad-aK8Wgi-gP9YuIgAU&ved=2ahUKEwiEtrnZmIuRAxVgxQIHHUXYOMkQgK4QegQIARAB&uact=5&oq=game+tehory+epxlianed+for+quant+trading&gs_lp=Egxnd3Mtd2l6LXNlcnAiJ2dhbWUgdGVob3J5IGVweGxpYW5lZCBmb3IgcXVhbnQgdHJhZGluZzIHECEYoAEYCjIHECEYoAEYCjIHECEYoAEYCkipG1DNA1iwGXABeAGQAQCYAdwBoAGwFaoBBjAuMTcuMbgBA8gBAPgBAZgCE6AChRbCAgoQABiwAxjWBBhHwgINEAAYgAQYsAMYQxiKBcICBxAAGIAEGA3CAgcQLhiABBgNwgIGEAAYFhgewgIIEAAYCBgNGB7CAgsQABiABBiGAxiKBcICBRAAGO8FwgIIEAAYgAQYogTCAgYQIRgVGAqYAwDiAwUSATEgQIgGAZAGCpIHBjEuMTcuMaAHh48BsgcGMC4xNy4xuAf_FcIHBjAuMTcuMsgHLA&sclient=gws-wiz-serp&mstk=AUtExfAT0Wbbu3V-tnSDN9VW7so3mrUv_X-nNnS2VDnOqj3c86koBbCPUzxYK90RijnAm8QT2YLHM0qlrx1S39UqWZl61i1tM2mrV5vWQtQgaMAUmozd5jEPZzwt3MtjQJ3dEyPCFOaViTyD8UbI4ESiGHarwQTeVVJo9BdNYaHmC4aHHCYxxwOoo_9wrJSVw6vyjlG-8wRZEkdfA9X34Henq0bzf3UZWeC3qQv3xEFeQ2YInsd7BupzIbOjXTnl4zQTu5DvV6ealCJ-ZryejnxHvm-h&csui=3)** and **[Chicken](https://www.google.com/search?q=Chicken&sca_esv=d124881140f2a97d&rlz=1C5CHFA_enCZ969CZ970&sxsrf=AE3TifPV6XEGryCdWl67ptZJq6QcT0gERw%3A1764001227713&ei=y4Ukad-aK8Wgi-gP9YuIgAU&ved=2ahUKEwiEtrnZmIuRAxVgxQIHHUXYOMkQgK4QegQIARAC&uact=5&oq=game+tehory+epxlianed+for+quant+trading&gs_lp=Egxnd3Mtd2l6LXNlcnAiJ2dhbWUgdGVob3J5IGVweGxpYW5lZCBmb3IgcXVhbnQgdHJhZGluZzIHECEYoAEYCjIHECEYoAEYCjIHECEYoAEYCkipG1DNA1iwGXABeAGQAQCYAdwBoAGwFaoBBjAuMTcuMbgBA8gBAPgBAZgCE6AChRbCAgoQABiwAxjWBBhHwgINEAAYgAQYsAMYQxiKBcICBxAAGIAEGA3CAgcQLhiABBgNwgIGEAAYFhgewgIIEAAYCBgNGB7CAgsQABiABBiGAxiKBcICBRAAGO8FwgIIEAAYgAQYogTCAgYQIRgVGAqYAwDiAwUSATEgQIgGAZAGCpIHBjEuMTcuMaAHh48BsgcGMC4xNy4xuAf_FcIHBjAuMTcuMsgHLA&sclient=gws-wiz-serp&mstk=AUtExfAT0Wbbu3V-tnSDN9VW7so3mrUv_X-nNnS2VDnOqj3c86koBbCPUzxYK90RijnAm8QT2YLHM0qlrx1S39UqWZl61i1tM2mrV5vWQtQgaMAUmozd5jEPZzwt3MtjQJ3dEyPCFOaViTyD8UbI4ESiGHarwQTeVVJo9BdNYaHmC4aHHCYxxwOoo_9wrJSVw6vyjlG-8wRZEkdfA9X34Henq0bzf3UZWeC3qQv3xEFeQ2YInsd7BupzIbOjXTnl4zQTu5DvV6ealCJ-ZryejnxHvm-h&csui=3)** are used to understand scenarios like competition and market collapse. 

Core concepts

- **Players:** Rational entities (e.g., other traders, market makers) who act to maximize their own payoffs.
- **Strategies:** The set of actions a player can take, such as buying, selling, or holding.
- **Payoffs:** The profit or loss for each player, which is a function of the strategies chosen by all players.
- **Interdependence:** A player's payoff is contingent on another player's strategy, meaning outcomes are a result of the combined actions, not just one player's decision.- **Market as a game:** A market can be modeled as a "game of incomplete information" where players have uncertainty but can still influence outcomes through their actions. 

Applications in quant trading

- **Modeling market interactions:** Game theory helps quant traders analyze how their actions will affect and be affected by other market participants.
- **Developing strategies:** By modeling situations, quants can identify optimal strategies to achieve desired outcomes, such as finding the best bid-ask spread in market making.
- **Risk management:** Game theory provides a framework for analyzing risk by considering all possible outcomes based on different strategies and player behaviors.
- **Predicting competitor actions:** Traders can use game theory to anticipate how competitors will react to new products, pricing changes, or other strategic moves.


# **Quick Mental Math Tricks**

- **Complement first** (e.g., probability _at least one_ is often 1 − all fail)
    
- **Break events into cases**
    
- **Use symmetry** (e.g., same chance for each suit)
    
- **Multiply for AND, add for OR** (only if independent/mutually exclusive)
    

---

# **13. Market-Making Probability Concepts (Optiver-specific)**

- **Fair value = expected value**
    
- **Update your fair value after each trade** (Bayesian update)
    
- **Bid below your fair value, ask above it**
    
- **If trader sells to you → they think true value is lower**

### **Worked Examples**