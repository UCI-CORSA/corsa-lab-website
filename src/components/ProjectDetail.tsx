'use client'

import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import Markdown from 'react-markdown'
import { Color, FontVariant, Radius } from '@/app/theme'
import { Project } from '@/data/projects'
import { withBasePath } from '@/lib/basePath'

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
`

const BackLink = styled(Link)`
  ${FontVariant.body_md}
  color: ${Color.blue900};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Summary = styled.p`
  ${FontVariant.body_lg}
  font-weight: 400;
  color: ${Color.gray700};
`

// The cover keeps the image's own aspect ratio, so wide diagrams don't leave empty bands
const CoverImageContainer = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: ${Radius.md};
  overflow: hidden;
  background-color: ${Color.gray100};
`

const Body = styled.div`
  ${FontVariant.body_lg}
  font-weight: 400;
  line-height: 1.7;
  color: ${Color.gray800};

  h2 {
    ${FontVariant.title_md}
    color: ${Color.gray900};
    margin: 32px 0 12px;
  }
  h3 {
    ${FontVariant.title_sm}
    font-weight: 700;
    color: ${Color.gray900};
    margin: 24px 0 8px;
  }
  p,
  ul,
  ol {
    margin-bottom: 16px;
  }
  ul,
  ol {
    padding-left: 24px;
  }
  li {
    margin-bottom: 4px;
  }
  a {
    color: ${Color.blue900};
  }
  strong {
    font-weight: 700;
  }
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.9em;
    background-color: ${Color.gray100};
    border-radius: ${Radius.sm};
    padding: 2px 4px;
  }
  pre {
    margin-bottom: 16px;
    padding: 16px;
    background-color: ${Color.gray100};
    border: 1px solid ${Color.gray300};
    border-radius: ${Radius.md};
    overflow-x: auto;
    line-height: 1.5;

    code {
      padding: 0;
      background: none;
    }
  }
`

const Figure = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 24px 0;

  img {
    max-width: 100%;
    border-radius: ${Radius.md};
  }
`

const Caption = styled.span`
  ${FontVariant.body_md}
  color: ${Color.gray700};
  text-align: center;
`

// Images in the markdown become figures; the optional image title ("...") is shown as the caption.
// A span is used instead of <figure> because react-markdown places images inside a <p>.
const MarkdownImage = ({ src, alt, title }: { src?: string | Blob; alt?: string; title?: string }) => {
  if (typeof src !== 'string') return null
  const resolvedSrc = src.startsWith('/') ? withBasePath(src) : src
  return (
    <Figure>
      {/* eslint-disable-next-line @next/next/no-img-element -- markdown images have unknown dimensions */}
      <img src={resolvedSrc} alt={alt ?? ''} />
      {title && <Caption>{title}</Caption>}
    </Figure>
  )
}

interface Props {
  project: Project
  content?: string
}

export const ProjectDetail = ({ project, content }: Props) => {
  return (
    <main>
      <Article>
        <BackLink href="/projects">← All projects</BackLink>
        <h1>{project.title}</h1>
        <Summary>{project.description}</Summary>
        <CoverImageContainer>
          <Image
            src={withBasePath(`/images/projects/${project.image}`)}
            alt={project.title}
            width={0}
            height={0}
            priority
            sizes="(max-width: 880px) 100vw, 880px"
            style={{ width: '100%', height: 'auto' }}
          />
        </CoverImageContainer>
        {content && (
          <Body>
            <Markdown components={{ img: MarkdownImage }}>{content}</Markdown>
          </Body>
        )}
      </Article>
    </main>
  )
}
