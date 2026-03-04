// Style-prop primitives — typed React props that map to Tailwind classes
// Full string literals throughout so Tailwind JIT can detect every class in source.

// ── Token types ──────────────────────────────────────────────────────

export type SpacingToken = '0' | 'unit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ColorToken =
  | 'background' | 'foreground'
  | 'card' | 'card-foreground'
  | 'primary' | 'primary-foreground'
  | 'secondary' | 'secondary-foreground'
  | 'muted' | 'muted-foreground'
  | 'accent' | 'accent-foreground'
  | 'destructive' | 'destructive-foreground'
  | 'border' | 'input' | 'ring'
  | 'transparent' | 'white' | 'black'

export type ShadowToken = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type RadiusToken = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type FontSizeToken = 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
export type FontWeightToken = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
export type DisplayToken = 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex' | 'grid' | 'hidden' | 'none'
export type PositionToken = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
export type OverflowToken = 'auto' | 'hidden' | 'visible' | 'scroll'
export type FlexDirectionToken = 'row' | 'row-reverse' | 'col' | 'col-reverse'
export type AlignToken = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type JustifyToken = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type WrapToken = 'wrap' | 'nowrap' | 'wrap-reverse'
export type TextAlignToken = 'left' | 'center' | 'right' | 'justify'
export type FontFamilyToken = 'sans' | 'serif' | 'mono'
export type WidthToken = 'full' | 'screen' | 'auto' | 'min' | 'max' | 'fit'
export type BorderWidthToken = '0' | '1' | '2' | '4' | '8'
export type OpacityToken = '0' | '5' | '10' | '20' | '25' | '30' | '40' | '50' | '60' | '70' | '75' | '80' | '90' | '95' | '100'

// ── Lookup maps ──────────────────────────────────────────────────────

const spacingMap: Record<SpacingToken, string> = {
  '0': '0',
  'unit': 'unit',
  'xs': 'xs',
  'sm': 'sm-space',
  'md': 'md-space',
  'lg': 'lg-space',
  'xl': 'xl-space',
  '2xl': '2xl-space',
}

const paddingMap: Record<string, Record<SpacingToken, string>> = {
  p: {
    '0': 'p-0', 'unit': 'p-unit', 'xs': 'p-xs',
    'sm': 'p-sm-space', 'md': 'p-md-space', 'lg': 'p-lg-space',
    'xl': 'p-xl-space', '2xl': 'p-2xl-space',
  },
  px: {
    '0': 'px-0', 'unit': 'px-unit', 'xs': 'px-xs',
    'sm': 'px-sm-space', 'md': 'px-md-space', 'lg': 'px-lg-space',
    'xl': 'px-xl-space', '2xl': 'px-2xl-space',
  },
  py: {
    '0': 'py-0', 'unit': 'py-unit', 'xs': 'py-xs',
    'sm': 'py-sm-space', 'md': 'py-md-space', 'lg': 'py-lg-space',
    'xl': 'py-xl-space', '2xl': 'py-2xl-space',
  },
  pt: {
    '0': 'pt-0', 'unit': 'pt-unit', 'xs': 'pt-xs',
    'sm': 'pt-sm-space', 'md': 'pt-md-space', 'lg': 'pt-lg-space',
    'xl': 'pt-xl-space', '2xl': 'pt-2xl-space',
  },
  pr: {
    '0': 'pr-0', 'unit': 'pr-unit', 'xs': 'pr-xs',
    'sm': 'pr-sm-space', 'md': 'pr-md-space', 'lg': 'pr-lg-space',
    'xl': 'pr-xl-space', '2xl': 'pr-2xl-space',
  },
  pb: {
    '0': 'pb-0', 'unit': 'pb-unit', 'xs': 'pb-xs',
    'sm': 'pb-sm-space', 'md': 'pb-md-space', 'lg': 'pb-lg-space',
    'xl': 'pb-xl-space', '2xl': 'pb-2xl-space',
  },
  pl: {
    '0': 'pl-0', 'unit': 'pl-unit', 'xs': 'pl-xs',
    'sm': 'pl-sm-space', 'md': 'pl-md-space', 'lg': 'pl-lg-space',
    'xl': 'pl-xl-space', '2xl': 'pl-2xl-space',
  },
}

