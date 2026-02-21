import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90">
      <div className="text-center">
        <div className="text-6xl text-pink-400 mb-4 tracking-widest">K-POP ZOMBIE</div>
        <div className="text-5xl font-bold text-pink-400 mb-8">ROAD WARRIOR</div>
        <div className="text-xl text-pink-300 mb-12">WA STATE EDITION • v4.0</div>
        <button
          onClick={() => navigate('/garage')}
          className="neo-brutalist bg-pink-500 hover:bg-pink-400 text-black text-3xl px-16 py-8 font-bold active:scale-95 transition-all"
        >
          START THE APOCALYPSE DRIVE
        </button>
      </div>
    </div>
  );
}
