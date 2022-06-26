import React from 'react'

import style from './Stats.module.scss'

interface StatsCardProps {
    title: string
    data: string | number
}

const StatsCard: React.FC<StatsCardProps> = ({ title, data }) => {
    return (
        <div className={style.stats__card}>
            <p className={style.stats__card__title}>{title}</p>
            <div className={style.stats__card__data}>{data}</div>
        </div>
    )
}

export default StatsCard
