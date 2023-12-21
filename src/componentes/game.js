import { useState, useRef } from 'react';
import './game.css';

const Game = ({verificar,palavra,categorias,letras,letrasAdivinhadas,letrasErradas,pontuacao,chances})=>{
    const[letra , setLetra]= useState("");// letra criada para o input
    const mandar= (e)=>{
        e.preventDefault();
        verificar(letra);// função criada no App.js
        setLetra("");
        letraRef.current.focus();
    }
    const letraRef = useRef(null);
    return(
        <div className='game'>
            <div className='points'>
                <span>Pontuação:{pontuacao}</span>
            </div>

            <h1>Adivinhe a palavra</h1>
            <h3 className='tip'>
                Dica da palavra : <span>{categorias}</span>
            </h3>
            <p>voce tem {chances} chances</p>
            <div className='palavraContainer'>
             {letras.map((letr , i)=>(
                letrasAdivinhadas.includes(letr)?(
                    <span className='letra'>{letr}</span>
                ):( <span key={i} className='quadradoBranco'></span>)
             ))}
            </div>
                <div className='letraQuadrado'>
                    <p>tente adivinhar uma letra da palavra</p>
                    <form onSubmit={mandar}>
                        <input type='text' 
                        name='letra' 
                        maxLength="1" 
                        required 
                        onChange={(e)=>{setLetra(e.target.value)}
                    } value={letra}
                      ref={letraRef}/>
                        <button>Jogar</button>
                    </form>
                </div>
                
                <div className='letraErrada'>
                    <p>letras erradas:</p>
                    {letrasErradas.map((letraE,i)=>(
                        <span key={i}>{letraE}</span>
                    ))}
                </div>
         
        </div>
        
    )
}
export default Game;