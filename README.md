# RISC-V Instruction Analysis (Tier 1 + Tier 2)

## Overview
This project analyzes RISC-V instructions by parsing data from the RISC-V Extensions Landscape and cross-referencing it with the official RISC-V ISA manual.

The solution is implemented in Node.js and includes:
- Instruction parsing and grouping by extension
- Detection of instructions belonging to multiple extensions
- Cross-referencing with ISA manual sources
- Reporting mismatches between sources
- Graph generation showing relationships between extensions
- Unit tests validating core logic


## Project Structure
project/
│-- src/
│ |--  parser.js
│ |-- scanner.js
│ |-- comparator.js
│ |-- graph.js
│ |-- index.js
│
|-- test/
│     |-- test.js
│
|-- instr_dict.json
|--README.md
|-- riscv-isa-manual/
|-- src/
|-- *.adoc

---

## Requirements

- Node.js (v14 or higher)
- Git (for cloning the ISA manual repository)

---

## Setup Instructions

### 1. Clone the ISA Manual Repository

```bash
git clone https://github.com/riscv/riscv-isa-manual.git
```
### 2. Download Instruction Data

```bash
https://github.com/rpsene/riscv-extensions-landscape
```

## Place it in the root project directory.

### How to the program 
```bash 
 node src/index.js
 ```
### How to test the code
 ```bash
 node test/test.js
 ```

## This executes:

- Tier 1: Instruction parsing and grouping
- Tier 2: Cross-referencing with ISA manual
- Graph generation
- Run Unit Tests

### Sample Output
Extension Summary
- rv_zba | 4 instructions | e.g. SH1ADD
- rv_m   | 15 instructions | e.g. MUL
- rv_i   | 120 instructions | e.g. ADD

### Cross Reference Report

- 42 matched
- 3 in JSON only
- 5 in manual only

### Graph Output

- zba -> zbb, zbc
- zbb -> zba
- zbc -> zba