const marginMap: Record<string, Record<SpacingToken, string>> = {
  m: {
    '0': 'm-0', 'unit': 'm-unit', 'xs': 'm-xs',
    'sm': 'm-sm-space', 'md': 'm-md-space', 'lg': 'm-lg-space',
    'xl': 'm-xl-space', '2xl': 'm-2xl-space',
  },
  mx: {
    '0': 'mx-0', 'unit': 'mx-unit', 'xs': 'mx-xs',
    'sm': 'mx-sm-space', 'md': 'mx-md-space', 'lg': 'mx-lg-space',
    'xl': 'mx-xl-space', '2xl': 'mx-2xl-space',
  },
  my: {
    '0': 'my-0', 'unit': 'my-unit', 'xs': 'my-xs',
    'sm': 'my-sm-space', 'md': 'my-md-space', 'lg': 'my-lg-space',
    'xl': 'my-xl-space', '2xl': 'my-2xl-space',
  },
  mt: {
    '0': 'mt-0', 'unit': 'mt-unit', 'xs': 'mt-xs',
    'sm': 'mt-sm-space', 'md': 'mt-md-space', 'lg': 'mt-lg-space',
    'xl': 'mt-xl-space', '2xl': 'mt-2xl-space',
  },
  mr: {
    '0': 'mr-0', 'unit': 'mr-unit', 'xs': 'mr-xs',
    'sm': 'mr-sm-space', 'md': 'mr-md-space', 'lg': 'mr-lg-space',
    'xl': 'mr-xl-space', '2xl': 'mr-2xl-space',
  },
  mb: {
    '0': 'mb-0', 'unit': 'mb-unit', 'xs': 'mb-xs',
    'sm': 'mb-sm-space', 'md': 'mb-md-space', 'lg': 'mb-lg-space',
    'xl': 'mb-xl-space', '2xl': 'mb-2xl-space',
  },
  ml: {
    '0': 'ml-0', 'unit': 'ml-unit', 'xs': 'ml-xs',
    'sm': 'ml-sm-space', 'md': 'ml-md-space', 'lg': 'ml-lg-space',
    'xl': 'ml-xl-space', '2xl': 'ml-2xl-space',
  },
}

const gapMap: Record<SpacingToken, string> = {
  '0': 'gap-0', 'unit': 'gap-unit', 'xs': 'gap-xs',
  'sm': 'gap-sm-space', 'md': 'gap-md-space', 'lg': 'gap-lg-space',
  'xl': 'gap-xl-space', '2xl': 'gap-2xl-space',
}

const bgMap: Record<ColorToken, string> = {
  'background': 'bg-background', 'foreground': 'bg-foreground',
  'card': 'bg-card', 'card-foreground': 'bg-card-foreground',
  'primary': 'bg-primary', 'primary-foreground': 'bg-primary-foreground',
  'secondary': 'bg-secondary', 'secondary-foreground': 'bg-secondary-foreground',
  'muted': 'bg-muted', 'muted-foreground': 'bg-muted-foreground',
  'accent': 'bg-accent', 'accent-foreground': 'bg-accent-foreground',
  'destructive': 'bg-destructive', 'destructive-foreground': 'bg-destructive-foreground',
  'border': 'bg-border', 'input': 'bg-input', 'ring': 'bg-ring',
  'transparent': 'bg-transparent', 'white': 'bg-white', 'black': 'bg-black',
}

