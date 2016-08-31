export default function power_of_2(n) {
    if (typeof n !== 'number')
        throw new Error("Not a number");
    return n && (n & (n - 1)) === 0;
}  