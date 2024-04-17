export default function Results(props){
    return(
        <container className={'container'} style={{margin: 10}}>
            <a href={`/student/dashboard/group/?id=${props.groupId}`}><button className={'btn btn-primary'}>Назад</button></a>
            <h1 style={{textAlign: 'center'}}>{`Поздавляю! Вы набрали ${props.score} из ${props.maxScore} баллов`}</h1>
            <div className="progress" role="progressbar" aria-label="Animated striped example"
                 aria-valuenow={`${props.score}/${props.maxScore}`}
                 aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar progress-bar-striped progress-bar-animated"
                     style={{width: `${props.score / props.maxScore * 100}%`}}>
                    {`${Math.round((props.score / props.maxScore) * 100)}%`}
                </div>
            </div>
        </container>
    )
}