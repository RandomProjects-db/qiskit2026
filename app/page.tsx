import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Speakers } from '@/components/speakers'
import { Schedule } from '@/components/schedule'
import { Team } from '@/components/team'
import { Register } from '@/components/register'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Speakers />
        <Schedule />
        <Team />
        <Register />
      </main>
      <Footer />
    </>
  )
}
