# COMP 3511 Course Notes (Chapters 1-4 in depth + exam-derived material for the rest)

Full notes from the Chapter 1-4 decks, then the S2026 midterm and final worked problems, which also cover scheduling, synchronization, deadlock, memory, VM, storage, and file systems. For logistics see [[Course Overview - Operating Systems]].

---

# Chapter 1: Introduction

## What is an OS

- Four layers: users → application programs → **OS** → hardware. OS = intermediary that hides hardware complexity (abstraction) and allocates resources.
- Two classic characterizations (exam favorite): **resource allocator** (efficient + fair resolution of conflicting requests) and **control program** (prevents errors and improper use).
- **Kernel** = "the one program running at all times". **System programs** ship with the OS but aren't kernel; **middleware** = frameworks (DBs, media) common on mobile; **application programs** are unrelated to the OS.
- Environments shape design: mainframe (fairness), workstation (performance), mobile (battery, touch UI), embedded (ROM, no UI), real-time (deadlines).

## Computer organization

- CPUs + device controllers on a **common bus** sharing memory; concurrent execution competing for memory cycles.
- **Von Neumann**: Control Unit (IR, PC), ALU, registers (PC, AC, MAR, MDR); instructions and data in the same memory. Cycle: **fetch → decode → fetch data → execute → write back**.
- Units: byte = 8 bits; word = native unit (64-bit machine → 8-byte word); KB/MB/GB = powers of 1024; **networking measured in bits/s**.

## Storage hierarchy

- Registers → cache → main memory (volatile) → NVM/SSD → HDD (nonvolatile) → optical/tape. Varies by speed, cost, capacity, volatility.
- Main memory: only large storage the CPU accesses directly; **byte addressable**; DRAM; **bootstrap program in EEPROM**.
- Access times: registers 0.25-0.5 ns, cache 0.5-25 ns, RAM 80-250 ns, SSD ~25-50 us, disk ~5 ms. Jeff Dean numbers: L1 0.5 ns, RAM ref 100 ns, disk seek 10 ms, 1 MB sequential from RAM 250 us vs disk 20 ms.

## Caching

- Copy hot subset from slower/larger to faster/smaller storage. Hit vs miss; key metric = hit ratio.
- $\text{Avg access time} = h \cdot t_{hit} + (1-h) \cdot t_{miss}$ - high hit ratio ALONE is not enough; hit time and miss penalty matter (this exact point was a midterm short question).
- Works because of **temporal locality** (recently used → used again) and **spatial locality** (neighbors used soon). Uniform random access → caching useless.

## Multiprocessors

- Definitions: **CPU** executes instructions; **processor** = chip with ≥1 CPUs; **core** = basic compute unit; **multicore** = several cores per chip (own registers + L1, shared L2); **multiprocessor** = several processors.
- Speedup with N processors **< N** (bus/memory contention). Advantages: throughput, economy of scale, reliability (graceful degradation).
- **Asymmetric** (master-slave) vs **SMP** (each does everything, own registers/cache, shared memory).
- **NUMA**: per-CPU local memory over an interconnect, one shared address space; scales better; remote access is slower.

## Multiprogramming, timesharing, virtualization

- **Multiprogramming** = keep the CPU always busy with some job (efficiency, job scheduling). **Timesharing** = frequent switching for interactivity (response time, processes, CPU scheduling, swapping, virtual memory).
- **Virtualization**: host hardware + **VMM/hypervisor** (full control, presents an interface identical to the host) + guest OSes. IBM 1972; VMware/Xen. Uses: server consolidation, cross-OS apps, testing.
- **Cloud**: virtualization + network delivery, pay per use (EC2). Public/private/hybrid; **SaaS / PaaS / IaaS** (+ MaaS).

---

# Chapter 2: OS Structures

## OS services

- User-facing: UI (CLI/GUI/touch), program execution, I/O, file-system manipulation, **communications (shared memory or message passing)**, error detection.
- System-facing: resource allocation, logging/accounting, protection (internal access control) and security (external defense, authentication).
- Shell: **fetch → interpret → execute**. GUI from Xerox PARC, popularized by Macintosh (1984).

