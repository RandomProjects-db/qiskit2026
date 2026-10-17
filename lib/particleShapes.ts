/**
 * Particle shape generators for the scroll-morph visual.
 *
 * Each generator returns a flat Float32Array of length `count * 3` (xyz per
 * particle), produced by sampling points onto a quantum-themed form and then
 * padding/jittering to a fixed particle count via `fit`.
 *
 * Ported verbatim (behavior-preserving) from the original standalone mock.
 */

export type Vec3 = [number, number, number]

const TAU = Math.PI * 2
const X: Vec3 = [1, 0, 0]
const Y: Vec3 = [0, 1, 0]
const Z: Vec3 = [0, 0, 1]

function shuffle(a: Vec3[]): Vec3[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }
  return a
}

/** Pad an arbitrary point cloud up to `count` particles and flatten to xyz. */
function fit(points: Vec3[], count: number, zJitter = 0): Float32Array {
  shuffle(points)
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const p = points[i % points.length]
    const j = i >= points.length ? 0.012 : 0
    out[i * 3] = p[0] + (Math.random() - 0.5) * j
    out[i * 3 + 1] = p[1] + (Math.random() - 0.5) * j
    out[i * 3 + 2] = p[2] + (Math.random() - 0.5) * (j + zJitter)
  }
  return out
}

function line(points: Vec3[], a: Vec3, b: Vec3, n: number): void {
  for (let i = 0; i < n; i++) {
    const t = Math.random()
    points.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t])
  }
}

function ring(points: Vec3[], c: Vec3, r: number, n: number, u: Vec3, v: Vec3): void {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * TAU
    const co = Math.cos(a) * r
    const si = Math.sin(a) * r
    points.push([c[0] + co * u[0] + si * v[0], c[1] + co * u[1] + si * v[1], c[2] + co * u[2] + si * v[2]])
  }
}

function disc(points: Vec3[], y: number, r: number, n: number): void {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * TAU
    const rr = r * Math.sqrt(Math.random())
    points.push([rr * Math.cos(a), y, rr * Math.sin(a)])
  }
}

function sphere(points: Vec3[], c: Vec3, R: number, n: number): void {
  for (let i = 0; i < n; i++) {
    const u = Math.random() * 2 - 1
    const a = Math.random() * TAU
    const s = Math.sqrt(1 - u * u)
    points.push([c[0] + R * s * Math.cos(a), c[1] + R * u, c[2] + R * s * Math.sin(a)])
  }
}

function tilt(points: Vec3[], a: number): Vec3[] {
  const c = Math.cos(a)
  const s = Math.sin(a)
  for (const p of points) {
    const y = p[1]
    const z = p[2]
    p[1] = y * c - z * s
    p[2] = y * s + z * c
  }
  return points
}

export function fridge(count: number): Float32Array {
  const P: Vec3[] = []
  const L: Array<[number, number]> = [
    [1.45, 1.25],
    [0.85, 1.1],
    [0.25, 0.92],
    [-0.35, 0.72],
    [-0.95, 0.5],
  ]
  L.forEach((l) => {
    ring(P, [0, l[0], 0], l[1], 420, X, Z)
    disc(P, l[0], l[1], 260)
  })
  for (let k = 0; k < L.length - 1; k++) {
    const y0 = L[k][0]
    const y1 = L[k + 1][0]
    const rr = Math.min(L[k][1], L[k + 1][1]) * 0.7
    for (let m = 0; m < 3; m++) {
      const a = (m * TAU) / 3 + k * 0.5
      line(P, [rr * Math.cos(a), y0, rr * Math.sin(a)], [rr * Math.cos(a), y1, rr * Math.sin(a)], 110)
    }
  }
  line(P, [0, 1.45, 0], [0, -1.3, 0], 150)
  ring(P, [0, -1.3, 0], 0.32, 160, X, Z)
  disc(P, -1.45, 0.32, 120)
  return fit(P, count)
}

