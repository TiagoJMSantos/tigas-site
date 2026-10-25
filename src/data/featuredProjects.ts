export type ProjectStatus = 'In Progress' | 'Completed' | 'Design Phase / In Progress';

export interface ProjectLink {
  label: string;
  url?: string;
  isPrivate?: boolean;
  type?: 'github' | 'demo' | 'docs' | 'request-access';
}

export interface ProjectContribution {
  summary: string;
  responsibilities?: string[];
}

export interface ProjectTesting {
  summary: string;
  verifiedResults?: string[];
}

export interface ProjectArchitecture {
  summary: string;
  highlights?: string[];
}

export interface FeaturedProjectItem {
  id: string;
  title: string;
  status: ProjectStatus;
  technologies: string[];
  shortDescription: string;
  iconType: 'cloud' | 'cpu' | 'database' | 'boxes';
  overview: {
    problem: string;
    purpose: string;
  };
  highlights: string[];
  contribution?: ProjectContribution;
  architecture?: ProjectArchitecture;
  testing?: ProjectTesting;
  techStack: string[];
  links: ProjectLink[];
  academicContext?: string;
}

export const featuredProjects: FeaturedProjectItem[] = [
  {
    id: 'cloudist',
    title: 'CloudIST',
    status: 'In Progress',
    technologies: ['C', 'POSIX', 'Unix Processes', 'POSIX Threads', 'Synchronization'],
    shortDescription:
      'A POSIX C data center simulator featuring virtual machine reservations, server resource management and concurrent workload execution.',
    iconType: 'cloud',
    overview: {
      problem:
        'Managing finite data center compute, memory, and storage resources under concurrent client workloads requires safe synchronization and resource limits to avoid race conditions or host starvation.',
      purpose:
        'Simulates server provisioning, virtual machine reservations, and process-level execution in a POSIX-compliant Unix environment with strict resource enforcement.',
    },
    highlights: [
      'Server configuration and CPU, RAM and disk resource management.',
      'VM reservations and resource availability validation.',
      'Process management using fork(), exec() and waitpid().',
      'Resource limits using setrlimit() and CPU control through cpulimit.',
      'Parallel configuration processing using POSIX threads.',
      'Shared-state synchronization using read-write locks and per-server mutexes.',
      'Integration testing for process execution, concurrency and resource consistency.',
    ],
    contribution: {
      summary:
        'Academic project developed for the Operating Systems course at Instituto Superior Técnico.',
      responsibilities: [
        'Designed thread synchronization mechanisms using read-write locks for read-heavy state queries and per-server mutexes for state mutations.',
        'Implemented process management routines using fork(), exec(), and waitpid() for isolated task execution.',
        'Enforced operating system resource bounds using setrlimit() and regulated CPU allocation via cpulimit.',
      ],
    },
    testing: {
      summary:
        'Validated through integration tests focused on process execution, concurrency safety, and resource consistency.',
      verifiedResults: [
        'Multi-threaded test suites verifying lock acquisition order without deadlocks.',
        'Process containment verification confirming compliance with CPU and memory limits under concurrent load.',
      ],
    },
    techStack: ['C', 'POSIX', 'pthreads', 'Unix Processes', 'setrlimit', 'cpulimit', 'GCC', 'Make'],
    academicContext: 'Coursework at Instituto Superior Técnico (Operating Systems / Sistemas Operativos).',
    links: [
      {
        label: 'Private repository (Academic Coursework)',
        isPrivate: true,
        type: 'request-access',
        url: 'mailto:tjmsantos07@gmail.com?subject=CloudIST%20Code%20Access%20Request',
      },
    ],
  },
  {
    id: 'minitransformergpt',
    title: 'MiniTransformerGPT',
    status: 'Completed',
    technologies: ['RISC-V Assembly', 'Computer Architecture', 'Logisim'],
    shortDescription:
      'A low-level implementation project exploring Transformer operations through RISC-V Assembly and custom processor design.',
    iconType: 'cpu',
    overview: {
      problem:
        'Understanding modern Transformer architecture requires bridging the gap between high-level tensor mathematics and bare-metal hardware execution.',
      purpose:
        'Implements bare-metal Transformer inference from scratch in RISC-V Assembly and designs a custom 16-bit processor in Logisim with dedicated hardware vector units.',
    },
    highlights: [
      'Transformer self-attention mechanism implemented from scratch in RISC-V Assembly.',
      'Low-level vector dot product and matrix multiplication routines.',
      'Argmax token selection algorithm for autoregressive inference output.',
      'Custom 16-bit processor datapath and control unit designed in Logisim.',
      'Dedicated vector execution units tailored for numerical operations.',
    ],
    contribution: {
      summary:
        'University group project for the Computer Architecture course at Instituto Superior Técnico. Final Grade: 20.0 / 20.0.',
      responsibilities: [
        'Co-developed RISC-V assembly routines implementing matrix operations and self-attention calculation.',
        'Participated in the design, wiring, and verification of the 16-bit processor datapath and control logic in Logisim.',
        'Wrote assembly regression routines to validate operation correctness against expected mathematical outputs.',
      ],
    },
    architecture: {
      summary:
        'Hardware/software co-design aligning RISC-V instruction execution with custom 16-bit hardware units.',
      highlights: [
        'Dedicated 16-bit processor datapath designed in Logisim with custom vector ALU execution stages.',
        'Bare-metal memory layout for model weights, input embeddings, and attention score buffers.',
      ],
    },
    testing: {
      summary:
        'Verified using assembly regression test suites and step-by-step logic simulation.',
      verifiedResults: [
        'Assembly regression tests confirming correct matrix multiplications, self-attention scores, and argmax token outputs.',
        'Functional simulation in Logisim verifying clock cycle accuracy and control hazard prevention.',
        'Academic assessment: 20.0 / 20.0 grade.',
      ],
    },
    techStack: ['RISC-V Assembly', 'Logisim', 'Computer Architecture', 'Digital Logic Design'],
    academicContext: 'Coursework at Instituto Superior Técnico (Computer Architecture / Arquitetura de Computadores).',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/TiagoJMSantos/MiniTransformerGPT',
        type: 'github',
      },
    ],
  },
  {
    id: 'logistics-billing-engine',
    title: 'Logistics Billing Engine',
    status: 'Completed',
    technologies: ['C', 'Data Structures', 'Memory Management', 'Valgrind'],
    shortDescription:
      'A logistics billing and inventory system focused on data management, validation and memory handling.',
    iconType: 'database',
    overview: {
      problem:
        'Logistics and invoicing command-line systems must process high volumes of records reliably while ensuring strict memory efficiency and zero memory leaks.',
      purpose:
        'A high-performance command-line invoicing, catalog, and inventory management system in C designed to handle 10,000+ product records with rigorous memory management.',
    },
    highlights: [
      'Product and inventory catalog management supporting 10,000+ records.',
      'Transaction and invoice tracking with customer shopping cart logic.',
      'European Article Number (EAN-13) validation algorithm.',
      'In-memory data structures tailored for efficient product lookup and updates.',
      'Explicit dynamic memory management with strict error handling.',
    ],
    contribution: {
      summary:
        'Coursework project for the Algorithms and Data Structures course at Instituto Superior Técnico. Final Grade: 17.8 / 20.0.',
      responsibilities: [
        'Designed dynamic in-memory data structures for fast product indexing, customer carts, and invoicing.',
        'Implemented EAN-13 barcode validation algorithms and command-line dispatch logic.',
        'Engineered memory allocation and deallocation paths to ensure zero leaks under heavy test loads.',
      ],
    },
    testing: {
      summary:
        'Evaluated via timed automated test batches and comprehensive memory analysis with Valgrind.',
      verifiedResults: [
        'Valgrind verification: 0 errors and 0 memory leaks (leak-check=full).',
        'Stress-tested with 10,000+ product records under timed batch workloads.',
        'Academic assessment: 17.8 / 20.0 grade.',
      ],
    },
    techStack: ['C', 'Make', 'Valgrind', 'GCC', 'Data Structures', 'Algorithms'],
    academicContext: 'Coursework at Instituto Superior Técnico (Algorithms and Data Structures / AED).',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/TiagoJMSantos/logistics-billing-engine',
        type: 'github',
      },
    ],
  },
  {
    id: 'erplatform',
    title: 'ERPlatform',
    status: 'Design Phase / In Progress',
    technologies: ['Java', 'Object-Oriented Programming', 'UML'],
    shortDescription:
      'An academic retail platform project modelling products, companies, customers, shopping carts, purchases, orders and notifications.',
    iconType: 'boxes',
    overview: {
      problem:
        'Enterprise retail systems involve intricate interactions among suppliers, retail customers, shopping carts, order lifecycles, and event notifications requiring rigorous domain modeling before implementation.',
      purpose:
        'An academic enterprise retail platform modeling comprehensive e-commerce domain operations using object-oriented principles and formal UML design.',
    },
    highlights: [
      'Domain modeling for commercial entities: Companies, Products, Customers, Carts, Orders, and Notifications.',
      'UML class and sequence diagrams defining domain relationships, multiplicities, and interfaces.',
      'Object-oriented architectural patterns (encapsulation, abstraction, inheritance, polymorphism).',
      'Defined state flow for purchase orders, inventory deduction, and customer notifications.',
      'Architectural blueprint prepared for modular Java service implementation.',
    ],
    contribution: {
      summary:
        'Academic project developed for the Object-Oriented Programming course at Instituto Superior Técnico.',
      responsibilities: [
        'Created formal UML class diagrams defining entity relationships and structural constraints.',
        'Modeled state lifecycles for shopping carts, checkout transitions, and order notification queues.',
        'Established modular class hierarchies and encapsulation boundaries in preparation for Java implementation.',
      ],
    },
    architecture: {
      summary:
        'Domain-driven object-oriented architecture organized around business entities and decoupled event notification flows.',
      highlights: [
        'Clear separation between supplier companies, consumer accounts, and transaction contexts.',
        'Extensible notification interfaces supporting diverse channel dispatching.',
      ],
    },
    testing: {
      summary:
        'Verified through domain scenario walk-throughs and structural consistency reviews against edge-case commerce workflows.',
      verifiedResults: [
        'UML domain model validated for entity multiplicity consistency and invariant preservation.',
        'Implementation note: Comprehensive JUnit test suites are planned for the upcoming Java implementation phase.',
      ],
    },
    techStack: ['Java', 'Object-Oriented Programming', 'UML', 'Design Patterns'],
    academicContext: 'Coursework at Instituto Superior Técnico (Object-Oriented Programming / POO).',
    links: [
      {
        label: 'Academic project in design phase (Private repository)',
        isPrivate: true,
        type: 'request-access',
        url: 'mailto:tjmsantos07@gmail.com?subject=ERPlatform%20Project%20Inquiry',
      },
    ],
  },
];
