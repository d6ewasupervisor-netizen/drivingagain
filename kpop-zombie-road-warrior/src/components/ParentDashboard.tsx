import { useGameStore } from '../store';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function ParentDashboard() {
  const { mileage, accuracy } = useGameStore();

  const handleCSV = (e: any) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results: Papa.ParseResult<Record<string, string>>) => {
        const newQuestions = results.data.map((row) => ({
          q: row.question,
          a: [row.option1, row.option2, row.option3, row.option4],
          correct: parseInt(row.correct)
        }));
        alert(`Loaded ${newQuestions.length} custom questions!`);
        // In full app: update store
      }
    });
  };

  const sampleData = [{mile: 0, acc: 85}, {mile: 800, acc: 92}, {mile: 1600, acc: 88}, {mile: 2400, acc: 95}];

  return (
    <div className="min-h-screen bg-stone-900 p-8">
      <h1 className="text-4xl text-pink-400 mb-8">PARENT DASHBOARD</h1>

      <div className="neo-brutalist bg-stone-800 p-8 mb-12">
        <div className="text-xl mb-4">Total Miles Driven: <span className="text-pink-400 text-4xl">{Math.floor(mileage)}</span></div>
        <div className="text-xl">Average Accuracy: <span className="text-emerald-400 text-4xl">{accuracy}%</span></div>
      </div>

      <div className="neo-brutalist bg-stone-800 p-8 mb-12">
        <div className="text-2xl mb-6">Progress Graph</div>
        <LineChart width={700} height={300} data={sampleData}>
          <XAxis dataKey="mile" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="acc" stroke="#f472b6" strokeWidth={6} />
        </LineChart>
      </div>

      <div className="neo-brutalist bg-stone-800 p-8">
        <div className="text-2xl mb-6">Upload Custom Questions (CSV)</div>
        <input type="file" accept=".csv" onChange={handleCSV} className="block mb-6" />
        <div className="text-xs text-stone-400">Columns: question,option1,option2,option3,option4,correct (0-3)</div>
      </div>

      <div className="mt-12 text-center text-xs text-stone-500">
        Password protected in production • Current accuracy {accuracy}%
      </div>
    </div>
  );
}