export function lattice(count: number): Float32Array {
  const P: Vec3[] = []
  const G = 7
  const S = 0.5
  const node = (x: number, y: number): void => {
    for (let i = 0; i < 28; i++) {
      const a = Math.random() * TAU
      const r = 0.07 * Math.sqrt(Math.random())
      P.push([x + r * Math.cos(a), y + r * Math.sin(a), 0])
    }
  }
  for (let gx = 0; gx < G; gx++) {
    for (let gy = 0; gy < G; gy++) {
      const x = (gx - 3) * S
      const y = (gy - 3) * S
      node(x, y)
      if (gx < G - 1) line(P, [x, y, 0], [x + S, y, 0], 28)
      if (gy < G - 1) line(P, [x, y, 0], [x, y + S, 0], 28)
      if (gx < G - 1 && gy < G - 1 && (gx + gy) % 2 === 0) {
        for (let k = 0; k < 40; k++) P.push([x + Math.random() * S, y + Math.random() * S, 0])
      }
    }
  }
  return fit(tilt(P, -0.5), count, 0.12)
}

export function circuit(count: number): Float32Array {
  const P: Vec3[] = []
  const ys = [-0.9, -0.3, 0.3, 0.9]
  ys.forEach((y) => line(P, [-2, y, 0], [2, y, 0], 300))
  const box = (x: number, y: number, s: number): void => {
    const edges: Array<[number, number, number, number]> = [
      [-s, -s, s, -s],
      [s, -s, s, s],
      [s, s, -s, s],
      [-s, s, -s, -s],
    ]
    edges.forEach((e) => line(P, [x + e[0], y + e[1], 0], [x + e[2], y + e[3], 0], 45))
  }
  const cnot = (x: number, c: number, t: number): void => {
    line(P, [x, ys[c], 0], [x, ys[t], 0], Math.abs(c - t) * 70 + 40)
    for (let i = 0; i < 40; i++) {
      const a = Math.random() * TAU
      const r = 0.07 * Math.sqrt(Math.random())
      P.push([x + r * Math.cos(a), ys[c] + r * Math.sin(a), 0])
    }
    ring(P, [x, ys[t], 0], 0.17, 70, X, Y)
  }
  box(-1.6, ys[0], 0.17)
  box(-1.6, ys[2], 0.17)
  cnot(-0.9, 0, 1)
  cnot(-0.3, 2, 3)
  box(0.3, ys[1], 0.17)
  box(0.3, ys[3], 0.17)
  cnot(0.9, 1, 2)
  box(1.4, ys[0], 0.17)
  for (let i = 0; i < 4; i++) box(1.8, ys[i], 0.14)
  return fit(P, count, 0.3)
}

