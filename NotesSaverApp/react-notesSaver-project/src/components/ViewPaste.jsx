import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const ViewPaste = () => {
      // const [Title, setTitle] = useState('');
      // const [value, setvalue] = useState('');
      // const [searchParams, setSearchParams] = useSearchParams();
      // const pasteId = searchParams.get('pasteId');
      // const dispatch = useDispatch();
      // const allPastes = useSelector((state) => state.paste.pastes);

      const {id} = useParams();
      const allPastes = useSelector((state) => state.paste.pastes);
      const paste = allPastes.find((p) => p._id === id);

  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between'>
            <input 
                type="text"
                placeholder='Enter Title Here'
                value={paste?.title}
                onChange={(e) => setTitle(e.target.value)}
                className='p-2 p-l-4 rounded-2xl place-content-evenly mt-4'
                disabled
            
            />

            {/* <button className='p-2 rounded-2xl place-content-evenly mt-4' onClick={createPaste}>
            {
            
            pasteId ? "Update Paste" : "Create My Paste"

            }
            </button> */}
        </div>

        <div className='m-8'>
            <textarea 
                placeholder='Enter Content Here'
                value={paste?.value}
                onChange={(e) => setvalue(e.target.value)}
                className='rounded-2xl mt-4 p-3 min-w-[500px]'
                rows={20}
                disabled
            />
        </div>
    </div>
  )
}

export default ViewPaste
