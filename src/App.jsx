import {useEffect, useState} from 'react'
import './App.css'
import {Auth} from "./components/Auth.jsx";
import {auth, db, storage} from "./config/firebase.js";
import {signOut} from 'firebase/auth';
import {ref, uploadBytes} from 'firebase/storage';
import {collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore'

function App() {

    const [movieList, setMovieList] = useState([]);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);
    const [newTitle, setNewTitle] = useState(null);

    const [fileUpload, setFileUpload] = useState(null);

    const movieCollectionRef = collection(db, "movies");

    const changeMovieTitle = async (id) => {
        const movieDoc = doc(db, 'movies', id);
        try {
            await updateDoc(movieDoc, {
                title: newTitle,
            })
        }  catch (error) {
            console.error(error);
        }
    }

    const uploadFile = async () => {
        // this means do nothing if there is no file.
        if (!fileUpload) return ;

        const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
        try {
            await uploadBytes(fileFolderRef, fileUpload);
        } catch (error) {
            console.error(error);
        }
    }

    const getMoviesList = async () => {
        try {
            const data = await getDocs(movieCollectionRef);
            // going to contain a docs part in the data which can be looped through and filtered to provide us with what we need
            const filteredData = data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            })
            setMovieList(filteredData);
        } catch(error) {
            console.error("the error ", error, " occured when fetching the docs");
        }
    }

    const deleteMovie = async (movieId) => {
        const movieRef = doc(db, "movies", movieId);
        try {
            await deleteDoc(movieRef);
            console.log("The movie has been deleted");
            getMoviesList();
        } catch(error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getMoviesList()
    }, []);

    const displayCurrentUser = () => {
        console.log(auth);
    }

    const submitMovie = async () => {
        try {
            await addDoc(movieCollectionRef, {
                title,
                description,
                releaseDate,
                userId: auth?.currentUser?.uid,
            })
            getMoviesList();
            console.log("the movie has been added");
        } catch (error) {
            console.error("Some errors occured");
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            console.log("successfully signed out");
        } catch (err) {
            console.log("error when signing out ", err);
        }
    }

    return (
          <div>
              {
                  !auth?.currentUser &&
                  <Auth />
              }

              <button onClick={displayCurrentUser}>
                  Display current user information
              </button>

              <button onClick={logOut}>
                  Sign out the current user
              </button>

              {
                  movieList.map((movie, index) => (
                      <div key={index} className={"text-[blue]"}>
                          {movie.title}
                          
                          <input onChange={(ev) => setNewTitle(ev.target.value)} placeholder={"enter the new title"} />

                          <button  onClick={() => changeMovieTitle(movie.id)}>change the title</button>

                          <button onClick={() => deleteMovie(movie.id)}>
                                Delete Movie
                          </button>
                      </div>
                  ))
              }

              <div>
                  <h1 className={"text-3xl font-bold"}>Create a new movie</h1>

                  <input onChange={(ev) => setTitle(ev.target.value)} type={"text"} placeholder={"enter movie title"}
                         className={"w-[60%] bg-gray-700 text-white py-2 mt-5 px-2"}/>
                  <input onChange={(ev) => setReleaseDate(ev.target.value)} type={"number"} placeholder={"enter movie release date"}
                         className={"w-[60%] bg-gray-700 text-white py-2 mt-5 px-2"}/>

                  <textarea onChange={(ev) => setDescription(ev.target.value) }  placeholder={"enter movie description"}
                         className={"w-[60%] bg-gray-700 text-white py-2 mt-5 px-2"}/>

                  <button onClick={() => submitMovie() } className={"block bg-blue-500 py-3 px-5 mt-5 text-white font-bold mx-auto"}>
                        Submit the movie
                  </button>
              </div>
              
              
              <div>
                  <h1 className={"text-4xl"}>Stuff related sending images </h1>

                  <input type={"file"} onChange={(ev) => setFileUpload(ev.target.files[0])}  placeholder={"Upload the file"} />

                  <button className={"font-bold my-5 bg-blue-500 block mx-auto py-3 px-2 text-white"} onClick={() => uploadFile()}>
                        Upload the file to firebase
                  </button>
              </div>
          </div>
    )
}

export default App