## System calls and APIs

- System call = programming interface to OS services. Programmers use **APIs** (Win32, POSIX, Java) via libraries (libc): **portability** + **hides implementation detail**.
- Implementation: each syscall has a number; the syscall interface keeps a **table indexed by number**; intercepts API call → invokes syscall (user → kernel mode) → returns status/values. Caller knows nothing about implementation.
- `printf()` → library → **`write()`** system call (this printf/write relationship is an exam MC).
- `read(int fd, void *buf, size_t count)` returns bytes read, **0 = EOF, -1 = error**.
- **Parameter passing, 3 ways**: registers (limited count), block/table in memory (address in register), stack. Block and stack don't limit number/length.
- Six categories: process control, file management, device management, information maintenance, communications, protection.
- Windows ↔ UNIX: CreateProcess/fork, ExitProcess/exit, WaitForSingleObject/wait, CreateFile/open, ReadFile/read, CloseHandle/close, ioctl, getpid, alarm, sleep, pipe, shm_open, mmap, chmod/umask/chown.
- Example: `cp in.txt out.txt` = a sequence of syscalls (acquire names, open input, create output, read/write loop, close, message, terminate).

## Linkers, loaders

- Compiler → **relocatable object file**; **linker** combines objects + libraries → executable; **loader** brings it into memory; **relocation** assigns final addresses. Modern OSes use **DLLs**, loaded once and shared.

## Design

- **Policy = WHAT; mechanism = HOW.** Timer = mechanism; how long to set it = policy. Separation gives flexibility. (Classic exam question.)
- Written in C/C++ (portable), lowest levels assembly.
- MS-DOS: single-tasking, no process created, overwrites all but kernel, no dual mode (8088). FreeBSD: multitasking, shell does **fork() then exec()**, waits or continues.

## OS structures (compare/contrast exam staple)

| Structure | Idea | Pro | Con |
| --- | --- | --- | --- |
| Monolithic (UNIX, Linux) | all kernel functionality, one binary, one address space | fast, low syscall overhead | hard to implement/debug/maintain |
| Layered | layer N uses only layer N-1's interface; info hiding | easy construction + debugging | hard to define layers; traversal overhead |
| Microkernel (Mach, Darwin) | minimal kernel (process mgmt, memory mgmt, IPC); services in user space communicating by **message passing** | extensible, portable, secure/reliable | message-passing performance cost (Windows NT anecdote) |
| Loadable kernel modules (Linux, Solaris) | core kernel + modules loaded at boot/run time | modular like layered/microkernel but **no message passing**, monolithic performance | - |
| Hybrid | combinations (Linux = monolithic + modules; Windows = monolithic + personalities; macOS = Darwin) | practical balance | - |

- **Darwin** = Mach microkernel + BSD (XNU): two syscall interfaces (Mach traps + POSIX), I/O kit, kexts.
- **Android**: ART VM, Android API, JNI (bypasses VM, not portable), native libs, **HAL**, **Bionic** libc, modified Linux kernel. Open-source vs iOS closed.
- History: batch → multiprogramming (expensive hardware) → timesharing → PCs (cheap hardware, expensive humans).

---

# Chapter 3: Processes

## Concept

- **Process = program in execution** = address space + ≥1 threads. Program = passive (file on disk); process = active.
- Parts: **text** (code), **data** (globals: initialized + uninitialized), **heap** (grows up, malloc), **stack** (grows down: params, return addresses, locals), PC + registers.
- Loading: load code + static data, allocate stack (argc/argv), heap, init I/O (fds 0/1/2 = stdin/stdout/stderr).

## States and PCB

