export default function handler(req, res) {
    
    const body = req.body;

    if (body.username === process.env.USER && body.pass === process.env.PASS) {
        res.status(200).json({status: true});
    } else {
        res.status(200).json({status: false});
    }

}
  