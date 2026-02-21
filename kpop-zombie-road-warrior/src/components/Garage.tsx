import { useGameStore } from '../store';
import { useNavigate } from 'react-router-dom';
export default function Garage() {
  const { mileage, zcoins, handling, durability, fuel } = useGameStore();
  const navigate = useNavigate();
  const buyUpgrade = (index: number) => {
    const costs = [75, 120, 90, 200];
    if (zcoins < costs[index]) return alert("Not enough Z-Coins!");
    // Logic handled in store if needed - for demo we just alert
    alert(`UPGRADE ${index} PURCHASED!`);
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col">
      <div className="hud p-6 flex justify-between items-center border-b-8 border-stone-800">
        <div className="text-3xl text-pink-400">GARAGE</div>
        <div className="flex gap-8 text-xl">
          <div>MILEAGE: <span className="text-pink-400">{Math.floor(mileage)}</span>/2800</div>
          <div>Z-COINS: <span className="text-yellow-400">{zcoins}</span></div>
        </div>
        <button onClick={() => navigate('/drive')} className="neo-brutalist bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-4 text-xl font-bold">
          HIT THE WASTELAND →
        </button>
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="neo-brutalist bg-stone-800 p-8 mb-12 text-center">
            <div className="text-4xl text-pink-400 mb-4">THE PINK BUG BEAST</div>
            <div className="text-8xl mb-6">🚗💖</div>
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div>Handling <span className="block text-3xl text-pink-400">{handling}</span></div>
              <div>Durability <span className="block text-3xl text-pink-400">{durability}</span></div>
              <div>Fuel <span className="block text-3xl text-pink-400">{fuel}</span></div>
            </div>
          </div>

          <div className="text-2xl text-pink-400 mb-6">UPGRADES</div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "SPIKED WHEELS", desc: "+2 Handling", cost: 75 },
              { name: "ARMOR PLATES", desc: "+30 Durability", cost: 120 },
              { name: "NITRO BOOST", desc: "+20 Fuel", cost: 90 },
              { name: "SHOTGUN TURRET", desc: "+10% Z-Coins", cost: 200 }
            ].map((up, i) => (
              <div key={i} onClick={() => buyUpgrade(i)} className="neo-brutalist bg-stone-800 p-6 cursor-pointer hover:bg-pink-900 transition-all">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg">{up.name}</div>
                    <div className="text-xs text-stone-400">{up.desc}</div>
                  </div>
                  <div className="text-yellow-400 font-bold text-xl">{up.cost} Z</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hud p-6 border-t-8 border-stone-800 flex gap-4">
        <button onClick={() => navigate('/parent')} className="flex-1 py-5 border-4 border-pink-400">PARENT DASHBOARD</button>
        <button onClick={() => window.location.reload()} className="flex-1 py-5">POWER OFF</button>
      </div>
    </div>
  );
}
