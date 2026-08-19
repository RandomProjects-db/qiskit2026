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
  { label: 'Schedule', href: '#schedule' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Team', href: '#team' },
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
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.slice(0, 4).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-cream/80 transition-colors hover:text-cream active:text-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register"
            className="ml-2 inline-flex min-h-11 items-center rounded-full bg-pink px-6 py-2.5 text-sm font-semibold text-pink-foreground shadow-lg shadow-pink/25 transition-transform hover:scale-[1.03] active:scale-95"
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
                className="inline-flex size-11 items-center justify-center rounded-xl text-cream transition-colors hover:bg-white/10 active:bg-white/20 md:hidden"
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
