export const LabPositions = [
  'Faculty',
  'Ph.D. Student',
  'M.S. Student',
  'Visiting Researcher',
  'Past Researcher',
  'Undergraduate Student',
] as const
export type LabPositionTypes = (typeof LabPositions)[number]

export const SeasonTypes = ['Winter', 'Spring', 'Summer', 'Fall'] as const
export type SeasonType = (typeof SeasonTypes)[number]
export type Period = {
  startSeason: SeasonType
  startYear: number
  endSeason?: SeasonType
  endYear?: number
}

interface Props {
  firstName: string
  lastName: string
  email?: string
  position: LabPositionTypes // must exactly match one of LabPositions above: 'Faculty' | 'Ph.D. Student' | 'M.S. Student' | 'Visiting Researcher' | 'Past Researcher' | 'Undergraduate Student'
  img?: string
  site?: string
  msThesis?: string
  phdThesis?: string
  // TODO: combine startYear and startSeason into a single Date field: startDate
  startYear?: number
  startSeason?: SeasonType
  endYear?: number
  endSeason?: SeasonType
  periods?: Period[] // For representing multiple separate periods (e.g., multiple internships at the lab)
  isAlumni?: boolean
  affiliation?: string // the affiliation at the time of being at the lab
  currentPosition?: string // for alumni
}

export interface Member extends Props {}
export class Member {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

export const MEMBERS = {
  sitaohuang: {
    firstName: 'Sitao',
    lastName: 'Huang',
    email: 'sitaoh@uci.edu',
    position: 'Faculty',
    currentPosition: 'Assistant Professor, Lab Director',
    img: 'sitao_square-1024x1024.jpg',
  },
  haochengxu: {
    firstName: 'Haocheng',
    lastName: 'Xu',
    email: 'haochx5@uci.edu',
    position: 'Ph.D. Student',
    site: 'https://haochengx.github.io/',
  },
  hongzhengtian: {
    firstName: 'Hongzheng',
    lastName: 'Tian',
    email: 'hongzhet@uci.edu',
    position: 'Ph.D. Student',
    site: 'https://www.hongzhengtian.com/',
  },
  yeqiao: {
    firstName: 'Ye',
    lastName: 'Qiao',
    email: 'yeq6@uci.edu',
    position: 'Ph.D. Student',
    site: 'https://sites.uci.edu/yeqiao/',
  },
  yifanzhang: {
    firstName: 'Yifan',
    lastName: 'Zhang',
    email: 'yifanz58@uci.edu',
    position: 'Ph.D. Student',
    site: 'https://www.linkedin.com/in/yifan-zhang-45697a21a/',
  },
  rachidkarami: {
    firstName: 'Rachid',
    lastName: 'Karami',
    email: 'karamir@uci.edu',
    position: 'Ph.D. Student',
    site: 'https://www.linkedin.com/in/rachid-karami/',
  },
  faraztahmasebi: {
    firstName: 'Faraz',
    lastName: 'Tahmasebi',
    email: 'tahmasef@uci.edu',
    position: 'Ph.D. Student',
    site: 'https://www.linkedin.com/in/faraz-tahmasebi-84804768/',
  },
  saptarshimitra: {
    firstName: 'Saptarshi',
    lastName: 'Mitra',
    email: 'saptarm@uci.edu',
    position: 'Ph.D. Student',
    site: 'https://sapmitra.github.io/',
  },
  zhihengchen: {
    firstName: 'Zhiheng',
    lastName: 'Chen',
    position: 'M.S. Student',
  },
  venkateshreddykadasani: {
    firstName: 'Venkatesh Reddy',
    lastName: 'Kadasani',
    position: 'M.S. Student',
  },
  srimansridhar: {
    firstName: 'Sriman',
    lastName: 'Sridhar',
    position: 'M.S. Student',
  },
  bhardwajbhat: {
    firstName: 'Bhardwaj',
    lastName: 'Bhat',
    position: 'M.S. Student',
  },
  yuanchou: {
    firstName: 'Yu-An',
    lastName: 'Chou',
    position: 'M.S. Student',
  },
  zhenyutang: {
    firstName: 'Zhenyu',
    lastName: 'Tang',
    position: 'M.S. Student',
  },
  tanjuleesiddique: {
    firstName: 'Tanjulee',
    lastName: 'Siddique',
    position: 'M.S. Student',
  },
  swarnalatapanigrahy: {
    firstName: 'Swarnalata',
    lastName: 'Panigrahy',
    position: 'M.S. Student',
  },
  ivanchen: {
    firstName: 'Ivan',
    lastName: 'Chen',
    position: 'M.S. Student',
  },
  kuanhsunwang: {
    firstName: 'Kuan-Hsun',
    lastName: 'Wang',
    position: 'M.S. Student',
  },
  donghyeokpark: {
    firstName: 'DongHyeok',
    lastName: 'Park',
    position: 'Undergraduate Student',
  },
} as const satisfies Record<string, Member>

export const ALUMNI_MEMBERS = Object.fromEntries(
  Object.entries(MEMBERS).filter(([key, member]) => 'isAlumni' in member && member.isAlumni === true)
)
export const CURRENT_MEMBERS = Object.fromEntries(Object.entries(MEMBERS).filter(([key]) => !(key in ALUMNI_MEMBERS)))
const categorizeByPosition = (members: Record<string, Member>): Record<LabPositionTypes, Member[]> => {
  const groupedMembers: Record<LabPositionTypes, Member[]> = Object.entries(members).reduce(
    (acc, [key, member]) => {
      if (!acc[member.position]) {
        acc[member.position] = []
      }
      acc[member.position].push(member)
      return acc
    },
    {} as Record<LabPositionTypes, Member[]>
  )

  const seasonOrder = ['Fall', 'Summer', 'Spring', 'Winter']

  for (const position in groupedMembers) {
    groupedMembers[position as LabPositionTypes].sort((a, b) => {
      // Determine effective endYear and endSeason for sorting
      const aIsAlumni = a.isAlumni ?? false
      const bIsAlumni = b.isAlumni ?? false

      // Set endYear and endSeason with default values to ensure they are not undefined
      const aEndYear = aIsAlumni ? a.endYear ?? a.startYear ?? 3000 : 3000
      const bEndYear = bIsAlumni ? b.endYear ?? b.startYear ?? 3000 : 3000
      const aEndSeason = aIsAlumni ? a.endSeason ?? a.startSeason ?? 'Winter' : 'Winter'
      const bEndSeason = bIsAlumni ? b.endSeason ?? b.startSeason ?? 'Winter' : 'Winter'

      // Rule 1: Sort by effective endYear in descending order
      if (aEndYear !== bEndYear) {
        return bEndYear - aEndYear // Descending order for endYear
      }

      // Rule 2: If endYear is the same, sort by endSeason
      const seasonA = seasonOrder.indexOf(aEndSeason)
      const seasonB = seasonOrder.indexOf(bEndSeason)
      if (seasonA !== seasonB) {
        return seasonA - seasonB // Winter first, then Fall, Summer, Spring
      }

      // Rule 3: If endYear and endSeason are the same, sort by name
      if (a.lastName === b.lastName) {
        return a.firstName.localeCompare(b.firstName)
      }
      return a.lastName.localeCompare(b.lastName)
    })
  }

  return groupedMembers
}
export const CURRENT_MEMBERS_BY_POSITION = categorizeByPosition(CURRENT_MEMBERS)
export const ALUMNI_MEMBERS_BY_POSITION = categorizeByPosition(ALUMNI_MEMBERS)
