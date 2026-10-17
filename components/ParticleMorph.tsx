'use client'

/**
 * ParticleMorph — a fixed, full-screen WebGL particle field that morphs through
 * a sequence of shapes as the user scrolls. Behavior ported from the original
 * standalone mock; packaged as a reusable, prop-driven component.
 *
 * Design notes:
 * - The canvas is fixed behind page content (pointer-events: none, low z-index).
 * - Scroll progress (0..1) drives the morph. By default it tracks window scroll;
 *   pass `sectionRef` to only progress while that wrapper is in view.
 * - Captions / nav dots are intentionally NOT rendered here. Consumers listen to
 *   `onStageChange` and render their own UI.
 * - Rendering pauses when the tab is hidden or the canvas is off-screen.
 * - Respects prefers-reduced-motion (first shape only, no morph/jitter).
 * - Light/dark is driven by the `theme` prop (your site's theme), not the OS.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { buildShapes, SHAPE_COUNT } from '@/lib/particleShapes'

export interface Stage {
  title: string
  description: string
}

export interface ParticleMorphProps {
  /** Stage metadata. Length defines how many morph steps exist (max SHAPE_COUNT). */
  stages: Stage[]
  /** One hex color per stage, for dark and light themes. */
  colors: { dark: string[]; light: string[] }
  /** Active theme. Drives palette + blending. */
  theme?: 'dark' | 'light'
  /** Base particle count on desktop. Mobile uses roughly half. */
  particleCount?: number
  /** Optional wrapper; progress runs only while it is scrolling through view. */
  sectionRef?: React.RefObject<HTMLElement | null>
  /**
   * Optional element whose BOTTOM edge is where progress starts (= 0). Used to
   * delay the particles until after the hero: progress goes 0 at heroBottom and
   * reaches 1 at the bottom of the page.
   */
  startAfterRef?: React.RefObject<HTMLElement | null>
  /**
   * Like startAfterRef, but a DOM selector (e.g. '#top'). Useful when the hero
   * lives in a different React tree than this component (e.g. mounted at root).
   */
  startAfterSelector?: string
  /** Fired when the visible stage index changes. */
  onStageChange?: (stage: number) => void
}

function clamp(v: number, a: number, b: number): number {
  return v < a ? a : v > b ? b : v
}
function smootherstep(t: number): number {
  return t * t * (3 - 2 * t)
}

