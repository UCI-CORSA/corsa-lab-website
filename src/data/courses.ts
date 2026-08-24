interface Props {
  title: string
  code: string
  image: string
  description: string
  url: string
  editions: { semester: string; url: string }[]
}

export interface Course extends Props {}
export class Course {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

// TODO: add real CORSA Lab course offerings here once available
export const COURSES: Course[] = [] as const satisfies Course[]