- **new → (admitted) → ready → (dispatch) → running**; running → ready (**interrupt**), running → waiting (**I/O or event wait**), waiting → ready (**completion**), running → terminated (**exit**). Know all six transition labels.
- **PCB**: state, PC, CPU registers, scheduling info (priority, queue pointers), memory-management info (page tables), accounting, I/O status (open files). Linux: `task_struct` in a circular doubly linked list; `current` pointer.

## Scheduling basics

- Goal: maximize CPU utilization. **Degree of multiprogramming** = processes in memory. **I/O-bound**: many short CPU bursts; **CPU-bound**: few long bursts.
- **Ready queue** + **wait queues**; queueing diagram.
- **Long-term** scheduler (admits jobs, controls degree of multiprogramming, seeks I/O/CPU mix, infrequent); **short-term/CPU** scheduler (picks from ready queue, milliseconds, fast); **medium-term** = swapping out/in.
- **Context switch**: save old state to PCB, load new; pure **overhead**; faster with hardware support (multiple register sets).

## Interrupts, DMA, dual mode

- Device controllers have local buffers; signal completion via **interrupt**. CPU checks between instructions → interrupt handler → resume. Priority levels exist (an exam MC: "all interrupts serviced the same way" is FALSE).
- **Trap/exception** = software-generated, synchronous (divide by zero, syscall). **Interrupt** = external, asynchronous. **System call** = requested service. (Three mode-transfer types.)
- **DMA**: for fast devices; controller transfers device↔memory directly, bus mastering, one interrupt per block (less CPU involvement - exam MC). Six-step transfer ends with interrupt when count = 0.
- **Dual mode**: mode bit, kernel = 0 / user = 1; **privileged instructions** only in kernel mode (I/O control, timer, interrupt management); timer guarantees OS regains control. Intel rings 0-3; VMM mode between user and kernel.

## fork / exec / wait

- `fork()` duplicates the entire address space; both continue at the next instruction. Returns **child pid (>0) in parent, 0 in child, -1 error**.
- Duplicated: address space, variables, CWD, resources, PC. Different: PID, fork return value, running time/state.
- **Copy-on-write**: share pages until written; fast when exec follows. Linux fork = `clone(SIGCHLD, 0)`.
- `exec()` replaces the process image (does not return on success, -1 on failure); `wait(&status)` returns terminated child's pid + status; `exit()` frees resources.
- Shell loop: `fork()`; child `exec(prog)`; parent `wait()`.

### Fork counting (exam banker - practice these)

- `for(i<10){ fork(); fork(); }` → each iteration ×4 → $4^{10}$ processes.
- `for(i<10){ if(fork()) fork(); }` → each iteration one process becomes 3, but only ... careful: parent + 2 children, children continue → $3^{10}$.
- Midterm Q3.1: `if (fork()) fork(); else break;` per iteration: child breaks, parent spawns a second child that continues → active doubles: $A_k = 2^k$; total after n iterations $= 2^{n+1} - 1$ (n=2: 7 processes, 3 breaks).
- Midterm MC10: loop 3 times, child forks + prints X + returns → 7 processes, 6 "X", 1 "Y".
- Rule: if each iteration turns 1 active process into k active ones, actives $= k^n$; count stopped ones separately.

## Termination, zombies, orphans

- **Zombie**: child terminated, parent hasn't called `wait()` yet - PID, table entry, PCB remain (hold exit status); not runnable. Every process passes through it briefly.
- **Orphan**: parent died without wait; **init/systemd adopts** and periodically waits. **Cascading termination**: OS kills children when parent dies.

## IPC

