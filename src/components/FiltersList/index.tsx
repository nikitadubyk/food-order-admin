import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/auth/selector'

import Filter from '../Filter'
import NewFilter from '../NewFilter'

import './FiltersList.scss'

interface FiltersListProps {
    filters: string[]
}

const FiltersList: React.FC<FiltersListProps> = ({ filters }) => {
    const { token } = useSelector(selectAuth)

    return (
        <div className='filters__list'>
            <NewFilter token={token} />
            {filters &&
                filters.map((filter, i) => {
                    if (i !== 0) {
                        return <Filter label={filter} token={token} key={i} />
                    }
                })}
        </div>
    )
}

export default FiltersList
