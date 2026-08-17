'use client'

import React from 'react'
import styled from '@emotion/styled'
import { FontVariant, Color } from '@/app/theme'
import Link from 'next/link'
import { Member } from '@/data/members'

const AlumniCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  border-radius: 8px;
  margin-bottom: 8px;
`

const TextRow = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  & > span,
  & > a {
    padding-right: 8px;
  }
`

const Name = styled.span`
  ${FontVariant.body_lg}
  color: ${Color.gray900};
`

const NameWithWebsite = styled(Link)`
  ${FontVariant.body_lg}
  color: ${Color.gray900};
`

const CurrentPosition = styled.div`
  ${FontVariant.body_md}
  color: ${Color.gray700};
`

const Period = styled.span`
  ${FontVariant.body_md}
  color: ${Color.gray700};
`
const Education = styled.span`
  ${FontVariant.body_md}
  color: ${Color.gray700};
`

const ThesisLink = styled(Link)`
  ${FontVariant.body_md}
  color: ${Color.gray700};
`

const Role = styled.span`
  ${FontVariant.body_md}
  color: ${Color.black};
`

export const AlumniCard = ({ mem, showRole }: { mem: Member; showRole?: boolean }) => {
  const role = mem.position === 'Ph.D. Student' ? '(Ph.D.)' : ''

  return (
    <AlumniCardContainer>
      <TextRow>
        {mem.site ? (
          <NameWithWebsite href={mem.site}>
            {mem.firstName} {mem.lastName}
          </NameWithWebsite>
        ) : (
          <Name>
            {mem.firstName} {mem.lastName}
          </Name>
        )}
        {showRole && role && <Role>{role}</Role>}
        {mem.affiliation && <Education>{mem.affiliation}</Education>}
        {Array.isArray(mem.periods) && mem.periods.length > 0 ? (
          <Period>
            {mem.periods
              .map(
                p =>
                  `${p.startYear} ${p.startSeason}${p.endSeason && p.endYear ? ` - ${p.endYear} ${p.endSeason}` : ''}`
              )
              .join(' / ')}
          </Period>
        ) : (
          <Period>
            {mem.startSeason} {mem.startYear} {mem.endSeason && mem.endYear ? ` - ${mem.endSeason} ${mem.endYear}` : ''}
          </Period>
        )}
        {mem.phdThesis && (
          <ThesisLink
            href={{
              pathname: mem.phdThesis,
            }}
          >
            Ph.D. Thesis
          </ThesisLink>
        )}
        {mem.msThesis && (
          <ThesisLink
            href={{
              pathname: mem.msThesis,
            }}
          >
            M.S. Thesis
          </ThesisLink>
        )}
      </TextRow>
      {mem.currentPosition && (
        <TextRow>
          <CurrentPosition>Now {mem.currentPosition}</CurrentPosition>
        </TextRow>
      )}
    </AlumniCardContainer>
  )
}
