## Overview

Designing FPGA accelerators usually means writing low-level hardware code or carefully tuned HLS C/C++. PyLog lets designers describe an accelerator as an ordinary Python function instead. Designers focus on the algorithm, and PyLog takes care of generating an efficient FPGA design and running it on the board.

## How it works

A PyLog program is a regular Python file. Functions marked with the `@pylog` decorator become hardware accelerators, and the rest of the file runs on the host:

```python
import numpy as np
from pylog import *

@pylog
def add(a, b, c, d, e):
    d = (a + b) * c
    e = map(lambda x, y: x + y, a, d)
    return a + b

if __name__ == "__main__":
    a = np.array([1, 3, ...])
    b = np.array([8, 9, ...])
    print(add(a, b))
```

From there, PyLog runs two flows automatically:

- **Synthesis flow.** The PyLog code generator analyzes the decorated function, infers types, applies compiler optimizations, and emits HLS C code. The PyLog system generator then produces the Tcl scripts, IP, and system integration needed for a complete FPGA design.
- **Deployment flow.** The PyLog runtime programs the FPGA, allocates memory, starts the accelerator, and collects the results, so running the design is as simple as `python3 vecadd.py`.

## Publication

Sitao Huang, Kun Wu, Hyunmin Jeong, Chengyue Wang, Deming Chen, and Wen-Mei Hwu. **PyLog: An Algorithm-Centric Python-based FPGA Programming and Synthesis Flow.** _IEEE Transactions on Computers_, 2021. [[PDF]](https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9591456&tag=1)