- **Shared memory**: fast, kernel only at setup. **Message passing**: kernel-mediated, good for distributed.
- **Bounded buffer** (shared memory producer-consumer): `in`, `out`; **empty iff in == out; full iff (in+1) % N == out**; holds N-1 items.
- Message passing: direct (names, one link per pair, poor modularity) vs **indirect (mailboxes)** (shared mailbox, >2 processes possible, create/send/receive/destroy).
- **Blocking** send/receive vs non-blocking; both blocking = **rendezvous**. Buffering: zero capacity (rendezvous), bounded, unbounded.
- **Ordinary pipes**: `pipe(fd)`, **fd[0] = read end, fd[1] = write end**, unidirectional, parent-child only (inherited via fork), die with processes; close the unused end. NOT accessible by arbitrary processes (exam MC).
- **Named pipes (FIFOs)**: `mkfifo()`, no parent-child needed, persist, half-duplex on UNIX (Windows named pipes are full-duplex, cross-machine).
- **Sockets**: endpoint = IP + port; the 4-tuple (src IP, src port, dst IP, dst port) identifies a connection; well-known ports < 1024 (SSH 22, HTTP 80); clients initiate from ports > 1024. RPC for remote services.
- Pipe exam pattern (midterm Q3.3): redirect stdin with `close(0); dup(fin);`, child writes count into `fd[1]`, parent `waitpid` then reads `fd[0]`.

---

# Chapter 4: Threads

- **Thread** = basic unit of CPU utilization: **TID + PC + register set + stack** (private, in TCB); shares code, data, open files, signals with process peers.
- TCB: execution state, scheduling info, accounting, pointers, link to PCB. Ready queue + per-device wait queues of TCBs; same 5-state lifecycle as processes.
- Threads = concurrency (active); address space = protection (passive).
- **Four benefits**: responsiveness, resource sharing, economy (creation + switch cheaper than process), scalability (multicore).
- Thread context switch: same address space → much cheaper than process switch.
- **Concurrency** = progress via time multiplexing (single core); **parallelism** = simultaneous execution (multicore). (Exam MC.)
- **Data parallelism** (same op, data split across cores) vs **task parallelism** (different ops per thread); hybrids common.
- Multicore challenges: dividing tasks, balance, data splitting, data dependency, testing/debugging.

## Amdahl's Law (compute this)

$$speedup \le \frac{1}{S + \frac{1-S}{N}}$$

- 75% parallel on 2 cores: $1/(0.25 + 0.375) = 1.6\times$. Limit $N \to \infty$: $1/S$. Midterm MC: S = 0.39, N = 3 → ≈1.69.

## User vs kernel threads, models

- **User threads**: managed by a library (Pthreads, Windows, Java), invisible to kernel, can't be scheduled on CPU directly. **Kernel threads**: scheduled by OS.
- **Many-to-one** (Green Threads): one blocked thread blocks all; no parallelism. **One-to-one** (Windows, Linux): max concurrency, kernel overhead - modern default. **Many-to-many** (+ thread pool): flexible, hard to implement. **Two-level**: M:M + binding.

## Threading issues

- **fork/exec semantics**: some UNIXes have two forks - duplicate only calling thread (if exec follows) or all threads. exec replaces everything.
- **Signals**: synchronous (own fault: divide by 0, bad memory) → delivered to the causing thread; asynchronous (Ctrl-C, timer) → may go to all threads. Delivery options: applicable thread / every thread / certain threads / designated thread. `kill(pid, sig)` vs `pthread_kill(tid, sig)`. Default handler in kernel, user-defined can override.
- **Cancellation**: asynchronous (immediate) vs **deferred (default)** - target checks at cancellation points. `pthread_create / pthread_cancel / pthread_join`.
- **Windows**: one-to-one; ETHREAD + KTHREAD (kernel space), TEB (user space); separate user/kernel stacks.
- **Linux**: no thread/process distinction - **tasks**; `clone()` with CLONE_VM / CLONE_FS / CLONE_FILES / CLONE_SIGHAND flags controls sharing.

---

# Chapter 5+ (from exam solutions - get the slide decks when released)

## CPU scheduling

