---
name: paper-shaders
description: Add WebGL-powered visual effects (animated gradients, noise textures, smoke, god rays, metaballs, etc.) using the Paper Shaders library. Use this skill when the user asks for animated backgrounds, mesh gradients, WebGL effects, or shader-based visuals on the web.
---

Paper Shaders (`@paper-design/shaders-react`) provides zero-dependency WebGL shader components installable from npm. Use them for animated backgrounds, ambient textures, and decorative effects. They render to a `<canvas>` element that fills its container.

## Installation

```bash
# React projects (Next.js, Vite, etc.)
npm install @paper-design/shaders-react

# Vanilla JS
npm install @paper-design/shaders
```

**CRITICAL: Pin to a specific version.** Breaking changes are introduced under `0.0.x` versioning.
```json
{ "@paper-design/shaders-react": "0.0.23" }
```
Check npm for the current version before adding.

---

## Next.js / App Router requirement

All shader components use WebGL and browser APIs. They **must** be in `'use client'` components:

```tsx
'use client'
import { MeshGradient } from '@paper-design/shaders-react'
```

Never import shader components in server components or layouts directly — wrap them in a client boundary first.

---

## Choosing the right shader

| Goal | Best shader(s) |
|---|---|
| Ambient, organic animated background | `MeshGradient`, `NeuroNoise` |
| Dark, moody atmospheric texture | `PerlinNoise`, `SimplexNoise` |
| Sci-fi / technical grid pattern | `DotGrid`, `DotOrbit`, `Voronoi` |
| Cinematic smoke / light effects | `SmokeRing`, `GodRays` |
| Fluid, liquid motion | `Warp`, `Waves`, `Metaballs` |
| Hypnotic spiral / vortex | `Spiral` |
| Static decorative texture | `DotGrid` with `speed={0}` |

---

## Universal props (all components)

| Prop | Type | Default | Description |
|---|---|---|---|
| `speed` | `number` | `1` | Animation speed multiplier. `0` = paused, `1` = normal, `2` = double speed. |
| `frame` | `number` | `0` | Starting animation frame — useful for deterministic screenshots. |
| `style` | `CSSProperties` | — | Pass `width`/`height` or `position: absolute; inset: 0` for full-bleed. |
| `className` | `string` | — | Standard class attribute. |

Built-in uniforms the shader always receives (no need to set manually):
- `u_time` — elapsed animation time
- `u_resolution` — canvas pixel dimensions
- `u_pixelRatio` — device pixel ratio

---

## Shader reference

### MeshGradient
Smooth organic color mesh with distortion and swirl. Best all-purpose animated background.

```tsx
<MeshGradient
  color1="#8B5CF6"
  color2="#06B6D4"
  color3="#030303"
  color4="#10B981"
  speed={0.3}
  style={{ width: '100%', height: '100%' }}
/>
```

Key props: `color1`–`color4` (hex strings), `speed`, `style`.

---

### NeuroNoise
Flowing, fluid dark noise. Excellent for dark-mode hero backgrounds with a technical/AI feel.

```tsx
<NeuroNoise
  colorFront="#8B5CF6"
  colorBack="#030303"
  speed={0.4}
  style={{ width: '100%', height: '100%' }}
/>
```

Key props: `colorFront`, `colorBack`, `speed`.

---

### PerlinNoise
2D Perlin noise pattern. Use at low speed or `speed={0}` for a subtle static texture, or higher speed for animated fog/cloud.

```tsx
<PerlinNoise
  colorFront="#8B5CF6"
  colorBack="#030303"
  scale={1.5}
  speed={0.1}
  style={{ position: 'absolute', inset: 0 }}
/>
```

Key props: `colorFront`, `colorBack`, `scale`, `speed`.

---

### SimplexNoise
Smoother than Perlin. Good for soft gradient-like noise overlays.

```tsx
<SimplexNoise
  colorFront="#06B6D4"
  colorBack="#030303"
  speed={0.2}
  style={{ width: '100%', height: '100%' }}
/>
```

---

### Voronoi
Voronoi cell diagram pattern. Technical, geometric feel. Two edge styles: classic and rounded.

```tsx
<Voronoi
  color1="#8B5CF6"
  color2="#030303"
  speed={0.5}
  style={{ width: '100%', height: '100%' }}
/>
```

---

### DotGrid
Static or subtly animated dot grid. Great for section backgrounds, cards, or texture overlays.

```tsx
<DotGrid
  color1="#8B5CF6"
  color2="#030303"
  dotSize={2}
  gap={24}
  speed={0}
  style={{ position: 'absolute', inset: 0, opacity: 0.4 }}
/>
```

Key props: `color1`, `color2`, `dotSize`, `gap`.

---

### DotOrbit
Animated dots with orbital movement around Voronoi cells. Lively, particle-like.

```tsx
<DotOrbit
  color1="#06B6D4"
  color2="#030303"
  speed={0.6}
  style={{ width: '100%', height: '100%' }}
/>
```

---

### SmokeRing
Animated smoke ring — cinematic, looping. Good for hero sections or loading states.

```tsx
<SmokeRing
  color1="#8B5CF6"
  color2="#030303"
  speed={0.5}
  style={{ width: '100%', height: '100%' }}
/>
```

---

### GodRays
Volumetric light rays radiating from a source point. Dramatic and atmospheric.

```tsx
<GodRays
  color1="#F59E0B"
  color2="#030303"
  speed={0.3}
  style={{ position: 'absolute', inset: 0 }}
/>
```

---

### Waves
Undulating wave patterns. Clean, rhythmic, good for sections that need gentle motion.

```tsx
<Waves
  color1="#06B6D4"
  color2="#030303"
  speed={0.4}
  style={{ width: '100%', height: '100%' }}
/>
```

