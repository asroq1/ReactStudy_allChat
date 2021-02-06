import {  storageService } from '../firebase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { dbService }  from "../firebase"
const Nweet = ({nweetObj , isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet , setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async() =>{
        const ok = window.confirm("Are you sure You Want to Delete this Tweet?");
        if(ok){
          await dbService.doc(`owls/${nweetObj.id}`).delete();
          await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }; 
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async event =>{
        event.preventDefault();
        await dbService.doc(`owls/${nweetObj.id}`).update({
            text : newNweet,
        });
        setEditing(false);
    }
    const onChange = event => {
        const{
            target : {value},
        } = event;
        setNewNweet(value);
    }
    return (
      <div className="nweet">
          {editing ? (
            <>
               <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  value={newNweet}
                  placeholder="Edit your tweet"
                  required
                  autoFocus
                  onChange={onChange}
                  className="formInput"
                />
                <input type="submit" value="Update Nweet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          ) : (
            <>
              <h4>{nweetObj.text}</h4>
              {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
              {isOwner && (
                  <div class="nweet__actions">
                  <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                  <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      );
    };

export default Nweet;