import { useState } from 'react';
import axios from 'axios';
import Graph from './components/Graph';
//import PrereqList from './components/PrereqList';

type PrereqData = {
  topic: string;
  prerequisites: string[];
};

function App() {
  const [topic, setTopic] = useState('');
  const [data, setData] = useState<PrereqData | null>(null);

  const handleSubmit = async () => {
    if (!topic.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/prerequisites', { topic });
      setData(res.data);
    } catch (err) {
      console.error('Error fetching prerequisites', err);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '40px',
          width: '100%',
          maxWidth: '1400px',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          alignItems: 'flex-start',
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ flex: 1.1 }}>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 700,
              marginBottom: '20px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Concept Prerequisite Graph
          </h1>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g. Machine Learning)"
              style={{
                padding: '12px',
                fontSize: '16px',
                flexGrow: 1,
                border: '1px solid #ccc',
                borderRadius: '6px',
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                padding: '12px 20px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Generate
            </button>
          </div>

          {data && (
            <>
              <h3 style={{ marginTop: '24px', marginBottom: '10px' }}>Prerequisite List</h3>
              <ul style={{ paddingLeft: '18px', listStyleType: 'disc' }}>
                {data.prerequisites.map((item, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div style={{ flex: 2, minHeight: '500px' }}>
          {data && (
            <>
              <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>
                Graph for <span style={{ color: '#007bff' }}>{data.topic}</span>
              </h2>
              <Graph topic={data.topic} prerequisites={data.prerequisites} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;