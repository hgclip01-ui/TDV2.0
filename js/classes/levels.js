// assets/data/levels.js
'use strict';

const levels = [
    {
        waves: [
            { // Wave 1
                common: 5,
                fast: 2
            },
            { // Wave 2
                common: 6,
                fast: 3
            },
            { // Wave 3
                common: 8,
                fast: 4,
                range: 2
            },
            { // Wave 4
                common: 10,
                fast: 5,
                range: 3
            },
            { // Wave 5 (final)
                fast: 10,
                range: 5
            }
        ],
        waveCount: 5
    }
];

// Expose ke global
window.levels = levels;
