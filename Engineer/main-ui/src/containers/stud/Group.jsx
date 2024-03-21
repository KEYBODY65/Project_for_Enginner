// import {Link} from "react-router-dom";

import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import axios from "axios";

export default function GroupStudent() {
    const [variantsByGroup, setVariantsByGroup] = useState([]);
    const [variantsIds, setVariantsIds] = useState([]);
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
        const groupId = Number(params.get("id"));
        const formData = new FormData();
        formData.append("id", groupId);
        axios.post('', formData, config)
            .then(res => {
                setVariantsByGroup(res.data.variants)
                setVariantsIds(res.data.id);
            })

    }, []);
    return (
        <div className={'container'}>
            <div className='jumbotron mt-5' style={{
                textAlign: 'center'
            }}>
                <h1 className='display-4'>Заданные варианты</h1>
            </div>
            <hr className='my-4'/>
            <div className='c d-flex'>
                {variantsByGroup.map((variant, id) => (
                    <div className="card" key={id}>
                        <div className="card-header">
                            Тест #{variantsIds[id]}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{variant}</h5>
                            <a href={`/student/dashboard/group/test?idTest=${variantsIds[id]}`} className="btn btn-primary">Начать решать</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}