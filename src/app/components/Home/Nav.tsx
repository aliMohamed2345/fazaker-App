'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { MdDarkMode, MdOutlineWbSunny } from "react-icons/md";


type Theme = 'light' | 'dark';

const Nav = () => {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        const storedTheme = localStorage.getItem('Theme') as Theme;
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.setAttribute('data-theme', storedTheme);
        }
    }, []);

    function handleThemeBtn(): void {
        const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('Theme', newTheme);
    }

    return (
        <nav  className="navbar fixed-top w-100 p-0 z-3  navbar-expand-sm navbar-light bg-success">
            <div className="container d-flex  flex-row-reverse align-items-center gap-3">
                <Link className="navbar-brand fs-5  fw-bold m-0 flex-grow-3" href="/">فَذْكُر</Link>
                <button
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="nav-items navbar-nav m-0">
                        <li className="nav-item d-flex align-items-center  justify-content-center">
                            <button onClick={handleThemeBtn} style={{ width: `45px `, height: `45px`, transition: `0.3s` }} className={`btn ${theme === 'light' ? 'btn-outline-dark' : 'btn-outline-light'} me-3 rounded-circle d-flex align-items-center justify-content-center`}>
                                {theme === 'light' ? (
                                    <MdDarkMode color="white" fontSize={'25px'} />
                                ) : (
                                <MdOutlineWbSunny fontSize={'25px'}  color="black" />
                                )}
                            </button>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bolder p-3" href="/Quran" aria-current="page">
                                القران
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bolder p-3" href="/Hadith">الحديث</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bolder p-3" href="/PrayerTiming">مواقيت الصلاه</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bolder p-3" href="/Azkar">الاذكار</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
