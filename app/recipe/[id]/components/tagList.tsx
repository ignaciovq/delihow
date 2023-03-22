import styles from '../page.module.css'
import Link from 'next/link'

const TagList = ({ tagList }:{tagList: string[]}) => {
  const { tags } = styles
  return (
    <div className={tags}>
      {tagList.map((tag) => (
        <Link href={`/search?tags=${tag}`} key={tag}>{tag}</Link>
      ))}
    </div>
  )
}

export default TagList
