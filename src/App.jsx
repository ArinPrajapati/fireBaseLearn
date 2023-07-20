import Auth from "./components/Auth";
import "./App.css";
import { db , auth, storage } from "./config/firebase";
import { useState, useEffect } from "react";
import { getDocs, collection, addDoc , deleteDoc , doc ,updateDoc} from "firebase/firestore";
import {ref , uploadBytes } from 'firebase/storage'
function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieDate, setNewMovieDate] = useState(0);
  const [newIsMovieOscar, setisMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [uploadFile,setUploadFile] = useState(null)

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filterData);
      console.log(movieList);
    } catch (error) {
      console.error(error);
    }
  };


  const onSubmit = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieDate,
        receviedAnOscar: newIsMovieOscar,
        userId : auth?.currentUser?.uid
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };
 
  
  const deleteMovie = async (id) => {
    const movieDoc = doc(db,"movies",id)
       await deleteDoc(movieDoc)
       getMovieList();
  }

  const UpdateMovieTitle = async (id) => {
    const movieDoc = doc(db,"movies",id)
       await updateDoc(movieDoc, {title: updatedTitle})
       getMovieList();
  }

  const uploadFileFuntion =  async() => {
    if(!uploadFile) return;
     const filesFolderRef =   ref(storage,`projectFiles/${uploadFile.name}`)
     try {
      
       await uploadBytes(filesFolderRef, uploadFile)
     } catch (error) {
      console.log(error)
     }
   }
   
  useEffect(() => {
    getMovieList();
  }, []);


  return (
    <>
      FireBase app
      <Auth />
      <div>
        <input
          type="text"
          placeholder="Movies title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date...."
          onChange={(e) => setNewMovieDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          id="ch"
          checked={newIsMovieOscar}
          onChange={(e) => setisMovieOscar(e.target.checked)}
        />
        <label htmlFor="ch"> recevied Oscar or not</label>
        <button onClick={onSubmit}>Submit Moive</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receviedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>DeleteMovie</button>
            <input type="text" onChange={(e)=> setUpdatedTitle(e.target.value)} />
            <button onClick={() =>UpdateMovieTitle(movie.id)}>Update</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e)=> setUploadFile(e.target.files[0])} />
        <button onClick={uploadFileFuntion}>Upload File</button>
      </div>
    </>
  );
}

export default App;