---

### Warp
Fluid warping distortion. More intense than Waves — use for high-energy hero effects.

```tsx
<Warp
  color1="#8B5CF6"
  color2="#030303"
  speed={0.5}
  style={{ width: '100%', height: '100%' }}
/>
```

---

### Metaballs
Organic blob/metaball forms merging and separating. Unusual, biological, fluid.

```tsx
<Metaballs
  color1="#10B981"
  color2="#030303"
  speed={0.4}
  style={{ width: '100%', height: '100%' }}
/>
```

---

### Spiral
Hypnotic rotating spiral. Strong visual statement — use sparingly or at very low opacity.

```tsx
<Spiral
  color1="#8B5CF6"
  color2="#030303"
  speed={0.2}
  style={{ width: '100%', height: '100%' }}
/>
```

---

## Integration patterns

### Full-bleed section background
The shader fills the section; content sits on top. Use `position: relative` on the section and `position: absolute; inset: 0` on the shader.

```tsx
'use client'
import { MeshGradient } from '@paper-design/shaders-react'

export function HeroSection() {
  return (
    <section style={{ position: 'relative', height: '100vh' }}>
      {/* Shader as background layer */}
      <MeshGradient
        color1="#8B5CF6"
        color2="#06B6D4"
        color3="#030303"
        color4="#030303"
        speed={0.3}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      {/* Optional overlay to reduce intensity */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(3,3,3,0.6)' }} />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>Heading</h1>
      </div>
    </section>
  )
}
```

### Subtle texture overlay (low opacity)
Use a static noise shader as a texture layer over a flat background for added depth.

```tsx
<div style={{ position: 'relative' }}>
  <PerlinNoise
    colorFront="rgba(139,92,246,0.3)"
    colorBack="transparent"
    speed={0}
    style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      opacity: 0.15,
      mixBlendMode: 'screen',
      pointerEvents: 'none',
    }}
  />
  {/* content */}
</div>
```

### Ambient orbs (size-constrained)
For decorative ambient blobs rather than full backgrounds, constrain the canvas and use `overflow: hidden`.

```tsx
<div style={{
  position: 'absolute', top: '-200px', right: '-100px',
  width: '600px', height: '600px',
  borderRadius: '50%', overflow: 'hidden',
  opacity: 0.35, pointerEvents: 'none',
}}>
  <SmokeRing
    color1="#8B5CF6"
    color2="#000"
    speed={0.4}
    style={{ width: '100%', height: '100%' }}
  />
</div>
```

### Vanilla JS (non-React)
```ts
import { ShaderMount, meshGradientFragmentShader, getShaderColorFromString } from '@paper-design/shaders'

const el = document.getElementById('bg')!
const mount = new ShaderMount(el, meshGradientFragmentShader, {
  u_color1: getShaderColorFromString('#8B5CF6'),
  u_color2: getShaderColorFromString('#06B6D4'),
  u_color3: getShaderColorFromString('#030303'),
  u_color4: getShaderColorFromString('#030303'),
}, undefined, 0.3)

// Always clean up on page teardown
window.addEventListener('beforeunload', () => mount.dispose())
```

---

## Using presets

Every shader component ships with named presets. Use them for quick results or as a starting point:

```tsx
import { MeshGradient, meshGradientPresets } from '@paper-design/shaders-react'

// Spread a preset, then override specific props
<MeshGradient
  {...meshGradientPresets[0]}
  speed={0.2}
  style={{ width: '100%', height: '100%' }}
/>
```

Preset arrays are named `<componentName>Presets` (camelCase), e.g. `neuroNoisePresets`, `voronoiPresets`.

---

## SolProbe / Synapse design system notes

When adding shaders to this project, align colours with the Synapse palette:

| Role | Value |
|---|---|
| Primary accent | `#8B5CF6` (violet) |
| Secondary accent | `#06B6D4` (cyan) |
| Tertiary accent | `#10B981` (emerald) |
| Background dark | `#030303` (Vantablack) |

Recommended combinations for this project:
- **Hero background**: `MeshGradient` with `color1="#8B5CF6" color2="#06B6D4" color3="#030303" color4="#030303"` at `speed={0.25}` + `rgba(3,3,3,0.55)` overlay
- **Section texture**: `PerlinNoise` or `SimplexNoise` at `opacity: 0.12`, `speed={0}`, `mixBlendMode: 'screen'`
- **Ambient orbs**: Constrained `SmokeRing` or `NeuroNoise` blobs at `opacity: 0.3` to replace the CSS float-orb keyframe animations

Keep shader layers at `z-index: 0` with content at `z-index: 1`. Never let shaders intercept pointer events — always add `pointerEvents: 'none'` to shader wrappers.

---

## Common pitfalls

| Pitfall | Fix |
|---|---|
| Shader renders blank/white in Next.js | Add `'use client'` at the top of the file |
| Canvas doesn't fill container | Set explicit `width: '100%', height: '100%'` in `style` prop — the canvas won't stretch automatically |
| Memory leak on unmount | Vanilla only: always call `mount.dispose()` in cleanup |
| Jarring flash on load | Set `opacity: 0` initially and transition to `1` after component mounts |
| Breaks SSR hydration | Wrap in a `mounted` guard: `const [mounted, setMounted] = useState(false)` + `useEffect(() => setMounted(true), [])` — only render shader when `mounted === true` |
| Animation too intense | Reduce `speed` to `0.1`–`0.3` and add a dark overlay (`rgba(3,3,3,0.5)`) |
| Poor performance on mobile | Set `maxPixelCount` on the underlying ShaderMount; for React components, size the canvas smaller via style and let CSS scale it up |
