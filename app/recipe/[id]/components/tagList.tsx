import styles from '../page.module.css'
import Link from 'next/link'
import { Tag } from '.prisma/client'

const TagList = ({ tagList }:{tagList: Tag[]}) => {
  const { tags } = styles
  return (
    <div className={tags}>
      {tagList.map((tag) => (
        <Link href={`/search?tags=${tag.name}`} key={tag.name}>{tag.name}</Link>
      ))}
    </div>
  )
}

export default TagList
