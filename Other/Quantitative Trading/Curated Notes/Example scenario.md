![[Screenshot 2025-11-21 at 13.16.07.png]]Good, this is exactly the kind of thinking they’ll tap into in the interview.  
Let’s walk through the example and then answer the three questions in the way a trader at Optiver would expect.

---

## Recap of the example (in your own words)

- The **market maker (MM)** must quote a two-sided market (bid/offer) on the _population of the Netherlands_.
    
- MM’s **theoretical value (fair)** = 31.5M.
    
- With a 10% spread, he quotes:
    

> **“30M bid, 33M offered”**  
> meaning: willing to **buy** at 30, **sell** at 33.

- **Trader A** thinks the true population ≈ 25M → below even the MM’s bid.
    
- Trader A hits the MM’s **bid** by shouting “Yours!” →
    
    - MM **buys** at 30M → **long 1 lot** at 30
        
    - Trader A **sells** at 30M → **short 1 lot**.
        

This trade gives the MM **new information**: someone was willing to sell at his bid, so at least one trader believes the value is _below_ 30M.

---

## Q1. Should the Market Maker adjust his prices given the trade? If so, why and how?

**Yes, he should adjust.**

**Why:**

1. **Information update:**  
    The trade reveals information: Trader A thinks the value is **< 30M**. If the MM believes Trader A might be somewhat informed (not just flipping a coin), then his original fair value 31.5M was probably **too high**. He should update his belief downward.
    
2. **Adverse selection consideration:**  
    If the MM keeps quoting 30–33 after someone has happily sold at 30, he risks being repeatedly traded against by informed sellers at a “too high” price.
    

**How (qualitatively):**

- **Shift his market down** to reflect the new, lower fair value.  
    Example: if he now thinks the fair is around 29M instead of 31.5M, he might move to something like **28 bid, 30 offer** (numbers not important; logic is).
    
- He might also **widen the spread** temporarily if uncertainty has increased (“I just learned my view was too high; I’m less sure now.”).
    

So: _yes_, adjust **direction** (downwards) and possibly **width** (wider if less certain).

---

## Q2. Should the MM take his position into account when making a market? If so, why and how?

**Yes, absolutely. Position is crucial.**

After the trade, the MM is:

- **Long 1 lot at 30M.**
    

If the true value ends up being **below** 30M, he loses money on that position. So:

**Why position matters:**

1. **Inventory / risk management:**  
    A large long position with a falling fair value is dangerous. The MM wants to avoid getting _even longer_ at bad prices and ideally wants to **reduce** or **neutralize** his position.
    
2. **Capital + limits:**  
    MMs have position limits. They cannot ignore inventory or they may breach limits and be forced to unwind at bad prices.
    

**How to incorporate position:**

- **Skew his quotes** to encourage trades that _reduce_ his position and discourage trades that _increase_ it.
    

Specifically, being **long**:

- He prefers **to sell** (so that others hit his **offer**).
    
- So he might set:
    
    - a **more attractive offer** (lower/higher depending on context) to tempt buyers,
        
    - and a **less attractive bid** to avoid buying more.
        

Example idea (qualitative):

- New fair maybe ≈ 29M.
    
- If he is long and wants to reduce risk, instead of symmetric 28–30, he might quote something like **28.5 bid, 30 offer** or even **28–30**, but mentally he’s happier if the **30 offer** trades (reducing his long exposure).
    

The exact numbers don’t matter in the interview; the key sentence is:

> “Yes, I’d take my position into account: since I’m long, I’d skew my market to prefer selling rather than buying more, while still staying near my updated fair value.”

---

## Q3. What risks are there for the MM, and for the other traders?

### Risks for the Market Maker

1. **Adverse selection risk**  
    Trader A might be **better informed**. If the true value is well below 30M, MM bought too high and will lose when settlement is revealed.
    
2. **Inventory (position) risk**  
    MM is now **long**. If more sellers appear and he keeps buying, he might accumulate a big long position before realizing how wrong his fair value is.
    
3. **Model / estimation risk**  
    His initial fair (31.5M) might be based on a poor estimate. If he doesn’t update quickly enough when trades disagree with his view, his P/L suffers.
    
4. **Liquidity / exit risk**  
    If he ends up with a large position and nobody wants to trade the other way at reasonable prices, he might be stuck and forced to exit at a large loss.
    

### Risks for the Other Traders (like Trader A)

1. **View risk (being wrong)**  
    If Trader A thinks 25M but the settlement is much higher (say 35M), his short at 30M loses when the final answer is revealed.
    
2. **Execution / timing risk**  
    If many traders share Trader A’s view, prices might move quickly against late entrants; they may get worse prices.
    
3. **Liquidity risk**  
    If the MM adjusts quotes aggressively, other traders may not be able to get the size or prices they want.
    

---

### How to say it concisely in the interview

> “Yes, I would definitely adjust my prices after that trade. A sale at my bid suggests the other trader thinks the value is below 30M, so I’d revise my fair value down and move my whole market lower, possibly widen the spread if I’m less certain.
> 
> I’d also take my position into account. I’m now long 1 lot at 30M, so I’d skew my quotes so that I’m more likely to reduce that long rather than increase it – for example, making my offer relatively more attractive and my bid less attractive, while staying around my updated fair value.
> 
> The risks for me as MM are adverse selection, inventory risk if I keep buying at bad prices, and general model error. The risk for the other traders is mainly that their view of the true value is wrong – if the final settlement is far from their belief, they lose on their trades – plus usual liquidity and execution risks.”

![[Screenshot 2025-11-21 at 13.28.02.png]]![[Screenshot 2025-11-21 at 13.29.42.png]]