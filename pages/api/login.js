import { withSessionRoute } from "@/lib/withSession";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
    if (req.method === "POST") {
        const { username, pass } = req.body;

        if (username === process.env.USER && pass === process.env.PASS) {
            req.session.user = {
                username: process.env.USER,
                isAdmin: true
            };
            await req.session.save();
            return res.status(200).send({ ok: true });
        }
        return res.status(403).send("");
    }
    return res.status(404).send("");
}