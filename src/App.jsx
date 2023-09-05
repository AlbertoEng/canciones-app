import { useEffect, useState } from 'react'

// https://javascript27g-default-rtdb.firebaseio.com/equipo1

function App() {

  const [searchText, setSearchText] = useState('');
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState({
    name: '',
    artist: ''
  })

  const getKoders = async () => {
    const response = await fetch('https://javascript27g-default-rtdb.firebaseio.com/playlist/.json');
    const data = await response.json();
    const songsList = Object.keys(data).map(( key )=>{
      return {
        key,
        name: data[key].name,
        artist: data[key].artist
      }
    })
    console.log(songsList)
    setSongs(songsList)
  }

  useEffect(() => {
    getKoders()
  }, [])

  const handleTextinputs = ( ev )=>{
    ev.preventDefault()
    setSong({...song, [event.target.name]: ev.target.value });
  }

  const addSong = ( ev )=>{
    const addNewSong = async ()=>{
      const data = await fetch('https://javascript27g-default-rtdb.firebaseio.com/playlist/.json',{
        method: 'POST',
        body: JSON.stringify( song )
      });
    }
    addNewSong()
      .then(()=>{
        getKoders();
      })
  }

  const handleEliminar = ( ev , key)=>{
    const deleteSong = async ()=>{
      const data = await fetch(`https://javascript27g-default-rtdb.firebaseio.com/playlist/${key}.json`,{
        method: 'DELETE'
      });
    }
    deleteSong()
    .then(()=>{
      getKoders();
    })
  }

  const searchHandler = ( ev )=>{
    setSearchText( ev.target.value );
  }





  return (
    <>
      
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
          <h1>Lista de Canciones</h1>
            <form action="" className='bg-dark p-3 rounded'>
              <div className="input-group mb-3">
                <input type="text" className="form-control" onChange={handleTextinputs} name='name' placeholder="Titulo de la Cancion" aria-label="titulo" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group mb-3">
                <input type="text" className="form-control" onChange={handleTextinputs} name='artist' placeholder="Artista" aria-label="artista" aria-describedby="basic-addon1" />
              </div>
              <button type='submit' onClick={addSong} className='btn btn-primary mb-3'> Agregar </button>
            </form>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="busqueda" className='fs-2'>Buscar una Rola</label>
          <input type="text" id='busqueda' className="form-control mb-3" name='busqueda' onChange={searchHandler}  placeholder='Escribe aqui tu cancion'/>
            <ul className='list-group'>
              {
                searchText === '' 
                  ? songs.map(( song )=>{
                    return (<div key={song.key}>
                      <li  className="list-group-item d-flex justify-content-between mb-1 rounded bg-primary text-white fw-bold p-3">
                        {song.name} : {song.artist}
                        <button onClick={( ev )=>handleEliminar(ev, song.key)} className='btn btn-danger'>Eliminar</button>
                      </li>
                    </div>
                    )
                  })
                : songs.map(( song )=> {
                  return  song.name.includes(searchText) || song.artist.includes(searchText) ? <div key={song.key}>
                  <li  className="list-group-item d-flex justify-content-between mb-1 rounded bg-primary text-white fw-bold p-3">
                    {song.name} : {song.artist}
                    <button onClick={( ev )=>handleEliminar(ev, song.key)} className='btn btn-danger'>Eliminar</button>
                  </li>
                </div> : null
                }) 
              }
            </ul>

          </div>
        </div>

      </div>
    </>
  )
}

export default App
