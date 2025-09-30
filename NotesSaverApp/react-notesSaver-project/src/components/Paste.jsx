import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToPastes, removeFromPastes } from '../redux/pasteSlice'
import { Link, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())

    );

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    function handleShare() {
        // implemen share logic here        
        const shareableLink = `${window.location.origin}/pastes/${paste._id}`;
        navigator.clipboard.writeText(shareableLink);
        toast.success('Shareable link copied to clipboard!');
        
    }

  return (
    <div>
      <input type="search" placeholder='Search Paste' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='p-2 rounded-2xl mt-4 min-w-[600px]'/>

      <div className='flex flex-col gap-4 mt-4'>
        {
            filteredData.length > 0 && 
            filteredData.map(
                (paste) => {
                    return (
                        <div className='border rounded-md' key={paste?._id}>
                            <div>
                                {paste.title}
                                
                            </div>
                            <div>
                                {paste.value}
                            </div>
                            
                            <div className='flex flex-row gap-4 place-content-evenly'>
                                <button >
                                    <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                                </button >
                                <button >
                                    <Link to={`/pastes/${paste?._id}`}>
                                        View
                                    </Link>
                                </button >
                                <button onClick={() => handleDelete(paste?._id)}>
                                    Delete
                                </button >
                                <button onClick={() => {
                                    navigator.clipboard.writeText(paste?.value);
                                    toast.success('Copied to Clipboard');
                                }}>
                                    Copy
                                </button >
                                <button onClick={handleShare}>                                   
                                    Share
                                </button >
                            </div>

                            <div>
                                {paste.createdAt}  
                            </div>
                        </div>
                    )
                }
                    
            )

        }
      </div>
    </div>
  )
}

export default Paste
