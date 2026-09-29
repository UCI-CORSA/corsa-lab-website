'use client'

import React from 'react'
import styled from '@emotion/styled'
import { FontVariant, Color } from '@/app/theme'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { Member } from '@/data/members'
import { withBasePath } from '@/lib/basePath'

const Card = styled.div`
  max-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${FontVariant.body_md}
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  border-radius: 50%;
  overflow: hidden;
`

const MemberImage = styled(ImageWithFallback)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Name = styled.span`
  ${FontVariant.body_lg}
  color: ${Color.gray900};
`

const Affiliation = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${Color.gray700};
`

const Buttons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`

// Icon is a real <img> child (not CSS content: url()) so it renders consistently in Safari,
// which doesn't support the content property on non-generated elements.
const IconButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;

  color: ${Color.white};
  background-color: ${Color.gray700};
  border-radius: 50%;

  img {
    width: 16px;
    height: 16px;
  }
`

const EmailButton = IconButton
const WebsiteButton = IconButton
const ThesisButton = IconButton

// The LinkedIn logo carries its own brand-colored background, so it fills the button without the gray circle.
const LinkedInButton = styled(IconButton)`
  background-color: transparent;

  img {
    width: 30px;
    height: 30px;
  }
`

interface Props {
  member: Member
}

export const MemberCard = ({ member }: Props) => {
  const originalSrc = withBasePath(member.img ? `/members/${member.img}` : '/members/default.png')
  const defaultSrc = withBasePath('/members/default.png')

  return (
    <Card>
      <ImageContainer>
        <MemberImage
          placeholder="blur"
          blurDataURL={defaultSrc}
          fallbackSrc={defaultSrc}
          width={180}
          height={180}
          src={originalSrc}
          alt={`${member.firstName} ${member.lastName}`}
        />
      </ImageContainer>
      <Info>
        <Name>
          {member.firstName} {member.lastName}
        </Name>
        <Affiliation>
          {member.currentPosition ||
            ((member.position === 'Visiting Researcher' || member.position === 'Undergraduate Student') &&
              member.affiliation)}
        </Affiliation>
        <Buttons>
          {member.email && (
            <EmailButton href={`mailto:${member.email}`} aria-label={`Email ${member.firstName} ${member.lastName}`}>
              <img src={withBasePath('/images/email.svg')} alt="" />
            </EmailButton>
          )}
          {member.site && (
            <WebsiteButton
              href={member.site}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.firstName} ${member.lastName}'s website`}
            >
              <img src={withBasePath('/images/website.svg')} alt="" />
            </WebsiteButton>
          )}
          {member.linkedin && (
            <LinkedInButton
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.firstName} ${member.lastName}'s LinkedIn`}
            >
              <img src={withBasePath('/images/linkedin.avif')} alt="" />
            </LinkedInButton>
          )}
          {member.msThesis && (
            <ThesisButton href={member.msThesis} aria-label={`${member.firstName} ${member.lastName}'s M.S. thesis`}>
              <img src={withBasePath('/images/thesis.svg')} alt="" />
            </ThesisButton>
          )}
        </Buttons>
      </Info>
    </Card>
  )
}
