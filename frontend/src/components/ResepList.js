import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'; 

export const ResepList = () => {
    const [resep, setResep] = useState([]);

    useEffect(() => {
        getResep();
    }, []);

    const getResep = async () => {
        const response = await axios.get('http://localhost:3001/resep');
        setResep(response.data);
    };

    const deleteResep = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/resep/${id}`)
            getResep();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='columns mt-5 is-centered'>
            <div className='column is-half'>
                <Link to={`tambah`} className='button is-success'>
                    Tambah Resep
                </Link>
                <table className='table 'is-striped is-fullwidth>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Makanan</th>
                            <th>Bahan</th>
                            <th>Cara Memasak</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resep.map((r, index) => (
                            <tr key={r.id}>
                                <td>{index + 1}</td>
                                <td>{r.nama_makanan}</td>
                                <td>{r.bahan}</td>
                                <td>{r.step_by_step}</td>
                                <td>
                                    <Link to={`edit/${r.id}`} className='button is-small is-info'>Edit</Link>
                                    <button onClick={()=> deleteResep(r.id)} className='button is-small is-danger'>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
