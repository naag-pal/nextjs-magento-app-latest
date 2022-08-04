// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const webPush = require('web-push');

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const { subscription } = req.body;

    webPush
      .sendNotification(
        subscription,
        JSON.stringify({ title: 'Hello Web Push', message: 'Your web push notification is here!' })
      )
      .then((response) => {
        res.writeHead(response.statusCode, response.headers).end(response.body);
      })
      .catch((err) => {
        if ('statusCode' in err) {
          res.writeHead(err.statusCode, err.headers).end(err.body);
        } else {
          console.error(err);
          res.statusCode = 500;
          res.end();
        }
      });
  } else {
    res.statusCode = 405;
    res.end();
  }
  //res.status(200).json({ name: 'John Doe' })
}
