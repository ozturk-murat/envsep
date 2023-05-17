"use client";
import Image from "next/image";

interface CardProps {
    onClose: () => void;
  }

  const Card: React.FC<CardProps> = ({ onClose }) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className=" w-auto bg-white rounded-lg p-6 flex flex-col z-50 items-center justify-center text-center">
        <p className="text-black/80 text-md">
            <b>Environment variable key/value separator</b>
          </p>
          <br />
          <p className="text-black/80 text-sm">You can paste env keys and values directly on the form, <br />
          the form will separate all keys and values.</p>
          
        
        <Image
          className="mt-5"
          width={672}
          height={420}
          alt="example-gif"
          src={"/example.gif"}
          priority={true}
        />
        <button onClick={onClose} className="text-white/70 bg-green-500 rounded-sm w-60 h-10 mt-5">
          Close
        </button>
      </div>
    </div>
  );
};

export default Card;
