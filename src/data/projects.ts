interface Props {
  slug: string // URL of the project's own page: /projects/<slug>. Use lowercase letters, numbers, and hyphens only.
  title: string
  description: string // short summary shown on the card and at the top of the project page
  image: string // filename inside /public/images/projects/
  contentMdFilePath?: string // Add path to markdown file if exists. Path should be relative to /public/projects/
}

export interface Project extends Props {}
export class Project {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

export const PROJECTS: Project[] = [
  {
    slug: 'pylog',
    title: 'PyLog: A High-Level Programming and Synthesis Flow for FPGAs',
    description:
      'PyLog is a high-level, Python-based algorithm-centric programming and synthesis flow for FPGA. PyLog features a set of compiler optimization passes and a type inference system to generate high-quality design.',
    image: 'pylog_flow.jpg',
    contentMdFilePath: 'pylog.md',
  },
  {
    slug: 'carma',
    title: 'CARMA: Context-Aware Runtime Reconfiguration for Energy-Efficient Sensor Fusion',
    description:
      'CARMA is a context-aware sensor fusion approach that uses context to dynamically reconfigure the computation flow on a field-programmable gate array (FPGA) at runtime. By clock gating unused sensors and model sub-components, CARMA significantly reduces the energy used by a multi-sensory object detector without compromising performance.',
    image: 'carma.png',
  },
] as const satisfies Project[]
