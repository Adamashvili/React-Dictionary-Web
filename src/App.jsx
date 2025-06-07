import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [wordInfo, setWordInfo] = useState();
  const [errorSMS, setErrorSMS] = useState({});
  const errP = useRef();

  async function searchingData() {
    if (search) {
      errP.current.style.opacity = 0;
      const data = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      const info = await data.json();

      if (!info.message) {
        setWordInfo(info[0]);
        setErrorSMS();
 
      } else {
        setErrorSMS(info);
        setWordInfo();
       
      }
    } else {
      errP.current.style.opacity = 1;
    }
  }

  function playAudio() {
    wordInfo.phonetics.forEach((item) => {
      if (item.audio) {
        new Audio(item.audio).play();
      }
    });
  }

  function swithLight() {
    document.body.classList.toggle("darkMode");
  }

  return (
    <>
      <header>
        <aside>
          <button onClick={swithLight}>
            <i class="fa-solid fa-lightbulb"></i>
          </button>
        </aside>
        <article>
          <input
            type="text"
            onKeyUp={(e) => {
              setSearch(e.target.value);
              e.key == "Enter" ? searchingData() : null;
            }}
            placeholder="Search Word..."
          />
          <i
            onClick={searchingData}
            className="fa-solid fa-magnifying-glass"
          ></i>
          <p ref={errP}>Whoops, can`t be empty...</p>
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
              <button onClick={playAudio}>
                <i class="fa-solid fa-play"></i>
              </button>
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
                  <h3>
                    synonyms
                    {meaning.synonyms.map((syn, i) => (
                      <span key={i}>{syn}</span>
                    ))}
                  </h3>
                  <h3>
                    antonyms
                    {meaning.antonyms.map((ant, i) => (
                      <span key={i}>{ant}</span>
                    ))}
                  </h3>
                </section>
              </>
            ))}
          </main>
          <footer>
            <h6>
              source <span>{wordInfo.sourceUrls}</span>
            </h6>
          </footer>
        </>
      ) : (
        <main className="errorArea">
          <h1>{errorSMS.title}</h1>
          <h3>{errorSMS.message}</h3>
          <p>{errorSMS.resolution}</p>
        </main>
      )}
    </>
  );
}

export default App;
