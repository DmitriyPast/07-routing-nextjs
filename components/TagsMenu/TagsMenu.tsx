"use client"

import { useState } from "react";
import css from "./TagsMenu.module.css";

export const TAGS = [
    "All",
    "Work",
    "Personal",
    "Todo",
    "Meeting",
    "Shopping",
]

export default function TagsMenu() {
    const [toggle, setToggle] = useState<boolean>(false)
    return (
        <div className={css.menuContainer}>
            <button onClick={() => setToggle(!toggle)} className={css.menuButton}>
                Notes ▾
            </button>
            {toggle &&
                <ul className={css.menuList}>
                    {/* список тегів */}
                    {TAGS.map((tag) =>
                        <li key={tag} className={css.menuItem}>
                            <a href={`/notes/filter/${tag}`} className={css.menuLink}>
                                {tag}
                            </a>
                        </li>)}
                </ul>}
        </div>
    )
}