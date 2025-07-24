import { DefaultTimeUnits } from 'ms-utility/dist/constants'
import Parser from 'ms-utility'

/**
 * This class is responsible of
 * handling and converting human time
 * to milliseconds.
 */
export const TimeParser = new Parser([
    ...DefaultTimeUnits,
    [
        'w', {
            word: 'week',
            ms: 1_000 * 60 * 60 * 24 * 7
        }
    ],[
        'M', {
            word: 'month',
            ms: 1_000 * 60 * 60 * 24 * 30
        }
    ],[
        'y', {
            word: 'year',
            ms: 1_000 * 60 * 60 * 24 * 30 * 12
        }
    ]
])
