// Style-prop primitives — typed React props that map to standard Tailwind classes.
// Semantic tokens (xs, sm, md …) map to Tailwind's default scale so no custom
// CSS variables or Tailwind extensions are needed.

// ── Token types ──────────────────────────────────────────────────────

/**
 * Semantic spacing tokens → standard Tailwind spacing values.
 *
 * | Token  | Tailwind | Value    |
 * |--------|----------|----------|
 * | '0'    | -0       | 0        |
 * | 'px'   | -px      | 1px      |
 * | '3xs'  | -0.5     | 0.125rem |
 * | '2xs'  | -1       | 0.25rem  |
 * | 'xs'   | -1.5     | 0.375rem |
 * | 'sm'   | -2       | 0.5rem   |
 * | 'sm+'  | -3       | 0.75rem  |
 * | 'md'   | -4       | 1rem     |
 * | 'md+'  | -5       | 1.25rem  |
 * | 'lg'   | -6       | 1.5rem   |
 * | 'lg+'  | -7       | 1.75rem  |
 * | 'xl'   | -8       | 2rem     |
 * | 'xl+'  | -10      | 2.5rem   |
 * | '2xl'  | -12      | 3rem     |
 * | '3xl'  | -16      | 4rem     |
 * | '4xl'  | -20      | 5rem     |
 * | '5xl'  | -24      | 6rem     |
 * | '6xl'  | -32      | 8rem     |
 * | '7xl'  | -40      | 10rem    |
 * | '8xl'  | -48      | 12rem    |
 * | '9xl'  | -64      | 16rem    |
 * | '10xl' | -80      | 20rem    |
 * | '11xl' | -96      | 24rem    |
 */
export type SpacingToken =
  | '0' | 'px' | '3xs' | '2xs' | 'xs'
  | 'sm' | 'sm+' | 'md' | 'md+' | 'lg' | 'lg+' | 'xl' | 'xl+'
  | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | '10xl' | '11xl'

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
  | 'current' | 'inherit'

export type ShadowToken = 'none' | 'sm' | 'DEFAULT' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'
export type RadiusToken = 'none' | 'sm' | 'DEFAULT' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
export type FontSizeToken = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
export type FontWeightToken = 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
export type DisplayToken = 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'hidden' | 'none' | 'contents' | 'table' | 'table-row' | 'table-cell'
export type PositionToken = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
export type OverflowToken = 'auto' | 'hidden' | 'visible' | 'scroll' | 'clip'
export type FlexDirectionToken = 'row' | 'row-reverse' | 'col' | 'col-reverse'
export type AlignToken = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type JustifyToken = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type WrapToken = 'wrap' | 'nowrap' | 'wrap-reverse'
export type TextAlignToken = 'left' | 'center' | 'right' | 'justify'
export type FontFamilyToken = 'sans' | 'serif' | 'mono'
export type SizeToken =
  | 'full' | 'screen' | 'auto' | 'min' | 'max' | 'fit'
  | 'svw' | 'lvw' | 'dvw' | 'svh' | 'lvh' | 'dvh'
  | '0' | 'px' | '0.5' | '1' | '1.5' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
  | '9' | '10' | '11' | '12' | '14' | '16' | '20' | '24' | '28' | '32'
  | '36' | '40' | '44' | '48' | '52' | '56' | '60' | '64' | '72' | '80' | '96'
  | '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5'
