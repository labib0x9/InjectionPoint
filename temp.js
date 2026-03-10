🔴 Process Management & /proc Internals Problems

Problem 1 — "The Orphan Farm" 🟡 Medium
Background: When a parent process dies before its children, the children become orphans and get re-parented to PID 1.
Task:
Write a bash script that:

Spawns 5 background child processes (each sleeps for 60s)
Kills the parent shell process
Detects all orphaned processes whose original parent no longer exists
Prints their PID, name, and new parent PID

Constraint: Only use /proc — no ps, no pstree.
Key files: /proc/[pid]/status, /proc/[pid]/stat
Expected Output:
PID     NAME       PPID
3421    sleep      1
3422    sleep      1
...

Problem 2 — "Memory Liar" 🟡 Medium
Background: A process can have very different memory numbers depending on how you measure it.
Task:
Given a PID, print a full memory report:

VmRSS — actual RAM in use
VmSize — virtual memory claimed
Shared memory — pages shared with other processes
Heap size — by parsing memory map regions
Stack size — by finding the stack segment

Constraint: Only read from /proc/[pid]/status and /proc/[pid]/maps. No top, no pmap.
Expected Output:
PID: 1234 (firefox)
  RSS (actual RAM):     312 MB
  Virtual size:        2.1 GB
  Shared pages:         88 MB
  Heap:                140 MB
  Stack:                 8 MB

Problem 3 — "Who Owns This Socket?" 🔴 Hard
Background: A port is open on your machine. You need to find which process owns it — without netstat, ss, or lsof.
Task:
Given a port number (e.g. 8080), find:

The socket inode from /proc/net/tcp
Which PID has that inode in its /proc/[pid]/fd/ symlinks
Print the PID, process name, and full command line

Constraint: Pure bash + /proc only. No ss, netstat, lsof, fuser.
Key files: /proc/net/tcp, /proc/[pid]/fd/, /proc/[pid]/cmdline

💡 Hint: /proc/net/tcp stores ports in hex and socket inodes as decimal.

Expected Output:
Port 8080 is owned by:
  PID:      4821
  Name:     node
  Command:  node server.js --port 8080

Problem 4 — "The Deleted File Ghost" 🔴 Hard
Background: A process opened a log file. Someone deleted the file. The process is still writing to it. You need to recover everything.
Task:

Simulate this: start a process that writes to a temp file, then delete the file while it runs
Prove the file is gone from the filesystem (ls shows nothing)
Recover the full contents of the deleted file
Bonus: keep reading it live as the process keeps writing

Constraint: Use only /proc/[pid]/fd/ and standard tools.
Key insight: The file descriptor still exists at /proc/[pid]/fd/[n] even after unlink().
Expected Output:
File deleted. Inode still open by PID 5923.
Recovering via /proc/5923/fd/7 ...
--- Recovered Contents ---
log line 1
log line 2
...
[live tail continues]

Problem 5 — "Syscall Fingerprint" 🔴 Hard
Background: You don't know what a mystery binary does. You can't read its source. But you can watch it.
Task:
Run strace -c against a mystery program and from the syscall frequency table alone, determine:

Is it I/O bound or CPU bound?
Does it do network calls?
Does it spawn children?
Does it read files or only use stdin?
Guess what kind of program it is (web server? compiler? database?)

You are given the strace output of 3 mystery programs. Classify each one.
Scoring:

1 pt per correct boolean flag
3 pts for correct program-type guess


This trains you to read programs like a debugger without source code.


Problem 6 — "Process Snapshot Diff" ⚫ Expert
Background: Something changed on your system between T1 and T2. You need to know exactly what.
Task:
Write a script that:

Takes a snapshot of all running processes at T1 (from /proc)
Waits 10 seconds
Takes snapshot at T2
Outputs a diff:

New processes spawned
Processes that died
Processes whose memory grew by > 10%
Processes that opened new file descriptors



Constraint: Only /proc. No ps, top, lsof.
Key files: /proc/[pid]/stat, /proc/[pid]/status, /proc/[pid]/fd/
Expected Output:
=== Process Diff T1 → T2 ===
NEW:     5201 (python3)  5204 (grep)
DIED:    3812 (curl)
MEM+10%: 1042 (postgres)  +24 MB
NEW FDs: 882 (nginx)  opened 3 new fds

🧠 Skills Map
ProblemCore ConceptOrphan FarmPPID tracking, process re-parentingMemory Liar/proc/maps, VmRSS vs VmSizeSocket Owner/proc/net/tcp, inode → PID mappingDeleted Ghostunlink() vs open FDs, file recoverySyscall Fingerprintstrace, syscall analysisSnapshot DiffFull /proc crawl, state diffing