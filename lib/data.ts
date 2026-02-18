export interface Subject {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  topicCount: number
  noteCount: number
  color: string
}

export interface Topic {
  id: string
  subjectId: string
  name: string
  slug: string
  description: string
  noteCount: number
}

export type NoteType = "short" | "detailed"

export interface Note {
  id: string
  subjectId: string
  topicId: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  readTime: number
  views: number
  downloads: number
  tags: string[]
  noteType: NoteType
  verified: boolean
}

export interface ImportantQuestion {
  id: string
  subjectId: string
  topicId: string
  question: string
  answer: string
  marks: number
  year?: string
  type: "short-answer" | "long-answer" | "past-paper"
}

export interface MCQ {
  id: string
  subjectId: string
  topicId: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Feedback {
  id: string
  noteId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Programming',
    slug: 'programming',
    description: 'Learn C, C++, Java, Python and more programming languages with detailed notes and examples.',
    icon: 'Code',
    topicCount: 5,
    noteCount: 24,
    color: 'bg-primary/10 text-primary',
  },
  {
    id: '2',
    name: 'Mathematics',
    slug: 'mathematics',
    description: 'Comprehensive notes on Calculus, Linear Algebra, Probability, Discrete Math and more.',
    icon: 'Calculator',
    topicCount: 4,
    noteCount: 18,
    color: 'bg-accent/10 text-accent-foreground',
  },
  {
    id: '3',
    name: 'DBMS',
    slug: 'dbms',
    description: 'Database Management Systems including SQL, Normalization, ER Diagrams and Transactions.',
    icon: 'Database',
    topicCount: 5,
    noteCount: 20,
    color: 'bg-primary/10 text-primary',
  },
  {
    id: '4',
    name: 'English',
    slug: 'english',
    description: 'Technical writing, grammar, communication skills and comprehension practice materials.',
    icon: 'BookOpen',
    topicCount: 4,
    noteCount: 15,
    color: 'bg-accent/10 text-accent-foreground',
  },
  {
    id: '5',
    name: 'Operating Systems',
    slug: 'operating-systems',
    description: 'Process management, memory management, file systems, CPU scheduling and more.',
    icon: 'Monitor',
    topicCount: 5,
    noteCount: 22,
    color: 'bg-primary/10 text-primary',
  },
  {
    id: '6',
    name: 'Computer Networks',
    slug: 'computer-networks',
    description: 'OSI model, TCP/IP, routing protocols, network security and wireless networks.',
    icon: 'Wifi',
    topicCount: 4,
    noteCount: 16,
    color: 'bg-accent/10 text-accent-foreground',
  },
]

