export default async function handler(req, res) {
    try {
      await res.revalidate('/');
      return res.status(200).json({ revalidated: true });
    } catch (err) {
      console.log('error <---- ', err);
      return res.status(500).send('Error revalidating');
    }
  }