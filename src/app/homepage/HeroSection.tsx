'use client'
import { Color, ScreenSize, linearlyScaleSize, FontVariant } from '@/app/theme'
import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from './Styles'
import { GROUPPHOTOS } from '@/data/groupPhotos'

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
  // TODO: Try to make the responsive font-size more systematic. This is a temporary fix.
  ${FontVariant.title_xl}
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
  text-align: left;

  @media (max-width: ${ScreenSize.md}) {
    align-self: center;
    text-align: center;
  }
`

const HeroSubtitle = styled.h2`
  font-size: 1.375rem;
  font-weight: 300;
  margin-bottom: 8px;

  @media (max-width: ${ScreenSize.md}) {
    align-self: center;
    text-align: center;
  }
`
const HeroMessage = styled.p`
  ${FontVariant.body_md}
  color: ${Color.gray700};
  text-align: left;
  max-width: 100%;
  margin-bottom: 16px;
  @media (max-width: ${ScreenSize.md}) {
    text-align: center;
  }
`

const HeroContact = styled.p`
  ${FontVariant.body_md}
  color: ${Color.gray700};
  text-align: left;
  max-width: 100%;
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
            WELCOME TO <span style={{ color: `${Color.blue900}`, paddingRight: '7px' }}>CORSA LAB</span>!
          </HeroTitle>
          <HeroSubtitle>
            <strong style={{ fontWeight: '700' }}>
              Compiler Optimizations, Reconfigurable and Scalable Architectures
            </strong>
          </HeroSubtitle>
          <HeroMessage>
            We are a group of passionate researchers at EECS, School of Engineering, UC Irvine, working on exciting
            research projects related to CORSA: Compiler Optimizations, Reconfigurable and Scalable Architectures.
          </HeroMessage>
          <HeroMessage>
            We focus on the development of highly efficient and user-friendly hardware acceleration systems. Our core
            areas of expertise encompass the design of cutting-edge programming languages and compilers tailored for
            hardware accelerators, as well as the envisioning of next-generation computer architectures. Additionally,
            we are committed to exploring and implementing highly efficient machine learning algorithms and model
            compression techniques. Moreover, our research extends to innovative hardware-aware neural architecture
            search and the integration of hardware/software co-design flow. Through these pursuits, we aim to advance
            the frontiers of technology and contribute to the advancement of the field.
          </HeroMessage>
          <HeroContact>
            If you are interested in opportunities at CORSA Lab, please contact Prof. Sitao Huang (
            <ContactLink href="mailto:sitaoh@uci.edu">sitaoh@uci.edu</ContactLink>).
          </HeroContact>
        </HeroTextArea>
        <HeroImageContainer id="hero-image-container">
          <HeroImageLink href="/gallery">
            <Image
              id="hero-image"
              src={`/images/group/${GROUPPHOTOS[0].filename}`}
              alt="CORSA Lab group picture"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ position: 'absolute', objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </HeroImageLink>
        </HeroImageContainer>
      </HeroContainer>
    </Section>
  )
}
