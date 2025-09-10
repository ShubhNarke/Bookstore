import React from 'react'

const Sidebar = ({ data }) => {
    return (
        <div className='bg-zinc-800 p-4 rounded '>
            <img src={data.avatar} />

        </div>
    )
}

export default Sidebar;