import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

function Spinner({loading}) {
  return (
    <div className="spinner">
      <ClipLoader
        color={'#fffff'}
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
  )
}

export default Spinner

