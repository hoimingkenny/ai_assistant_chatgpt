// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "hello"
      }
    ]
  }

  console.log(process.env.OPENAI_API_KEY);

  const resp = await fetch("https://production.hello-world-tiny-bar-2bdc.chenghoiming.workers.dev/v1/chat/completions", {
    headers: { 
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })

  const json = await resp.json();

  // the response will be a JSON object
  res.status(200).json({...json.choices[0].message});
}
