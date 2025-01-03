import Resep from "../models/ResepModel.js";

export const getResep = async (req, res) => {
    try {
        const respons = await Resep.findAll();
        res.status(200).json(respons)
    } catch (error) {
        console.log(error.message)
    }
}

export const getResepById = async (req, res) => {
    try {
        const respons = await Resep.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(respons)
    } catch (error) {
        console.log(error.message)
    }
}

export const createResep = async (req, res) => {
    try {
        await Resep.create(req.body);
        res.status(201).json({ message: "Resep Berhasil Ditambahkan" })
    } catch (error) {
        console.log(error.message)
    }
}

export const UpdateResep = async (req, res) => {
    try {
        await Resep.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "Resep Berhasil Diedit" })
    } catch (error) {
        console.log(error.message)
    }
}

export const DeleteResep = async (req, res) => {
    try {
        await Resep.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ message: "Resep Berhasil Dihapus" })
    } catch (error) {
        console.log(error.message)
    }
}