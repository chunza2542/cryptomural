import { useState, useRef, useEffect } from "react";
import styled from "styled-components"

const Loading = styled.div`
    height: 200px;
    width: 100%;
    background-color: black;
    position: absolute;
    top: 0px;
    left: 0px;
    > i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-100%, -50%);
        display: block;
        margin: 0px;
    }
`
const Container = styled.div`
    height: 200px;
    width: 100%;
    position: relative;
    background-color: black;
`
const Image = ({url}:any) => {
    const [loading, setLoading] = useState(true)
    const [isError,setError] = useState(false)
    
    const onLoad = () => {
        console.log("REACH ON LOAD");
        setLoading(false)
    }
    const onError = () => {
        console.log("REACH ON ERROR");
        setLoading(false)
        setError(true)
    }
    return <Container>
        {loading && <Loading><i className="fas fa-circle-notch fa-spin"></i></Loading>}
        <img 
            style={{
                opacity: loading && !isError ? 0 : 1,
                position: "absolute",
                margin: "0px",
                top: "0px",
                left: "0px"
            }}
            src={url} 
            onLoad={onLoad} 
            alt="crypto mural" 
            onError={onError} 
            width="100%"
            height="200px"
        />
    </Container>
}
export default Image
