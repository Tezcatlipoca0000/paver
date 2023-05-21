export default async function handler(req, res) {
    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      await res.revalidate('/');
      console.log('revalidated <------');
      return res.status(200).json({ revalidated: true });
    } catch (err) {
      console.log('error <---- ', err);
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send('Error revalidating');
    }
  }