const colorMap: Record<ColorToken, string> = {
  'background': 'text-background', 'foreground': 'text-foreground',
  'card': 'text-card', 'card-foreground': 'text-card-foreground',
  'primary': 'text-primary', 'primary-foreground': 'text-primary-foreground',
  'secondary': 'text-secondary', 'secondary-foreground': 'text-secondary-foreground',
  'muted': 'text-muted', 'muted-foreground': 'text-muted-foreground',
  'accent': 'text-accent', 'accent-foreground': 'text-accent-foreground',
  'destructive': 'text-destructive', 'destructive-foreground': 'text-destructive-foreground',
  'border': 'text-border', 'input': 'text-input', 'ring': 'text-ring',
  'transparent': 'text-transparent', 'white': 'text-white', 'black': 'text-black',
}

const borderColorMap: Record<ColorToken, string> = {
  'background': 'border-background', 'foreground': 'border-foreground',
  'card': 'border-card', 'card-foreground': 'border-card-foreground',
  'primary': 'border-primary', 'primary-foreground': 'border-primary-foreground',
  'secondary': 'border-secondary', 'secondary-foreground': 'border-secondary-foreground',
  'muted': 'border-muted', 'muted-foreground': 'border-muted-foreground',
  'accent': 'border-accent', 'accent-foreground': 'border-accent-foreground',
  'destructive': 'border-destructive', 'destructive-foreground': 'border-destructive-foreground',
  'border': 'border-border', 'input': 'border-input', 'ring': 'border-ring',
  'transparent': 'border-transparent', 'white': 'border-white', 'black': 'border-black',
}

const displayMap: Record<DisplayToken, string> = {
  'block': 'block', 'inline-block': 'inline-block', 'inline': 'inline',
  'flex': 'flex', 'inline-flex': 'inline-flex', 'grid': 'grid',
  'hidden': 'hidden', 'none': 'hidden',
}

const positionMap: Record<PositionToken, string> = {
  'static': 'static', 'relative': 'relative', 'absolute': 'absolute',
  'fixed': 'fixed', 'sticky': 'sticky',
}

const overflowMap: Record<OverflowToken, string> = {
  'auto': 'overflow-auto', 'hidden': 'overflow-hidden',
  'visible': 'overflow-visible', 'scroll': 'overflow-scroll',
}

const widthMap: Record<WidthToken, string> = {
  'full': 'w-full', 'screen': 'w-screen', 'auto': 'w-auto',
  'min': 'w-min', 'max': 'w-max', 'fit': 'w-fit',
}

const heightMap: Record<WidthToken, string> = {
  'full': 'h-full', 'screen': 'h-screen', 'auto': 'h-auto',
  'min': 'h-min', 'max': 'h-max', 'fit': 'h-fit',
}

const maxWidthMap: Record<WidthToken, string> = {
  'full': 'max-w-full', 'screen': 'max-w-screen', 'auto': 'max-w-none',
  'min': 'max-w-min', 'max': 'max-w-max', 'fit': 'max-w-fit',
}

const directionMap: Record<FlexDirectionToken, string> = {
  'row': 'flex-row', 'row-reverse': 'flex-row-reverse',
  'col': 'flex-col', 'col-reverse': 'flex-col-reverse',
}

const alignMap: Record<AlignToken, string> = {
  'start': 'items-start', 'center': 'items-center', 'end': 'items-end',
  'stretch': 'items-stretch', 'baseline': 'items-baseline',
}

const justifyMap: Record<JustifyToken, string> = {
  'start': 'justify-start', 'center': 'justify-center', 'end': 'justify-end',
  'between': 'justify-between', 'around': 'justify-around', 'evenly': 'justify-evenly',
}

const wrapMap: Record<WrapToken, string> = {
  'wrap': 'flex-wrap', 'nowrap': 'flex-nowrap', 'wrap-reverse': 'flex-wrap-reverse',
}

const growMap: Record<string, string> = {
  '0': 'grow-0', '1': 'grow',
}

