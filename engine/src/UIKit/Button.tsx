export default function Button({ text, func }: { text: string; func: () => void }) { 
    return (
        <button
            className="w-40 p-5 text-white font-mono text-3xl bg-cyan-500 rounded-xl m-4"
            onClick={func}
        >
            {text}
        </button>
    )
}