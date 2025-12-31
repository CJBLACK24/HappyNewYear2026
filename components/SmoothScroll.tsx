'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { PropsWithChildren } from 'react'

export default function SmoothScroll({ children }: PropsWithChildren) {
  return (
    <ReactLenis root>
      {children as any}
    </ReactLenis>
  )
}