export type BorderWidthToken = '0' | '1' | '2' | '4' | '8'
export type OpacityToken = '0' | '5' | '10' | '20' | '25' | '30' | '40' | '50' | '60' | '70' | '75' | '80' | '90' | '95' | '100'
export type LineHeightToken = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
export type LetterSpacingToken = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'
export type TextTransformToken = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'
export type TextDecorationToken = 'underline' | 'overline' | 'line-through' | 'no-underline'
export type TextOverflowToken = 'truncate' | 'ellipsis' | 'clip'
export type WhiteSpaceToken = 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'break-spaces'
export type WordBreakToken = 'normal' | 'words' | 'all' | 'keep'
export type ZIndexToken = '0' | '10' | '20' | '30' | '40' | '50' | 'auto'
export type InsetToken = '0' | 'px' | 'auto' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4'
export type AspectRatioToken = 'auto' | 'square' | 'video'
export type ObjectFitToken = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export type AlignSelfToken = 'auto' | 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type JustifySelfToken = 'auto' | 'start' | 'center' | 'end' | 'stretch'
export type FlexToken = '1' | 'auto' | 'initial' | 'none'
export type OrderToken = 'first' | 'last' | 'none' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
export type GridColsToken = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'none'
export type ColSpanToken = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full'
export type GridRowsToken = '1' | '2' | '3' | '4' | '5' | '6' | 'none'
export type RowSpanToken = '1' | '2' | '3' | '4' | '5' | '6' | 'full'
export type PlaceItemsToken = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type CursorToken = 'auto' | 'default' | 'pointer' | 'wait' | 'text' | 'move' | 'help' | 'not-allowed' | 'none' | 'grab' | 'grabbing'
export type UserSelectToken = 'none' | 'text' | 'all' | 'auto'
export type PointerEventsToken = 'none' | 'auto'
export type TransitionToken = 'none' | 'all' | 'DEFAULT' | 'colors' | 'opacity' | 'shadow' | 'transform'
export type DurationToken = '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000'
export type EaseToken = 'linear' | 'in' | 'out' | 'in-out'
export type BorderStyleToken = 'solid' | 'dashed' | 'dotted' | 'double' | 'hidden' | 'none'

// ── Spacing lookup ───────────────────────────────────────────────────

/** Maps semantic token → Tailwind numeric suffix */
const spacingSuffix: Record<SpacingToken, string> = {
  '0': '0',
  'px': 'px',
  '3xs': '0.5',
  '2xs': '1',
  'xs': '1.5',
  'sm': '2',
  'sm+': '3',
  'md': '4',
  'md+': '5',
  'lg': '6',
  'lg+': '7',
  'xl': '8',
  'xl+': '10',
  '2xl': '12',
  '3xl': '16',
  '4xl': '20',
  '5xl': '24',
  '6xl': '32',
  '7xl': '40',
  '8xl': '48',
  '9xl': '64',
  '10xl': '80',
  '11xl': '96',
}

/** Builds a Tailwind spacing class, e.g. ('p', 'md') → 'p-4' */
function spacingClass(prefix: string, token: SpacingToken): string {
  return `${prefix}-${spacingSuffix[token]}`
}

// ── Helper functions ─────────────────────────────────────────────────

/** Builds a color class with a prefix, e.g. ('bg', 'primary') → 'bg-primary' */
function colorClass(prefix: string, token: ColorToken): string {
  return `${prefix}-${token}`
}

/** Builds a size class with a prefix, e.g. ('w', 'full') → 'w-full' */
function sizeClass(prefix: string, token: SizeToken): string {
  return `${prefix}-${token}`
}

/** Builds an overflow class, e.g. ('overflow', 'hidden') → 'overflow-hidden' */
function overflowClass(prefix: string, token: OverflowToken): string {
  return `${prefix}-${token}`
}

// ── Lookup maps ──────────────────────────────────────────────────────

const displayMap: Record<DisplayToken, string> = {
  'block': 'block', 'inline-block': 'inline-block', 'inline': 'inline',
  'flex': 'flex', 'inline-flex': 'inline-flex', 'grid': 'grid', 'inline-grid': 'inline-grid',
  'hidden': 'hidden', 'none': 'hidden', 'contents': 'contents',
  'table': 'table', 'table-row': 'table-row', 'table-cell': 'table-cell',
}

