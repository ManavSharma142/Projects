import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const [Title, setTitle] = useState('');
    const [value, setvalue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);
    useEffect(() => {
          
            if(pasteId) {
                const paste = allPastes.find((p) => p._id === pasteId);
                setTitle(paste.title);
                setvalue(paste.value);
            
            }
        }, [pasteId])

    function createPaste() {

        const paste = {
            title: Title,
            value: value,
            _id: pasteId || 
                Date.now().toString(36), 
                createdAt: new Date().toISOString(),
        }

        
        

        if(pasteId) {
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }

        // after creation/updation
        setTitle('');
        setvalue('');
        setSearchParams({});


        
    }

  return (

    

    <div>
        <div className='flex flex-row gap-7 place-content-between'>
            <input 
                type="text"
                placeholder='Enter Title Here'
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
                className='p-2 p-l-4 rounded-2xl place-content-evenly mt-4'
            
            />

            <button className='p-2 rounded-2xl place-content-evenly mt-4' onClick={createPaste}>
            {
            
            pasteId ? "Update Paste" : "Create My Paste"

            }
            </button>
        </div>

        <div className='m-8'>
            <textarea 
                placeholder='Enter Content Here'
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                className='rounded-2xl mt-4 p-3 min-w-[500px]'
                rows={20}
            />
        </div>
    </div>
  )
}

export default HomePage
