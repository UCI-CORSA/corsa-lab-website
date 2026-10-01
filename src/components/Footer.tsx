'use client'

import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import Image from 'next/image'
import { Color, FontVariant } from '@/app/theme'
import { withBasePath } from '@/lib/basePath'

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 36px 48px 20px;
  background-color: ${Color.gray900};
  margin-top: auto;
`

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
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

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid ${Color.gray800};
  ${FontVariant.body_sm}
  color: ${Color.gray500};
`

const FooterCreditLink = styled(Link)`
  color: ${Color.gray500};
  text-decoration: none;

  &:hover {
    color: ${Color.white};
    text-decoration: underline;
  }
`

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <Link
          href="https://www.google.com/maps/search/?api=1&query=Engineering+Hall,+University+of+California,+Irvine"
          target="_blank"
        >
          <Image
            src={withBasePath('/images/corsa_official_logo.png')}
            alt="CORSA Research Lab @ UCI"
            width={360}
            height={104}
            style={{ height: '64px', width: 'auto' }}
          />
        </Link>
        <FooterLogoContainer>
          <Link href="https://engineering.uci.edu/" target="_blank">
            <Image
              src={withBasePath('/images/uci_engineering_wordmark_white.png')}
              alt="UCI Samueli School of Engineering"
              width={2515}
              height={858}
              style={{ height: '72px', width: 'auto' }}
            />
          </Link>
        </FooterLogoContainer>
      </FooterTop>
      <FooterBottom>
        <span>
          Design adapted from{' '}
          <FooterCreditLink href="https://www.kixlab.org/" target="_blank" rel="noopener noreferrer">
            KIXLAB
          </FooterCreditLink>{' '}
          · Maintained by the CORSA Lab <FooterCreditLink href="/webteam">WebTeam</FooterCreditLink>
        </span>
      </FooterBottom>
    </FooterContainer>
  )
}
