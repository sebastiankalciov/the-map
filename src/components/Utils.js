import {showPapyrusContainer} from "@/components/PapyrusContainer.js";

let lastInteractionTime = 0;
const distanceBetweenTwoPoints  = (p1, p2) => {

    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
};

/**
 * # Class to handle different useful functions
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
     * @param {pixi_sprite} hut - Hut object
     * @param {character_sprite} character - Character object
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

	/**
	 * ## Handle the interaction between a user and an object
	 * @param {pixi_app} app - Pixi Application
	 * @param {pixi_sprite} object - Sprite object
	 * @param {papyrus_container} papyrus - Papyrus object
	 * @param {character_sprite} character - Character sprite
	 * @param {number} clickInteractionDistance - Distance between the user and the object
	 */
    handleObjectClick(app, object, papyrus, character, clickInteractionDistance) {

        const currentTime = Date.now();

        if (currentTime - lastInteractionTime < 1000) {
            return;
        }

        object.on('pointerdown', () => {

            if (distanceBetweenTwoPoints(object, character) < clickInteractionDistance) {

                showPapyrusContainer(papyrus);
                return;
            }
        });
    }

};

export default Utils;