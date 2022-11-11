import React, {useState, useEffect} from 'react';
import facade from "../apiFacade.js";

function Home(props) {
    const init = {text: "", start: "", end: ""}
    const [data, setData] = useState(init);

    useEffect(() => {
        facade.getBFFInfo()
            .then((res) =>
                setData(res)
            )
    }, [])

    console.log(data)

    return (
        <div>
            <h3>Homepage</h3>
        </div>
    );
}

export default Home;