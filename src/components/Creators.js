import { useEffect } from "react";

function Creators(){
    const [creators, setCeators] = useState([]);

    useEffect(() => {
        fetch('https://api.sampleapis.com/futurama/characters')
        .then(response => response.json())
        .then(data => setCeators(data));
    }, []);

}
export default Creators;