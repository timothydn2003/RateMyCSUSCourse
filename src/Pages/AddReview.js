import React from "react"
import Navigation from "../Components/Navigation"
import { useState, useContext } from "react"
import { AppContext } from "../App"

const AddReview = () => {
    const {classObject} = useContext(AppContext)
    const stop = (event) => {
        event.preventDefault()
    }
    return(
        <div className="addreview-page">
            <Navigation/>
            <div className="addreview-body">
                <form onSubmit={stop}>
                    <h1>{classObject.name}</h1>
                </form>
            </div>

        </div>
    )
}
export default AddReview