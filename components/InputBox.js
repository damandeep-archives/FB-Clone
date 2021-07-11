/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable import/order */
import {  useSession } from "next-auth/client";
import Image from "next/image";
import {EmojiHappyIcon} from '@heroicons/react/outline';
import {CameraIcon,VideoCameraIcon} from '@heroicons/react/solid';
import { useRef, useState } from "react";
import { db,storage } from "../firebase";
import firebase from 'firebase';


function InputBox() {
    const [session]=useSession();
    const inputRef=useRef(null);
    const filepickerRef =useRef(null);

    const [imageToPost,setImageToPost]=useState(null);

    const removeImage=()=>{
        setImageToPost(null);
    }
    
    const sendPost=(e)=>{
        e.preventDefault();

        console.log(inputRef.current.value);
        if(!inputRef.current.value)
        return;

        db.collection('posts').add({
            message: inputRef.current.value,
            name: session.user.name,
            email:session.user.email,
            image: session.user.image,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(doc=>{
            if(imageToPost)
            {
                const uploadTask=storage.ref(`posts/${doc.id}`).putString(imageToPost,'data_url');


                removeImage();

                uploadTask.on('state_change',null,(error)=>console.error(error),()=>{
                     //when an upload completes  
                    storage.ref('posts').child(doc.id).getDownloadURL().then(url=>{
                        db.collection(`posts`).doc(doc.id).set({
                            postImage:url
                        },{merge:true})
                    })  
                })
            }
        })
        inputRef.current.value='';
    }


    const addImageToPost=(e)=>{
        const reader=new FileReader();
        if(e.target.files[0])
        {
           reader.readAsDataURL(e.target.files[0])
        }


        reader.onload=(readEvent)=>{
            setImageToPost(readEvent.target.result);
    }
    }

   


    return (
        <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
            <div className='flex space-x-4 p-4 items-center'>
                <Image className="hidden rounded-full"
                src={session.user.image}
                width={40}
                height={40}
                layout="fixed"/>

                <form className='flex flex-1'>
                    <input
                   className='text-xs md:text-sm rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none' type="text" 
                   ref={inputRef} placeholder={`What's on your mind, ${session.user.name}?`}/>
                   
                   
                
                <button hidden type="submit" onClick={sendPost}>Submit</button>
                </form>

                {imageToPost &&(
                    <div onClick={removeImage} className='flex flex-col filter hover: brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'>
                        <img src={imageToPost} className="h-10 object-contain"/>

                        <p className='text-xs
                        text-red-500 text-center'>Remove</p>
                    </div>

                )}
                 <div onClick={sendPost} className='cursor-pointer sm:inline md:hidden'>Post</div>
            </div>

            <div className='flex justify-evenly
            p-3 border-t whitespace-nowrap'>
                <div className='inputIcon'>
                    <VideoCameraIcon className='h-7 text-red-500'/>
                    <p className="hidden sm:inline text-xs sm:text-sm xl:text-base">
                         Live Video</p>   
                </div>
               
                <div className='inputIcon'
                 onClick={()=>filepickerRef.current.click()}>
                    <CameraIcon className='h-7 text-green-400'/>
                    <p className='hidden sm:inline text-xs sm:text-sm xl:text-base'>
                        Photo/Video
                    </p>
                    <input onChange={addImageToPost} hidden type='file' ref={filepickerRef}/>

                </div>
               
                <div className='inputIcon'>
                    <EmojiHappyIcon className='h-7 text-yellow-300'/>
                    <p className='hidden sm:inline text-xs sm:text-sm xl:text-base'>
                        Feeling/Activity
                    </p>
                </div>
            </div>




        </div>
    )
}

export default InputBox
