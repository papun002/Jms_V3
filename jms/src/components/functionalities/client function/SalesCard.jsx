import React from 'react'
import Cards from '../../cards/Cards'

function SalesCard() {
    const SalesCardData = [
        {
          title: "Today's Sales",
          value: 100,
          cat: [
            { title: "Gold", value: "89786.00 gm",count:78 },
            { title: "Silver", value: "89786.00 gm", count:33 },],
        },
        {
          title: "Monthly Sales",
          value: 99,
          cat: [
            { title: "Gold", value: "89786.00 gm",count:78 },
            { title: "Silver", value: "89786.00 gm",count:89 },],
        },
    ]
  return (
    <div className='row'>
        <Cards cardData={SalesCardData} />
    </div>
  )
}

export default SalesCard