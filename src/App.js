//componentes
import StartScreen from './componentes/startScreen';
import Game from './componentes/game';
import End from './componentes/end';

//react 
import {useCallback , useEffect , useState} from 'react';

//data
import { WordList } from './data/word';

import './App.css';

const estagios = [
  {id:1 , name:"start"},
  {id:2 , name:"game"},
  {id:3 , name:"end"},
];


function App() {

  const[gameEstado , setGameEstado] = useState(estagios[0].name);
  const[words]= useState(WordList);

  const[palavra, setPalavra]=useState("");
  const[categorias , setCategorias]=useState("");
  const[letras , setLetra] = useState([]);
  const[letrasAdivinhadas , setLetrasAdivinhadas] = useState([]);
  const[letrasErradas, setLetrasErradas] = useState([]);
  const[chances, setChances] = useState(3);
  const[pontuacao , setPontuacao] = useState(0);

  const escolheCategoria = useCallback(()=>{
    //escolher categoria aleatoria
    const categoria = Object.keys(words);
    const category = categoria[Math.floor(Math.random()*Object.keys(categoria).length)];
    console.log(category);

    //escolher palavras aleatorias
    const palavra = words[category][Math.floor(Math.random()* words[category].length)]
    console.log(palavra);

    return{category , palavra};
  },[palavra])



  //funcao para ir para o segundo estagio
  const startGame = useCallback(()=>{
    const {category , palavra}= escolheCategoria();
    //seperar as letras
    let letra1 = palavra.split("");
    console.log(letra1);
    setGameEstado(estagios[1].name);
    setPalavra(palavra);
    setCategorias(category);
    setLetra(letra1);
    console.log(category, palavra)
  },[escolheCategoria])

  //processo de verificar a letra 
  const verificar = (letra)=>{
     const letraNorma = letra.toLowerCase();

  if(letrasAdivinhadas.includes(letraNorma)||(letrasErradas.includes(letraNorma))){
    return;
  }
  if(letra.includes(letraNorma)){
    setLetrasAdivinhadas((atualLetraAcetada)=>[
      ...atualLetraAcetada,
      letraNorma
    ])
  }
  else{
    setLetrasErradas((atualLetraErrada)=>[
      ...atualLetraErrada,
      letraNorma
    ])
    console.log(setChances());
    setChances((atualChance)=>atualChance-1);
    console.log(setChances());
   
  }
  console.log(letrasAdivinhadas);
  console.log(letrasErradas);
  }
  useEffect(()=>{
    //quando chances chegarem a 0
    if(chances <=0){
      setGameEstado(estagios[2].name);
      limparChances();
    }
  
  },[chances])

  useEffect(()=>{
    //condicao para vencer
    const uniqueLetra = [...new Set(letras)];
    if(letrasAdivinhadas.length ===uniqueLetra.length){
      //adicionando pontos
      setPontuacao((atualPontuacao)=>atualPontuacao+=100);
      //restar do jogo
      startGame();
    }
  },[letrasAdivinhadas,letras,startGame])
 

  //voltar no jogo
  const restart =()=>{
    setPontuacao(0);
    setChances(3);
    setGameEstado(estagios[0].name);
  }
  const limparChances = ()=>{
    setLetrasAdivinhadas([]);
    setLetrasErradas([]);
  }
  return (
    <div className="App">
      
      {/*no caso se o estado do game for start(no caso ele ja inicia com esse estagio) ele vai exibir o componente End*/}
      {/*no caso se o estado do game for game ele vai exibir o componente Game*/}
      {/*no caso se o estado do game for end ele vai exibir o componente End*/}
      

      {gameEstado==="start" &&<StartScreen startGame={startGame}/>} {/*funcao passada como prop*/}
      {gameEstado ==="game" &&<Game verificar={verificar} 
      palavra={palavra} 
      categorias={categorias} 
      letras={letras}
      letrasAdivinhadas={letrasAdivinhadas}
      letrasErradas={letrasErradas}
      pontuacao={pontuacao}
      chances={chances}
      />}
      {gameEstado==="end" &&<End restart={restart} 
      pontuacao={pontuacao}/>}
    </div>
  );
}

export default App;
