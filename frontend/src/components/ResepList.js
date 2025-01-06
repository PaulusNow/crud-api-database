import React, { useState, useEffect } from "react";
import axios from "axios";

export const ResepList = () => {
  const [resep, setResep] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [nama_makanan, setNamaMakanan] = useState("");
  const [bahan, setBahan] = useState("");
  const [step_by_step, setstep_by_step] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteNamaMakanan, setDeleteNamaMakanan] = useState("");

  useEffect(() => {
    getResep();
  }, []);

  const getResep = async () => {
    const response = await axios.get("http://localhost:3001/resep");
    setResep(response.data);
  };

  const getResepById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/resep/${id}`);
      setNamaMakanan(response.data.nama_makanan);
      setBahan(response.data.bahan);
      setstep_by_step(response.data.step_by_step);
      setEditId(id);
      setIsEdit(true);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const simpanResep = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.patch(`http://localhost:3001/resep/${editId}`, {
          nama_makanan,
          bahan,
          step_by_step,
        });
      } else {
        await axios.post("http://localhost:3001/resep", {
          nama_makanan,
          bahan,
          step_by_step,
        });
      }
      resetForm();
      getResep();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setNamaMakanan("");
    setBahan("");
    setstep_by_step("");
    setEditId(null);
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const confirmDelete = (id, namaMakanan) => {
    setDeleteId(id);
    setDeleteNamaMakanan(namaMakanan); // Simpan nama makanan
    setIsDeleteModalOpen(true);
  };

  const deleteResep = async () => {
    try {
      await axios.delete(`http://localhost:3001/resep/${deleteId}`);
      setIsDeleteModalOpen(false);
      getResep();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <button
          className="button is-success mb-3"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          Tambah Resep
        </button>

        <table className="table is-striped is-fullwidth">
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
                  <button
                    onClick={() => getResepById(r.id)}
                    className="button is-small is-info"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(r.id, r.nama_makanan)}
                    className="button is-small is-danger"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Tambah/Edit */}
        {isModalOpen && (
          <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
            <div
              className="modal-background"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">
                  {isEdit ? "Edit Resep" : "Tambah Resep"}
                </p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </header>
              <form onSubmit={simpanResep}>
                <section className="modal-card-body">
                  <div className="field">
                    <label className="label">Nama Makanan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={nama_makanan}
                        onChange={(e) => setNamaMakanan(e.target.value)}
                        placeholder="Nama Makanan"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Bahan</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        value={bahan}
                        onChange={(e) => setBahan(e.target.value)}
                        placeholder="Bahan Makanan"
                      ></textarea>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Cara Memasak</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        value={step_by_step}
                        onChange={(e) => setstep_by_step(e.target.value)}
                        placeholder="Cara Memasak"
                      ></textarea>
                    </div>
                  </div>
                </section>
                <footer className="modal-card-foot is-justify-content-flex-end">
                  <button type="submit" className="button is-success mr-2">
                    Simpan
                  </button>
                  <button
                    className="button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal
                  </button>
                </footer>
              </form>
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Hapus */}
        {isDeleteModalOpen && (
          <div className={`modal ${isDeleteModalOpen ? "is-active" : ""}`}>
            <div
              className="modal-background"
              onClick={() => setIsDeleteModalOpen(false)}
            ></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Konfirmasi Hapus</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={() => setIsDeleteModalOpen(false)}
                ></button>
              </header>
              <section className="modal-card-body">
                <p>
                  Apakah Anda yakin ingin menghapus resep{" "}
                  <strong>{deleteNamaMakanan}</strong>?
                </p>
              </section>
              <footer className="modal-card-foot is-justify-content-flex-end">
                <button className="button is-danger" onClick={deleteResep}>
                  Ya
                </button>
                <button
                  className="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Tidak
                </button>
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
