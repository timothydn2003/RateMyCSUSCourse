import Navigation from "../Components/Navigation"
import { useContext, useState, useEffect } from "react"
import { AppContext } from '../App';
import { collection, getDocs } from 'firebase/firestore'
import { db } from "../firebase-config"

const Review = () => {
    const {classObject} = useContext(AppContext)
    const reviewsCollectionRef = collection(db, "Classes", `${classObject.id}`,"Reviews")
    const [reviews,setReviews] = useState([])

    useEffect(() => {
        const getReviews = async() => {
            const data = await getDocs(reviewsCollectionRef)
            setReviews(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getReviews()
    },[])

    return(
        <div>
            <Navigation/>
            {classObject.name}
            {reviews.map((data) => {
                return(
                    <h1>{data.text}</h1>
                )
            })}
            
        </div>
    )
}

export default Review