const shrinkMap: Record<string, string> = {
  '0': 'shrink-0', '1': 'shrink',
}

const shadowMap: Record<ShadowToken, string> = {
  'none': 'shadow-none', 'sm': 'shadow-sm', 'md': 'shadow-md',
  'lg': 'shadow-lg', 'xl': 'shadow-xl',
}

const roundedMap: Record<RadiusToken, string> = {
  'none': 'rounded-none', 'sm': 'rounded-sm', 'md': 'rounded-md',
  'lg': 'rounded-lg', 'full': 'rounded-full',
}

const borderWidthMap: Record<BorderWidthToken, string> = {
  '0': 'border-0', '1': 'border', '2': 'border-2', '4': 'border-4', '8': 'border-8',
}

const opacityMap: Record<OpacityToken, string> = {
  '0': 'opacity-0', '5': 'opacity-5', '10': 'opacity-10',
  '20': 'opacity-20', '25': 'opacity-25', '30': 'opacity-30',
  '40': 'opacity-40', '50': 'opacity-50', '60': 'opacity-60',
  '70': 'opacity-70', '75': 'opacity-75', '80': 'opacity-80',
  '90': 'opacity-90', '95': 'opacity-95', '100': 'opacity-100',
}

const fontSizeMap: Record<FontSizeToken, string> = {
  'sm': 'text-sm', 'base': 'text-base', 'lg': 'text-lg',
  'xl': 'text-xl', '2xl': 'text-2xl', '3xl': 'text-3xl', '4xl': 'text-4xl',
}

const fontWeightMap: Record<FontWeightToken, string> = {
  'light': 'font-light', 'normal': 'font-normal', 'medium': 'font-medium',
  'semibold': 'font-semibold', 'bold': 'font-bold', 'extrabold': 'font-extrabold',
}

const fontFamilyMap: Record<FontFamilyToken, string> = {
  'sans': 'font-sans', 'serif': 'font-serif', 'mono': 'font-mono',
}

const textAlignMap: Record<TextAlignToken, string> = {
  'left': 'text-left', 'center': 'text-center', 'right': 'text-right', 'justify': 'text-justify',
}

// ── StyleProps interface ─────────────────────────────────────────────

export interface StyleProps {
  // Spacing
  p?: SpacingToken
  px?: SpacingToken
  py?: SpacingToken
  pt?: SpacingToken
  pr?: SpacingToken
  pb?: SpacingToken
  pl?: SpacingToken
  m?: SpacingToken
  mx?: SpacingToken
  my?: SpacingToken
  mt?: SpacingToken
  mr?: SpacingToken
  mb?: SpacingToken
  ml?: SpacingToken
  gap?: SpacingToken
  // Colors
  bg?: ColorToken
  color?: ColorToken
  borderColor?: ColorToken
  // Layout
  display?: DisplayToken
  position?: PositionToken
  overflow?: OverflowToken
  w?: WidthToken
  h?: WidthToken
  maxW?: WidthToken
  // Flex
  direction?: FlexDirectionToken
  align?: AlignToken
  justify?: JustifyToken
  wrap?: WrapToken
  grow?: '0' | '1'
  shrink?: '0' | '1'
  // Visual
  shadow?: ShadowToken
  rounded?: RadiusToken
  borderWidth?: BorderWidthToken
  opacity?: OpacityToken
  // Typography
  fontSize?: FontSizeToken
  fontWeight?: FontWeightToken
  fontFamily?: FontFamilyToken
  textAlign?: TextAlignToken
}

// ── All style prop keys (for splitting) ──────────────────────────────

const STYLE_PROP_KEYS = new Set<string>([
  'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
  'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml',
  'gap',
  'bg', 'color', 'borderColor',
  'display', 'position', 'overflow', 'w', 'h', 'maxW',
  'direction', 'align', 'justify', 'wrap', 'grow', 'shrink',
  'shadow', 'rounded', 'borderWidth', 'opacity',
  'fontSize', 'fontWeight', 'fontFamily', 'textAlign',
])

