import { OpenAIApi, Configuration } from 'openai';

export default async function handler(req, res) {
  try {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(config);

    const topic = 'cat ownership';
    const keywords = 'first time cat owner, kitten diet';

    const response = await openai.createChatCompletion({
      model: 'gpt-4o-mini-2024-07-18',
      messages: [
        {
          role: 'system',
          content:
            'You are an SEO friendly blog post generator called BlogStandard. You are designed to output markdown without frontmatter.',
        },
        {
          role: 'user',
          content: `
          Generate me a long and detailed seo friendly blog post on the following topic delimited by triple hyphens:
          ---
          ${topic}
          ---
          Targeting the following comma separated keywords delimited by triple hyphens:
          ---
          ${keywords}
          ---
        `,
        },
      ],
    });

    res
      .status(200)
      .json({ postContent: response.data.choices[0]?.message?.content });
  } catch (error) {
    console.error(error.response.data ?? error.message);
    res.status(500).json({ error: error.response.data ?? error.message });
  }
}
