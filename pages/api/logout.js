import { withSessionRoute } from "@/lib/withSession";

export default withSessionRoute(logout);

async function logout(req, res, session) {
    req.session.destroy();
    res.send({ok: true})
}