export default function EventModal({ question, onClose }: { question: any; onClose: () => void }) {
  const handleAnswer = (index: number) => {
    if (index === question.correct) {
      alert("✅ SLAYED! +35 Z-Coins");
      // Update store in real app
    } else {
      alert("❌ Omo... -18 miles");
    }
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/95 z-50 flex items-center justify-center">
      <div className="neo-brutalist bg-stone-900 max-w-lg w-full p-10">
        <div className="text-3xl text-pink-400 mb-6 text-center">🚧 ZOMBIE ROADBLOCK QUIZ</div>
        <div className="text-xl mb-10 text-center leading-tight">{question.q}</div>

        <div className="space-y-4">
          {question.a.map((opt: string, i: number) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="neo-brutalist w-full py-6 text-left px-8 bg-stone-800 hover:bg-pink-900 text-lg"
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          ))}
        </div>

        <div onClick={onClose} className="text-center mt-10 text-stone-500 cursor-pointer text-sm">SKIP (-5 miles)</div>
      </div>
    </div>
  );
}
