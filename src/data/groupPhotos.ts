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

// TODO: add real CORSA Lab group photos here once available
export const GROUPPHOTOS: GroupPhoto[] = [] as const satisfies GroupPhoto[]