const positionMap: Record<PositionToken, string> = {
  'static': 'static', 'relative': 'relative', 'absolute': 'absolute',
  'fixed': 'fixed', 'sticky': 'sticky',
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

const growMap: Record<string, string> = { '0': 'grow-0', '1': 'grow' }
const shrinkMap: Record<string, string> = { '0': 'shrink-0', '1': 'shrink' }

const shadowMap: Record<ShadowToken, string> = {
  'none': 'shadow-none', 'sm': 'shadow-sm', 'DEFAULT': 'shadow', 'md': 'shadow-md',
  'lg': 'shadow-lg', 'xl': 'shadow-xl', '2xl': 'shadow-2xl', 'inner': 'shadow-inner',
}

const roundedMap: Record<RadiusToken, string> = {
  'none': 'rounded-none', 'sm': 'rounded-sm', 'DEFAULT': 'rounded', 'md': 'rounded-md',
  'lg': 'rounded-lg', 'xl': 'rounded-xl', '2xl': 'rounded-2xl', '3xl': 'rounded-3xl', 'full': 'rounded-full',
}

const borderWidthMap: Record<BorderWidthToken, string> = {
  '0': 'border-0', '1': 'border', '2': 'border-2', '4': 'border-4', '8': 'border-8',
}

const borderStyleMap: Record<BorderStyleToken, string> = {
  'solid': 'border-solid', 'dashed': 'border-dashed', 'dotted': 'border-dotted',
  'double': 'border-double', 'hidden': 'border-hidden', 'none': 'border-none',
}

const opacityMap: Record<OpacityToken, string> = {
  '0': 'opacity-0', '5': 'opacity-5', '10': 'opacity-10',
  '20': 'opacity-20', '25': 'opacity-25', '30': 'opacity-30',
  '40': 'opacity-40', '50': 'opacity-50', '60': 'opacity-60',
  '70': 'opacity-70', '75': 'opacity-75', '80': 'opacity-80',
  '90': 'opacity-90', '95': 'opacity-95', '100': 'opacity-100',
}

const fontSizeMap: Record<FontSizeToken, string> = {
  'xs': 'text-xs', 'sm': 'text-sm', 'base': 'text-base', 'lg': 'text-lg',
  'xl': 'text-xl', '2xl': 'text-2xl', '3xl': 'text-3xl', '4xl': 'text-4xl',
  '5xl': 'text-5xl', '6xl': 'text-6xl', '7xl': 'text-7xl', '8xl': 'text-8xl', '9xl': 'text-9xl',
}

const fontWeightMap: Record<FontWeightToken, string> = {
  'thin': 'font-thin', 'extralight': 'font-extralight', 'light': 'font-light',
  'normal': 'font-normal', 'medium': 'font-medium', 'semibold': 'font-semibold',
  'bold': 'font-bold', 'extrabold': 'font-extrabold', 'black': 'font-black',
}

const fontFamilyMap: Record<FontFamilyToken, string> = {
  'sans': 'font-sans', 'serif': 'font-serif', 'mono': 'font-mono',
}

const textAlignMap: Record<TextAlignToken, string> = {
  'left': 'text-left', 'center': 'text-center', 'right': 'text-right', 'justify': 'text-justify',
}

const lineHeightMap: Record<LineHeightToken, string> = {
  'none': 'leading-none', 'tight': 'leading-tight', 'snug': 'leading-snug',
  'normal': 'leading-normal', 'relaxed': 'leading-relaxed', 'loose': 'leading-loose',
  '3': 'leading-3', '4': 'leading-4', '5': 'leading-5', '6': 'leading-6',
  '7': 'leading-7', '8': 'leading-8', '9': 'leading-9', '10': 'leading-10',
}

const letterSpacingMap: Record<LetterSpacingToken, string> = {
  'tighter': 'tracking-tighter', 'tight': 'tracking-tight', 'normal': 'tracking-normal',
  'wide': 'tracking-wide', 'wider': 'tracking-wider', 'widest': 'tracking-widest',
}

const textTransformMap: Record<TextTransformToken, string> = {
  'uppercase': 'uppercase', 'lowercase': 'lowercase', 'capitalize': 'capitalize', 'normal-case': 'normal-case',
}

const textDecorationMap: Record<TextDecorationToken, string> = {
  'underline': 'underline', 'overline': 'overline', 'line-through': 'line-through', 'no-underline': 'no-underline',
}

const textOverflowMap: Record<TextOverflowToken, string> = {
  'truncate': 'truncate', 'ellipsis': 'text-ellipsis', 'clip': 'text-clip',
}

const whiteSpaceMap: Record<WhiteSpaceToken, string> = {
  'normal': 'whitespace-normal', 'nowrap': 'whitespace-nowrap', 'pre': 'whitespace-pre',
  'pre-line': 'whitespace-pre-line', 'pre-wrap': 'whitespace-pre-wrap', 'break-spaces': 'whitespace-break-spaces',
}

const wordBreakMap: Record<WordBreakToken, string> = {
  'normal': 'break-normal', 'words': 'break-words', 'all': 'break-all', 'keep': 'break-keep',
}

const zIndexMap: Record<ZIndexToken, string> = {
  '0': 'z-0', '10': 'z-10', '20': 'z-20', '30': 'z-30', '40': 'z-40', '50': 'z-50', 'auto': 'z-auto',
}

const insetMap: Record<InsetToken, string> = {
  '0': '0', 'px': 'px', 'auto': 'auto', 'full': 'full', '1/2': '1/2', '1/3': '1/3', '2/3': '2/3', '1/4': '1/4', '3/4': '3/4',
}

function insetClass(prefix: string, token: InsetToken): string {
  return `${prefix}-${insetMap[token]}`
}

const aspectRatioMap: Record<AspectRatioToken, string> = {
  'auto': 'aspect-auto', 'square': 'aspect-square', 'video': 'aspect-video',
}

const objectFitMap: Record<ObjectFitToken, string> = {
  'contain': 'object-contain', 'cover': 'object-cover', 'fill': 'object-fill',
  'none': 'object-none', 'scale-down': 'object-scale-down',
}

const alignSelfMap: Record<AlignSelfToken, string> = {
  'auto': 'self-auto', 'start': 'self-start', 'center': 'self-center',
  'end': 'self-end', 'stretch': 'self-stretch', 'baseline': 'self-baseline',
}

const justifySelfMap: Record<JustifySelfToken, string> = {
  'auto': 'justify-self-auto', 'start': 'justify-self-start', 'center': 'justify-self-center',
  'end': 'justify-self-end', 'stretch': 'justify-self-stretch',
}

const flexMap: Record<FlexToken, string> = {
  '1': 'flex-1', 'auto': 'flex-auto', 'initial': 'flex-initial', 'none': 'flex-none',
}

const orderMap: Record<OrderToken, string> = {
  'first': 'order-first', 'last': 'order-last', 'none': 'order-none',
  '1': 'order-1', '2': 'order-2', '3': 'order-3', '4': 'order-4',
  '5': 'order-5', '6': 'order-6', '7': 'order-7', '8': 'order-8',
  '9': 'order-9', '10': 'order-10', '11': 'order-11', '12': 'order-12',
}

const gridColsMap: Record<GridColsToken, string> = {
  '1': 'grid-cols-1', '2': 'grid-cols-2', '3': 'grid-cols-3', '4': 'grid-cols-4',
  '5': 'grid-cols-5', '6': 'grid-cols-6', '7': 'grid-cols-7', '8': 'grid-cols-8',
  '9': 'grid-cols-9', '10': 'grid-cols-10', '11': 'grid-cols-11', '12': 'grid-cols-12',
  'none': 'grid-cols-none',
}

const colSpanMap: Record<ColSpanToken, string> = {
  '1': 'col-span-1', '2': 'col-span-2', '3': 'col-span-3', '4': 'col-span-4',
  '5': 'col-span-5', '6': 'col-span-6', '7': 'col-span-7', '8': 'col-span-8',
  '9': 'col-span-9', '10': 'col-span-10', '11': 'col-span-11', '12': 'col-span-12',
  'full': 'col-span-full',
}

const gridRowsMap: Record<GridRowsToken, string> = {
  '1': 'grid-rows-1', '2': 'grid-rows-2', '3': 'grid-rows-3',
  '4': 'grid-rows-4', '5': 'grid-rows-5', '6': 'grid-rows-6', 'none': 'grid-rows-none',
}

const rowSpanMap: Record<RowSpanToken, string> = {
  '1': 'row-span-1', '2': 'row-span-2', '3': 'row-span-3',
  '4': 'row-span-4', '5': 'row-span-5', '6': 'row-span-6', 'full': 'row-span-full',
}

const placeItemsMap: Record<PlaceItemsToken, string> = {
  'start': 'place-items-start', 'center': 'place-items-center', 'end': 'place-items-end',
  'stretch': 'place-items-stretch', 'baseline': 'place-items-baseline',
}

const cursorMap: Record<CursorToken, string> = {
  'auto': 'cursor-auto', 'default': 'cursor-default', 'pointer': 'cursor-pointer',
  'wait': 'cursor-wait', 'text': 'cursor-text', 'move': 'cursor-move',
  'help': 'cursor-help', 'not-allowed': 'cursor-not-allowed', 'none': 'cursor-none',
  'grab': 'cursor-grab', 'grabbing': 'cursor-grabbing',
}

const userSelectMap: Record<UserSelectToken, string> = {
  'none': 'select-none', 'text': 'select-text', 'all': 'select-all', 'auto': 'select-auto',
}

const pointerEventsMap: Record<PointerEventsToken, string> = {
  'none': 'pointer-events-none', 'auto': 'pointer-events-auto',
}

const transitionMap: Record<TransitionToken, string> = {
  'none': 'transition-none', 'all': 'transition-all', 'DEFAULT': 'transition',
  'colors': 'transition-colors', 'opacity': 'transition-opacity',
  'shadow': 'transition-shadow', 'transform': 'transition-transform',
}

const durationMap: Record<DurationToken, string> = {
  '75': 'duration-75', '100': 'duration-100', '150': 'duration-150', '200': 'duration-200',
  '300': 'duration-300', '500': 'duration-500', '700': 'duration-700', '1000': 'duration-1000',
}

const easeMap: Record<EaseToken, string> = {
  'linear': 'ease-linear', 'in': 'ease-in', 'out': 'ease-out', 'in-out': 'ease-in-out',
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
  gapX?: SpacingToken
  gapY?: SpacingToken
  // Colors
  bg?: ColorToken
  color?: ColorToken
  borderColor?: ColorToken
  // Layout
  display?: DisplayToken
  position?: PositionToken
  overflow?: OverflowToken
  overflowX?: OverflowToken
  overflowY?: OverflowToken
  w?: SizeToken
  h?: SizeToken
  minW?: SizeToken
  minH?: SizeToken
  maxW?: SizeToken
  maxH?: SizeToken
  zIndex?: ZIndexToken
  top?: InsetToken
  right?: InsetToken
  bottom?: InsetToken
  left?: InsetToken
  inset?: InsetToken
  insetX?: InsetToken
  insetY?: InsetToken
  aspectRatio?: AspectRatioToken
  objectFit?: ObjectFitToken
  // Flex
  direction?: FlexDirectionToken
  align?: AlignToken
  justify?: JustifyToken
  wrap?: WrapToken
  grow?: '0' | '1'
  shrink?: '0' | '1'
  alignSelf?: AlignSelfToken
  justifySelf?: JustifySelfToken
  flex?: FlexToken
  order?: OrderToken
  // Grid
  gridCols?: GridColsToken
  colSpan?: ColSpanToken
  gridRows?: GridRowsToken
  rowSpan?: RowSpanToken
  placeItems?: PlaceItemsToken
  // Visual
  shadow?: ShadowToken
  rounded?: RadiusToken
  borderWidth?: BorderWidthToken
  borderStyle?: BorderStyleToken
  opacity?: OpacityToken
  // Typography
  fontSize?: FontSizeToken
  fontWeight?: FontWeightToken
  fontFamily?: FontFamilyToken
  textAlign?: TextAlignToken
  lineHeight?: LineHeightToken
  letterSpacing?: LetterSpacingToken
  textTransform?: TextTransformToken
  textDecoration?: TextDecorationToken
  textOverflow?: TextOverflowToken
  whiteSpace?: WhiteSpaceToken
  wordBreak?: WordBreakToken
  // Interactivity
  cursor?: CursorToken
  userSelect?: UserSelectToken
  pointerEvents?: PointerEventsToken
  // Transitions
  transition?: TransitionToken
  duration?: DurationToken
  ease?: EaseToken
}

// ── All style prop keys (for splitting) ──────────────────────────────

const STYLE_PROP_KEYS = new Set<string>([
  'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
  'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml',
  'gap', 'gapX', 'gapY',
  'bg', 'color', 'borderColor',
  'display', 'position', 'overflow', 'overflowX', 'overflowY',
  'w', 'h', 'minW', 'minH', 'maxW', 'maxH',
  'zIndex', 'top', 'right', 'bottom', 'left', 'inset', 'insetX', 'insetY',
  'aspectRatio', 'objectFit',
  'direction', 'align', 'justify', 'wrap', 'grow', 'shrink',
  'alignSelf', 'justifySelf', 'flex', 'order',
  'gridCols', 'colSpan', 'gridRows', 'rowSpan', 'placeItems',
  'shadow', 'rounded', 'borderWidth', 'borderStyle', 'opacity',
  'fontSize', 'fontWeight', 'fontFamily', 'textAlign',
  'lineHeight', 'letterSpacing', 'textTransform', 'textDecoration',
  'textOverflow', 'whiteSpace', 'wordBreak',
  'cursor', 'userSelect', 'pointerEvents',
  'transition', 'duration', 'ease',
])

// ── buildStyleClasses ────────────────────────────────────────────────

export function buildStyleClasses(props: Partial<StyleProps>): string {
  const classes: string[] = []

  // Spacing — padding
  if (props.p != null) classes.push(spacingClass('p', props.p))
  if (props.px != null) classes.push(spacingClass('px', props.px))
  if (props.py != null) classes.push(spacingClass('py', props.py))
  if (props.pt != null) classes.push(spacingClass('pt', props.pt))
  if (props.pr != null) classes.push(spacingClass('pr', props.pr))
  if (props.pb != null) classes.push(spacingClass('pb', props.pb))
  if (props.pl != null) classes.push(spacingClass('pl', props.pl))

  // Spacing — margin
  if (props.m != null) classes.push(spacingClass('m', props.m))
  if (props.mx != null) classes.push(spacingClass('mx', props.mx))
  if (props.my != null) classes.push(spacingClass('my', props.my))
  if (props.mt != null) classes.push(spacingClass('mt', props.mt))
  if (props.mr != null) classes.push(spacingClass('mr', props.mr))
  if (props.mb != null) classes.push(spacingClass('mb', props.mb))
  if (props.ml != null) classes.push(spacingClass('ml', props.ml))

  // Spacing — gap
  if (props.gap != null) classes.push(spacingClass('gap', props.gap))
  if (props.gapX != null) classes.push(spacingClass('gap-x', props.gapX))
  if (props.gapY != null) classes.push(spacingClass('gap-y', props.gapY))

  // Colors
  if (props.bg != null) classes.push(colorClass('bg', props.bg))
  if (props.color != null) classes.push(colorClass('text', props.color))
  if (props.borderColor != null) classes.push(colorClass('border', props.borderColor))

  // Layout
  if (props.display != null) classes.push(displayMap[props.display])
  if (props.position != null) classes.push(positionMap[props.position])
  if (props.overflow != null) classes.push(overflowClass('overflow', props.overflow))
  if (props.overflowX != null) classes.push(overflowClass('overflow-x', props.overflowX))
  if (props.overflowY != null) classes.push(overflowClass('overflow-y', props.overflowY))
  if (props.w != null) classes.push(sizeClass('w', props.w))
  if (props.h != null) classes.push(sizeClass('h', props.h))
  if (props.minW != null) classes.push(sizeClass('min-w', props.minW))
  if (props.minH != null) classes.push(sizeClass('min-h', props.minH))
  if (props.maxW != null) classes.push(sizeClass('max-w', props.maxW))
  if (props.maxH != null) classes.push(sizeClass('max-h', props.maxH))
  if (props.zIndex != null) classes.push(zIndexMap[props.zIndex])
  if (props.top != null) classes.push(insetClass('top', props.top))
  if (props.right != null) classes.push(insetClass('right', props.right))
  if (props.bottom != null) classes.push(insetClass('bottom', props.bottom))
  if (props.left != null) classes.push(insetClass('left', props.left))
  if (props.inset != null) classes.push(insetClass('inset', props.inset))
  if (props.insetX != null) classes.push(insetClass('inset-x', props.insetX))
  if (props.insetY != null) classes.push(insetClass('inset-y', props.insetY))
  if (props.aspectRatio != null) classes.push(aspectRatioMap[props.aspectRatio])
  if (props.objectFit != null) classes.push(objectFitMap[props.objectFit])

  // Flex
  if (props.direction != null) classes.push(directionMap[props.direction])
  if (props.align != null) classes.push(alignMap[props.align])
  if (props.justify != null) classes.push(justifyMap[props.justify])
  if (props.wrap != null) classes.push(wrapMap[props.wrap])
  if (props.grow != null) classes.push(growMap[props.grow])
  if (props.shrink != null) classes.push(shrinkMap[props.shrink])
  if (props.alignSelf != null) classes.push(alignSelfMap[props.alignSelf])
  if (props.justifySelf != null) classes.push(justifySelfMap[props.justifySelf])
  if (props.flex != null) classes.push(flexMap[props.flex])
  if (props.order != null) classes.push(orderMap[props.order])

  // Grid
  if (props.gridCols != null) classes.push(gridColsMap[props.gridCols])
  if (props.colSpan != null) classes.push(colSpanMap[props.colSpan])
  if (props.gridRows != null) classes.push(gridRowsMap[props.gridRows])
  if (props.rowSpan != null) classes.push(rowSpanMap[props.rowSpan])
  if (props.placeItems != null) classes.push(placeItemsMap[props.placeItems])

  // Visual
  if (props.shadow != null) classes.push(shadowMap[props.shadow])
  if (props.rounded != null) classes.push(roundedMap[props.rounded])
  if (props.borderWidth != null) classes.push(borderWidthMap[props.borderWidth])
  if (props.borderStyle != null) classes.push(borderStyleMap[props.borderStyle])
  if (props.opacity != null) classes.push(opacityMap[props.opacity])

  // Typography
  if (props.fontSize != null) classes.push(fontSizeMap[props.fontSize])
  if (props.fontWeight != null) classes.push(fontWeightMap[props.fontWeight])
  if (props.fontFamily != null) classes.push(fontFamilyMap[props.fontFamily])
  if (props.textAlign != null) classes.push(textAlignMap[props.textAlign])
  if (props.lineHeight != null) classes.push(lineHeightMap[props.lineHeight])
  if (props.letterSpacing != null) classes.push(letterSpacingMap[props.letterSpacing])
  if (props.textTransform != null) classes.push(textTransformMap[props.textTransform])
  if (props.textDecoration != null) classes.push(textDecorationMap[props.textDecoration])
  if (props.textOverflow != null) classes.push(textOverflowMap[props.textOverflow])
  if (props.whiteSpace != null) classes.push(whiteSpaceMap[props.whiteSpace])
  if (props.wordBreak != null) classes.push(wordBreakMap[props.wordBreak])

  // Interactivity
  if (props.cursor != null) classes.push(cursorMap[props.cursor])
  if (props.userSelect != null) classes.push(userSelectMap[props.userSelect])
  if (props.pointerEvents != null) classes.push(pointerEventsMap[props.pointerEvents])

  // Transitions
  if (props.transition != null) classes.push(transitionMap[props.transition])
  if (props.duration != null) classes.push(durationMap[props.duration])
  if (props.ease != null) classes.push(easeMap[props.ease])

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
