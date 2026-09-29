'use client'

import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import { Color, FontVariant, Radius, ScreenSize } from '@/app/theme'
import { PROJECTS } from '@/data/projects'
import { withBasePath } from '@/lib/basePath'

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: ${ScreenSize.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: ${ScreenSize.sm}) {
    grid-template-columns: minmax(0, 1fr);
  }
`

// The whole card is a link to the project's own page
const ProjectCard = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Color.gray300};
  border-radius: ${Radius.md};
  overflow: hidden;
  background-color: ${Color.white};
  color: inherit;
  text-decoration: none;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`

const ProjectImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background-color: ${Color.gray100};
  border-bottom: 1px solid ${Color.gray300};
`

const ProjectBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`

const ProjectTitle = styled.h2`
  ${FontVariant.title_sm}
  font-weight: 700;
  color: ${Color.gray900};
`

// Clamp long descriptions on the card; the full text is on the project page
const ProjectDescription = styled.p`
  ${FontVariant.body_md}
  color: ${Color.gray700};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export default function Page() {
  return (
    <main>
      <h1>Projects</h1>
      <ProjectGrid>
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.slug} href={`/projects/${project.slug}`}>
            <ProjectImageContainer>
              <Image
                src={withBasePath(`/images/projects/${project.image}`)}
                alt={project.title}
                fill
                priority={index < 3}
                sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                style={{ objectFit: 'contain', padding: '12px' }}
              />
            </ProjectImageContainer>
            <ProjectBody>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
            </ProjectBody>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </main>
  )
}
