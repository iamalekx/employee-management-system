import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
    return (
        <div className="rounded-2xl flex bg-white h-30 w-100">
            <div className={`text-5xl flex justify-center rounded-3xl items-center w-30 text-white px-4 ${color}`}>{icon}</div>
            <div className="pl-4 flex flex-col justify-around ml-8 py-2">
                <p className="text-lg font-semibold">{text}</p>
                <p className="text-xl font-bold">{number}</p>
            </div>
        </div>
    );
};

export default SummaryCard;
