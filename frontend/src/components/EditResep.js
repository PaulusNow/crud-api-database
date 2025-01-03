import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const EditResep = () => {
const [nama_makanan, setNamaMakanan] = useState('');
const [bahan, setBahan] = useState('');
const [step_by_step, setstep_by_step] = useState('');
const navigate = useNavigate();
const {id} = useParams();

useEffect(() => {
    getResepById();
}, []);

const UpdateResep = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:3001/resep/${id}`, {
            nama_makanan,
            bahan,
            step_by_step
        }); 
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}
    const getResepById = async () => {
        const response = await axios.get(`http://localhost:3001/resep/${id}`);
        setNamaMakanan(response.data.nama_makanan)
        setBahan(response.data.bahan)
        setstep_by_step(response.data.step_by_step)
    }

  return (
    <div className='columns mt-5 is-centered'>
        <div className='column is-half'>
            <form onSubmit={UpdateResep}>
                <div className='field'>
                    <label className='label'>Nama Makanan</label>
                    <div className='control'>
                        <input 
                        type='text' 
                        className='input' 
                        value={nama_makanan} 
                        onChange={(e) => setNamaMakanan(e.target.value)}
                        placeholder='Nama Makanan'/>
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Bahan</label>
                    <div className='control'>
                    <input 
                        type='text' 
                        className='input' 
                        value={bahan} 
                        onChange={(e) => setBahan(e.target.value)}
                        placeholder='Bahan Makanan'/>
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Cara Memasak</label>
                    <div className='control'>
                    <input 
                        type='text' 
                        className='input' 
                        value={step_by_step} 
                        onChange={(e) => setstep_by_step(e.target.value)}
                        placeholder='Cara Memasak'/>
                    </div>
                </div>
                <div className='field'>
                    <button type='submit' className='button is-success'>
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditResep;
