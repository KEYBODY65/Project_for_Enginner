import Cookies from "universal-cookie";
import {useEffect} from "react";
import axios from "axios";

export default function VariantOfStudent(){
    const cookies = new Cookies();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken')
        }
    };
    useEffect(() => {
        let params = new URLSearchParams(document.location.search);
        const variantId = Number(params.get("idTest"));
        const formData = new FormData();
        formData.append("variantId", variantId);
        axios.post('', formData, config)
            .then(res => {
                console.log(res.data)
            })
            .catch(err =>{
                console.error(err);
            })

    }, []);
    return (
        <p>Вариант</p>
    )
}