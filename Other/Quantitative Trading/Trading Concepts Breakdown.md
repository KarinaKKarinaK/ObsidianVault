Below is a **clean, simple, intuitive explanation** of every key concept relevant to Optiver, quant trading, and [[Market Making]]. This is designed so you understand the ideas _deeply_, not just as definitions.

I will explain them in layers:  
• What it is  
• Why it exists  
• Why it matters to a firm like Optiver  
• A simple concrete example

---

1. Proprietary Trading (“prop trading”)

---

**What it is**  
A firm trades its **own money**, not clients’ money.

**Why it exists**  
If the firm has skill, models, and speed, it can profit directly from market opportunities.

**Why it matters to Optiver**  
Optiver doesn’t manage portfolios for customers.  
All profit comes from _their own trading decisions_ → they care about accuracy, risk, speed, expected value.

**Simple example**  
Optiver decides to buy an option because their model says it’s underpriced.  
If correct, they profit.  
If wrong, they lose their own capital.  
No clients involved.

---

2. Market Making
    

---

**What it is**  
A market maker continuously quotes **two prices** for a product:  
• the price they will buy at (bid)  
• the price they will sell at (ask)

**Why it exists**  
Without market makers, you might want to buy something but no one wants to sell right now—or vice-versa.

Market makers fill that gap → they provide immediate trading opportunities.

**Why it matters to Optiver**  
Market making is Optiver’s core business.  
Their job is to:  
• set fair prices  
• manage inventory  
• adjust quotes when markets move  
• keep spreads tight  
• reduce volatility gaps

**Simple example**  
Apple stock:  
• Optiver quotes: Buy at $100.00 (bid), sell at $100.05 (ask).

If someone wants to buy → Optiver sells at $100.05.  
If someone wants to sell → Optiver buys at $100.00.  
They “capture” the spread if managed well.

---

3. Liquidity
    

---

**What it is**  
The ease of buying or selling an asset **quickly** and **at a stable price**.

**High liquidity** = tight spreads + many buyers/sellers.  
**Low liquidity** = wide spreads + price jumps.

**Why it exists**  
Markets need participants who step in continuously so prices don’t jump dramatically.

**Why it matters to Optiver**  
Optiver _provides liquidity_.  
The better their pricing, the more liquid a market becomes.  
Exchanges reward this through rebates and structural advantages.

**Simple example**  
If you want to buy 500 shares of Tesla instantly and at a fair price → liquidity determines if you pay $230 or suddenly $240.

---

4. Equities (stocks)
    

---

**What they are**  
Ownership in a company.  
Each share = fraction of the company.

**Why they exist**  
Companies raise money by selling shares.

**Why they matter for Optiver**  
Equities are the underlying asset for many **options**, ETFs, indices.

**Simple example**  
Buying one share of Apple = owning a small piece of the company.

---

5. ETFs (Exchange-Traded Funds)
    

---

**What they are**  
A basket of assets (stocks, bonds, commodities) that trades like a single stock.

**Why they exist**  
They let investors gain exposure to an entire market segment easily.

**Why they matter for Optiver**  
ETFs often have small inefficiencies relative to their underlying assets.  
Market makers quote prices for ETFs based on the prices of everything inside the ETF.

**Simple example**  
S&P 500 ETF contains 500 stocks.  
Its price should roughly equal the combined value of those stocks.  
If it deviates, arbitrage opportunities appear.

---

6. Bonds
    

---

**What they are**  
Loans to governments or companies.  
You buy a bond → they promise to pay interest + return the principal.

**Why they exist**  
Organizations need financing.

**Why they matter for Optiver**  
Bond prices move when interest rates or risk outlooks change.  
They affect derivative prices and macro trends.

**Simple example**  
You buy a $100 bond at 5% → you receive $5 yearly interest.

---

7. Futures
    

---

**What they are**  
A contract to buy or sell an asset at a fixed price in the future.

**Why they exist**  
Allows hedging and speculation.

**Why they matter for Optiver**  
Futures are highly liquid; market makers trade them constantly.  
Prices must stay aligned with spot markets → arbitrage opportunities.

**Simple example**  
Oil futures at $80 for next month.  
If today’s oil price jumps to $85, the future might also rise.

---

8. Derivatives
    

---

**What they are**  
Financial products whose value comes from another asset (an underlying).

Types of derivatives: options, futures, swaps, etc.

**Why they exist**  
They allow hedging, leverage, and pricing complex risks.

**Why they matter for Optiver**  
Options and futures are Optiver’s primary focus.  
They must model volatility, probabilities, and payoff structures.

**Simple example**  
An option on Tesla stock is a derivative because its price depends on Tesla’s stock price.

---

9. Options (core for Optiver)
    

---

**What they are**  
Contracts that give the right (but not obligation) to buy or sell an asset at a set price before a certain date.

Types:  
• Call → right to buy  
• Put → right to sell

**Why they exist**  
Risk management, speculation, structured positions.  
Options let traders bet on **direction**, **volatility**, and **time decay**.

**Why they matter for Optiver**  
Options pricing is a **probability + mathematics + real-time decision** game.  
Market makers must constantly quote fair option prices.  
This requires:  
• volatility modeling  
• delta/gamma calculations  
• fast logic  
• risk management

**Simple example**  
Call option: buy Tesla for $250 anytime before next month.  
If Tesla goes to $280 → option becomes valuable.  
If Tesla stays at $240 → option expires worthless.

---

10. “Providing liquidity across global exchanges”
    

---

**What it means**  
Optiver posts prices for thousands of instruments, every second.

**They ensure:**  
• buyers can buy immediately  
• sellers can sell immediately  
• spreading stays tight  
• price jumps are reduced

They do this across:  
• options  
• equities  
• ETFs  
• futures  
• bonds  
• indices  
• currencies

**Simple example**  
When you click “Buy” on your brokerage app, someone like Optiver may be the counterparty fulfilling your order instantly.

---

11. Quantitative Research + Algorithmic Strategies
    

---

**What they are**  
Research: building models to predict fair prices and understand market behavior.  
Algorithmic strategies: rules the trader or firm uses to decide when to quote, how to hedge, and how to adjust prices.

**Why they matter**  
Markets move too fast for intuition alone.  
Quant reasoning → better pricing, lower risk, higher profitability.

**Simple example**  
Your model says an option should be worth $6.20.  
The market is trading at $5.80.  
This may signal mispricing → trading opportunity.

---

12. Low-Latency Infrastructure
    

---

**What it is**  
Systems optimized to act in microseconds.

**Why it matters**  
If Optiver reacts faster than competitors, it captures more trades at better prices.

**Simple example**  
If two market makers see a price move, the one who updates quotes first gets the profitable trade.

---

13. Combining Trading + Research + Engineering
    

---

This is the core of modern prop trading.

**Trade team:** makes real-time decisions.  
**Research team:** builds statistical models, volatility surfaces, pricing frameworks.  
**Engineering team:** builds ultra-fast, reliable systems.

They operate like one unit.

**Simple analogy**  
The traders are the drivers.  
The researchers design how the car should behave.  
The engineers build and tune the engine.

---

If you want next:  
• A simple diagram showing how all concepts connect  
• A 1-page cheat sheet for the cognitive interview  
• Deep explanation of **expected value**, **bid-ask spreads**, **inventory risk**, **volatility**, **option Greeks**, etc.