const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, date + file.originalname);
    }
});
const upload = multer({storage: storage});

const Documents = mongoose.model('documents');

module.exports = function (app) {

    app.delete('/document/:id', async (req, res) => {
        if (req.params.id === "undefined" || !req.params.id)
            return res.status(400).json({message: "No specified ID found"});
        let document = await Documents.findById(req.params.id).exec();
        if (!document)
            return res.status(404).json({message: "Document not found"});
        document.delete();
        return res.status(200).json({message: "The document was delete"});
    });

    app.get('/document/:id', async (req, res) => {
        if (req.params.id === "undefined" || !req.params.id)
            return res.status(400).json({message: "No specified ID found"});
        let document = await Documents.findById(req.params.id).exec();
        if (!document)
            return res.status(404).json({message: "Document not found"});
        return res.status(200).json({id: document._id, name: document.name, filename: document.filename});
    });

    app.post('/document', upload.single('document'), async (req, res) => {
        if (!req.body.name || !req.file)
            return res.status(400).json({message: "Name or file missing"});
        let document = new Documents({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            filename: req.file.filename
        });
        await document.save();
        return res.status(200).json({id: document._id, name: document.name, path: document.filename});
    });
};
