function between(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function add(letter){
    if(letter.toLowerCase() == "i" || letter.toLowerCase() == "h") return letter

    let letters = ["j", "a", "b", "c", "d", "e", "f", "g", "h"]

    let hidden = letter == letter.toLowerCase()

    letter = letters[letters.indexOf(letter.toLowerCase())+1]

    return hidden ? letter : letter.toUpperCase()
}