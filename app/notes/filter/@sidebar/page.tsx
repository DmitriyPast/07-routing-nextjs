import { TAGS } from '@/components/TagsMenu/TagsMenu'
import css from './page.module.css'

export default function Sidebar() {
    return (
        <ul className={css.menuList}>
            {/* список тегів */}
            {TAGS.map((tag) =>
                <li className={css.menuItem}>
                    <a href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </a>
                </li>)}
        </ul>
    )
}