interface Props {
  title: string
  description: string
  image: string
  newsUrl?: string
}

export interface ResearchProject extends Props {}
export class ResearchProject {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    title: 'PyLog: A High-Level Programming and Synthesis Flow for FPGAs',
    description:
      'PyLog is a high-level, Python-based algorithm-centric programming and synthesis flow for FPGA. PyLog features a set of compiler optimization passes and a type inference system to generate high-quality design.',
    image: 'pylog_flow.jpg',
  },
  {
    title: 'CARMA: Context-Aware Runtime Reconfiguration for Energy-Efficient Sensor Fusion',
    description:
      'CARMA is a context-aware sensor fusion approach that uses context to dynamically reconfigure the computation flow on a field-programmable gate array (FPGA) at runtime. By clock gating unused sensors and model sub-components, CARMA significantly reduces the energy used by a multi-sensory object detector without compromising performance.',
    image: 'carma.png',
  },
] as const satisfies ResearchProject[]
