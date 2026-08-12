'use client'

import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Color, FontVariant, FontSize, FontWeight } from '@/app/theme'

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 36px 48px;
  background-color: ${Color.gray900};
  margin-top: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

const FooterTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    align-items: center;
  }
`

const FooterText = styled(Link)`
  ${FontVariant.body_md}
  color: ${Color.white};
  text-decoration: none;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin: 4px 0;
  }
`

const FooterTextBold = styled.p`
  font-size: ${FontSize.body_md};
  font-weight: ${FontWeight.body_lg};
  color: ${Color.white};
  text-decoration: none;
  margin: 0;

  @media (max-width: 768px) {
    margin: 4px 0;
  }
`

const FooterLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: row;
    margin-top: 16px;
  }
`

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterTextContainer>
        <FooterTextBold>Visit Us</FooterTextBold>
        <FooterText
          href="https://www.google.com/maps/search/?api=1&query=Engineering+Hall,+University+of+California,+Irvine"
          target="_blank"
        >
          Engineering Hall 3225,
          <br />
          University of California, Irvine
          <br />
          Irvine, CA 92697
        </FooterText>
      </FooterTextContainer>
      <FooterLogoContainer>
        <FooterText href="https://engineering.uci.edu/dept/eecs" target="_blank">
          UCI EECS
        </FooterText>
        <FooterText href="https://engineering.uci.edu" target="_blank">
          UCI School of Engineering
        </FooterText>
      </FooterLogoContainer>
    </FooterContainer>
  )
}
