export default function ItemApi(props){
    return (
        <div className="api-item">
            <img src={props.url}></img>
            <div>
                <h2>{props.title}</h2>
                {props.explanation}
            </div>
        </div>
    )
}