export const topics: Topic[] = [
  // Programming Topics
  { id: 't1', subjectId: '1', name: 'Unit 1 - Introduction to C', slug: 'intro-to-c', description: 'Basics of C programming, data types, operators, and control structures.', noteCount: 5 },
  { id: 't2', subjectId: '1', name: 'Unit 2 - Functions & Arrays', slug: 'functions-arrays', description: 'Functions, recursion, arrays, strings and pointers in C.', noteCount: 4 },
  { id: 't3', subjectId: '1', name: 'Unit 3 - Object-Oriented Programming', slug: 'oop', description: 'Classes, objects, inheritance, polymorphism in C++ and Java.', noteCount: 6 },
  { id: 't4', subjectId: '1', name: 'Unit 4 - Data Structures', slug: 'data-structures', description: 'Linked lists, stacks, queues, trees and graphs.', noteCount: 5 },
  { id: 't5', subjectId: '1', name: 'Unit 5 - Python Basics', slug: 'python-basics', description: 'Python syntax, data types, file handling and libraries.', noteCount: 4 },

  // Mathematics Topics
  { id: 't6', subjectId: '2', name: 'Unit 1 - Calculus', slug: 'calculus', description: 'Limits, derivatives, integrals and their applications.', noteCount: 5 },
  { id: 't7', subjectId: '2', name: 'Unit 2 - Linear Algebra', slug: 'linear-algebra', description: 'Matrices, determinants, eigen values and vector spaces.', noteCount: 4 },
  { id: 't8', subjectId: '2', name: 'Unit 3 - Probability & Statistics', slug: 'probability-stats', description: 'Probability distributions, hypothesis testing and regression.', noteCount: 5 },
  { id: 't9', subjectId: '2', name: 'Unit 4 - Discrete Mathematics', slug: 'discrete-math', description: 'Graph theory, combinatorics, logic and set theory.', noteCount: 4 },

  // DBMS Topics
  { id: 't10', subjectId: '3', name: 'Unit 1 - Introduction to DBMS', slug: 'intro-dbms', description: 'Database concepts, architectures, and data models.', noteCount: 4 },
  { id: 't11', subjectId: '3', name: 'Unit 2 - ER Model', slug: 'er-model', description: 'Entity-Relationship diagrams and relational model.', noteCount: 4 },
  { id: 't12', subjectId: '3', name: 'Unit 3 - SQL', slug: 'sql', description: 'SQL queries, joins, subqueries and aggregate functions.', noteCount: 5 },
  { id: 't13', subjectId: '3', name: 'Unit 4 - Normalization', slug: 'normalization', description: 'Normal forms, functional dependencies and decomposition.', noteCount: 4 },
  { id: 't14', subjectId: '3', name: 'Unit 5 - Transactions', slug: 'transactions', description: 'ACID properties, concurrency control and recovery.', noteCount: 3 },

  // English Topics
  { id: 't15', subjectId: '4', name: 'Unit 1 - Technical Writing', slug: 'technical-writing', description: 'Report writing, proposals, and documentation techniques.', noteCount: 4 },
  { id: 't16', subjectId: '4', name: 'Unit 2 - Grammar', slug: 'grammar', description: 'Parts of speech, tenses, active-passive voice and more.', noteCount: 4 },
  { id: 't17', subjectId: '4', name: 'Unit 3 - Communication Skills', slug: 'communication', description: 'Verbal, non-verbal communication and presentation skills.', noteCount: 3 },
  { id: 't18', subjectId: '4', name: 'Unit 4 - Comprehension', slug: 'comprehension', description: 'Reading comprehension practice and vocabulary building.', noteCount: 4 },

  // OS Topics
  { id: 't19', subjectId: '5', name: 'Unit 1 - OS Introduction', slug: 'os-intro', description: 'OS types, system calls and OS structure.', noteCount: 4 },
  { id: 't20', subjectId: '5', name: 'Unit 2 - Process Management', slug: 'process-management', description: 'Process states, scheduling algorithms and threads.', noteCount: 5 },
  { id: 't21', subjectId: '5', name: 'Unit 3 - Memory Management', slug: 'memory-management', description: 'Paging, segmentation and virtual memory.', noteCount: 5 },
  { id: 't22', subjectId: '5', name: 'Unit 4 - File Systems', slug: 'file-systems', description: 'File organization, directory structure and allocation.', noteCount: 4 },
  { id: 't23', subjectId: '5', name: 'Unit 5 - Deadlocks', slug: 'deadlocks', description: 'Deadlock prevention, avoidance and detection.', noteCount: 4 },

  // CN Topics
  { id: 't24', subjectId: '6', name: 'Unit 1 - OSI Model', slug: 'osi-model', description: 'Seven layers of OSI model and their functions.', noteCount: 4 },
  { id: 't25', subjectId: '6', name: 'Unit 2 - TCP/IP', slug: 'tcp-ip', description: 'TCP/IP protocol suite and internet protocols.', noteCount: 4 },
  { id: 't26', subjectId: '6', name: 'Unit 3 - Routing', slug: 'routing', description: 'Routing algorithms, RIP, OSPF and BGP.', noteCount: 4 },
  { id: 't27', subjectId: '6', name: 'Unit 4 - Network Security', slug: 'network-security', description: 'Encryption, firewalls, SSL/TLS and VPN.', noteCount: 4 },
]

