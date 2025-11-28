const genererJeton = ()=>{
    const token = Math.floor(100000 + Math.random() * 900000).toString()
    return token
}

module.exports = genererJeton