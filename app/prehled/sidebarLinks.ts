import React from 'react';
import { MdQueryStats } from 'react-icons/md';
import { RiHistoryFill } from 'react-icons/ri';
import { AiOutlineTrophy } from 'react-icons/ai';

export const sidebarLinks = [
    {
        title: "Vy",
        href: "/",
        items: [
            {
                title: "Váš přehled",
                href: "/",
                icon: React.createElement(MdQueryStats, {})
            },
            {
                title: "Historie testů",
                href: "/tests",
                icon: React.createElement(RiHistoryFill, {})
            }
        ]
    },
    {
        title: "Přijímačky",
        href: "/",
        items: [
            {
                title: "Úspěšnost cvičení (CJL)",
                href: "/cviceni/prehled?zkouska=PZ&predmet=CJL",
                icon: React.createElement(AiOutlineTrophy, {})
            },
            {
                title: "Úspěšnost cvičení (MAT)",
                href: "/cviceni/prehled?zkouska=PZ&predmet=MAT",
                icon: React.createElement(AiOutlineTrophy, {})
            }
        ]
    },
    {
        title: "Maturita",
        href: "/",
        items: [
            {
                title: "Úspěšnost cvičení (CJL)",
                href: "/cviceni/prehled?zkouska=MZ&predmet=CJL",
                icon: React.createElement(AiOutlineTrophy, {})
            },
            {
                title: "Úspěšnost cvičení (MAT)",
                href: "/cviceni/prehled?zkouska=MZ&predmet=MAT",
                icon: React.createElement(AiOutlineTrophy, {})
            },
            {
                title: "Úspěšnost cvičení (ANJ)",
                href: "/cviceni/prehled?zkouska=MZ&predmet=ANJ",
                icon: React.createElement(AiOutlineTrophy, {})
            }
        ]
    }
]
