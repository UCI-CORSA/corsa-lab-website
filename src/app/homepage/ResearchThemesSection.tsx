'use client'
import React, { useEffect, useState } from 'react'
import { Color, FontVariant } from '@/app/theme'
import { Member } from '@/data/members'
import { PUBLICATIONS, Publication, ResearchTopics, type ResearchTopicType } from '@/data/publications'
import styled from '@emotion/styled'
import { uniq, shuffle } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader, Text } from './Styles'
import { withBasePath } from '@/lib/basePath'

const ResearchTopicsArea = styled.div`
  display: grid;
  gap: 48px;
  grid-template-columns: repeat(auto-fit, minmax(min(330px, 46%), 1fr)); // empirically, this works well
  grid-auto-rows: 1fr; // every row matches the tallest one (e.g. a two-line title)
`

const ResearchTopicItem = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 24px 36px;
  min-width: 300px;
  border: thin solid ${Color.gray500};
  border-radius: 15px;
  &:hover {
    box-shadow: 0px 0px 10px 0px ${Color.blue700};
    border: thin solid ${Color.blue700};
  }
  transition: box-shadow 0.3s ease-in-out;
`

const ResearchTopicItemTitle = styled.h3`
  ${FontVariant.title_md}
`

const ResearchTopicIcon = styled(Image)`
  display: block;
  margin-bottom: 8px;
`

const ResearchTopicMembersArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 8px;
`

const ResearchTopicsMemberAvatar = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`

const GatherStatsByResearchTopic = () => {
  const statsByResearchTopic: Record<ResearchTopicType, { numPublications: number; authors: Member[] }> = {} as any
  Object.keys(ResearchTopics).forEach(topic => {
    const researchTopicKey = topic as ResearchTopicType
    const filteredPublications: Publication[] = PUBLICATIONS.filter(publication =>
      publication.topics.includes(researchTopicKey)
    ).sort((a, b) => b.year - a.year)
    const numPublications = filteredPublications.length
    // TODO: Change the MEMBERS data structure. The current structure is not optimized for this sort of filtering algorithm.
    // Algorithm: First authors are shown first with most recent publication, then the rest of the authors
    const topicAuthors = uniq(
      filteredPublications
        .flatMap(publication => publication.authors[0])
        .concat(filteredPublications.flatMap(publication => publication.authors.slice(1)))
    )
    const filteredAuthors = topicAuthors.filter(entry => entry instanceof Object && entry.isAlumni !== true) as Member[]

    statsByResearchTopic[researchTopicKey] = { numPublications, authors: filteredAuthors }
  })
  return statsByResearchTopic
}

const RESEARCH_TOPICS = Object.entries(GatherStatsByResearchTopic()).sort(
  ([, a], [, b]) => b.numPublications - a.numPublications
)
const NUM_VISIBLE = 5
type ResearchTopicsEntry = (typeof RESEARCH_TOPICS)[number]

export const ResearchThemesSection = () => {
  const [displayTopics, setDisplayTopics] = useState<ResearchTopicsEntry[]>(RESEARCH_TOPICS)

  useEffect(() => {
    setDisplayTopics(
      RESEARCH_TOPICS.map(([topic, stats]) => [
        topic,
        { ...stats, authors: shuffle(stats.authors) },
      ]) as ResearchTopicsEntry[]
    )
  }, [])

  return (
    <Section id="research-section">
      <SectionHeader title="Research Themes" />
      <ResearchTopicsArea>
        {displayTopics.map(([topic, stats]) => {
          return (
            <Link
              href={`/publications/?researchTopic=${topic}`}
              key={topic}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ResearchTopicItem key={topic}>
                <ResearchTopicItemTitle>
                  <ResearchTopicIcon
                    width={44}
                    height={44}
                    src={withBasePath(`/images/topics/${ResearchTopics[topic as ResearchTopicType].icon}`)}
                    alt=""
                    aria-hidden
                  />
                  {ResearchTopics[topic as ResearchTopicType].label}
                </ResearchTopicItemTitle>
                <Text style={{ color: 'gray', paddingBottom: '12px' }}>
                  <span style={{ fontWeight: 'bold' }}>{stats.numPublications}</span>{' '}
                  {stats.numPublications === 1 ? 'publication' : 'publications'}
                </Text>
                <ResearchTopicMembersArea>
                  {stats.authors.slice(0, NUM_VISIBLE).map((member: Member) => (
                    <ResearchTopicsMemberAvatar
                      width={36}
                      height={36}
                      src={withBasePath(member.img ? `/members/${member.img}` : '/members/default.png')}
                      alt={`${member.firstName} ${member.lastName}`}
                      key={member.email ?? `${member.firstName}-${member.lastName}`}
                    />
                  ))}
                  {stats.authors.length > NUM_VISIBLE && (
                    <span style={{ width: '36px', textAlign: 'center' }}>+{stats.authors.length - NUM_VISIBLE}</span>
                  )}
                </ResearchTopicMembersArea>
              </ResearchTopicItem>
            </Link>
          )
        })}
      </ResearchTopicsArea>
    </Section>
  )
}
