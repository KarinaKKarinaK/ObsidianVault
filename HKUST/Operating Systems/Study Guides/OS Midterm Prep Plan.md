# OS midterm prep plan (COMP3511, Thu Oct 29 2026, 20:00-22:00)

Written 2026-10-17. Open book, printed material only, calculator allowed. Chapters 1-6. Twelve days left, shared with Data Mining A1 (Oct 26), PA2 (Oct 30) and the Discrete Math midterm (Oct 30).

## What the paper looks like (Spring 2026 midterm, the model)

| Part | Marks | What it tests |
| --- | --- | --- |
| Q1 Multiple choice | 25 | all chapters, lab API facts (pipes, threads, mutex code output) |
| Q2 Short questions | 16 | definitions and one-line reasoning: scheduling policy effects, spinlock code, starvation |
| Q3 Process and thread, three fork questions | 24 | draw the process tree, count processes as a function of n, fork + pipe program output |
| Q4 CPU scheduling: MLFQ, RM/EDF, priority-based | 26 | Gantt chart, waiting and turnaround times, schedulability |
| Q5 Synchronization | 9 | semaphores / mutex ordering of worker threads |

Half the marks are Q3 and Q4. Fork trees and scheduling tables are where to be fast and exact.

## Resources, ranked

Core (work through fully):

- `resources/Past Exams/Midterm Spring 2026 (questions + solutions).pdf`. The model paper. Do it first, then again closed.
- `resources/Lecture Slides/Chapter 03 Processes.pdf` (73 pages). fork, wait, exec, pipes, process tree. Q3.
- `resources/Lecture Slides/Chapter 05 CPU Scheduling (full deck).pdf` (61 pages). FCFS, SJF, SRTF, RR, priority, MLFQ, RM, EDF. Q4.
- `resources/Lecture Slides/Chapter 06 Synchronization Tools (full deck).pdf` (29 pages). Critical section, Peterson, test-and-set and swap, mutex, semaphore. Q5 and short questions.
- `resources/Labs/Lab 03 Part 2 - Process and Pipe Syscalls.pptx` and `Lab 04.pptx` (named pipes, pthreads). The exam email said lab API questions are possible. Print these.
- `resources/Homework/HW2 Questions.pdf` (MLFQ calculation, 40 marks of it). Redo it as a paper once solutions appear on Canvas.

Secondary (skim, print the handouts):

- `Chapter 04 Threads and Concurrency.pdf` (39 pages). Multiple choice fodder: user vs kernel threads, fork in multithreaded programs, signals.
- `Chapter 01 Introduction.pdf` and `Chapter 02 OS Structures.pdf`. Multiple choice and short questions only. Your Course Notes already cover these in depth.
- `Chapter 05 CPU Scheduling (handout).pdf`, `Chapter 06 Synchronization Tools (handout).pdf`, `Chapter 05 Summary - Historic Perspectives.pdf`. Compact versions for the open-book pack.
- `Homework/HW1 Questions + Solutions.pdf`. Known-answer practice for chapters 1-4.
- `Labs/Lab 05 Part 2 - MLFQ (PA2) Introduction.pptx` and `Projects/PA2 - Simplified MLFQ.pdf`. Doing PA2 teaches the MLFQ rules you need for Q4.
- `Study Guides/OS Midterm Cram.html`. The review with simulators and the Spring 2026 paper solved.

Low priority for the midterm:

- `Past Exams/Final Spring 2026`. Only Q1 and Q2 overlap; deadlock, memory, file systems are final-only.
- `Lab 01 - Linux Basics`, `Lab 03 Part 1 and 3`, `Lab 05 Part 1`, `PA1 spec`, `Course Info`.

## The plan, your seven steps on the calendar

