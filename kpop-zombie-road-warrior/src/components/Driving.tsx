import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store';
import DrivingScene from './DrivingScene';
import EventModal from './EventModal';
import CoachBubble from './CoachBubble';

export default function Driving() {
  const navigate = useNavigate();
  const { mileage: savedMileage, zcoins, questions } = useGameStore();
  const [currentMileage, setCurrentMileage] = useState(savedMileage);
  const [isPaused, setIsPaused] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [weather, setWeather] = useState<'clear' | 'rain' | 'snow' | 'fog'>('clear');

  useEffect(() => {
    const interval = setInterval(() => {
      const weathers: any = ['clear','rain','snow','fog'];
      setWeather(weathers[Math.floor(Math.random()*4)]);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  const handleMileageUpdate = (miles: number) => {
    setCurrentMileage(miles);
    if (miles >= 2800) {
      alert("🏆 LICENSE EARNED! You reached Spokane!");
      navigate('/garage');
    }
  };

  const triggerEvent = () => {
    if (Math.random() > 0.6) {
      setCurrentQuestion(Math.floor(Math.random() * questions.length));
      setShowEvent(true);
    }
  };

  useEffect(() => {
    const eventTimer = setInterval(triggerEvent, 12000);
    return () => clearInterval(eventTimer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <DrivingScene
        onMileageUpdate={handleMileageUpdate}
        weather={weather}
        currentMileage={currentMileage}
      />

      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 z-50 hud p-4 flex justify-between text-sm">
        <div>MILEAGE <span className="font-mono text-2xl text-pink-400">{Math.floor(currentMileage)}</span></div>
        <div className="text-pink-400 text-2xl tracking-widest">SLAYER</div>
        <div>Z-COINS <span className="text-yellow-400">{zcoins}</span></div>
      </div>

      <CoachBubble message="Hwaiting! The Pink Bug Beast is rolling 🔥" />

      <button onClick={() => setIsPaused(true)} className="absolute top-4 right-4 z-50 text-3xl">⏸</button>

      {showEvent && (
        <EventModal
          question={questions[currentQuestion]}
          onClose={() => setShowEvent(false)}
        />
      )}

      {isPaused && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="neo-brutalist bg-stone-900 p-12 text-center">
            <div className="text-4xl text-pink-400 mb-8">PAUSED</div>
            <button onClick={() => setIsPaused(false)} className="neo-brutalist bg-white text-black py-6 px-16 text-2xl mb-4 block w-full">RESUME</button>
            <button onClick={() => navigate('/garage')} className="neo-brutalist bg-stone-700 py-6 px-16 text-2xl w-full">RETURN TO GARAGE</button>
          </div>
        </div>
      )}
    </div>
  );
}