export const notes: Note[] = [
  {
    id: 'n1',
    subjectId: '1',
    topicId: 't1',
    title: 'Introduction to C Programming',
    slug: 'intro-to-c-programming',
    excerpt: 'Learn the fundamentals of C programming including data types, variables, operators, and basic I/O operations.',
    content: `# Introduction to C Programming

## What is C?
C is a general-purpose, procedural programming language developed by Dennis Ritchie at Bell Labs in 1972. It is one of the most widely used programming languages and forms the basis for many modern languages.

## Why Learn C?
- Foundation for understanding computer architecture
- Used in system programming, embedded systems, and OS development
- Efficient and fast execution
- Portable across different platforms

## Basic Structure of a C Program

A C program consists of the following parts:

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

### Key Components:
1. **Preprocessor Directives** - Lines starting with # (e.g., #include)
2. **Main Function** - Entry point of the program
3. **Statements** - Instructions to be executed
4. **Return Statement** - Returns control to the OS

## Data Types in C

| Data Type | Size (bytes) | Range |
|-----------|-------------|-------|
| char | 1 | -128 to 127 |
| int | 4 | -2,147,483,648 to 2,147,483,647 |
| float | 4 | 3.4E-38 to 3.4E+38 |
| double | 8 | 1.7E-308 to 1.7E+308 |

## Variables
Variables are containers for storing data values. In C, you must declare the type of the variable before using it.

\`\`\`c
int age = 21;
float gpa = 3.8;
char grade = 'A';
\`\`\`

## Operators
C supports several types of operators:
- **Arithmetic**: +, -, *, /, %
- **Relational**: ==, !=, <, >, <=, >=
- **Logical**: &&, ||, !
- **Assignment**: =, +=, -=, *=, /=

## Control Structures

### If-Else Statement
\`\`\`c
if (condition) {
    // code block
} else {
    // alternative code block
}
\`\`\`

### For Loop
\`\`\`c
for (int i = 0; i < 10; i++) {
    printf("%d\\n", i);
}
\`\`\`

### While Loop
\`\`\`c
while (condition) {
    // code block
}
\`\`\`

## Summary
C programming provides a solid foundation for understanding how computers work at a low level. Mastering these basics will prepare you for more advanced topics in programming.`,
    author: 'Prof. Sharma',
    createdAt: '2025-12-15',
    updatedAt: '2026-01-10',
    readTime: 8,
    views: 1250,
    downloads: 340,
    tags: ['C Programming', 'Basics', 'Data Types', 'Operators'],
    noteType: 'detailed',
    verified: true,
  },
  {
    id: 'n2',
    subjectId: '1',
    topicId: 't1',
    title: 'Control Flow in C',
    slug: 'control-flow-in-c',
    excerpt: 'Understand if-else, switch-case, loops and branching statements in C with examples.',
    content: `# Control Flow in C

## Conditional Statements

### If Statement
The simplest form of decision-making in C.

\`\`\`c
if (marks >= 90) {
    printf("Grade: A\\n");
}
\`\`\`

### If-Else
\`\`\`c
if (marks >= 50) {
    printf("Pass\\n");
} else {
    printf("Fail\\n");
}
\`\`\`

### Switch-Case
Used for multiple choice decisions.

\`\`\`c
switch (day) {
    case 1: printf("Monday"); break;
    case 2: printf("Tuesday"); break;
    default: printf("Invalid day");
}
\`\`\`

## Loops

### For Loop
Best when the number of iterations is known.

### While Loop
Best when the condition is checked before execution.

### Do-While Loop
Executes at least once, then checks the condition.

## Break and Continue
- **break** - Exits the loop immediately
- **continue** - Skips the current iteration

## Summary
Control flow structures allow you to make decisions and repeat operations, forming the backbone of any C program.`,
    author: 'Prof. Sharma',
    createdAt: '2025-12-18',
    updatedAt: '2026-01-12',
    readTime: 6,
    views: 980,
    downloads: 275,
    tags: ['C Programming', 'Control Flow', 'Loops', 'Conditions'],
    noteType: 'short',
    verified: true,
  },
  {
    id: 'n3',
    subjectId: '2',
    topicId: 't6',
    title: 'Limits and Continuity',
    slug: 'limits-and-continuity',
    excerpt: 'A comprehensive guide to understanding limits, continuity, and their properties in calculus.',
    content: `# Limits and Continuity

## Definition of a Limit
The limit of f(x) as x approaches a is L, written as lim(x->a) f(x) = L.

## Properties of Limits
1. Sum Rule: lim[f(x) + g(x)] = lim f(x) + lim g(x)
2. Product Rule: lim[f(x) * g(x)] = lim f(x) * lim g(x)
3. Quotient Rule: lim[f(x)/g(x)] = lim f(x) / lim g(x)

## Continuity
A function f(x) is continuous at x = a if:
1. f(a) is defined
2. lim(x->a) f(x) exists
3. lim(x->a) f(x) = f(a)

## Types of Discontinuity
- Removable discontinuity
- Jump discontinuity
- Infinite discontinuity

## Summary
Understanding limits and continuity is essential for calculus and forms the foundation for derivatives and integrals.`,
    author: 'Prof. Gupta',
    createdAt: '2025-11-20',
    updatedAt: '2026-01-05',
    readTime: 10,
    views: 1100,
    downloads: 420,
    tags: ['Mathematics', 'Calculus', 'Limits', 'Continuity'],
    noteType: 'detailed',
    verified: true,
  },
  {
    id: 'n4',
    subjectId: '3',
    topicId: 't12',
    title: 'SQL Fundamentals',
    slug: 'sql-fundamentals',
    excerpt: 'Master SQL basics including SELECT, INSERT, UPDATE, DELETE queries and JOINs.',
    content: `# SQL Fundamentals

## What is SQL?
SQL (Structured Query Language) is used to manage and manipulate relational databases.

## Basic SQL Commands

### SELECT
\`\`\`sql
SELECT name, age FROM students WHERE age > 18;
\`\`\`

### INSERT
\`\`\`sql
INSERT INTO students (name, age) VALUES ('John', 20);
\`\`\`

### UPDATE
\`\`\`sql
UPDATE students SET age = 21 WHERE name = 'John';
\`\`\`

### DELETE
\`\`\`sql
DELETE FROM students WHERE age < 18;
\`\`\`

## JOINs
- INNER JOIN - Returns matching rows from both tables
- LEFT JOIN - Returns all rows from the left table
- RIGHT JOIN - Returns all rows from the right table
- FULL JOIN - Returns all rows from both tables

## Aggregate Functions
- COUNT(), SUM(), AVG(), MIN(), MAX()

## GROUP BY and HAVING
Used with aggregate functions to group results.

## Summary
SQL is an essential skill for anyone working with databases. These fundamental commands form the building blocks for complex queries.`,
    author: 'Prof. Patel',
    createdAt: '2025-12-01',
    updatedAt: '2026-01-08',
    readTime: 7,
    views: 1500,
    downloads: 580,
    tags: ['DBMS', 'SQL', 'Queries', 'Database'],
    noteType: 'short',
    verified: true,
  },
  {
    id: 'n5',
    subjectId: '5',
    topicId: 't20',
    title: 'Process Scheduling Algorithms',
    slug: 'process-scheduling',
    excerpt: 'Understand FCFS, SJF, Priority, and Round Robin scheduling algorithms with examples.',
    content: `# Process Scheduling Algorithms

## What is Process Scheduling?
The OS decides which process runs on the CPU at any given time.

## Types of Scheduling
1. **Preemptive** - OS can interrupt a running process
2. **Non-preemptive** - Process runs until completion

## Scheduling Algorithms

### FCFS (First Come First Serve)
- Simplest scheduling algorithm
- Non-preemptive
- Can cause convoy effect

### SJF (Shortest Job First)
- Selects process with smallest burst time
- Optimal for average waiting time
- Difficult to predict burst time

### Priority Scheduling
- Each process is assigned a priority
- Higher priority processes execute first
- Can cause starvation

### Round Robin
- Each process gets a time quantum
- Preemptive version of FCFS
- Good for time-sharing systems

## Comparison Table
| Algorithm | Preemptive | Starvation | Overhead |
|-----------|-----------|------------|----------|
| FCFS | No | No | Low |
| SJF | Both | Yes | Medium |
| Priority | Both | Yes | Medium |
| Round Robin | Yes | No | High |

## Summary
Choosing the right scheduling algorithm depends on system requirements like throughput, response time, and fairness.`,
    author: 'Prof. Kumar',
    createdAt: '2025-12-10',
    updatedAt: '2026-01-15',
    readTime: 9,
    views: 890,
    downloads: 310,
    tags: ['Operating Systems', 'Scheduling', 'CPU', 'Algorithms'],
    noteType: 'detailed',
    verified: false,
  },
  {
    id: 'n6',
    subjectId: '6',
    topicId: 't24',
    title: 'The OSI Model Explained',
    slug: 'osi-model-explained',
    excerpt: 'Detailed explanation of all seven layers of the OSI model with real-world examples.',
    content: `# The OSI Model Explained

## What is the OSI Model?
The OSI (Open Systems Interconnection) model is a conceptual framework with 7 layers that describes how data is transmitted over a network.

## The Seven Layers

### Layer 7 - Application
- Closest to the end user
- HTTP, FTP, SMTP, DNS

### Layer 6 - Presentation
- Data translation and encryption
- SSL/TLS, JPEG, ASCII

### Layer 5 - Session
- Manages sessions between applications
- NetBIOS, RPC

### Layer 4 - Transport
- End-to-end communication
- TCP, UDP

### Layer 3 - Network
- Routing and logical addressing
- IP, ICMP, routers

### Layer 2 - Data Link
- Physical addressing (MAC)
- Ethernet, switches

### Layer 1 - Physical
- Raw bit transmission
- Cables, hubs, signals

## Summary
The OSI model helps understand how different networking protocols work together to enable communication between devices.`,
    author: 'Prof. Singh',
    createdAt: '2025-11-28',
    updatedAt: '2026-01-06',
    readTime: 8,
    views: 1320,
    downloads: 490,
    tags: ['Computer Networks', 'OSI', 'Protocols', 'Networking'],
    noteType: 'short',
    verified: true,
  },
]

