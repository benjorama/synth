export const getSharp = (pitch: string) => pitch.slice(0, 1) + "#" + pitch.slice(1)

export const getFlat = (pitch: string, sharp: boolean) => {
    const octave = sharp ? parseInt(pitch.slice(2, 3)) : parseInt(pitch.slice(1, 2)) 

    if (pitch.includes('A')) {
        return `Gb${octave - 1}`
    } else if (pitch.includes('B')) {
        return `Ab${octave}`
    } else if (pitch.includes('C')) {
        return `Bb${octave}`
    } else if (pitch.includes('D')) {
        return `Cb${octave}`
    } else if (pitch.includes('E')) {
        return `Db${octave}`
    } else if (pitch.includes('F')) {
        return `Eb${octave}`
    } else if (pitch.includes('G')) {
        return `Fb${octave}`
    }
}