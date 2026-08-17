'use client'

import styled from '@emotion/styled'
import Image from 'next/image'
import { Color, FontVariant } from '@/app/theme'
import { RESEARCH_PROJECTS } from '@/data/research'

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
`

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ProjectImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 7;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${Color.gray100};
`

const ProjectTitle = styled.h2`
  ${FontVariant.title_md}
  color: ${Color.gray900};
  display: grid;

  /* Small accent bar above the title */
  &::before {
    content: '';
    justify-self: left;
    border: 3px solid ${Color.blue900};
    width: 40px;
    margin-bottom: 8px;
  }
`

const ProjectDescription = styled.p`
  ${FontVariant.body_md}
  color: ${Color.gray700};
`

export default function Page() {
  return (
    <main>
      <h1>Research</h1>
      <ProjectList>
        {RESEARCH_PROJECTS.map((project, index) => (
          <ProjectCard key={project.title}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ProjectImageContainer>
              <Image
                src={`/images/research/${project.image}`}
                alt={project.title}
                fill
                priority={index === 0}
                style={{ objectFit: 'contain' }}
              />
            </ProjectImageContainer>
          </ProjectCard>
        ))}
      </ProjectList>
    </main>
  )
}