// ── buildStyleClasses ────────────────────────────────────────────────

export function buildStyleClasses(props: Partial<StyleProps>): string {
  const classes: string[] = []

  // Spacing — padding
  if (props.p != null) classes.push(paddingMap.p[props.p])
  if (props.px != null) classes.push(paddingMap.px[props.px])
  if (props.py != null) classes.push(paddingMap.py[props.py])
  if (props.pt != null) classes.push(paddingMap.pt[props.pt])
  if (props.pr != null) classes.push(paddingMap.pr[props.pr])
  if (props.pb != null) classes.push(paddingMap.pb[props.pb])
  if (props.pl != null) classes.push(paddingMap.pl[props.pl])

  // Spacing — margin
  if (props.m != null) classes.push(marginMap.m[props.m])
  if (props.mx != null) classes.push(marginMap.mx[props.mx])
  if (props.my != null) classes.push(marginMap.my[props.my])
  if (props.mt != null) classes.push(marginMap.mt[props.mt])
  if (props.mr != null) classes.push(marginMap.mr[props.mr])
  if (props.mb != null) classes.push(marginMap.mb[props.mb])
  if (props.ml != null) classes.push(marginMap.ml[props.ml])

  // Spacing — gap
  if (props.gap != null) classes.push(gapMap[props.gap])

  // Colors
  if (props.bg != null) classes.push(bgMap[props.bg])
  if (props.color != null) classes.push(colorMap[props.color])
  if (props.borderColor != null) classes.push(borderColorMap[props.borderColor])

  // Layout
  if (props.display != null) classes.push(displayMap[props.display])
  if (props.position != null) classes.push(positionMap[props.position])
  if (props.overflow != null) classes.push(overflowMap[props.overflow])
  if (props.w != null) classes.push(widthMap[props.w])
  if (props.h != null) classes.push(heightMap[props.h])
  if (props.maxW != null) classes.push(maxWidthMap[props.maxW])

  // Flex
  if (props.direction != null) classes.push(directionMap[props.direction])
  if (props.align != null) classes.push(alignMap[props.align])
  if (props.justify != null) classes.push(justifyMap[props.justify])
  if (props.wrap != null) classes.push(wrapMap[props.wrap])
  if (props.grow != null) classes.push(growMap[props.grow])
  if (props.shrink != null) classes.push(shrinkMap[props.shrink])

  // Visual
  if (props.shadow != null) classes.push(shadowMap[props.shadow])
  if (props.rounded != null) classes.push(roundedMap[props.rounded])
  if (props.borderWidth != null) classes.push(borderWidthMap[props.borderWidth])
  if (props.opacity != null) classes.push(opacityMap[props.opacity])

  // Typography
  if (props.fontSize != null) classes.push(fontSizeMap[props.fontSize])
  if (props.fontWeight != null) classes.push(fontWeightMap[props.fontWeight])
  if (props.fontFamily != null) classes.push(fontFamilyMap[props.fontFamily])
  if (props.textAlign != null) classes.push(textAlignMap[props.textAlign])

  return classes.join(' ')
}

// ── splitStyleProps ──────────────────────────────────────────────────

export function splitStyleProps<T extends Record<string, unknown>>(
  allProps: T
): { styleClasses: string; restProps: Omit<T, keyof StyleProps> } {
  const styleProps: Record<string, unknown> = {}
  const restProps: Record<string, unknown> = {}

  for (const key of Object.keys(allProps)) {
    if (STYLE_PROP_KEYS.has(key)) {
      styleProps[key] = allProps[key]
    } else {
      restProps[key] = allProps[key]
    }
  }

  return {
    styleClasses: buildStyleClasses(styleProps as Partial<StyleProps>),
    restProps: restProps as Omit<T, keyof StyleProps>,
  }
}
