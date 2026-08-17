'use client'

import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import Image from 'next/image'
import { Color } from '@/app/theme'

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
      <Link
        href="https://www.google.com/maps/search/?api=1&query=Engineering+Hall,+University+of+California,+Irvine"
        target="_blank"
      >
        <Image
          src="/images/corsa_official_logo.png"
          alt="CORSA Research Lab @ UCI"
          width={360}
          height={104}
          style={{ height: '64px', width: 'auto' }}
        />
      </Link>
      <FooterLogoContainer>
        <Link href="https://engineering.uci.edu/" target="_blank">
          <Image
            src="/images/uci_engineering_wordmark_white.png"
            alt="UCI Samueli School of Engineering"
            width={2515}
            height={858}
            style={{ height: '72px', width: 'auto' }}
          />
        </Link>
      </FooterLogoContainer>
    </FooterContainer>
  )
}
