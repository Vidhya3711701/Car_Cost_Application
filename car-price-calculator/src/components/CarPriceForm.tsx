// src/components/CarPriceForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const CarPriceForm: React.FC = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    colour: 'White',
    seatMaterial: 'Fabric',
    performance: 'Normal',
    seats: 4,
    virtualAssistant: false,
    selfDriving: false,
    facialRecognition: false,
  });

  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, type, value } = target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (target as HTMLInputElement).checked
          : type === 'number'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrice(null);

    try {
      const response = await axios.post('https://carpricing.web.app/calculate', form);
      setPrice(response.data.price);
    } catch (err) {
      setError('Error calculating price. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Car Price Calculator</h2>

      <input
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        required
      />

      <input
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <label>Colour</label>
      <select name="colour" value={form.colour} onChange={handleChange}>
        <option>White</option>
        <option>Black</option>
        <option>Silver</option>
        <option>Blue</option>
        <option>Pearl White</option>
        <option>Metallic Red</option>
        <option>Midnight Blue</option>
      </select>

      <label>Seat Material</label>
      <select name="seatMaterial" value={form.seatMaterial} onChange={handleChange}>
        <option>Fabric</option>
        <option>Synthetic Leather</option>
      </select>

      <label>Performance</label>
      <select name="performance" value={form.performance} onChange={handleChange}>
        <option>Normal</option>
        <option>Sport</option>
      </select>

      <label>Seats</label>
      <input
        type="number"
        name="seats"
        min={2}
        max={6}
        value={form.seats}
        onChange={handleChange}
      />

      <label>
        <input
          type="checkbox"
          name="virtualAssistant"
          checked={form.virtualAssistant}
          onChange={handleChange}
        />
        Virtual Assistant
      </label>

      <label>
        <input
          type="checkbox"
          name="selfDriving"
          checked={form.selfDriving}
          onChange={handleChange}
        />
        Self Driving
      </label>

      <label>
        <input
          type="checkbox"
          name="facialRecognition"
          checked={form.facialRecognition}
          onChange={handleChange}
        />
        Facial Recognition
      </label>

      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate Price'}
      </button>

      {price !== null && <p>Total Price: ${price}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default CarPriceForm;
