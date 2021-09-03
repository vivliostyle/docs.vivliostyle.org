# Supported CSS Features

Vivliostyle currently supports the following CSS [values](#values), [selectors](#selectors), [at-rules](#at-rules), [media queries](#media-queries), and [properties](#properties):

## Values

- [Supported CSS-wide keywords](https://www.w3.org/TR/css-values/#common-keywords): `inherit`
  - `initial` and `unset` are _not_ supported.
- [Supported length units](https://www.w3.org/TR/css-values/#lengths): `em`, `ex`, `ch`, `rem`, `vw`, `vh`, `vmin, vmax`, `vi`, `vb`, `cm`, `mm`, `q`, `in`, `pc`, `pt`, `px`.
- Supported color values
  - [Basic color keywords](https://www.w3.org/TR/css3-color/#html4)
  - [RGB color values](https://www.w3.org/TR/css3-color/#rgb-color), [RGBA color values](https://www.w3.org/TR/css3-color/#rgba-color)
  - [‘transparent’ color keyword](https://www.w3.org/TR/css3-color/#transparent)
  - [HSL color values](https://www.w3.org/TR/css3-color/#hsl-color), [HSLA color values](https://www.w3.org/TR/css3-color/#hsla-color)
  - [Extended color keywords](https://www.w3.org/TR/css3-color/#svg-color)
  - [‘currentColor’ color keyword](https://www.w3.org/TR/css3-color/#currentcolor)
- [Attribute references: `attr()`](https://www.w3.org/TR/css-values/#attr-notation)
  - Only supported in values of `content` property.
  - Only 'string' and 'url' types are supported.
- [Cross references: `target-counter()` and `target-counters()`](https://drafts.csswg.org/css-content/#cross-references)
  - Only supported in values of `content` property.
- [`calc()` function](https://www.w3.org/TR/css-values/#funcdef-calc)
  - `min()` and `max()` functions can be used inside `calc()` function.
  - Limitation: Percentage value in `calc()` is not calculated correctly.
- [`content()` function](https://www.w3.org/TR/css-gcpm-3/#content-function-header)
- [`string()` function (Named Strings)](https://www.w3.org/TR/css-gcpm-3/#using-named-strings)
- [`env()` function](https://drafts.csswg.org/css-env/)
  - Implemented only `env(pub-title)` and `env(doc-title)` that are not yet defined in the css-env draft spec but useful for making page header.
    - `env(pub-title)`: publication title = EPUB, Web publication, or primary entry page HTML title.
    - `env(doc-title)`: document title = HTML title, which may be chapter or section title in a publication composed of multiple HTML documents

## Selectors

### [CSS 2](https://www.w3.org/TR/CSS2/)

- [Universal selector `*`](https://www.w3.org/TR/CSS2/selector.html#universal-selector)
- [Type selectors `E`](https://www.w3.org/TR/CSS2/selector.html#type-selectors)
- [Descendant selectors `E F`](https://www.w3.org/TR/CSS2/selector.html#descendant-selectors)
- [Child selectors `E > F`](https://www.w3.org/TR/CSS2/selector.html#child-selectors)
- [Adjacent sibling selectors `E + F`](https://www.w3.org/TR/CSS2/selector.html#adjacent-selectors)
- [Attribute selectors `E[foo]`, `E[foo="bar"]`, `E[foo~="bar"]`, `E[foo|="bar"]`](https://www.w3.org/TR/CSS2/selector.html#attribute-selectors)
- [Class selectors `E.foo`](https://www.w3.org/TR/CSS2/selector.html#class-html)
- [ID selectors `E#foo`](https://www.w3.org/TR/CSS2/selector.html#id-selectors)
- [`:first-child` pseudo-class](https://www.w3.org/TR/CSS2/selector.html#first-child)
- [Link pseudo-class `E:link`](https://www.w3.org/TR/CSS2/selector.html#link-pseudo-classes)
- [Language pseudo-class `E:lang(c)`](https://www.w3.org/TR/CSS2/selector.html#lang)
- [`:first-line` pseudo-element](https://www.w3.org/TR/CSS2/selector.html#first-line-pseudo)
  - Note: there is a bug when used alone or with the universal selector(`*`). [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/133)
- [`:first-letter` pseudo-element](https://www.w3.org/TR/CSS2/selector.html#first-letter)
  - Note: there is a bug when used alone, with the universal selector(`*`), or with non-ascii characters. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/34)
- [`:before` and `:after` pseudo-elements](https://www.w3.org/TR/CSS2/selector.html#before-and-after)

#### Not supported selectors

- [Link pseudo-class `E:visited`](https://www.w3.org/TR/CSS2/selector.html#link-pseudo-classes)
- [Dynamic pseudo-classes `E:active`, `E:hover`, `E:focus`](https://www.w3.org/TR/CSS2/selector.html#dynamic-pseudo-classes)

### [Selectors 3](https://www.w3.org/TR/css3-selectors/)

- [Type selectors with namespaces `ns|E`, `*|E`](https://www.w3.org/TR/css3-selectors/#typenmsp)
- [Universal selector with namespaces `ns|*`, `*|*`](https://www.w3.org/TR/css3-selectors/#univnmsp)
- [Substring matching attribute selectors `[att^=val]`, `[att$=val]`, `[att*=val]`](https://www.w3.org/TR/css3-selectors/#attribute-substrings)
- [Attribute selectors with namespaces `[ns|att]`, `[|att]`, `[ns|att=val]`, `[|att=val]`, `[ns|att~=val]`, `[|att~=val]`, `[ns|att|=val]`, `[|att|=val]`, `[ns|att^=val]`, `[|att^=val]`, `[ns|att$=val]`, `[|att$=val]`, `[ns|att*=val]`, `[|att*=val]`](https://www.w3.org/TR/css3-selectors/#attrnmsp)
- [The UI element states pseudo-classes `:enabled`, `:disabled`, `:checked`, `:indeterminate`](https://www.w3.org/TR/css3-selectors/#UIstates)
  - Note that the current implementation can use only initial states of those UI elements. Even if the actual state of the element is toggled by user interaction, the style does not change.
- [`:root` pseudo-class](https://www.w3.org/TR/css3-selectors/#root-pseudo)
- [`:nth-child()` pseudo-class](https://www.w3.org/TR/css3-selectors/#nth-child-pseudo)
- [`:nth-last-child()` pseudo-class](https://www.w3.org/TR/css3-selectors/#nth-last-child-pseudo)
- [`:nth-of-type()` pseudo-class](https://www.w3.org/TR/css3-selectors/#nth-of-type-pseudo)
- [`:nth-last-of-type()` pseudo-class](https://www.w3.org/TR/css3-selectors/#nth-last-of-type-pseudo)
- [`:first-child` pseudo-class](https://www.w3.org/TR/css3-selectors/#first-child-pseudo)
- [`:last-child` pseudo-class](https://www.w3.org/TR/css3-selectors/#last-child-pseudo)
- [`:first-of-type` pseudo-class](https://www.w3.org/TR/css3-selectors/#first-of-type-pseudo)
- [`:last-of-type` pseudo-class](https://www.w3.org/TR/css3-selectors/#last-of-type-pseudo)
- [`:only-child` pseudo-class](https://www.w3.org/TR/css3-selectors/#only-child-pseudo)
- [`:only-of-type` pseudo-class](https://www.w3.org/TR/css3-selectors/#only-of-type-pseudo)
- [`:empty` pseudo-class](https://www.w3.org/TR/css3-selectors/#empty-pseudo)
- [`:not()` pseudo-class](https://www.w3.org/TR/css3-selectors/#negation)
- [`::first-line` pseudo-element](https://www.w3.org/TR/css3-selectors/#first-line)
  - Note: there is a bug when used alone or with the universal selector(`*`). [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/133)
- [`::first-letter` pseudo-element](https://www.w3.org/TR/css3-selectors/#first-letter)
  - Note: there is a bug when used alone, with the universal selector(`*`), or with non-ascii characters. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/34)
- [`::before` and `::after` pseudo-elements](https://www.w3.org/TR/css3-selectors/#gen-content)
- [General sibling combinator `E ~ F`](https://www.w3.org/TR/css3-selectors/#general-sibling-combinators)

### [CSS Overflow 4](https://drafts.csswg.org/css-overflow-4/)

- [`:nth-fragment()` pseudo-element](https://drafts.csswg.org/css-overflow-4/#fragment-pseudo-element)

#### Not supported selectors

- [Type selectors without namespaces `|E`](https://www.w3.org/TR/css3-selectors/#typenmsp)
- [Universal selector without namespaces `|*`](https://www.w3.org/TR/css3-selectors/#univnmsp)
- [Attribute selectors with universal namespace `[*|att]`, `[*|att=val]`, `[*|att~=val]`, `[*|att|=val]`](https://www.w3.org/TR/css3-selectors/#attrnmsp)
- [Target pseudo-class `:target`](https://www.w3.org/TR/css3-selectors/#target-pseudo)

## At-rules

### [CSS 2](https://www.w3.org/TR/CSS2/)

- [@charset](https://www.w3.org/TR/CSS2/syndata.html#charset)
- [@import](https://www.w3.org/TR/CSS2/cascade.html#at-import)
  - [Also in CSS Cascading and Inheritance 3](https://www.w3.org/TR/css-cascade-3/#at-import)

### [CSS Namespaces 3](https://www.w3.org/TR/css3-namespace/)

- [@namespace](https://www.w3.org/TR/css3-namespace/#declaration)

### [CSS Conditional Rules 3](https://www.w3.org/TR/css3-conditional/)

- [@media](https://www.w3.org/TR/css3-conditional/#atmedia-rule)

### [CSS Paged Media 3](https://drafts.csswg.org/css-page-3/)

- [@page](https://drafts.csswg.org/css-page-3/#at-page-rule)
- [Page-margin boxes (@top-left-corner, @top-left, @top-center, @top-right, @top-right-corner, @left-top, @left-middle, @left-bottom, @right-top, @right-middle, @right-bottom, @bottom-left-corner, @bottom-left, @bottom-center, @bottom-right, @bottom-right-coner)](https://drafts.csswg.org/css-page-3/#margin-at-rules)
- [Page selectors](https://drafts.csswg.org/css-page-3/#page-selectors)
  - [:left, :right](https://drafts.csswg.org/css-page-3/#spread-pseudos)
  - [:recto, :verso](https://drafts.csswg.org/css-logical-props/#logical-page)
  - [:first](https://drafts.csswg.org/css-page-3/#first-pseudo)
    - Note: In multi-document publications, the `:first` matches only the first page of the first document, and the `:nth(1)` matches the first page of each document. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/667#issuecomment-738020563)
  - [:blank](https://drafts.csswg.org/css-page-3/#blank-pseudo)
- [Named pages (page type selector)](https://drafts.csswg.org/css-page-3/#page-type-selector)
- [Page-based counters (page, pages)](https://drafts.csswg.org/css-page-3/#page-based-counters)

See also: [Properties in CSS Paged Media 3](#css-paged-media-3-2)

### [CSS Generated Content for Paged Media (GCPM) 3](https://www.w3.org/TR/css-gcpm-3/)

- [Nth page selector :nth(An+B)](https://www.w3.org/TR/css-gcpm-3/#document-page-selectors)
  - The `:nth(An+B)` syntax is supported but the `:nth(An+B of <custom-ident>)` is not yet supported.
  - Note: In multi-document publications, the `:nth(1)` matches the first page of each document, but the `:first` matches only the first page of the first document. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/667#issuecomment-738020563)

See also:
- [Properties in CSS Generated Content for Paged Media (GCPM) 3](#css-generated-content-for-paged-media-gcpm-3-2)
- [Values - Cross references, content(), and string() functions](#values)

### [CSS Fonts 3](https://www.w3.org/TR/css-fonts-3/)

- [@font-face](https://www.w3.org/TR/css-fonts-3/#font-face-rule)
  - Note: `font-stretch`, `unicode-range` and `font-feature-settings` descriptors are currently ignored.

See also: [Properties in CSS Fonts 3](#css-fonts-3-2)

## Media queries

- Vivliostyle uses styles specified for [`print` media](https://www.w3.org/TR/CSS2/media.html#media-types) (as well as `all`).
  - Vivliostyle specific media type `vivliostyle` is enabled in addition to `print` media.
- Supported media features
  - [`(min-|max-)width`](https://www.w3.org/TR/css3-mediaqueries/#width)
  - [`(min-|max-)height`](https://www.w3.org/TR/css3-mediaqueries/#height)
  - [`(min-|max-)device-width`](https://www.w3.org/TR/css3-mediaqueries/#device-width)
  - [`(min-|max-)device-height`](https://www.w3.org/TR/css3-mediaqueries/#device-height)
  - [`(min-|max-)color`](https://www.w3.org/TR/css3-mediaqueries/#color)

## Properties

## [CSS 2](https://www.w3.org/TR/CSS2/)

- [background](https://www.w3.org/TR/CSS2/colors.html#propdef-background)
  - Supports [CSS Backgrounds 3 syntax](https://www.w3.org/TR/css3-background/#background)
- [background-attachment](https://www.w3.org/TR/CSS2/colors.html#propdef-background-attachment)
  - Supports [CSS Backgrounds 3 syntax](https://www.w3.org/TR/css3-background/#background-attachment)
  - Note: behavior when used within `@page` rules is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/22)
- [background-color](https://www.w3.org/TR/CSS2/colors.html#propdef-background-color)
  - Supports [CSS Backgrounds 3 syntax](https://www.w3.org/TR/css3-background/#background-color)
- [background-image](https://www.w3.org/TR/CSS2/colors.html#propdef-background-image)
  - Supports [CSS Backgrounds 3 syntax](https://www.w3.org/TR/css3-background/#background-image)
  - Note: behavior when used within `@page` rules is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/22)
- [background-position](https://www.w3.org/TR/CSS2/colors.html#propdef-background-position)
  - Supports [CSS Backgrounds 3 syntax](https://www.w3.org/TR/css3-background/#background-position)
  - Note: behavior when used within `@page` rules is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/22)
- [background-repeat](https://www.w3.org/TR/CSS2/colors.html#propdef-background-repeat)
  - Supports [CSS Backgrounds 3 syntax](https://www.w3.org/TR/css3-background/#background-repeat)
  - Note: behavior when used within `@page` rules is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/22)
- [border](https://www.w3.org/TR/CSS2/box.html#propdef-border)
- [border-bottom](https://www.w3.org/TR/CSS2/box.html#propdef-border-bottom)
- [border-bottom-color](https://www.w3.org/TR/CSS2/box.html#propdef-border-bottom-color)
- [border-bottom-style](https://www.w3.org/TR/CSS2/box.html#propdef-border-bottom-style)
- [border-bottom-width](https://www.w3.org/TR/CSS2/box.html#propdef-border-bottom-width)
- [border-collapse](https://www.w3.org/TR/CSS2/tables.html#propdef-border-collapse)
- [border-color](https://www.w3.org/TR/CSS2/box.html#propdef-border-color)
- [border-left](https://www.w3.org/TR/CSS2/box.html#propdef-border-left)
- [border-left-color](https://www.w3.org/TR/CSS2/box.html#propdef-border-left-color)
- [border-left-style](https://www.w3.org/TR/CSS2/box.html#propdef-border-left-style)
- [border-left-width](https://www.w3.org/TR/CSS2/box.html#propdef-border-left-width)
- [border-right](https://www.w3.org/TR/CSS2/box.html#propdef-border-right)
- [border-right-color](https://www.w3.org/TR/CSS2/box.html#propdef-border-right-color)
- [border-right-style](https://www.w3.org/TR/CSS2/box.html#propdef-border-right-style)
- [border-right-width](https://www.w3.org/TR/CSS2/box.html#propdef-border-right-width)
- [border-spacing](https://www.w3.org/TR/CSS2/tables.html#propdef-border-spacing)
- [border-style](https://www.w3.org/TR/CSS2/box.html#propdef-border-style)
- [border-top](https://www.w3.org/TR/CSS2/box.html#propdef-border-top)
- [border-top-color](https://www.w3.org/TR/CSS2/box.html#propdef-border-top-color)
- [border-top-style](https://www.w3.org/TR/CSS2/box.html#propdef-border-top-style)
- [border-top-width](https://www.w3.org/TR/CSS2/box.html#propdef-border-top-width)
- [border-width](https://www.w3.org/TR/CSS2/box.html#propdef-border-width)
- [bottom](https://www.w3.org/TR/CSS2/visuren.html#propdef-bottom)
- [caption-side](https://www.w3.org/TR/CSS2/tables.html#propdef-caption-side)
- [clear](https://www.w3.org/TR/CSS2/visuren.html#propdef-clear)
- [clip](https://www.w3.org/TR/CSS2/visufx.html#propdef-clip)
- [color](https://www.w3.org/TR/CSS2/colors.html#propdef-color)
- [content](https://www.w3.org/TR/CSS2/generate.html#propdef-content)
- [counter-increment](https://www.w3.org/TR/CSS2/generate.html#propdef-counter-increment)
- [counter-reset](https://www.w3.org/TR/CSS2/generate.html#propdef-counter-reset)
- [counter-set](https://drafts.csswg.org/css-lists-3/#propdef-counter-set)
- [cursor](https://www.w3.org/TR/CSS2/ui.html#propdef-cursor)
- [direction](https://www.w3.org/TR/CSS2/visuren.html#propdef-direction)
- [display](https://www.w3.org/TR/CSS2/visuren.html#propdef-display)
  - Supports [`flex`, `inline-flex`](https://www.w3.org/TR/css-flexbox-1/#flex-containers), [`ruby`, `ruby-base`, `ruby-text`, `ruby-base-container` and `ruby-text-container`](https://www.w3.org/TR/css-ruby-1/#propdef-display) values.
- [empty-cells](https://www.w3.org/TR/CSS2/tables.html#propdef-empty-cells)
- [float](https://www.w3.org/TR/CSS2/visuren.html#propdef-float)
  - Supports [`block-start`, `block-end`, `inline-start`, `inline-end`, `left`, `right`, `top`, `bottom` and `none`](https://drafts.csswg.org/css-page-floats/#propdef-float) values.
- [font](https://www.w3.org/TR/CSS2/fonts.html#propdef-font)
- [font-family](https://www.w3.org/TR/CSS2/fonts.html#propdef-font-family)
- [font-size](https://www.w3.org/TR/CSS2/fonts.html#propdef-font-size)
- [font-style](https://www.w3.org/TR/CSS2/fonts.html#propdef-font-style)
- [font-variant](https://www.w3.org/TR/CSS2/fonts.html#propdef-font-variant)
- [font-weight](https://www.w3.org/TR/CSS2/fonts.html#propdef-font-weight)
- [height](https://www.w3.org/TR/CSS2/visudet.html#propdef-height)
- [left](https://www.w3.org/TR/CSS2/visuren.html#propdef-left)
- [letter-spacing](https://www.w3.org/TR/CSS2/text.html#propdef-letter-spacing)
- [line-height](https://www.w3.org/TR/CSS2/visudet.html#propdef-line-height)
- [list-style](https://www.w3.org/TR/CSS2/generate.html#propdef-list-style)
- [list-style-image](https://www.w3.org/TR/CSS2/generate.html#propdef-list-style-image)
- [list-style-position](https://www.w3.org/TR/CSS2/generate.html#propdef-list-style-position)
- [list-style-type](https://www.w3.org/TR/CSS2/generate.html#propdef-list-style-type)
- [margin](https://www.w3.org/TR/CSS2/box.html#propdef-margin)
- [margin-bottom](https://www.w3.org/TR/CSS2/box.html#propdef-margin-bottom)
- [margin-left](https://www.w3.org/TR/CSS2/box.html#propdef-margin-left)
- [margin-right](https://www.w3.org/TR/CSS2/box.html#propdef-margin-right)
- [margin-top](https://www.w3.org/TR/CSS2/box.html#propdef-margin-top)
- [max-height](https://www.w3.org/TR/CSS2/visudet.html#propdef-max-height)
- [max-width](https://www.w3.org/TR/CSS2/visudet.html#propdef-max-width)
- [min-height](https://www.w3.org/TR/CSS2/visudet.html#propdef-min-height)
- [min-width](https://www.w3.org/TR/CSS2/visudet.html#propdef-min-width)
- [orphans](https://www.w3.org/TR/CSS2/page.html#propdef-orphans)
- [outline](https://www.w3.org/TR/CSS2/ui.html#propdef-outline)
- [outline-color](https://www.w3.org/TR/CSS2/ui.html#propdef-outline-color)
- [outline-offset](https://www.w3.org/TR/css3-ui/#propdef-outline-offset)
- [outline-style](https://www.w3.org/TR/CSS2/ui.html#propdef-outline-style)
- [outline-width](https://www.w3.org/TR/CSS2/ui.html#propdef-outline-width)
- [overflow](https://www.w3.org/TR/CSS2/visufx.html#propdef-overflow)
- [padding](https://www.w3.org/TR/CSS2/box.html#propdef-padding)
- [padding-bottom](https://www.w3.org/TR/CSS2/box.html#propdef-padding-bottom)
- [padding-left](https://www.w3.org/TR/CSS2/box.html#propdef-padding-left)
- [padding-right](https://www.w3.org/TR/CSS2/box.html#propdef-padding-right)
- [padding-top](https://www.w3.org/TR/CSS2/box.html#propdef-padding-top)
- [page-break-after](https://www.w3.org/TR/CSS2/page.html#propdef-page-break-after)
- [page-break-before](https://www.w3.org/TR/CSS2/page.html#propdef-page-break-before)
- [page-break-inside](https://www.w3.org/TR/CSS2/page.html#propdef-page-break-inside)
- [position](https://www.w3.org/TR/CSS2/visuren.html#propdef-position)
- [quotes](https://www.w3.org/TR/CSS2/generate.html#propdef-quotes)
  - Note: not supported within `@page` rules. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/43)
- [right](https://www.w3.org/TR/CSS2/visuren.html#propdef-right)
- [table-layout](https://www.w3.org/TR/CSS2/tables.html#propdef-table-layout)
- [text-align](https://www.w3.org/TR/CSS2/text.html#propdef-text-align)
- [text-decoration](https://www.w3.org/TR/CSS2/text.html#propdef-text-decoration)
- [text-indent](https://www.w3.org/TR/CSS2/text.html#propdef-text-indent)
- [text-transform](https://www.w3.org/TR/CSS2/text.html#propdef-text-transform)
- [top](https://www.w3.org/TR/CSS2/visuren.html#propdef-top)
- [unicode-bidi](https://www.w3.org/TR/CSS2/visuren.html#propdef-unicode-bidi)
  - Supports [new values (`isolate`, `isolate-override`, `plaintext`) in CSS Writing Modes 3](https://www.w3.org/TR/css-writing-modes-3/#propdef-unicode-bidi)
- [vertical-align](https://www.w3.org/TR/CSS2/visudet.html#propdef-vertical-align)
- [visibility](https://www.w3.org/TR/CSS2/visufx.html#propdef-visibility)
- [white-space](https://www.w3.org/TR/CSS2/text.html#propdef-white-space)
- [widows](https://www.w3.org/TR/CSS2/page.html#propdef-widows)
- [width](https://www.w3.org/TR/CSS2/visudet.html#propdef-width)
- [word-spacing](https://www.w3.org/TR/CSS2/text.html#propdef-word-spacing)
- [z-index](https://www.w3.org/TR/CSS2/visuren.html#propdef-z-index)

## [CSS Paged Media 3](https://drafts.csswg.org/css-page-3/)

- [bleed](https://drafts.csswg.org/css-page-3/#bleed)
  - Only effective when specified within an `@page` rule without page selectors
- [marks](https://drafts.csswg.org/css-page-3/#marks)
  - Only effective when specified within an `@page` rule without page selectors
- [size](https://drafts.csswg.org/css-page-3/#descdef-page-size)
  - Supports all required values and proposed values `A0`-`A10`, `B0`-`B10`, `C0`-`C10` and `JIS-B0`-`JIS-B10`. See [[Pull Request]](https://github.com/vivliostyle/vivliostyle.js/pull/713)
- [page (Named Pages)](https://drafts.csswg.org/css-page-3/#using-named-pages)

See also: [At-rules in CSS Paged Media 3](#css-paged-media-3)

## [CSS Generated Content for Paged Media (GCPM) 3](https://www.w3.org/TR/css-gcpm-3/)

- [string-set (Named Strings)](https://www.w3.org/TR/css-gcpm-3/#setting-named-strings-the-string-set-pro)
- [footnote-policy](https://www.w3.org/TR/css-gcpm-3/#propdef-footnote-policy)
  - Supports [`auto`, `line`](https://www.w3.org/TR/css-gcpm-3/#propdef-footnote-policy) values.

See also:
- [At-rules in CSS Generated Content for Paged Media (GCPM) 3](#css-generated-content-for-paged-media-gcpm-3)
- [Values - Cross references, content(), and string() functions](#values)

## [CSS Fragmentation 3](https://www.w3.org/TR/css3-break/)

- [break-after](https://www.w3.org/TR/css3-break/#propdef-break-after)
- [break-before](https://www.w3.org/TR/css3-break/#propdef-break-before)
- [break-inside](https://www.w3.org/TR/css3-multicol/#break-inside)
  - Note: All of `avoid-page`, `avoid-column` and `avoid-region` values are treated as if they were `avoid`. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/128)
- [orphans](https://www.w3.org/TR/css3-break/#propdef-orphans)
- [widows](https://www.w3.org/TR/css3-break/#propdef-widows)
- [box-decoration-break](https://www.w3.org/TR/css3-break/#propdef-box-decoration-break)
  - Note: Background, box-shadow and border images on inline-start/end borders are always rendered as if `box-decoration-break: clone` is specified.

## [CSS Page Floats 3](https://drafts.csswg.org/css-page-floats-3/)

- [clear](https://drafts.csswg.org/css-page-floats-3/#propdef-clear)
  - Supports [`none`, `left`, `right`, `top`, `bottom`, `both`, `all`, `same`](https://drafts.csswg.org/css-page-floats-3/#propdef-clear) values.
  - When `all` is specified on a block-level box (not a page float), the block-start edge of the box gets pushed down so that the edge comes after any block-start/block-end page float of which anchors are before the box in the document order.
  - When a `clear` value is specified on a page float, it is placed so that it comes after any of preceding page floats.
  - `same` value means the same direction as one which the page float is floated to.
  - If a page float with `float: snap-block` would be placed at the block-start end but a `clear` value on it forbidden such placement, the float is instead placed at the block-end side (unless the `clear` value also forbidden such placement).
- [float](https://drafts.csswg.org/css-page-floats-3/#propdef-float)
  - Supports [`block-start`, `block-end`, `inline-start`, `inline-end`, `snap-block`, `left`, `right`, `top`, `bottom` and `none`](https://drafts.csswg.org/css-page-floats/#propdef-float) values.
- [float-reference](https://drafts.csswg.org/css-page-floats-3/#propdef-float-reference)

## [CSS Color 3](https://www.w3.org/TR/css3-color/)

- [color](https://www.w3.org/TR/css3-color/#color0)
- [opacity](https://www.w3.org/TR/css3-color/#opacity)

See also: [Values - Supported color values](#values)

## [CSS Backgrounds and Borders 3](https://www.w3.org/TR/css3-background/)

- [background](https://www.w3.org/TR/css3-background/#background)
- [background-attachment](https://www.w3.org/TR/css3-background/#background-attachment)
  - Note: behavior when used within `@page` rules is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/22)
- [background-clip](https://www.w3.org/TR/css3-background/#background-clip)
  - Note: behavior when used within `@page` rules is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/22)
- [background-color](https://www.w3.org/TR/css3-background/#background-color)
- [background-image](https://www.w3.org/TR/css3-background/#background-image)
  - Note: behavior when used within `@page` rules is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/22)
- [background-origin](https://www.w3.org/TR/css3-background/#background-origin)
  - Note: behavior when used within `@page` rules is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/22)
- [background-position](https://www.w3.org/TR/css3-background/#background-position)
  - Note: behavior when used within `@page` rules is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/22)
- [background-repeat](https://www.w3.org/TR/css3-background/#background-repeat)
  - Note: behavior when used within `@page` rules is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/22)
- [background-size](https://www.w3.org/TR/css3-background/#background-size)
  - Note: behavior when used within `@page` rules is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/22)
- [border](https://www.w3.org/TR/css3-background/#border)
- [border-bottom](https://www.w3.org/TR/css3-background/#border-bottom)
- [border-bottom-color](https://www.w3.org/TR/css3-background/#border-bottom-color)
- [border-bottom-left-radius](https://www.w3.org/TR/css3-background/#border-bottom-left-radius)
- [border-bottom-right-radius](https://www.w3.org/TR/css3-background/#border-bottom-right-radius)
- [border-bottom-style](https://www.w3.org/TR/css3-background/#border-bottom-style)
- [border-bottom-width](https://www.w3.org/TR/css3-background/#border-bottom-width)
- [border-color](https://www.w3.org/TR/css3-background/#border-color)
- [border-image](https://www.w3.org/TR/css3-background/#border-image)
- [border-image-outset](https://www.w3.org/TR/css3-background/#border-image-outset)
- [border-image-repeat](https://www.w3.org/TR/css3-background/#border-image-repeat)
- [border-image-slice](https://www.w3.org/TR/css3-background/#border-image-slice)
- [border-image-source](https://www.w3.org/TR/css3-background/#border-image-source)
- [border-image-width](https://www.w3.org/TR/css3-background/#border-image-width)
- [border-left](https://www.w3.org/TR/css3-background/#border-left)
- [border-left-color](https://www.w3.org/TR/css3-background/#border-left-color)
- [border-left-style](https://www.w3.org/TR/css3-background/#border-left-style)
- [border-left-width](https://www.w3.org/TR/css3-background/#border-left-width)
- [border-radius](https://www.w3.org/TR/css3-background/#border-radius)
- [border-right](https://www.w3.org/TR/css3-background/#border-right)
- [border-right-color](https://www.w3.org/TR/css3-background/#border-right-color)
- [border-right-style](https://www.w3.org/TR/css3-background/#border-right-style)
- [border-right-width](https://www.w3.org/TR/css3-background/#border-right-width)
- [border-style](https://www.w3.org/TR/css3-background/#border-style)
- [border-top](https://www.w3.org/TR/css3-background/#border-top)
- [border-top-color](https://www.w3.org/TR/css3-background/#border-top-color)
- [border-top-left-radius](https://www.w3.org/TR/css3-background/#border-top-left-radius)
- [border-top-right-radius](https://www.w3.org/TR/css3-background/#border-top-right-radius)
- [border-top-style](https://www.w3.org/TR/css3-background/#border-top-style)
- [border-top-width](https://www.w3.org/TR/css3-background/#border-top-width)
- [border-width](https://www.w3.org/TR/css3-background/#border-width)
- [box-shadow](https://www.w3.org/TR/css3-background/#box-shadow)

## [CSS Image Values and Replaced Content 3](https://www.w3.org/TR/css3-images/)

- [image-resolution](https://www.w3.org/TR/css3-images/#the-image-resolution)
  - Only `<resolution>` value is supported.
  - Only supported for content of `img`, `input[type=image]` and `video` (applied to poster images) elements and before/after pseudoelements. Other images such as background images, list images or border images are not supported.
  - The property is applied to vector images such as SVG, as well as raster images. This behavior is different from what the spec specifies.
- [object-fit](https://www.w3.org/TR/css3-images/#object-fit)
- [object-position](https://www.w3.org/TR/css3-images/#object-position)

## [CSS Fonts 3](https://www.w3.org/TR/css-fonts-3/)

- [font-family](https://www.w3.org/TR/css-fonts-3/#propdef-font-family)
- [font-feature-settings](https://www.w3.org/TR/css-fonts-3/#propdef-font-feature-settings)
- [font-kerning](https://www.w3.org/TR/css-fonts-3/#propdef-font-kerning)
- [font-size](https://www.w3.org/TR/css-fonts-3/#propdef-font-size)
- [font-size-adjust](https://www.w3.org/TR/css-fonts-3/#propdef-font-size-adjust)
- [font-style](https://www.w3.org/TR/css-fonts-3/#propdef-font-style)
- [font-variant-east-asian](https://www.w3.org/TR/css-fonts-3/#propdef-font-variant-east-asian)
- [font-weight](https://www.w3.org/TR/css-fonts-3/#propdef-font-weight)
- [font-stretch](https://www.w3.org/TR/css-fonts-3/#propdef-font-stretch)

See also: [At-rules in CSS Fonts 3](#css-fonts-3)

## [CSS Text 3](https://www.w3.org/TR/css-text-3/)

- [hyphens](https://www.w3.org/TR/css-text-3/#hyphens)
- [letter-spacing](https://www.w3.org/TR/css-text-3/#letter-spacing)
- [line-break](https://www.w3.org/TR/css-text-3/#line-break0)
  - Values: `auto | loose | normal | strict;`
- [overflow-wrap](https://www.w3.org/TR/css-text-3/#overflow-wrap)
  - Note: While the spec states that `word-wrap` must be treated as if it were a shorthand of `overflow-wrap`, Vivliostyle treat them for now as different properties and might result in an incorrect cascading behavior when inconsistent values are specified for both of the properties.
- [tab-size](https://www.w3.org/TR/css-text-3/#tab-size)
- [text-align-last](https://www.w3.org/TR/css-text-3/#text-align-last)
  - Note: While `text-align` property is a shorthand in CSS Text 3, Vivliostyle treats `text-align` for now as an independent property (defined in CSS 2.1) rather than a shorthand.
- [text-justify](https://www.w3.org/TR/css-text-3/#text-justify)
- [white-space](https://www.w3.org/TR/css-text-3/#white-space)
- [word-break](https://www.w3.org/TR/css-text-3/#word-break)
- [word-wrap](https://www.w3.org/TR/css-text-3/#word-wrap)
  - Note: While the spec states that `word-wrap` must be treated as if it were a shorthand of `overflow-wrap`, Vivliostyle treat them for now as different properties and might result in an incorrect cascading behavior when inconsistent values are specified for both of the properties.

## [CSS Text 4](https://drafts.csswg.org/css-text-4/)

- [hyphenate-character](https://drafts.csswg.org/css-text-4/#propdef-hyphenate-character)

## [CSS Text Decoration 3](https://www.w3.org/TR/css-text-decor-3/)

- Note: While `text-decoration` property is a shorthand in CSS Text Decoration 3, Vivliostyle treats `text-decoration` for now as an independent property defined in CSS Level 2.1.
- [text-decoration-color](https://www.w3.org/TR/css-text-decor-3/#text-decoration-color)
- [text-decoration-line](https://www.w3.org/TR/css-text-decor-3/#text-decoration-line)
- [text-decoration-skip](https://www.w3.org/TR/css-text-decor-3/#text-decoration-skip)
- [text-decoration-style](https://www.w3.org/TR/css-text-decor-3/#text-decoration-style)
- [text-emphasis](https://www.w3.org/TR/css-text-decor-3/#text-emphasis)
- [text-emphasis-color](https://www.w3.org/TR/css-text-decor-3/#text-emphasis-color)
- [text-emphasis-position](https://www.w3.org/TR/css-text-decor-3/#text-emphasis-position)
- [text-emphasis-style](https://www.w3.org/TR/css-text-decor-3/#text-emphasis-style)
- [text-shadow](https://www.w3.org/TR/css-text-decor-3/#text-shadow)
- [text-underline-position](https://www.w3.org/TR/css-text-decor-3/#text-underline-position)

## [CSS Multi-column Layout 1](https://www.w3.org/TR/css3-multicol/)

- [break-after](https://www.w3.org/TR/css3-multicol/#break-after)
  - Note: behavior when multiple forced break values coincide at a single break point is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/129)
- [break-before](https://www.w3.org/TR/css3-multicol/#break-before)
  - Note: behavior when multiple forced break values coincide at a single break point is not compliant to the spec. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/129)
- [break-inside](https://www.w3.org/TR/css3-multicol/#break-inside)
  - Note: All of `avoid-page`, `avoid-column` and `avoid-region` values are treated as if they were `avoid`. [[Issue]](https://github.com/vivliostyle/vivliostyle.js/issues/128)
- [column-count](https://www.w3.org/TR/css3-multicol/#column-count)
- [column-gap](https://www.w3.org/TR/css3-multicol/#column-gap0)
- [column-rule](https://www.w3.org/TR/css3-multicol/#column-rule0)
- [column-rule-color](https://www.w3.org/TR/css3-multicol/#column-rule-color)
- [column-rule-style](https://www.w3.org/TR/css3-multicol/#column-rule-style)
- [column-rule-width](https://www.w3.org/TR/css3-multicol/#column-rule-width)
- [column-width](https://www.w3.org/TR/css3-multicol/#column-width)
- [columns](https://www.w3.org/TR/css3-multicol/#columns0)
- [column-span](https://www.w3.org/TR/css3-multicol/#column-span0)
  - Note: Currently `column-span` is effective only when specified on a page float.
- [column-fill](https://drafts.csswg.org/css-multicol-1/#propdef-column-fill)

## [CSS Multi-column Layout 2](https://drafts.csswg.org/css-multicol-2/)

- [column-span](https://drafts.csswg.org/css-multicol-2/#propdef-column-span)
  - Note: Currently `column-span` is effective only when specified on a page float. When `auto` value is specified, either a single column or all columns are spanned depending on the min-content inline size of the page float.

## [CSS Basic User Interface 3](https://www.w3.org/TR/css3-ui/)

- [box-sizing](https://www.w3.org/TR/css3-ui/#propdef-box-sizing)
- [outline](https://www.w3.org/TR/css3-ui/#propdef-outline)
- [outline-color](https://www.w3.org/TR/css3-ui/#propdef-outline-color)
- [outline-style](https://www.w3.org/TR/css3-ui/#propdef-outline-style)
- [outline-width](https://www.w3.org/TR/css3-ui/#propdef-outline-width)
- [text-overflow](https://www.w3.org/TR/css3-ui/#propdef-text-overflow)

## [CSS Writing Modes 3](https://www.w3.org/TR/css-writing-modes-3/)

- [direction](https://www.w3.org/TR/css-writing-modes-3/#propdef-direction)
- [text-combine-upright](https://www.w3.org/TR/css-writing-modes-3/#propdef-text-combine-upright)
- [text-orientation](https://www.w3.org/TR/css-writing-modes-3/#propdef-text-orientation)
- [unicode-bidi](https://www.w3.org/TR/css-writing-modes-3/#propdef-unicode-bidi)
  - Supports [new values (`isolate`, `isolate-override`, `plaintext`) in CSS Writing Modes 3](https://www.w3.org/TR/css-writing-modes-3/#propdef-unicode-bidi)
- [writing-mode](https://www.w3.org/TR/css-writing-modes-3/#propdef-writing-mode)

## [CSS Flexible Box Layout 1](https://www.w3.org/TR/css-flexbox-1/)

- [align-content](https://www.w3.org/TR/css-flexbox-1/#propdef-align-content)
- [align-items](https://www.w3.org/TR/css-flexbox-1/#propdef-align-items)
- [align-self](https://www.w3.org/TR/css-flexbox-1/#propdef-align-self)
- [display](https://www.w3.org/TR/css-flexbox-1/#flex-containers)
  - Supports [`flex`, `inline-flex`](https://www.w3.org/TR/css-flexbox-1/#flex-containers), [`ruby`, `ruby-base`, `ruby-text`, `ruby-base-container` and `ruby-text-container`](https://www.w3.org/TR/css-ruby-1/#propdef-display) values.
- [flex](https://www.w3.org/TR/css-flexbox-1/#propdef-flex)
- [flex-basis](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-basis)
- [flex-direction](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-direction)
- [flex-flow](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-flow)
- [flex-grow](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-grow)
- [flex-shrink](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-shrink)
- [flex-wrap](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-wrap)
- [justify-content](https://www.w3.org/TR/css-flexbox-1/#propdef-justify-content)
- [order](https://www.w3.org/TR/css-flexbox-1/#propdef-order)

## [CSS Transforms 1](https://www.w3.org/TR/css-transforms-1/)

- [backface-visibility](https://www.w3.org/TR/css-transforms-1/#propdef-backface-visibility)
- [transform](https://www.w3.org/TR/css-transforms-1/#propdef-transform)
- [transform-origin](https://www.w3.org/TR/css-transforms-1/#propdef-transform-origin)

## [CSS Ruby Layout 1](https://www.w3.org/TR/css-ruby-1/)

- [display](https://www.w3.org/TR/css-ruby-1/#propdef-display)
  - Supports [`flex`, `inline-flex`](https://www.w3.org/TR/css-flexbox-1/#flex-containers), [`ruby`, `ruby-base`, `ruby-text`, `ruby-base-container` and `ruby-text-container`](https://www.w3.org/TR/css-ruby-1/#propdef-display) values.
- [ruby-align](https://www.w3.org/TR/css-ruby-1/#propdef-ruby-align)
- [ruby-position](https://www.w3.org/TR/css-ruby-1/#propdef-ruby-position)

## [CSS Mobile Text Size Adjustment 1](https://drafts.csswg.org/css-size-adjust-1/)

- [text-size-adjust](https://drafts.csswg.org/css-size-adjust-1/#text-size-adjust)

## [Compositing and Blending 1](https://www.w3.org/TR/compositing-1/)

- [background-blend-mode](https://www.w3.org/TR/compositing-1/#propdef-background-blend-mode)
- [isolation](https://www.w3.org/TR/compositing-1/#propdef-isolation)
- [mix-blend-mode](https://www.w3.org/TR/compositing-1/#propdef-mix-blend-mode)

## [Scalable Vector Graphics (SVG) 2](https://www.w3.org/TR/SVG2/)

- [color-interpolation](https://www.w3.org/TR/SVG2/painting.html#ColorInterpolationProperty)
- [color-rendering](https://www.w3.org/TR/SVG2/painting.html#ColorRenderingProperty)
- [fill](https://www.w3.org/TR/SVG2/painting.html#FillProperty)
- [fill-opacity](https://www.w3.org/TR/SVG2/painting.html#FillOpacityProperty)
- [fill-rule](https://www.w3.org/TR/SVG2/painting.html#FillRuleProperty)
- [glyph-orientation-vertical](https://www.w3.org/TR/SVG2/text.html#GlyphOrientationVerticalProperty)
- [image-rendering](https://www.w3.org/TR/SVG2/painting.html#ImageRenderingProperty)
- [marker](https://www.w3.org/TR/SVG2/painting.html#MarkerProperty)
- [marker-start](https://www.w3.org/TR/SVG2/painting.html#MarkerStartProperty)
- [marker-mid](https://www.w3.org/TR/SVG2/painting.html#MarkerMidProperty)
- [marker-end](https://www.w3.org/TR/SVG2/painting.html#MarkerEndProperty)
- [pointer-events](https://www.w3.org/TR/SVG2/interact.html#PointerEventsProperty)
- [paint-order](https://www.w3.org/TR/SVG2/painting.html#PaintOrderProperty)
- [shape-rendering](https://www.w3.org/TR/SVG2/painting.html#ShapeRenderingProperty)
- [stop-color](https://www.w3.org/TR/SVG2/pservers.html#StopColorProperty)
- [stop-opacity](https://www.w3.org/TR/SVG2/pservers.html#StopOpacityProperty)
- [stroke](https://www.w3.org/TR/SVG2/painting.html#StrokeProperty)
- [stroke-dasharray](https://www.w3.org/TR/SVG2/painting.html#StrokeDasharrayProperty)
- [stroke-dashoffset](https://www.w3.org/TR/SVG2/painting.html#StrokeDashoffsetProperty)
- [stroke-linecap](https://www.w3.org/TR/SVG2/painting.html#StrokeLinecapProperty)
- [stroke-linejoin](https://www.w3.org/TR/SVG2/painting.html#StrokeLinejoinProperty)
- [stroke-miterlimit](https://www.w3.org/TR/SVG2/painting.html#StrokeMiterlimitProperty)
- [stroke-opacity](https://www.w3.org/TR/SVG2/painting.html#StrokeOpacityProperty)
- [stroke-width](https://www.w3.org/TR/SVG2/painting.html#StrokeWidthProperty)
- [text-anchor](https://www.w3.org/TR/SVG2/text.html#TextAnchorProperty)
- [text-rendering](https://www.w3.org/TR/SVG2/painting.html#TextRenderingProperty)
- [vector-effect](https://www.w3.org/TR/SVG2/coords.html#VectorEffectProperty)

## [Scalable Vector Graphics (SVG) 1.1](https://www.w3.org/TR/SVG11/)

- [alignment-baseline](https://www.w3.org/TR/SVG11/text.html#AlignmentBaselineProperty)
- [baseline-shift](https://www.w3.org/TR/SVG11/text.html#BaselineShiftProperty)
- [dominant-baseline](https://www.w3.org/TR/SVG11/text.html#DominantBaselineProperty)
- [mask](https://www.w3.org/TR/SVG11/masking.html#MaskProperty)

## [CSS Masking 1](https://drafts.fxtf.org/css-masking-1/)

- [clip-path](https://drafts.fxtf.org/css-masking-1/#the-clip-path)
- [clip-rule](https://drafts.fxtf.org/css-masking-1/#the-clip-rule)

## [Filter Effects 1](https://www.w3.org/TR/filter-effects-1/)

- [filter](https://www.w3.org/TR/filter-effects-1/#propdef-filter)
- [flood-color](https://www.w3.org/TR/filter-effects-1/#FloodColorProperty)
- [flood-opacity](https://www.w3.org/TR/filter-effects-1/#propdef-flood-opacity)
- [lighting-color](https://www.w3.org/TR/filter-effects-1/#propdef-lighting-color)

## [Pointer Events](https://www.w3.org/TR/pointerevents/)

- [touch-action](https://www.w3.org/TR/pointerevents/#the-touch-action-css-property)

## [CSS Logical Properties and Values 1](https://www.w3.org/TR/css-logical-1/)

- [block-size, inline-size, min-block-size, min-inline-size, max-block-size, max-inline-size](https://www.w3.org/TR/css-logical-1/#dimension-properties)
- [margin-block-start, margin-block-end, margin-inline-start, margin-inline-end, margin-block, margin-inline](https://www.w3.org/TR/css-logical-1/#margin-properties)
- [inset-block-start, inset-block-end, inset-inline-start, inset-inline-end, inset-block, inset-inline](https://www.w3.org/TR/css-logical-1/#inset-properties)
- [padding-block-start, padding-block-end, padding-inline-start, padding-inline-end, padding-block, padding-inline](https://www.w3.org/TR/css-logical-1/#padding-properties)
- [border-block-start-width, border-block-end-width, border-inline-start-width, border-inline-end-width, border-block-width, border-inline-width, border-block-start-style, border-block-end-style, border-inline-start-style, border-inline-end-style, border-block-style, border-inline-style, border-block-start-color, border-block-end-color, border-inline-start-color, border-inline-end-color, border-block-color, border-inline-color, border-block-start, border-block-end, border-inline-start, border-inline-end, border-block, border-inline](https://www.w3.org/TR/css-logical-1/#border-properties)

## [EPUB Adaptive Layout](http://www.idpf.org/epub/pgt/)

Note: This spec is not on a W3C standards track. Future version of Vivliostyle may drop support for this spec.

### At-rules

- [@-epubx-define](http://www.idpf.org/epub/pgt/#rule-define)
- [@-epubx-flow](http://www.idpf.org/epub/pgt/#rule-flow)
- [@-epubx-page-master](http://www.idpf.org/epub/pgt/#rule-page-master)
- [@-epubx-page-template](http://www.idpf.org/epub/pgt/#rule-page-template)
- [@-epubx-partition](http://www.idpf.org/epub/pgt/#rule-partition)
- [@-epubx-partition-group](http://www.idpf.org/epub/pgt/#rule-partition-group)
- [@-epubx-region](http://www.idpf.org/epub/pgt/#rule-region)
- [@-epubx-viewport](http://www.idpf.org/epub/pgt/#rule-viewport)
- [@-epubx-when](http://www.idpf.org/epub/pgt/#rule-when)

### Properties

- [-epubx-conflicting-partitions](http://www.idpf.org/epub/pgt/#prop-conflicting-partitions)
- [-epubx-enabled](http://www.idpf.org/epub/pgt/#prop-enabled)
- [-epubx-flow-consume](http://www.idpf.org/epub/pgt/#prop-flow-consume)
- [-epubx-flow-from](http://www.idpf.org/epub/pgt/#prop-flow-from)
  - Only effective when specified to EPUB Adaptive Layout partitions.
- [-epubx-flow-into](http://www.idpf.org/epub/pgt/#prop-flow-into)
- [-epubx-flow-linger](http://www.idpf.org/epub/pgt/#prop-flow-linger)
- [-epubx-flow-options](http://www.idpf.org/epub/pgt/#prop-flow-options)
- [-epubx-flow-priority](http://www.idpf.org/epub/pgt/#prop-flow-priority)
- [-epubx-min-page-height](http://www.idpf.org/epub/pgt/#prop-min-page-height)
- [-epubx-min-page-width](http://www.idpf.org/epub/pgt/#prop-min-page-width)
- [-epubx-required](http://www.idpf.org/epub/pgt/#prop-required)
- [-epubx-required-partitions](http://www.idpf.org/epub/pgt/#prop-required-partitions)
- [-epubx-shape-outside](http://www.idpf.org/epub/pgt/#prop-shape-outside)
  - Only effective when specified to EPUB Adaptive Layout partitions.
  - Note: only [old syntaxes from 3 May 2012 Working Draft](https://www.w3.org/TR/2012/WD-css3-exclusions-20120503/#supported-svg-shapes) are supported.
- [-epubx-shape-inside](http://www.idpf.org/epub/pgt/#prop-shape-inside)
  - Only effective when specified to EPUB Adaptive Layout partitions.
  - Note: only [old syntaxes from 3 May 2012 Working Draft](https://www.w3.org/TR/2012/WD-css3-exclusions-20120503/#supported-svg-shapes) are supported.
- [-epubx-snap-height](http://www.idpf.org/epub/pgt/#prop-snap-height)
- [-epubx-snap-width](http://www.idpf.org/epub/pgt/#prop-snap-width)
- [-epubx-text-zoom](http://www.idpf.org/epub/pgt/#prop-text-zoom)
- [-epubx-utilization](http://www.idpf.org/epub/pgt/#prop-utilization)
- [-epubx-wrap-flow](http://www.idpf.org/epub/pgt/#prop-wrap-flow)
  - Only effective when specified to EPUB Adaptive Layout partitions.

## [CSS Repeated Headers and Footers](https://specs.rivoal.net/css-repeat/)

Note: This spec proposal is not submitted to CSS Working Group yet.

- [repeat-on-break](https://specs.rivoal.net/css-repeat/#propdef-repeat-on-break)
