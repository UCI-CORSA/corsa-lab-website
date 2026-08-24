interface Props {
  filename: string
  description: string
}

export interface GroupPhoto extends Props {}
export class GroupPhoto {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

export const GROUPPHOTOS: GroupPhoto[] = [
  {
    filename: 'group_2023_jun.jpg',
    description: 'June, 2023',
  },
  {
    filename: 'group_2022_sep.jpg',
    description: 'September, 2022',
  },
] as const satisfies GroupPhoto[]
