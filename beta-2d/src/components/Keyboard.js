/**
 * Function to detect which key was pressed
 * 
 * Reference: github.com/kittykatattack/learningPixi
 * @param {*} value 
 * @returns 
 */

import { useEffect } from "react";

    
export default function keyboard(value) {
    if (typeof window !== "undefined") {

        const key = {};
        key.value = value;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;


        key.downHandler = (event) => {
            if (event.key === key.value) {

                if (key.isUp && key.press) {
                    key.press();
                }

                key.isDown = true;
                key.isUp = false;
                event.preventDefault();
            }
        };


        key.upHandler = (event) => {
            if (event.key === key.value) {

                if (key.isDown && key.release) {
                    key.release();
                }

                key.isDown = false;
                key.isUp = true;
                event.preventDefault();
            }
        };

        //Attach event listeners
        const downListener = key.downHandler.bind(key);
        const upListener = key.upHandler.bind(key);
        
        window.addEventListener("keydown", downListener, false);
        window.addEventListener("keyup", upListener, false);
        
        // Detach event listeners
        key.unsubscribe = () => {
            window.removeEventListener("keydown", downListener);
            window.removeEventListener("keyup", upListener);
        };
        
        return key;
    }
}