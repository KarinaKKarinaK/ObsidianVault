### Inference Chips
- In AI, there are **two main compute phases**:
    1. **Training** – when a model (like GPT or Gemini) learns patterns from massive datasets. This is extremely compute-intensive and usually runs on **high-end GPUs** (e.g., NVIDIA A100/H100).
    2. **Inference** – when a trained model is **used to make predictions** (e.g., answering a question, detecting an object in a camera feed, or generating text).
- **Inference chips** are **specialized processors** optimized for this **second stage**. Instead of learning, they **apply existing models efficiently** — focusing on:
    - **Low latency** (fast responses, critical for chatbots/autonomous driving).
    - **Energy efficiency** (inference happens millions/billions of times more often than training).
    - **Cost efficiency** (cheaper per query compared to using the same expensive training GPUs).

#### Why They Matter

- **Scale:** Every AI app (search, finance, medical imaging, cars) runs _billions of inferences per day_.
- **Economics:** Inference can account for **70–80% of total AI compute costs** in production.
- **Edge adoption:** Inference chips can be deployed in cars, phones, IoT devices — not just data centers.
- **Investment angle:** Companies producing inference-optimized silicon (**NVDA, GOOGL, AMZN, ARM, startups like Tenstorrent**) could capture huge growth as AI moves from labs into **mass deployment**.

## What is HBM?

**HBM = High Bandwidth Memory**

- It’s a type of **ultra-fast computer memory** designed for processors that need to move massive amounts of data at high speed (like GPUs used for AI training/inference).
- Unlike traditional **GDDR (graphics memory)** that sits beside the chip, **HBM stacks memory vertically** in layers and connects them directly to the processor using **through-silicon vias (TSVs)**.
- This 3D stacking gives **shorter distances**, **wider data buses**, and **much higher bandwidth** per watt.

---

## Why HBM Matters for AI

- **AI workloads are memory-bound.** Training a large model isn’t just about raw compute—it’s about moving terabytes of parameters in/out of memory quickly.
- **HBM solves bottlenecks**:
    - **Bandwidth:** Current HBM3e can reach **>1.2 TB/s** per GPU, far above GDDR6.
    - **Efficiency:** Uses less power per bit transferred.
    - **Density:** Smaller footprint, allowing more compact, powerful chips.
- Without HBM, even the best GPUs (e.g., NVIDIA H100, B200) would **stall** waiting on memory.