1. **Oct 17-18, skim.** Chapters 1-6 one slide at a time, fast, no note taking. About 310 slides, two hours. Goal: know what exists and where it lives.
2. **Oct 18-19, overview notes.** Course Notes already cover chapters 1-4. Add chapter 5 and 6 pages in the same style, easiest concepts first: what a burst is, what a Gantt chart is, then the algorithms, then MLFQ, then RM and EDF; for chapter 6 race condition, critical section, Peterson, hardware instructions, mutex, semaphore.
3. **Oct 19, read it all once.** Course Notes end to end, one hour block.
4. **Oct 20-21, past paper with open solutions.** Spring 2026 midterm, then HW2, then HW1. For every question you cannot do, go to the slide that covers it, review, then do it yourself before reading the solution. This is your "start with the exam paper" rule.
5. **Oct 22-23, build the open-book pack.** Not a cheat sheet, a printed pack: chapter 5 and 6 handouts, lab 3 part 2 and lab 4 slides, your Course Notes, a one-page sheet of formulas and procedures (waiting time, turnaround, RR and MLFQ rules, RM utilisation bound, EDF test, semaphore patterns). Tab it so any question is one flip away.
6. **Oct 24-25, read your own pack thoroughly and fix it.** Anything you had to look up twice in step 4 goes on the one-page sheet.
7. **Oct 26-28, closed-answer paper solving.** Spring 2026 midterm again, timed, two hours, pack only. Then HW2 timed. Then the in-scope multiple choice and short questions of the Spring 2026 final. Finish PA2 by Oct 27 so the night before is free.

Rules while doing it: one-hour focus blocks, walk between blocks, no scrolling, binaural beats if they help. Oct 29 daytime: read the one-page sheet, sleep in the afternoon if you can, exam at 20:00.

## How to think about each question type

- **Fork trees.** Draw the tree before counting. Each unconditional fork doubles the live processes. A fork inside a loop of n iterations gives 2^n processes. A fork guarded by an if only forks in the branch where the condition holds. Track printf per branch and remember output order is not guaranteed unless wait is used.
- **Pipes.** fd[0] reads, fd[1] writes. Close the end you do not use. A read blocks until there is data or all write ends are closed. The parent must wait for children if the question says "the parent prints the total".
- **Scheduling tables.** Draw the Gantt chart first, then fill waiting time = finish minus arrival minus burst, turnaround = finish minus arrival. For RR and MLFQ, keep a ready queue column and apply the rule at every quantum expiry and every arrival. For MLFQ note which event demotes (used its quantum) and which keeps the level (blocked for I/O).
- **RM and EDF.** RM: shorter period means higher priority; check utilisation against n(2^(1/n) - 1). EDF: closest absolute deadline wins; schedulable if utilisation is at most 1. Draw the timeline to the hyperperiod.
- **Synchronization.** Ask what must happen before what. One semaphore per "A before B" edge, initialised to 0. A mutex is only for "at most one at a time". Then trace the code line by line as the exam's multiple choice does.
- **Short questions.** Answer in two sentences: the fact, then the reason. "Yes, because the shorter quantum queue is checked first, so a process that blocks for I/O keeps its high level."

## Three videos to watch (about two hours total)

Chosen for the three heaviest parts of the paper. I have not watched them; check the channel name when you open the link.

1. Fork questions, Gate Smashers, "L-1.9: Questions on Fork System Call With Explanation": https://www.youtube.com/watch?v=uMMvYLB4cys. Watch "L-1.8: Fork System call with Example" first if fork is still fuzzy: https://www.youtube.com/watch?v=ixq5cpdEO2Q
2. MLFQ, Neso Academy, "Multilevel Feedback-Queue Scheduling Algorithm": https://www.youtube.com/watch?v=1KLuC0knvs8. Their "Introduction to CPU Scheduling" is the start of the same playlist: https://www.youtube.com/watch?v=EWkQl0n0w5M
3. Critical section and Peterson, "Process Synchronization, Critical Section Problem, Peterson's Solution in Operating System": https://www.youtube.com/watch?v=KHe4g_hBRgY

Two extras if time allows: "Real-Time Scheduling: Rate Monotonic (RMS) vs Earliest Deadline First (EDF) Explained!" https://www.youtube.com/watch?v=ZjL28IDY5Lc, and Jacob Sorber's "Practical use case for fork and pipe in C" https://www.youtube.com/watch?v=6u_iPGVkfZ4 for the pipe program in Q3.
