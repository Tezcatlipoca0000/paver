const fs = require('fs');

export default function handler(req,res) {

    const folder = `./public/${req.body.errase}`;
    let error = false;

    
    fs.rm(folder, { recursive: true, force: true }, (err) => {
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