- Criteria: CPU utilization, throughput, **waiting time** (completion − arrival − burst), **turnaround**, **response time = arrival → FIRST run** (exam MC).
- **MLFQ**: multiple queues, new processes enter top queue (small quantum); using the full quantum demotes; higher queues preempt; preemption alone doesn't demote; preempted jobs rejoin the head of their queue. Each queue can use a different algorithm (exam MC). Practice the midterm Q4.1 trace (avg waiting 23.33, avg response 4.67).
- **Real-time**: **RM** (static priority = shortest period) vs **EDF** (dynamic, earliest deadline). EDF misses fewer deadlines (midterm: RM 4 misses vs EDF 2 on the same task set). Draw slot-by-slot Gantt charts, check each period's deadline.
- **Dynamic priority**: priority changes at rate α waiting, β running; re-evaluated at check intervals; α>0, β<0 gives round-robin behavior; β>0 means running process keeps CPU.
- Custom-policy reasoning (midterm short answer): priority $f_i = 1/(a c_i + b)$ with $c_i$ = average burst favors I/O-bound (small bursts → high f); YES it can starve CPU-bound processes.

## Synchronization

- **Race condition**: concurrent access to shared data, outcome depends on interleaving (e.g. two threads increment a counter, an update is lost).
- **test_and_set / swap** hardware primitives; spinlock acquire: `while(swap(locked, 1) == 1);` Spinlock: wastes CPU (busy wait) but no context switch.
- Bounded-waiting mutual exclusion with test_and_set: the exiting process hands the lock to the next waiting process (sets `waiting[j] = false`) instead of releasing - know why (midterm MC25).
- **Semaphores for ordering** (midterm Q5 pattern): to force C → B → A: sems init 0; A: `wait(s2)` before print... general recipe: each dependency X-before-Y = one semaphore; X signals after work, Y waits before work.
- Semaphore init 0 forces strict ordering (MC23: worker1 then worker2 → "A 2; B 5;").
- **Condition variables**: `pthread_cond_wait(&cv, &mutex)` releases the mutex while waiting, re-acquires before returning; always used in a `while` loop.
- **Readers-writers**: `mutex` protects `read_count`; `rw_mutex` gives writers exclusivity (first reader locks it, last reader unlocks). Final Q3.1 extends with priority writers + batch reader release - study that solution's condition structure.

## Deadlock

- 4 conditions: mutual exclusion, hold and wait, no preemption, **circular wait** (prevent via global resource ordering - exam MC).
- **RAG**: cycle with single instances = deadlock; with multiple instances, run reduction to find a safe sequence.
- **Banker's**: $Need = Max - Allocation$. Safety: repeatedly find a process with $Need \le Available$, finish it, add its Allocation back. Request granting: check request ≤ Need and ≤ Available, tentatively grant, re-run safety; deny if no safe sequence. Practice final Q3.3 (safe sequence P3, P4, P1, P2; request denied). Watch tiebreak instructions ("lexicographically largest").
- Minimum resources to avoid deadlock: remaining needs must let at least one process finish.

## Memory management

- Allocation: **first-fit / best-fit / worst-fit** (holes 100/500/200/300/600, request 212 → 500 / 300 / 600).
- **Paging**: VA = page number | offset; 4 KB pages → 12-bit offset (last 3 hex digits); physical = frame ‖ offset.
- **Segmentation**: physical = base + offset, trap if offset ≥ limit.
- **Two-level page tables**: avoid one huge contiguous table. Exam translation drill (final Q4.1): split VA 10|10|12, PDE address = PD base + index×4, second-level base = page size × PDE's PPN, check valid/writeable bits at BOTH levels, stop at first invalid ("ERROR: invalid" - reason required). Watch endianness of PTE bytes.

## Virtual memory

- Demand paging, page fault when valid page not resident. **Effective access time** = weighted average of hit time and fault time (final: 6 faults, 10 hits, EAT = (6×10⁶ + 10×101)/16 ≈ 375,063 ns).
- Replacement: **FIFO**, **Optimal** (evict the one used farthest in the future), **LRU**. Practice full-table traces (final Q4.2: 16 / 11 / 15 faults with 3 frames, LRU 4 frames 13). Layout pages of a data structure (array-stored tree, 4 nodes per page) and trace faults for a traversal.
- **Page size ↑** (memory fixed): page table smaller, TLB hit rate up, internal fragmentation up.
- **Thrashing**: total working sets > frames. **Working-set model** vs **Page-Fault Frequency** (monitor fault rate; too high → give frame, too low → take frame).

