import Navigation from "../Components/Navigation"
import { useContext, useState, useEffect } from "react"
import { AppContext } from '../App';
import { collection, getDocs } from 'firebase/firestore'
import { db } from "../firebase-config"
import { Col, Container, Row } from "react-bootstrap";

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
    },[reviewsCollectionRef])


    return(
        <div className="review-page">
            <Navigation/>
          <div className="review-body">
            <Container>
                <div className="review-header">
                    <Row>
                    <Col>
                        {classObject.name}
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                           <p>{classObject.description}</p>
                        </Col>
                    </Row>
                </div>
                {reviews.map((data) => {
                        return(
                            <h1>{data.text}</h1>
                        )
                    })}
            </Container>
          </div>
        </div>
    )
}

export default Review