export function getSubjectBySlug(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug)
}

export function getTopicsBySubjectId(subjectId: string): Topic[] {
  return topics.filter((t) => t.subjectId === subjectId)
}

export function getNotesByTopicId(topicId: string): Note[] {
  return notes.filter((n) => n.topicId === topicId)
}

export function getNotesBySubjectId(subjectId: string): Note[] {
  return notes.filter((n) => n.subjectId === subjectId)
}

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug)
}

export function searchNotes(query: string): Note[] {
  const lowerQuery = query.toLowerCase()
  return notes.filter(
    (n) =>
      n.title.toLowerCase().includes(lowerQuery) ||
      n.excerpt.toLowerCase().includes(lowerQuery) ||
      n.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  )
}

export function getTopicById(id: string): Topic | undefined {
  return topics.find((t) => t.id === id)
}

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id)
}

export function getNotesByType(type: NoteType): Note[] {
  return notes.filter((n) => n.noteType === type)
}

export function getVerifiedNotes(): Note[] {
  return notes.filter((n) => n.verified)
}

// Important Questions Data
export const importantQuestions: ImportantQuestion[] = [
  { id: 'iq1', subjectId: '1', topicId: 't1', question: 'Explain the basic structure of a C program with an example.', answer: 'A C program consists of preprocessor directives (#include), a main function, variable declarations, statements, and a return statement. The main() function is the entry point of execution.', marks: 5, year: '2025', type: 'short-answer' },
  { id: 'iq2', subjectId: '1', topicId: 't1', question: 'Differentiate between compiler and interpreter. Give examples of languages using each.', answer: 'A compiler translates the entire source code at once (e.g., C, C++), while an interpreter translates line by line (e.g., Python, JavaScript). Compilers produce an executable file, interpreters do not.', marks: 5, year: '2024', type: 'past-paper' },
  { id: 'iq3', subjectId: '1', topicId: 't3', question: 'Explain the four pillars of Object-Oriented Programming with examples.', answer: 'The four pillars are: 1) Encapsulation - bundling data and methods, 2) Abstraction - hiding complexity, 3) Inheritance - deriving new classes from existing ones, 4) Polymorphism - one interface, multiple implementations.', marks: 10, year: '2025', type: 'long-answer' },
  { id: 'iq4', subjectId: '2', topicId: 't6', question: 'Define limit and continuity. State the conditions for a function to be continuous at a point.', answer: 'A limit is the value a function approaches as the input approaches some value. A function f(x) is continuous at x=a if: f(a) is defined, lim(x->a) f(x) exists, and lim(x->a) f(x) = f(a).', marks: 5, year: '2025', type: 'short-answer' },
  { id: 'iq5', subjectId: '2', topicId: 't7', question: 'Find the eigenvalues and eigenvectors of a given 3x3 matrix.', answer: 'To find eigenvalues, solve det(A - λI) = 0. For each eigenvalue λ, solve (A - λI)x = 0 to find the corresponding eigenvector.', marks: 10, year: '2024', type: 'past-paper' },
  { id: 'iq6', subjectId: '3', topicId: 't12', question: 'Write SQL queries for: a) Finding second highest salary b) Joining three tables.', answer: 'a) SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees); b) Use INNER JOIN or LEFT JOIN with ON clauses to connect three tables.', marks: 10, year: '2025', type: 'long-answer' },
  { id: 'iq7', subjectId: '3', topicId: 't13', question: 'Explain normalization up to 3NF with examples.', answer: '1NF: No repeating groups. 2NF: No partial dependencies on composite key. 3NF: No transitive dependencies. Each form removes specific types of data redundancy.', marks: 10, year: '2024', type: 'past-paper' },
  { id: 'iq8', subjectId: '5', topicId: 't20', question: 'Compare FCFS, SJF, and Round Robin scheduling algorithms.', answer: 'FCFS is simple but can cause convoy effect. SJF is optimal for average waiting time but may cause starvation. Round Robin provides fair CPU sharing using time quantum.', marks: 10, year: '2025', type: 'long-answer' },
  { id: 'iq9', subjectId: '6', topicId: 't24', question: 'Explain all seven layers of the OSI model with their functions.', answer: 'Physical (bit transmission), Data Link (MAC addressing), Network (routing), Transport (end-to-end), Session (sessions), Presentation (data translation), Application (user interface).', marks: 10, year: '2025', type: 'long-answer' },
  { id: 'iq10', subjectId: '5', topicId: 't23', question: 'What is a deadlock? Explain the four necessary conditions for deadlock.', answer: 'Deadlock is a state where processes are blocked forever waiting for each other. Four conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.', marks: 5, year: '2024', type: 'past-paper' },
]

