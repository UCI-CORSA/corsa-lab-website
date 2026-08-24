'use client'
import { ScreenSize, linearlyScaleSize } from '@/app/theme'
import { MemberCard } from '@/components/MemberCard'
import { Section, SectionTitle, Sections } from '@/components/Section'
import { Sidebar } from '@/components/SideBar'
import { MEMBERS, Member } from '@/data/members'
import styled from '@emotion/styled'
import React, { useRef } from 'react'

const SectionContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 48px 24px;
  @media (max-width: ${ScreenSize.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px
    ${linearlyScaleSize({
      minSizePx: 24,
      maxSizePx: 96,
      minScreenSizePx: parseInt(ScreenSize.md),
      maxScreenSizePx: parseInt(ScreenSize.lg),
    })};
  padding-right: ${linearlyScaleSize({
    minSizePx: 24,
    maxSizePx: 8,
    minScreenSizePx: parseInt(ScreenSize.sm),
    maxScreenSizePx: parseInt(ScreenSize.md),
  })};
  width: 100%;
  gap: 16px;
  @media (min-width: ${ScreenSize.max}) {
    width: ${ScreenSize.max};
    margin: 0 auto;
  }

  & > main {
    // make the main content take up 80% and the Sidebar component 20%
    width: 80%;

    @media (max-width: ${ScreenSize.sm}) {
      width: 100%;
    }
  }
`
const SideContainer = styled.div`
  padding-top: 96px;
  padding-left: 30px;
  padding-right: 30px;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: ${ScreenSize.md}) {
    display: none;
  }
`

const WEB_TEAM_MEMBERS: Member[] = [MEMBERS.saptarshimitra, MEMBERS.donghyeokpark]

export default function Page() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  return (
    <Container>
      <main style={{ padding: '0px', margin: '0px' }}>
        <h1>WebTeam</h1>
        <Sections>
          <Section
            id="WebTeam"
            ref={el => {
              sectionRefs.current['WebTeam'] = el
            }}
          >
            <SectionTitle>WebTeam</SectionTitle>
            <SectionContent>
              {WEB_TEAM_MEMBERS.map(member => (
                <MemberCard
                  key={member.email ?? `${member.firstName}-${member.lastName}`}
                  member={member}
                />
              ))}
            </SectionContent>
          </Section>
        </Sections>
      </main>
      <SideContainer>
        <Sidebar sidebarList={['WebTeam']} sectionRefs={sectionRefs} />
      </SideContainer>
    </Container>
  )
}
