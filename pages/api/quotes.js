
const personal_quotes = [
    "We are in a playground, enjoy this without fear. There's no goal but in your head",
    "Shikan Taza is when you are facing death, it's the mindset of a warrior who's fighting another warrior in a death battle"
]


export default function handler(req, res) {
    res.status(200).json({ quotes: personal_quotes })
  }