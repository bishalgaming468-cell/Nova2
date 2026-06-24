import { Handler } from '@netlify/functions';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { messages, model = 'llama-3.3-70b-versatile' } = JSON.parse(event.body || '{}');

    if (!process.env.GROQ_API_KEY) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          response: '⚠️ Groq API key not configured. Add GROQ_API_KEY to Netlify environment variables.',
          model: 'mock'
        }),
      };
    }

    const formatted = messages.map((m: any) => ({
      role: m.role,
      content: m.image_url 
        ? [{ type: 'text', text: m.content }, { type: 'image_url', image_url: { url: m.image_url } }]
        : m.content
    }));

    const completion = await groq.chat.completions.create({
      messages: formatted,
      model,
      temperature: 0.7,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: completion.choices[0]?.message?.content || '',
        model: completion.model,
        usage: completion.usage,
      }),
    };
  } catch (error: any) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
