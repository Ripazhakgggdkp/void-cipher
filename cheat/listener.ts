export const predefinedSequence = ['s', 'a', 'i', 'm', 'a', 'a']

export const compareSequences = (seq1: string[], seq2: string[]) => {
    if (seq1.length !== seq2.length) return false
    for (let i = 0; i < seq1.length; i++) {
        if (seq1[i] !== seq2[i]) return false
    }
    return true
}

export const keys_pressed = new Array(predefinedSequence.length)
