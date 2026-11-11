'use client'

import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Setup', href: '/setup' },
  { label: 'Learn', href: '/learn' },
  { label: 'Register', href: '#register' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-md transition-colors duration-300',
        scrolled ? 'bg-navy/70' : 'bg-white/5',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2 text-cream transition-opacity active:opacity-70"
        >
          <span className="relative flex size-9 items-center justify-center rounded-xl overflow-hidden">
            <img src="/qiskit-fallfest-2026-black.png" alt="Qiskit Fall Fest 2026" className="size-9 object-contain transition-opacity group-hover:opacity-0" />
            <img src="/badge-pink.svg" alt="Qiskit Fall Fest 2026" className="absolute inset-0 size-9 object-contain opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span className="font-display text-sm font-bold leading-tight sm:text-base">
            Qiskit Fall Fest
            <span className="block text-[0.65rem] font-medium text-cream/70 sm:text-xs">
              NC A&amp;T · 2026
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.filter((link) => link.href !== '#register').map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-cream/80 transition-colors hover:text-cream active:text-cream xl:px-4"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://discord.gg/MVGJmv3AC"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our Discord"
            className="ml-1 inline-flex size-10 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-[#5865F2]/20 hover:text-cream"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
              <path d="M20.317 4.369a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.1 13.1 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.009c.12.099.246.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.891.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>
          <a
            href="#register"
            className="ml-1 inline-flex min-h-11 items-center rounded-full bg-pink px-6 py-2.5 text-sm font-semibold text-pink-foreground shadow-lg shadow-pink/25 transition-transform hover:scale-[1.03] active:scale-95"
          >
            Register Now
          </a>
        </div>

        {/* Mobile trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex size-11 items-center justify-center rounded-xl text-cream transition-colors hover:bg-white/10 active:bg-white/20 lg:hidden"
              />
            }
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-[86%] max-w-sm flex-col border-white/10 bg-navy-deep text-cream"
          >
            <SheetHeader className="border-b border-white/10">
              <SheetTitle className="font-display text-cream">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-1 px-4 py-4">
              {NAV_LINKS.filter((link) => link.href !== '#register').map((link) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <a
                      href={link.href}
                      className="rounded-xl px-4 py-4 font-display text-xl font-semibold text-cream/90 transition-colors hover:bg-white/10 active:bg-white/20"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </div>
            <div className="border-t border-white/10 p-4">
              <div className="mb-6 flex justify-center">
                <img src="/badge-pink.svg" alt="Qiskit Fall Fest 2026" className="size-28 opacity-80" />
              </div>
              <SheetClose
                nativeButton={false}
                render={
                  <a
                    href="#register"
                    className="flex min-h-12 w-full items-center justify-center rounded-xl bg-gold py-3 font-semibold text-gold-foreground transition-transform active:scale-[0.98]"
                  />
                }
              >
                Register Now
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