export default function ParticleMorph({
  stages,
  colors,
  theme = 'dark',
  particleCount = 6000,
  sectionRef,
  startAfterRef,
  startAfterSelector,
  onStageChange,
}: ParticleMorphProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Keep latest theme / callback without restarting the GL loop.
  const themeRef = useRef(theme)
  const onStageRef = useRef(onStageChange)
  themeRef.current = theme
  onStageRef.current = onStageChange

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const glCanvas: HTMLCanvasElement = canvas

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 640px)').matches
    const N = Math.max(1, Math.round(isMobile ? particleCount / 2 : particleCount))
    const steps = Math.min(stages.length, SHAPE_COUNT)

    const shapes = buildShapes(N)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)

    const geo = new THREE.BufferGeometry()
    const seeds = new Float32Array(N)
    for (let i = 0; i < N; i++) seeds[i] = Math.random()
    geo.setAttribute('position', new THREE.BufferAttribute(shapes[0], 3))
    for (let q = 0; q < SHAPE_COUNT; q++) {
      geo.setAttribute('aS' + q, new THREE.BufferAttribute(shapes[q], 3))
    }
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))

    const VS = `uniform float uProg,uTime,uVel,uSize,uPx;
attribute vec3 aS0,aS1,aS2,aS3,aS4,aS5,aS6;attribute float aSeed;varying float vSeed;
void main(){
 float s=clamp(uProg,0.,1.)*6.;float i=min(floor(s),5.);float f=s-i;
 float t=smoothstep(0.,1.,clamp((f-0.2)/0.6,0.,1.));
 float k=smoothstep(0.,1.,clamp(t*1.7-aSeed*0.7,0.,1.));
 vec3 A=aS0,B=aS1;
 if(i>4.5){A=aS5;B=aS6;}else if(i>3.5){A=aS4;B=aS5;}else if(i>2.5){A=aS3;B=aS4;}else if(i>1.5){A=aS2;B=aS3;}else if(i>0.5){A=aS1;B=aS2;}
 vec3 pos=mix(A,B,k);
 vec3 sw=vec3(sin(aSeed*91.7),sin(aSeed*57.3+1.),sin(aSeed*33.1+2.));
 pos+=sw*sin(3.14159*k)*0.45;
 float a=aSeed*6.28318+uTime*0.7;
 pos+=0.02*vec3(sin(a*1.3),cos(a*1.1+aSeed),sin(a*.8+aSeed*2.))*(1.+min(uVel*6.,6.));
 vec4 mv=modelViewMatrix*vec4(pos,1.);
 gl_Position=projectionMatrix*mv;
 gl_PointSize=uSize*uPx/max(-mv.z,.1);
 vSeed=aSeed;
}`
    const FS = `precision mediump float;
uniform vec3 uColA,uColB;varying float vSeed;
void main(){vec2 p=gl_PointCoord-.5;float r=length(p);if(r>.5)discard;
 float al=pow(1.-smoothstep(0.,.5,r),1.6);
 gl_FragColor=vec4(mix(uColA,uColB,vSeed),al);}`

    const mat = new THREE.ShaderMaterial({
      vertexShader: VS,
      fragmentShader: FS,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uProg: { value: 0 },
        uTime: { value: 0 },
        uVel: { value: 0 },
        uSize: { value: 26 },
        uPx: { value: renderer.getPixelRatio() },
        uColA: { value: new THREE.Color() },
        uColB: { value: new THREE.Color() },
      },
    })

    const pts = new THREE.Points(geo, mat)
    pts.frustumCulled = false
    scene.add(pts)

    // Pre-parse palettes once.
    const palDark = colors.dark.map((h) => new THREE.Color(h))
    const palLight = colors.light.map((h) => new THREE.Color(h))
    const white = new THREE.Color(1, 1, 1)
    const black = new THREE.Color(0, 0, 0)

    function resize(): void {
      const w = glCanvas.clientWidth || window.innerWidth
      const h = glCanvas.clientHeight || window.innerHeight
      const a = w / h
      renderer.setSize(w, h, false)
      camera.aspect = a
      const z = Math.max(5.2, Math.min(10, 4.9 / (a * 0.828)))
      camera.position.set(0, 0, z)
      mat.uniforms.uSize.value = (26 * z) / 5.2
      mat.uniforms.uPx.value = renderer.getPixelRatio()
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    // Progress source: section-relative, hero-offset, or whole-page scroll.
    function readProgress(): number {
      if (prefersReduced) return 0
      const el = sectionRef?.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const total = el.offsetHeight - window.innerHeight
        if (total <= 0) return 0
        return clamp(-rect.top / total, 0, 1)
      }
      // Hero-offset mode: 0 at the hero's bottom edge, 1 at the page bottom.
      const startEl: HTMLElement | null =
        startAfterRef?.current ?? (startAfterSelector ? document.querySelector<HTMLElement>(startAfterSelector) : null)
      const pageMax = document.documentElement.scrollHeight - window.innerHeight
      if (startEl) {
        const heroBottom = startEl.offsetTop + startEl.offsetHeight
        const denom = pageMax - heroBottom
        if (denom <= 0) return 0
        return clamp((window.scrollY - heroBottom) / denom, 0, 1)
      }
      return pageMax > 0 ? clamp(window.scrollY / pageMax, 0, 1) : 0
    }

    let target = readProgress()
    let cur = target
    let vel = 0
    let last = 0
    let raf = 0
    let shownStage = -1
    let visible = true
    let onScreen = true

    const tmp = new THREE.Color()
    const tmp2 = new THREE.Color()

    function onScroll(): void {
      target = readProgress()
    }
    if (!prefersReduced) window.addEventListener('scroll', onScroll, { passive: true })

    // Pause when tab hidden.
    function onVisibility(): void {
      visible = document.visibilityState === 'visible'
      if (visible && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Pause when canvas scrolls off-screen.
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true
        if (onScreen && visible && !raf) {
          last = performance.now()
          raf = requestAnimationFrame(frame)
        }
      },
      { threshold: 0 },
    )
    io.observe(glCanvas)

    function frame(now: number): void {
      raf = 0
      const dt = Math.min((now - last) / 1000, 0.05) || 0.016
      last = now

      const prev = cur
      cur += (target - cur) * 0.08
      vel += ((cur - prev) / dt - vel) * 0.1

      const dark = themeRef.current === 'dark'
      const pal = dark ? palDark : palLight
      const s = cur * 6
      const i = Math.min(Math.floor(s), 5)
      const f = s - i
      const t = smootherstep(clamp((f - 0.2) / 0.6, 0, 1))

      const u = mat.uniforms
      u.uProg.value = cur
      u.uTime.value = now * 0.001
      u.uVel.value = Math.abs(vel)

      const ci = Math.min(i, pal.length - 1)
      const cj = Math.min(i + 1, pal.length - 1)
      tmp.copy(pal[ci])
      tmp2.copy(pal[cj])
      tmp.lerp(tmp2, t)
      u.uColA.value.copy(tmp)
      u.uColB.value.copy(tmp).lerp(dark ? white : black, 0.55)

      // Additive glow in dark, normal blending in light.
      const bl = dark ? THREE.AdditiveBlending : THREE.NormalBlending
      if (mat.blending !== bl) {
        mat.blending = bl
        mat.needsUpdate = true
      }

      pts.rotation.y = Math.sin(now * 0.0003) * 0.55
      pts.rotation.x = Math.sin(now * 0.00021) * 0.12

      const st = clamp(Math.round(s), 0, steps - 1)
      if (st !== shownStage) {
        shownStage = st
        onStageRef.current?.(st)
      }

      renderer.render(scene, camera)

      // Keep animating only while visible + on-screen (reduced-motion renders once).
      if (!prefersReduced && visible && onScreen) {
        raf = requestAnimationFrame(frame)
      }
    }

    // Initial stage emit + first paint.
    last = performance.now()
    raf = requestAnimationFrame(frame)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
      geo.dispose()
      mat.dispose()
      renderer.dispose()
    }
  }, [stages, colors, particleCount, sectionRef, startAfterRef, startAfterSelector])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    />
  )
}
