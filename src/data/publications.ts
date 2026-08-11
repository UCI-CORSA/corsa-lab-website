import { MEMBERS, Member } from './members'

export const PublicationTypes = ['Conference', 'Poster', 'Workshop', 'Journal', 'Preprint'] as const
export type PublicationType = (typeof PublicationTypes)[number]

export const ResearchTopics = {
  compiler: { emoji: '🛠️', label: 'Compiler' },
  fpga: { emoji: '🔌', label: 'FPGA' },
  'dnn-accelerators': { emoji: '🧠', label: 'DNN Accelerators' },
  quantization: { emoji: '📉', label: 'Quantization' },
  'heterogeneous-computing': { emoji: '🖥️', label: 'Heterogeneous Computing' },
}
export type ResearchTopicType = keyof typeof ResearchTopics

export enum PublicationLinkType {
  PDF = 'PDF',
  SLI = 'Slides',
  POS = 'Poster',
  ACM = 'ACM DL',
  WEB = 'Website',
  VID = 'Video',
  TRA = 'Trailer',
  ARX = 'arXiv',
}

interface Props {
  title: string
  authors: (Member | string)[]
  year: number
  venue: string
  topics: ResearchTopicType[]
  type: PublicationType
  award?: string
  links?: { url: string; type: PublicationLinkType }[]
}

export interface Publication extends Props {}
export class Publication {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

export const PUBLICATIONS: Publication[] = [
  {
    title: 'PyLog: An Algorithm-Centric Python-based FPGA Programming and Synthesis Flow',
    authors: [MEMBERS.sitaohuang, 'Kun Wu', 'Hyunmin Jeong', 'Chengyue Wang', 'Deming Chen', 'Wen-Mei Hwu'],
    venue: 'IEEE Transactions on Computers',
    year: 2021,
    topics: ['compiler', 'fpga'],
    type: 'Journal',
    links: [
      {
        url: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9591456&tag=1',
        type: PublicationLinkType.PDF,
      },
    ],
  },
  {
    title: 'Mixed Precision Quantization for ReRAM-based DNN Inference Accelerators',
    authors: [
      MEMBERS.sitaohuang,
      'Aayush Ankit',
      'Plinio Silveira',
      'Rodrigo Antunes',
      'Sai Rahul Chalamalasetti',
      'Izzat El Hajj',
      'Dong-Eun Kim',
      'Glaucimar Aguiar',
      'Pedro Bruel',
      'Sergey Serebryakov',
      'Cong Xu',
      'Can Li',
      'Paolo Faraboschi',
      'John Paul Strachan',
      'Deming Chen',
      'Kaushik Roy',
      'Wen-mei Hwu',
      'Dejan Milojicic',
    ],
    venue: 'ASP-DAC 2021',
    year: 2021,
    topics: ['quantization', 'dnn-accelerators'],
    type: 'Conference',
    links: [
      {
        url: 'https://dl.acm.org/doi/pdf/10.1145/3394885.3431554',
        type: PublicationLinkType.PDF,
      },
    ],
  },
  {
    title: 'Accelerating Sparse Deep Neural Network on FPGA',
    authors: [MEMBERS.sitaohuang, 'Carl Pearson', 'Rakesh Nagi', 'Jinjun Xiong', 'Deming Chen', 'Wen-mei Hwu'],
    venue: 'HPEC 2019',
    year: 2019,
    topics: ['fpga', 'dnn-accelerators'],
    type: 'Conference',
    links: [
      {
        url: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8916419',
        type: PublicationLinkType.PDF,
      },
    ],
  },
  {
    title: 'FPGA/DNN Co-Design: An Efficient Design Methodology for IoT Intelligence on the Edge',
    authors: [
      'Cong Hao',
      'Xiaofan Zhang',
      'Yuhong Li',
      MEMBERS.sitaohuang,
      'Jinjun Xiong',
      'Kyle Rupnow',
      'Wen-mei Hwu',
      'Deming Chen',
    ],
    venue: 'DAC 2019',
    year: 2019,
    topics: ['fpga', 'dnn-accelerators'],
    type: 'Conference',
    links: [
      {
        url: 'https://dl.acm.org/doi/pdf/10.1145/3316781.3317829',
        type: PublicationLinkType.PDF,
      },
    ],
  },
  {
    title: 'Analysis and Modeling of Collaborative Execution Strategies for Heterogeneous CPU-FPGA Architectures',
    authors: [
      MEMBERS.sitaohuang,
      'Li-Wen Chang',
      'Izzat El Hajj',
      'Simon Garcia de Gonzalo',
      'Juan Gómez Luna',
      'Sai Rahul Chalamalasetti',
      'Mohamed El-Hadedy',
      'Dejan Milojicic',
      'Onur Mutlu',
      'Deming Chen',
      'Wen-mei Hwu',
    ],
    venue: 'ICPE 2019',
    year: 2019,
    topics: ['heterogeneous-computing', 'fpga'],
    type: 'Conference',
    links: [
      {
        url: 'https://dl.acm.org/doi/pdf/10.1145/3297663.3310305',
        type: PublicationLinkType.PDF,
      },
    ],
  },
] as const satisfies Publication[]

export const PREPRINTS: Publication[] = PUBLICATIONS.filter(p => p.type === 'Preprint')
export const PUBLICATIONS_BY_YEAR: Record<string, Publication[]> = PUBLICATIONS.reduce(
  (acc, publication) => {
    if (publication.type === 'Preprint') return acc // skip preprints
    const yearKey = publication.year
    if (!acc[yearKey]) acc[yearKey] = [] as Publication[]
    acc[yearKey].push(publication)
    return acc
  },
  {} as Record<number, Publication[]>
)