## Mass storage

- **Service time = seek + rotational latency + transfer + overhead**; avg rotational latency = half a rotation = $\frac{60}{2 \cdot RPM}$ s (7200 RPM → 4.17 ms).
- **Disk scheduling**: FCFS, SSTF (nearest), SCAN (sweep to end, reverse), C-SCAN (sweep to end, jump to other end), LOOK / C-LOOK (reverse at last request). Compute total head movement; respect current direction. Final Q5.2 answers: FCFS 1492, SSTF 514, SCAN 550, C-SCAN 997, LOOK 510, C-LOOK 859 (head 100, moving toward smaller).
- **RAID**: 0 striping (performance, no redundancy), 1 mirroring, 5 distributed parity (survives 1 disk). SSD: no seek/rotational latency, but erase-before-write + wear leveling.

## File systems

- **Open-file tables**: per-process (position, access rights) + system-wide (open count so the entry can be freed on last close).
- Allocation: **contiguous** (external fragmentation, hard to grow), **linked** (pointer overhead, bad random access; FAT variant), **indexed** (index block overhead; best for large files with random access).
- **inode max file size**: block $2^b$ bytes, address $2^a$ bytes, $x = 2^{b-a}$ addresses/block, n direct + single + double + triple indirect: $2^b(n + x + x^2 + x^3)$ bytes.
- **FAT16**: max clusters $2^{16}$; min cluster size = volume / $2^{16}$ (2 GB → 32 KB); file clusters = ceil(size/cluster); waste = clusters×size − file.
- **UNIX permissions**: classes checked **owner → group → public, first match applies exclusively** (chmod 705 + user in group → denied, even though public has 5).

## Protection

- **Rings**: 0 kernel … 3 user; TrustZone/hypervisor sit at HIGHER privilege than the kernel (not rings 1-2 apps).
- **Access matrix**: row = domain's **capability list**; column = object's **ACL**.

---

# Exam playbook (S2026 papers, both with solutions)

## Format

- Both exams: 5 problems, 100 pts, **open-book open-notes (hard copies)**, calculator OK.
- Midterm (2h): 25 MC (25) + short questions (16) + process/thread (24) + scheduling (27) + synchronization (8).
- Final (2.5h): 20 MC (20) + short (12) + sync/deadlock (26) + memory/VM (30) + FS/disk (12). Cumulative but mostly post-midterm.

## Question types to drill

1. **Fork tracing** (MC + long): count processes, outputs, draw trees; handle fork/exec/wait failure cases (exec succeeds → later printf never runs).
2. **Gantt charts**: MLFQ with precise preemption rules, RM vs EDF with deadline miss counts, dynamic priority with α/β. Read the rule statement carefully - tiebreaks and "rejoin at head" matter.
3. **Fill-in-the-blank C**: pipes with stdin redirection, semaphore ordering, readers-writers variants. Blanks are graded individually - fill everything.
4. **Banker's + RAG**: mechanical; watch the requested tiebreak order.
5. **Address translation in hex**: two-level walk, TLB first, check valid/writeable at both levels, give ERROR reason or score 0.
6. **Page replacement tables**: FIFO/OPT/LRU traces; note stated tiebreaks (OPT: evict smallest page number).
7. **Disk scheduling**: all 6 algorithms on one queue; direction given.
8. **FAT/inode arithmetic**: powers of two.
9. **Concept MCs**: pulled almost verbatim from slides (solutions cite slide numbers) - bring printed slides to the exam.

## Practical tips

- Exams are open-book: print the chapter slides, these notes, and both past papers with solutions.
- Clarifications get issued mid-exam; read every rule in scheduling/sync problems literally.
- Show work: partial credit per 4 correct Gantt blocks, per matrix, per step in translations.
