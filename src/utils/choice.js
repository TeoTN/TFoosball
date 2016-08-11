import randy from 'randy';

export default function choice(arr, n) {
    return randy.shuffle(arr.slice()).slice(0 - n);
}
