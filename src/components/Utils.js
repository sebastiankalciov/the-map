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
     * @param {integer} CLICK_INTERACTION_DISTANCE - Allowed distance between the user and a hut
     */
    handleHutClick(hut, character, CLICK_INTERACTION_DISTANCE) {

        const currentTime = Date.now();

        if (currentTime - lastInteractionTime < 1000) {
            return;
        }

        hut.sprite.on('pointerdown', () => {
            if (distanceBetweenTwoPoints(hut.sprite, character) < CLICK_INTERACTION_DISTANCE) {
                window.location.href = `huts/${hut.location}`;
                lastInteractionTime = currentTime;
                return;
            }
        });
    },
    /**
     * ## Handle the interaction when a user enters a hut.
     * @param {*} hut
     * @param {*} character
     * @param {integer} INTERACTION_DISTANCE
     */
    handleHutInteraction(hut, character, INTERACTION_DISTANCE){

        const currentTime = Date.now();

        if (currentTime - lastInteractionTime < 1000) {
            return;
        }

        if (distanceBetweenTwoPoints(hut.sprite, character) < INTERACTION_DISTANCE) {
            window.location.href = `huts/${hut.location}`;
            lastInteractionTime = currentTime;
            return;
        }
    }
};

export default Utils;