export function bloch(count: number): Float32Array {
  const P: Vec3[] = []
  const R = 1.25
  for (let i = 0; i < 2600; i++) {
    const u = Math.random() * 2 - 1
    const a = Math.random() * TAU
    const s = Math.sqrt(1 - u * u)
    P.push([R * s * Math.cos(a), R * u, R * s * Math.sin(a)])
  }
  ring(P, [0, 0, 0], R, 300, X, Z)
  ring(P, [0, 0, 0], R, 250, X, Y)
  ring(P, [0, 0, 0], R, 250, Y, Z)
  line(P, [-1.7, 0, 0], [1.7, 0, 0], 150)
  line(P, [0, -1.7, 0], [0, 1.7, 0], 150)
  line(P, [0, 0, -1.7], [0, 0, 1.7], 150)
  const th = 0.9
  const ph = 0.6
  const v: Vec3 = [R * Math.sin(th) * Math.cos(ph), R * Math.cos(th), R * Math.sin(th) * Math.sin(ph)]
  const d: Vec3 = [v[0] / R, v[1] / R, v[2] / R]
  const h: Vec3 = Math.abs(d[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]
  const AL = 0.3
  const AR = 0.1
  let u: Vec3 = [d[1] * h[2] - d[2] * h[1], d[2] * h[0] - d[0] * h[2], d[0] * h[1] - d[1] * h[0]]
  const ul = Math.hypot(u[0], u[1], u[2])
  u = [u[0] / ul, u[1] / ul, u[2] / ul]
  const w: Vec3 = [d[1] * u[2] - d[2] * u[1], d[2] * u[0] - d[0] * u[2], d[0] * u[1] - d[1] * u[0]]
  line(P, [0, 0, 0], [v[0] - d[0] * AL, v[1] - d[1] * AL, v[2] - d[2] * AL], 260)
  for (let k = 0; k < 310; k++) {
    const tq = k < 260 ? Math.sqrt(Math.random()) : 1
    const a = Math.random() * TAU
    const rr = (k < 260 ? tq : Math.sqrt(Math.random())) * AR
    const ca = Math.cos(a) * rr
    const sa = Math.sin(a) * rr
    P.push([
      v[0] - d[0] * tq * AL + ca * u[0] + sa * w[0],
      v[1] - d[1] * tq * AL + ca * u[1] + sa * w[1],
      v[2] - d[2] * tq * AL + ca * u[2] + sa * w[2],
    ])
  }
  return fit(P, count)
}

export function bell(count: number): Float32Array {
  const P: Vec3[] = []
  const L: Vec3 = [-1.25, 0, 0]
  const Rr: Vec3 = [1.25, 0, 0]
  const R = 0.55
  sphere(P, L, R, 1300)
  sphere(P, Rr, R, 1300)
  ring(P, L, R, 120, X, Z)
  ring(P, Rr, R, 120, X, Z)
  line(P, L, [L[0] + R * 0.6, R * 0.7, 0], 110)
  line(P, Rr, [Rr[0] - R * 0.6, -R * 0.7, 0], 110)
  for (let i = 0; i < 1300; i++) {
    const x = -0.7 + 1.4 * Math.random()
    const ph = x * 8
    const sg = i % 2 ? 1 : -1
    P.push([x, sg * 0.2 * Math.sin(ph), sg * 0.2 * Math.cos(ph)])
  }
  return fit(P, count)
}

export function interference(count: number): Float32Array {
  const P: Vec3[] = []
  for (let i = 0; i < 5200; i++) {
    const x = (Math.random() * 2 - 1) * 2.1
    const z = (Math.random() * 2 - 1) * 1.5
    const r1 = Math.hypot(x - 0.9, z)
    const r2 = Math.hypot(x + 0.9, z)
    P.push([x, (0.2 * (Math.cos(7 * r1) + Math.cos(7 * r2))) / (1 + 0.25 * (r1 + r2)), z])
  }
  sphere(P, [0.9, 0, 0], 0.07, 60)
  sphere(P, [-0.9, 0, 0], 0.07, 60)
  return fit(tilt(P, 0.6), count)
}

export function spring(count: number): Float32Array {
  const P: Vec3[] = []
  const turns = 6
  const r = 0.75
  const H = 3.2
  for (let i = 0; i < 4200; i++) {
    const t = Math.random()
    const a = t * turns * TAU
    P.push([r * Math.cos(a) + (Math.random() - 0.5) * 0.1, -H / 2 + t * H, r * Math.sin(a) + (Math.random() - 0.5) * 0.1])
  }
  line(P, [r, H / 2, 0], [r, H / 2 + 0.3, 0], 100)
  line(P, [r, -H / 2, 0], [r, -H / 2 - 0.3, 0], 100)
  return fit(P, count)
}

/** The seven shapes in morph order. */
export function buildShapes(count: number): Float32Array[] {
  return [
    fridge(count),
    lattice(count),
    circuit(count),
    bloch(count),
    bell(count),
    interference(count),
    spring(count),
  ]
}

export const SHAPE_COUNT = 7
