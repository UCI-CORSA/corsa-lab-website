import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetail } from '@/components/ProjectDetail'
import { PROJECTS } from '@/data/projects'

// The site is a static export, so every project page is generated at build time from PROJECTS
export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map(project => ({ slug: project.slug }))
}

const findProject = (slug: string) => PROJECTS.find(project => project.slug === slug)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = findProject((await params).slug)
  return project ? { title: `${project.title} | CORSA Lab`, description: project.description } : {}
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const project = findProject((await params).slug)
  if (!project) {
    notFound()
  }

  // Read the markdown at build time so the page ships with its content already rendered
  const content = project.contentMdFilePath
    ? fs.readFileSync(path.join(process.cwd(), 'public', 'projects', project.contentMdFilePath), 'utf-8')
    : undefined

  return <ProjectDetail project={project} content={content} />
}
