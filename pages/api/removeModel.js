const fs = require('fs');

export default function handler(req, res) {
    const path = `./public/${req.body.brand}/${req.body.model}`;
    console.log('the path ---->', path);
    let error = false;

    fs.rm(path, { recursive: true, force: true }, (err) => {
        if (err) {
            console.log('error deleting directory ----> ', err);
            error = true;
            return res.status(200).json({error: error});
        } else {
            //await res.revalidate('/edit')
            return res.status(200).json({error: error});
        }
        });
}