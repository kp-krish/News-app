// import React, { PureComponent } from 'react'
import loading from './loading.gif'

const Spinner = () => {

    return (
      <div className='text-center'>
        <img className="m-3" src={loading} alt="loading" width={60} height={60}/>
      </div>
    )
  
}

export default Spinner
