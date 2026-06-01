// Deterministic crystalline blue low-poly facet artwork —
// mirrors the JB homepage hero. Seeded so it never flickers.

const FACET_RAMP = [
  "#081F4D",
  "#0A2659",
  "#0B2F6E",
  "#0F3A86",
  "#1657B8",
  "#1F6FEB",
  "#3B86F2",
  "#5C9BF5",
];

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Tri {
  p: [number, number][];
  fill: string;
}

function buildFacets(
  cols: number,
  rows: number,
  W: number,
  H: number,
  seed: number,
): Tri[] {
  const rnd = mulberry32(seed);
  const cw = W / cols;
  const ch = H / rows;
  const pts: [number, number][][] = [];
  for (let r = 0; r <= rows; r++) {
    const row: [number, number][] = [];
    for (let c = 0; c <= cols; c++) {
      const edge = c === 0 || c === cols || r === 0 || r === rows;
      const jx = edge ? 0 : (rnd() - 0.5) * cw * 0.7;
      const jy = edge ? 0 : (rnd() - 0.5) * ch * 0.7;
      row.push([c * cw + jx, r * ch + jy]);
    }
    pts.push(row);
  }
  const tris: Tri[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const a = pts[r][c];
      const b = pts[r][c + 1];
      const d = pts[r + 1][c];
      const e = pts[r + 1][c + 1];
      const lightBias = 1 - (c / cols + r / rows) / 2;
      const pick = () => {
        const base = lightBias * (FACET_RAMP.length - 1);
        const idx = Math.round(base + (rnd() - 0.5) * 2.4);
        return FACET_RAMP[Math.max(0, Math.min(FACET_RAMP.length - 1, idx))];
      };
      const flip = rnd() > 0.5;
      if (flip) {
        tris.push({ p: [a, b, e], fill: pick() });
        tris.push({ p: [a, e, d], fill: pick() });
      } else {
        tris.push({ p: [a, b, d], fill: pick() });
        tris.push({ p: [b, e, d], fill: pick() });
      }
    }
  }
  return tris;
}

const cache: Record<string, Tri[]> = {};

interface Props {
  cols?: number;
  rows?: number;
  seed?: number;
}

export default function FacetField({ cols = 9, rows = 12, seed = 7 }: Props) {
  const W = 800;
  const H = 1040;
  const key = `${cols}:${rows}:${seed}`;
  if (!cache[key]) cache[key] = buildFacets(cols, rows, W, H, seed);
  const tris = cache[key];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      {tris.map((t, i) => (
        <polygon
          key={i}
          points={t.p.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ")}
          fill={t.fill}
          stroke={t.fill}
          strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}
