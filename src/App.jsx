import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [wordInfo, setWordInfo] = useState();
  const [errorSMS, setErrorSMS] = useState();

  async function searchingData() {
    try {
      const data = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      const info = await data.json();

      !info.message ? setWordInfo(info[0]) : setErrorSMS(info);
      console.log(info[0]);
    } catch (error) {
      console.log("errrrrrrrr");
    }
  }
  
  function playAudio() {
    wordInfo.phonetics.forEach( item => {
      if(item.audio) {
        new Audio(item.audio).play(); 
      };
      
    } )

  }



  return (
    <>
      <header>
        <aside></aside>
        <article className="searchBar">
          <input
            type="text"
            onKeyUp={(e) => setSearch(e.target.value)}
            placeholder="Search Word..."
          />
          <i
            onClick={searchingData}
            className="fa-solid fa-magnifying-glass"
          ></i>
        </article>
      </header>
      {wordInfo ? (
        <>
        <main>
          <div className="word">
            <div className="texts">
              <h1>{wordInfo.word}</h1>
              <h5>{wordInfo.phonetic}</h5>
            </div>
            <button onClick={playAudio}><i class="fa-solid fa-play"></i></button>
          </div>
          {wordInfo.meanings.map((meaning, i) => (
            <>
              <section key={i}>
                <h1>
                  <span>{meaning.partOfSpeech}</span>
                </h1>
                <ul>
                  {meaning.definitions.map((definit, i) => (
                    <li key={i}>{definit.definition}</li>
                  ))}
                </ul>
                <h3>synonyms {
                  meaning.synonyms.map( (syn, i) => (
                    <span key={i}>{syn}</span> 
                  ) )}</h3>
                <h3>antonyms {
                  meaning.antonyms.map( (ant, i) => (
                    <span key={i}>{ant}</span> 
                  ) )}</h3>
              </section>
            </>
          ))}
        </main>
        <footer>
          <h6>source <span>{wordInfo.sourceUrls}</span></h6>
        </footer>
         </>
      ) : (
        <main></main>
      )}
    </>
  );
}

export default App;
