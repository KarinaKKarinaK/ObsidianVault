# What to Focus On for the Exam

- Complexity (Θ) of all sorting algorithms.
    
- Recurrences & Master Method (know case analysis).
    
- Quicksort (pivot choice, worst/best case).
    
- MergeSort (divide & conquer + recurrence).
    
- Counting/Bucket/Radix Sort (non-comparison).
    
- Selection (RSelect vs DSelect).
    
- Be able to **trace an algorithm step-by-step**.
    
- Loop invariants (Insertion Sort, Selection Sort).

---
# Study Strategies:
### 1) General Flow
Make Obisdian notes using LLMs (from resources like: slides, book, past papers) --> Read these notes thoroughly --> Do past papers alone & then check answers + do AI walkthrough explanations of wrong answers

### 2) Active Recall with Flashcards
- **What:** Make flashcards with:
    
    - Front: “Worst-case complexity of Insertion Sort?”
        
    - Back: “Θ(n²)”
        
    - Front: “When does Quicksort hit worst case?”
        
    - Back: “When pivot = min/max, unbalanced partitions.”
        
- **How:** Use Anki or physical cards.
    
- **Why it works:** Forces your brain to **retrieve knowledge**, not just recognize it.
    
- **Exam Tip:** Include **True/False style statements** from past midterms

### 3) **Teach-Back Method**

- **What:** Explain each concept (e.g., heapsort, stack operations, Θ-notation) as if teaching a classmate.
    
- **How:**
    
    - Record a 3-minute voice memo explaining quicksort’s best/worst case.
        
    - Or write a 1-paragraph explanation in your own words.
        
- **Why it works:** If you can’t explain it simply, you don’t fully understand it.
    
- **Exam Hack:** When you hit a hard question, **“teach yourself out loud”** to reconstruct the logic.

---

## Exam-Style Problem Approaches

- **True/False questions** → memorize complexity facts (from past exams).
    
- **Recurrence questions** → write recurrence clearly, you often don’t need to solve it.
    
- **Heap questions** → draw trees, check heap property (parent ≥ children).
    
- **Stack/Queue implementation** → always test for **overflow/underflow**.
    
- **Loop invariant** → use the 3-step proof (init, maintenance, termination).
    
- **Sorting comparisons** → always contrast best vs worst case.

## Pro Tips for Midterm

- When in doubt, write **Θ() notation**, not `O()` – exam asks specifically for Θ.
    
- Use **analogies** (cards for insertion sort, line for queues, plates for stacks) if you need to recall fast.
    
-  If asked for pseudocode:
    
    - Keep it **minimal** (loops, ifs).
        
    - Mention **edge cases** (overflow/underflow).
        
- Time management:
    
    - T/F questions → answer fast, don’t overthink.
        
    - Longer ones → sketch diagrams first (heaps, recursion trees).
