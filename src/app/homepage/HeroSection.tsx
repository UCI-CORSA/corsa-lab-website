'use client'
import { Color, ScreenSize, linearlyScaleSize, FontVariant } from '@/app/theme'
import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from './Styles'
import { GROUPPHOTOS } from '@/data/groupPhotos'
import { withBasePath } from '@/lib/basePath'

const HeroContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  // TODO: Decide whether to keep gap
  // gap: 24px;

  @media (max-width: ${ScreenSize.md}) {
    flex-direction: column;
    gap: 0px;
  }
`

const HeroTextArea = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: ${linearlyScaleSize({
    minSizePx: 48,
    maxSizePx: 96,
    minScreenSizePx: parseInt(ScreenSize.md),
    maxScreenSizePx: parseInt(ScreenSize.lg),
  })};
`

const HeroTitle = styled.h1`
  font-family: var(--font-display), sans-serif;
  font-size: clamp(32px, 4.5vw, 52px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.5px;
  margin-bottom: 24px;
  text-align: left;
  color: ${Color.gray900};

  @media (max-width: ${ScreenSize.md}) {
    align-self: center;
    text-align: center;
  }
`

const HeroTitleAccent = styled.span`
  display: block;
  background: linear-gradient(90deg, ${Color.blue900}, ${Color.blue500});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: ${Color.blue900};
`

const HeroTitleLead = styled.span`
  display: block;
  font-size: 0.5em;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${Color.gray700};
  margin-bottom: 8px;
`

const HeroMessage = styled.p`
  ${FontVariant.body_md}
  color: ${Color.gray700};
  text-align: left;
  max-width: 100%;
  margin-bottom: 16px;
  strong {
    font-weight: 700;
  }
  @media (max-width: ${ScreenSize.md}) {
    text-align: center;
  }
`

const ContactLink = styled.a`
  color: ${Color.blue900};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const HeroImageContainer = styled.div`
  flex-basis: 50%;
  position: relative;
  z-index: 0;
  overflow: hidden;
  background: ${Color.gray100};

  @media (max-width: ${ScreenSize.md}) {
    // TODO: Set the min-height more systematically. This is a temporary fix.
    min-height: 30vh;
  }
`

const HeroImageLink = styled(Link)`
  display: block;
  position: absolute;
  inset: 0;
`
export const HeroSection = () => {
  return (
    <Section id="hero-section" style={{ padding: '0' }}>
      {/* padding: 0 is to allow image to stretch to the right side of the webpage*/}
      <HeroContainer>
        <HeroTextArea id="hero-text-area">
          <HeroTitle>
            <HeroTitleLead>Welcome to</HeroTitleLead>
            <HeroTitleAccent>CORSA Lab</HeroTitleAccent>
          </HeroTitle>
          <HeroMessage>
            We are a group of passionate researchers at UC Irvine, working on exciting research projects related to{' '}
            <strong>“CORSA”</strong>: <strong>C</strong>ompiler <strong>O</strong>ptimizations, <strong>R</strong>
            econfigurable and <strong>S</strong>calable <strong>A</strong>rchitectures.{' '}
            <ContactLink href="#about-corsa-section">Click here</ContactLink> to learn more about the name “CORSA”.
          </HeroMessage>
          <HeroMessage>
            We focus on the development of highly efficient and highly composable hardware acceleration systems. Our
            core areas of expertise encompass the cutting-edge domain-specific hardware accelerator architectures,
            programming languages and compilers tailored for hardware accelerators, next-generation heterogeneous
            computer systems, as well as efficient hardware-friendly machine learning algorithms and systems.
          </HeroMessage>
        </HeroTextArea>
        <HeroImageContainer id="hero-image-container">
          <HeroImageLink href="/gallery">
            <Image
              id="hero-image"
              src={withBasePath(`/images/group/${GROUPPHOTOS[0].filename}`)}
              alt="CORSA Lab group picture"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ position: 'absolute', objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </HeroImageLink>
        </HeroImageContainer>
      </HeroContainer>
    </Section>
  )
}
