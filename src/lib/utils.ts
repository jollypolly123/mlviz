const randInt = (minN: number, maxN: number): number => {
    return Math.floor(Math.random()*(maxN - minN) + minN)
}

export { randInt }