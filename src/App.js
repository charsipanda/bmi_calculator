import "./App.css";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [units, setUnits] = useState('imperial');
  const [history, setHistory] = useState([]);

  const calcBmi = (e) => {
    e.preventDefault();
    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight & height');
    } else {
      let calculatedBmi;
      if (units === 'imperial') {
        calculatedBmi = (weight / (height * height) * 703);
      } else {
        calculatedBmi = (weight / ((height / 100) * (height / 100)));
      }
      const newBmi = calculatedBmi.toFixed(1);
      setBmi(newBmi);

      if (newBmi < 18.5) {
        setMessage('You are underweight');
      } else if (newBmi >= 18.5 && newBmi < 24.9) {
        setMessage('You are healthy');
      } else {
        setMessage('You are overweight');
      }

      // Save history
      setHistory([...history, { date: new Date().toLocaleDateString(), bmi: newBmi }]);
    }
  }

  const reload = () => {
    window.location.reload();
  }

  const handleUnitChange = (e) => {
    setUnits(e.target.value);
    setWeight(0);
    setHeight(0);
    setBmi('');
    setMessage('');
  }
 
  return (
    <div className="App">
      <div className="container-wrapper">
        <div className="container mt-5 p-4 shadow-sm rounded">
          <h2 className="text-center">BMI Calculator</h2>
          
          <div className="spline-container">
          <iframe
            src="https://my.spline.design/3dpathsglassfluidcopy-6885cd556b8d48e9953332a11329bfc1/"
            frameBorder="0"
            allow="fullscreen"
            title="3D Spline Content"
          ></iframe>
        </div>


          <div className="d-flex justify-content-around mb-3">  
            <div>
              <input
                type="radio"
                value="imperial"
                checked={units === 'imperial'}
                onChange={handleUnitChange}
              /> Imperial (lbs, inches)
            </div>
            <div>
              <input
                type="radio"
                value="metric"
                checked={units === 'metric'}
                onChange={handleUnitChange}
              /> Metric (kg, cm)
            </div>
          </div>
          <form onSubmit={calcBmi}>
            <div className="mb-3">
              <label className="form-label">Weight ({units === 'imperial' ? 'lbs' : 'kg'})</label>
              <input
                type="number"
                className="form-control"
                placeholder={`Enter weight in ${units === 'imperial' ? 'lbs' : 'kg'}`}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Height ({units === 'imperial' ? 'inches' : 'cm'})</label>
              <input
                type="number"
                className="form-control"
                placeholder={`Enter height in ${units === 'imperial' ? 'inches' : 'cm'}`}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-between mb-3">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <button className="btn btn-outline-secondary" onClick={reload} type="button">
                Reload
              </button>
            </div>

            <div className="text-center">
              <h3 className="mt-3">Your BMI is: {bmi}</h3>
              <p>{message}</p>
            </div>
          </form>

          <div className="info-box mt-4 p-3 border rounded bg-light shadow-sm">
            <div className="mb-3">
              <h4>BMI Categories:</h4>
              <ul className="list-unstyled">
                <li>Underweight: &lt; 18.5</li>
                <li>Normal weight: 18.5 - 24.9</li>
                <li>Overweight: 25 - 29.9</li>
                <li>Obesity: &gt;= 30</li>
              </ul>
            </div>
            <div>
              <h4>Health Tips:</h4>
              <p>
                {message === 'You are underweight' && 'Consider eating more nutritious and calorie-dense foods.'}
                {message === 'You are healthy' && 'Maintain your healthy lifestyle to keep your BMI in this range.'}
                {message === 'You are overweight' && 'Consider incorporating more physical activity into your routine and watching your diet.'}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h4>BMI History:</h4>
            <ul className="list-unstyled">
              {history.map((entry, index) => (
                <li key={index}>Date: {entry.date}, BMI: {entry.bmi}</li>
              ))}
            </ul>
          </div>

        </div>

        
      </div>
    </div>
  );
}

export default App;
