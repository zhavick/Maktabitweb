'use client'

import React, { useCallback, useState } from 'react'

import { Footer, type FooterProps } from './layout/Footer'
import { Navbar, type NavbarProps } from './layout/Navbar'
import { SplashScreen, type SplashScreenProps } from './layout/SplashScreen'
import { AboutSection, type AboutSectionProps } from './sections/AboutSection'
import { ContactSection, type ContactSectionProps } from './sections/ContactSection'
import { HeroSection, type HeroSectionProps } from './sections/HeroSection'
import { ProjectsSection, type ProjectsSectionProps } from './sections/ProjectsSection'
import { ServicesSection, type ServicesSectionProps } from './sections/ServicesSection'
import { TechStackSection, type TechStackSectionProps } from './sections/TechStackSection'

export interface LandingPageClientProps {
  splash?: Omit<SplashScreenProps, 'onFinish' | 'replayTrigger'>
  navbar?: Omit<NavbarProps, 'onReplaySplash'>
  hero?: HeroSectionProps
  about?: AboutSectionProps
  services?: ServicesSectionProps
  projects?: ProjectsSectionProps
  techStack?: TechStackSectionProps
  contact?: ContactSectionProps
  footer?: FooterProps
  extraSection?: React.ReactNode
}

export function LandingPageClient({
  splash,
  navbar,
  hero,
  about,
  services,
  projects,
  techStack,
  contact,
  footer,
  extraSection,
}: LandingPageClientProps) {
  const [pageVisible, setPageVisible] = useState(false)
  const [replayTrigger, setReplayTrigger] = useState(0)

  const handleSplashFinish = useCallback(() => {
    setTimeout(() => {
      setPageVisible(true)
    }, 150)
  }, [])

  const handleReplaySplash = useCallback(() => {
    setPageVisible(false)
    setReplayTrigger((prev) => prev + 1)
  }, [])

  return (
    <>
      <SplashScreen
        {...splash}
        replayTrigger={replayTrigger}
        onFinish={handleSplashFinish}
      />

      <div
        id="main-wrapper"
        className={`flex min-h-screen flex-col bg-slate-50 opacity-0 ${
          pageVisible ? 'page-visible' : ''
        }`}
      >
        <Navbar {...navbar} onReplaySplash={handleReplaySplash} />
        <HeroSection {...hero} />
        <AboutSection {...about} />
        <ServicesSection {...services} />
        <ProjectsSection {...projects} />
        <TechStackSection {...techStack} />
        {extraSection}
        <ContactSection {...contact} />
        <Footer {...footer} />
      </div>
    </>
  )
}
