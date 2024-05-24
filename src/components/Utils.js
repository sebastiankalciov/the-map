let lastInteractionTime = 0;
const distanceBetweenTwoPoints  = (p1, p2) => {

    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
};

/**
 * # Class to handle different useful functions
 *
 */
const Utils = {

    /**
     * ## Handle the interaction when a user clicks a hut.
     * @param {*} hut - Hut object
     * @param {*} character - Character object
     * @param {number} clickInteractionDistance - Distance between the user and a hut
     */
    handleHutClick(hut, character, clickInteractionDistance) {

        const currentTime = Date.now();

        if (currentTime - lastInteractionTime < 1000) {
            return;
        }

        hut.sprite.on('pointerdown', () => {
            if (distanceBetweenTwoPoints(hut.sprite, character) < clickInteractionDistance) {
                window.location.href = `huts/${hut.location}`;
                lastInteractionTime = currentTime;
                return;
            }
        });
    },

    /**
     * ## Handle the interaction when a user enters a hut.
     * @param {*} hut - Hut object
     * @param {*} character - Character object
     * @param {number} interactionDistance - Distance between the user and a hut
     */
    handleHutInteraction(hut, character, interactionDistance){

        const currentTime = Date.now();

        if (currentTime - lastInteractionTime < 1000) {
            return;
        }

        if (distanceBetweenTwoPoints(hut.sprite, character) < interactionDistance) {
            window.location.href = `huts/${hut.location}`;
            lastInteractionTime = currentTime;
            return;
        }
    },

    handleObjectClick(app, object, book, character, clickInteractionDistance) {

        const currentTime = Date.now();

        if (currentTime - lastInteractionTime < 1000) {
            return;
        }

        object.on('pointerdown', () => {
            if (distanceBetweenTwoPoints(object, character) < clickInteractionDistance) {
                book.visible = true;
                return;
            }
        });
    }
};

export default Utils;