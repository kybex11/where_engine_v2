import '../App.css';

interface InputProps {
    placeholder: string;
    onchange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
}

export default function Input({ placeholder, onchange, value }: InputProps) {
    return (
        <div className="justify-center text-center items-center">
            <input 
                type="text"
                placeholder={placeholder}
                onChange={onchange}
                value={value}
                className='border border-gray-300 rounded-md p-2 shadow-md focus:outline-none focus:ring-2 font-bold focus:ring-blue-500 h-10 w-full'
            />   
        </div>
       
    )
}