import './end.css';


const End = ({restart,pontuacao})=>{
    return(
        <div>
        <h1>Fim de jogo!!</h1>
        <h2><span>sua pontuacao:{pontuacao}</span></h2>
        <button onClick={restart}>voltar</button>

        </div>
    )
}
export default End;