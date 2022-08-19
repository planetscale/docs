import GetHelp from './GetHelp'
import AnchorLink from './MDX.AnchorLink'
import CodeBlock from './MDX.CodeBlock'
import ImageBlock from './MDX.ImageBlock'
import InfoBlock from './MDX.InfoBlock'
import InlineCodeBlock from './MDX.InlineCodeBlock'
import NextBlock from './MDX.NextBlock'
import TableBlock from './MDX.TableBlock'
import VideoBlock from './MDX.VideoBlock'

export const components = {
  table: TableBlock,
  pre: CodeBlock,
  code: InlineCodeBlock,
  img: ImageBlock,
  h2: (props) => <AnchorLink {...props} heading='h2' />,
  h3: (props) => <AnchorLink {...props} heading='h3' />,
  NextBlock,
  ImageBlock,
  InfoBlock,
  VideoBlock,
  GetHelp
}

export { MDXProvider } from '@mdx-js/react'
