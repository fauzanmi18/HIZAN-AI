import { Groq } from 'groq-sdk'

const apiKey = import.meta.env.VITE_GROQ_API_KEY

console.log(`api key`, apiKey)

const groq = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
})

export const groqRequest = async(content) => {
    const reply = await groq.chat.completions.create({
        messages: [{
            role: 'user',
            content
        }], 
        model: 'llama3-8b-8192'
    })

    return reply.choices[0].message
}