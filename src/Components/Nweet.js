import { dbService } from "fbase";
import { deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import { useState } from "react";

const Nweet =({nweetObj, isOwner})=>{
    const[editing, setEditing] = useState(false);
    const[newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(doc(dbService, "nweets", nweetObj.id));
            
        }
        
    }

    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const { target: {value},
        } = event;
        setNewNweet(value);
    }
const onSubmit = (event)=> {
    event.preventDefault();
    updateDoc(doc(dbService, 'nweets', nweetObj.id), {
        text : newNweet
    });
    setEditing(false);
    //업데이트 후 수정된 화면 뜨기
}
    return(
      <div>
        {
            editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange} value={newNweet} required/>
                    <input type="submit" value = "Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancle</button>
                </>
            ):( 
                <>
                    <h4>{nweetObj.text}</h4>
                    {
                        isOwner && (
                            <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                            </>
                    )}
                </>
            )
        }

    </div>
    )
  }
  
  export default Nweet;
  