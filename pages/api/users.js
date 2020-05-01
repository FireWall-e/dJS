import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const {username, email, password} = req.query;

  let doc = await req.db.collection('users').findOne({
    $or: [{username}, {email}]
  })

  if (!doc) {
    await req.db.collection('users').insert({
      username,
      email,
      password
    });

    res.json({success: true})
  }

  res.json({success: false});
});

export default handler;
