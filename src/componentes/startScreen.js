import './startScreen.css';
const StartScreen = ({startGame})=>{
    return(
        <div className='start'>
            <h1>Secret World</h1>
            <p>Clique no botao para começar</p>
            <button onClick={startGame}>Começar jogo!!</button>
        </div>
    )
}
export default StartScreen;