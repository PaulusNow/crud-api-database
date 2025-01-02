const express = require('express');
const app = express();
const conn = require('./config/database')
const port = 3000

app.use(express.json())

// Semua Resep
app.get('/resep', (req, res) => {
    const qry = "SELECT id, nama_makanan, bahan, step_by_step FROM list_resep WHERE deleted_at IS NULL"
    conn.query(qry, (err, results) => {
      if (err) {
        res.status(500).json({
            status: 500,
            message: 'Gagal Menampilkan List Resep',
            error: err
        })
      } else {
        res.status(200).json({
            status: 200,
            message: 'Resep Berhasil Ditampilkan',
            data: results
        })
      }
    })
})

// Tambah Resep
app.post('/tambah-resep', (req, res) => {
    const param = req.body
    const nama_makanan = param.nama_makanan
    const bahan = param.bahan
    const step_by_step = param.step_by_step
    const now = new Date()
    
    const qry = "INSERT INTO list_resep (nama_makanan, bahan, step_by_step, created_at) VALUES (?, ?, ?, ?)"
    const values = [nama_makanan, bahan, step_by_step, now]
    conn.query(qry, values, (err, results) => {
      if (err) {
        res.status(500).json({
            status: 500,
            message: 'Gagal Menambahkan Resep',
            error: err
        })
      } else {
        res.status(200).json({
            status: 200,
            message: 'Resep Berhasil Ditambahkan',
        })
      }
    })
})

// Update Resep
app.post('/edit-resep', (req, res) => {
    const param = req.body;
    const id = param.id;
    const nama_makanan = param.nama_makanan;
    const bahan = param.bahan;
    const step_by_step = param.step_by_step;

    if (!id) {
        return res.status(400).json({
            status: 400,
            message: 'ID harus disediakan untuk mengedit resep'
        });
    }

    const now = new Date();
    now.setHours(now.getHours() + 7);
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

    // Membangun kueri SQL secara dinamis
    const fieldsToUpdate = [];
    const values = [];

    if (nama_makanan) {
        fieldsToUpdate.push('nama_makanan = ?');
        values.push(nama_makanan);
    }

    if (bahan) {
        fieldsToUpdate.push('bahan = ?');
        values.push(bahan);
    }

    if (step_by_step) {
        fieldsToUpdate.push('step_by_step = ?');
        values.push(step_by_step);
    }

    // Tambahkan updated_at jika ada perubahan
    if (fieldsToUpdate.length > 0) {
        fieldsToUpdate.push('updated_at = ?');
        values.push(formattedDate);
    }

    // Jika tidak ada perubahan, kirimkan respons kesalahan
    if (fieldsToUpdate.length === 0) {
        return res.status(400).json({
            status: 400,
            message: 'Tidak ada data yang diubah'
        });
    }

    // Tambahkan kondisi WHERE
    values.push(id);

    const qry = `UPDATE list_resep SET ${fieldsToUpdate.join(', ')} WHERE id = ? AND deleted_at IS NULL`;

    conn.query(qry, values, (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                message: 'Resep Gagal diedit',
                error: err
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Resep tidak ditemukan atau sudah dihapus'
            });
        }

        // Query untuk mengambil data terbaru
        const fetchQry = "SELECT id, nama_makanan, bahan, step_by_step FROM list_resep WHERE id = ? AND deleted_at IS NULL";
        conn.query(fetchQry, [id], (fetchErr, fetchResults) => {
            if (fetchErr) {
                return res.status(500).json({
                    status: 500,
                    message: 'Gagal mengambil data terbaru',
                    error: fetchErr
                });
            }

            if (fetchResults.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: 'Resep tidak ditemukan setelah update'
                });
            }

            res.status(200).json({
                status: 200,
                message: 'Resep Berhasil Diedit',
                data: fetchResults[0] // Mengembalikan data yang sudah diedit
            });
        });
    });
});

// Resep by id
app.get('/resep-id', (req, res) => {
    const param = req.query;
    const id = param.id;

    const qry = "SELECT * FROM list_resep WHERE deleted_at IS NULL AND id = ?";
    const values = [id];

    conn.query(qry, values, (err, results) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: err.sqlMessage,
                error: err
            });
        } else if (results.length === 0) { 
            res.status(500).json({
                status: 500,
                message: 'Resep tidak ditemukan',
                data: results
            });
        } else {
            res.status(200).json({
                status: 200,
                message: 'Resep Berhasil Ditemukan',
                data: results
            });
        }
    });
});

// Delete Resep
app.post('/hapus-resep', (req, res) => {
    const param = req.body
    const id = param.id
    const now = new Date()
    now.setHours(now.getHours() + 7);
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

    const qry = "UPDATE list_resep SET deleted_at = ? WHERE id = ?"
    const values = [formattedDate, id]

    conn.query(qry, values, (err, results) => {
      if (err) {
        res.status(500).json({
            status: 500,
            message: 'Resep Gagal Dihapus',
            error: err
        })
      } else {
        res.status(200).json({
            status: 200,
            message: 'Resep Berhasil Dihapus'
        })
      }
    })
})

app.listen(port, () => {
    console.log(`Port Berjalan di ${port}`)
})
