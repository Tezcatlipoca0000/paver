import { IncomingForm } from "formidable";
const fs = require('fs');

export const config = {
    api: {
        bodyParser: false,
    },
};

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
    const result = await asyncParse(req);
    const brand = result.fields.brand;
    Object.keys(result.files).forEach((key) => {
        let oldPath = result.files[key].filepath;
        let newPath = `./public/${brand}/${result.files[key].originalFilename}`;
        fs.renameSync(oldPath, newPath);
    })

    res.status(200).json({error: false});
    
}