// MCQ Data
export const mcqs: MCQ[] = [
  { id: 'mcq1', subjectId: '1', topicId: 't1', question: 'Which of the following is NOT a valid data type in C?', options: ['int', 'float', 'string', 'char'], correctIndex: 2, explanation: 'C does not have a built-in "string" data type. Strings in C are represented as arrays of characters (char[]).' },
  { id: 'mcq2', subjectId: '1', topicId: 't1', question: 'What is the size of an int in C (on most 64-bit systems)?', options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'], correctIndex: 2, explanation: 'On most modern 64-bit systems, an int is 4 bytes (32 bits).' },
  { id: 'mcq3', subjectId: '1', topicId: 't1', question: 'Which header file is required for printf() in C?', options: ['<stdlib.h>', '<stdio.h>', '<string.h>', '<math.h>'], correctIndex: 1, explanation: 'printf() is declared in <stdio.h> (Standard Input Output header).' },
  { id: 'mcq4', subjectId: '1', topicId: 't3', question: 'Which OOP concept allows a child class to inherit from a parent class?', options: ['Encapsulation', 'Polymorphism', 'Inheritance', 'Abstraction'], correctIndex: 2, explanation: 'Inheritance allows a class to derive properties and behaviors from another class.' },
  { id: 'mcq5', subjectId: '2', topicId: 't6', question: 'What is the derivative of sin(x)?', options: ['-cos(x)', 'cos(x)', 'tan(x)', '-sin(x)'], correctIndex: 1, explanation: 'The derivative of sin(x) with respect to x is cos(x).' },
  { id: 'mcq6', subjectId: '2', topicId: 't6', question: 'What is the limit of (sin x)/x as x approaches 0?', options: ['0', '1', 'infinity', 'undefined'], correctIndex: 1, explanation: 'This is a fundamental limit in calculus. lim(x->0) sin(x)/x = 1.' },
  { id: 'mcq7', subjectId: '3', topicId: 't12', question: 'Which SQL clause is used to filter grouped results?', options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'], correctIndex: 1, explanation: 'HAVING is used to filter groups created by GROUP BY. WHERE filters individual rows before grouping.' },
  { id: 'mcq8', subjectId: '3', topicId: 't13', question: 'A table is in 2NF if it is in 1NF and has no:', options: ['Transitive dependencies', 'Partial dependencies', 'Multi-valued dependencies', 'Functional dependencies'], correctIndex: 1, explanation: '2NF removes partial dependencies, where non-key attributes depend on part of a composite primary key.' },
  { id: 'mcq9', subjectId: '5', topicId: 't20', question: 'Which scheduling algorithm may cause starvation?', options: ['Round Robin', 'FCFS', 'SJF', 'All of the above'], correctIndex: 2, explanation: 'SJF (Shortest Job First) can cause starvation for long processes because shorter processes keep getting prioritized.' },
  { id: 'mcq10', subjectId: '5', topicId: 't21', question: 'Which memory management technique causes external fragmentation?', options: ['Paging', 'Segmentation', 'Both', 'Neither'], correctIndex: 1, explanation: 'Segmentation causes external fragmentation because segments are of variable size, leaving gaps in memory.' },
  { id: 'mcq11', subjectId: '6', topicId: 't24', question: 'Which layer of the OSI model is responsible for routing?', options: ['Data Link', 'Transport', 'Network', 'Session'], correctIndex: 2, explanation: 'The Network layer (Layer 3) handles routing, logical addressing (IP), and path determination.' },
  { id: 'mcq12', subjectId: '6', topicId: 't25', question: 'TCP is a _____ protocol.', options: ['Connectionless', 'Connection-oriented', 'Stateless', 'Best-effort'], correctIndex: 1, explanation: 'TCP is a connection-oriented protocol that establishes a connection before data transfer using a 3-way handshake.' },
]

// Feedback Data
export const feedbacks: Feedback[] = [
  { id: 'f1', noteId: 'n1', userName: 'Aarav K.', rating: 5, comment: 'Excellent notes! Very clear explanation of C basics. Helped me a lot for my exam preparation.', createdAt: '2026-01-15' },
  { id: 'f2', noteId: 'n1', userName: 'Priya S.', rating: 4, comment: 'Good content. Could include a few more examples on operators.', createdAt: '2026-01-18' },
  { id: 'f3', noteId: 'n4', userName: 'Rahul M.', rating: 5, comment: 'SQL queries explained perfectly. The JOIN examples are especially helpful.', createdAt: '2026-01-20' },
  { id: 'f4', noteId: 'n3', userName: 'Sneha D.', rating: 4, comment: 'Good overview of limits and continuity. The formulas are well-organized.', createdAt: '2026-01-22' },
  { id: 'f5', noteId: 'n5', userName: 'Vikram P.', rating: 5, comment: 'The comparison table of scheduling algorithms is very useful for quick revision.', createdAt: '2026-01-25' },
  { id: 'f6', noteId: 'n6', userName: 'Ananya R.', rating: 4, comment: 'Nice breakdown of the OSI layers. Would love to see more real-world protocol examples.', createdAt: '2026-01-28' },
]

export function getImportantQuestionsBySubject(subjectId: string): ImportantQuestion[] {
  return importantQuestions.filter((q) => q.subjectId === subjectId)
}

export function getMCQsBySubject(subjectId: string): MCQ[] {
  return mcqs.filter((q) => q.subjectId === subjectId)
}

export function getFeedbacksByNoteId(noteId: string): Feedback[] {
  return feedbacks.filter((f) => f.noteId === noteId)
}
