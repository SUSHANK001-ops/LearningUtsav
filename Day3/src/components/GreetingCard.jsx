import React, { useMemo } from "react";

const dashainGreetings = [
    "Wishing you and your family a very Happy Dashain! May this festival of joy bring peace, prosperity, and endless happiness to your home. Let tika and jamara strengthen the bond of love and blessings in your life.",
    "On this auspicious occasion of Dashain, may you be blessed with success, good health, and prosperity. May the divine power protect you and your loved ones, and may happiness always surround you.",
    "Happy Dashain! As kites soar high in the sky and swings sway with laughter, may your days be filled with new hopes, harmony, and joy. Celebrate this season of togetherness with love and blessings.",
    "Dashain is the time of unity and blessings. May your heart be filled with peace, your home with laughter, and your life with prosperity. Wishing you a festive season full of cherished memories.",
    "As the fragrance of flowers fills the air and tika brightens every forehead, may this Dashain bring light, happiness, and love to your family. Celebrate with joy, togetherness, and gratitude.",
    "May this Dashain inspire new beginnings and endless opportunities. With each blessing received, may your life be filled with positivity, strength, and the courage to achieve great things.",
    "Happy Dashain! May this sacred festival guide you towards success, protect you from negativity, and bring everlasting peace to your home. Wishing you days of joy and prosperity.",
    "This Dashain, may the blessings of Goddess Durga give you the strength to overcome challenges, the wisdom to choose the right path, and the courage to follow your dreams.",
    "Let this Dashain be a reminder of love, harmony, and traditions that bind us together. May you enjoy delicious feasts, joyful gatherings, and the warmth of family and friends.",
    "Sending heartfelt Dashain wishes your way! May your home be filled with happiness, your relationships grow stronger, and your life be decorated with success and good fortune.",
];

const GreetingCard = ({ name }) => {
   
    const greeting = useMemo(() => {
        const idx = Math.floor(Math.random() * dashainGreetings.length);
        return dashainGreetings[idx];
    }, [name]);

    return (
        <div className="relative w-full max-w-xl mx-auto p-8 bg-gradient-to-br from-yellow-100 via-red-100 to-green-100 shadow-2xl rounded-3xl mt-12 border-4 border-yellow-400 overflow-hidden animate-fade-in">
           
            <img src="./kite.png" alt="Kite" className="absolute w-20 sm:w-24 top-[-30px] left-[-30px] rotate-[-15deg] opacity-90 animate-float" />
            <img src="./jamara.png" alt="Jamara" className="absolute w-16 sm:w-20 bottom-[-20px] left-6 opacity-90 animate-grow" />
            <img src="./tika.png" alt="Tika" className="absolute w-12 sm:w-16 top-8 right-8 rounded-full " />
            <img src="./swing.png" alt="Swing" className="absolute w-20 sm:w-24 bottom-[-30px] right-[-20px] opacity-80 animate-swing" />

            {/* Card Content */}
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="mb-4 text-3xl sm:text-4xl font-extrabold text-red-700 italic drop-shadow-lg tracking-wide animate-slide-down">
                    शुभ दशैं, {name}!
                </h1>
                <p className="text-lg sm:text-xl text-gray-800 text-center font-medium leading-relaxed rounded-xl px-6 py-4 s animate-fade-in">
                    {greeting}
                </p>
            </div>
        </div>
    );
};

export default GreetingCard;


