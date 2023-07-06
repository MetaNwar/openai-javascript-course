"use client"
import React, { useState} from 'react';
import Emoji from "../components/Emoji";

// React Function Component
const NextJSReview = () => {
    // Logic, functions, data goes here
    const firstName = "Jah";
   

    const [lastName, setLastName] = useState("");

    const handleSubmit = async () => {
        console.log("Foo");

        const response = await fetch("api/apinext", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ key: "Some Message", lastName}),
        });
        console.log(response);

        const responseJSON = await response.json();
        console.log(responseJSON);
    };

    // Each component returns some jsx => allows us to write HTML in react BETTTER!
  return (
    <div>
        <p>This is where our Page appears</p>
        <p>Tailwind CSS is Awesome!</p>
        <p className="text-red-500">{firstName}</p>
        
        
        {/* STATE */}
        <div className="flex flex-col space-y-4">
            <div>
                <p>My last name is {lastName} </p>
                <input 
                  type="text"
                  className="outline w-32 rounded-md"
                  onChange={(e) => {
                    setLastName(e.target.value)
                    }} 
                />

                <button onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>

        {/* EMOJI */}
        <Emoji color="green" />

    </div>
  );
};

export default NextJSReview