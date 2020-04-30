import React from "react";

export default function Styles () {
    return (
        <style jsx="true">{`
            body {
                color: white;
                font-family: Montserrat;
            }
            
            h2 {
                margin-bottom: 0;
            }
            
            input {
                background: none;
                border: none;
                border-bottom: 2px solid white;
                width: 100%;
                text-align: center;
                outline: none;
                caret-color: white;
                color: inherit;
                padding: 10px;
            }
            
            button {
                background: none;
                border: none;
                color: inherit;
            }
            
            button:focus {
                outline: none;
            }
            
            ::placeholder {
                color: inherit;
            }
        `}</style>
    );
}
