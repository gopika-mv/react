import { useState } from 'react';

export default function BusBooking() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeats, setShowSeats] = useState(false);
  const [confirmedTickets, setConfirmedTickets] = useState([]); // ← New state

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune'];

  const availableBuses = [
    { id: 1, name: 'Express Travels', departure: '06:00 AM', arrival: '02:00 PM', price: 500, type: 'AC Sleeper' },
    { id: 2, name: 'Royal Transport', departure: '08:30 AM', arrival: '04:30 PM', price: 450, type: 'AC Semi-Sleeper' },
    { id: 3, name: 'City Bus Service', departure: '11:00 AM', arrival: '07:00 PM', price: 400, type: 'Non-AC Seater' },
    { id: 4, name: 'Night Rider', departure: '10:00 PM', arrival: '06:00 AM', price: 600, type: 'AC Sleeper' }
  ];

  const handleSearch = () => {
    if (from && to && date && from !== to) {
      setBuses(availableBuses);
    } else {
      alert('Please fill all fields and select different cities');
    }
  };

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    setShowSeats(true);
    setSelectedSeats([]);
  };

  const toggleSeat = (seatNum) => {
    if (selectedSeats.includes(seatNum)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNum));
    } else {
      setSelectedSeats([...selectedSeats, seatNum]);
    }
  };

  const bookedSeats = [5, 6, 12, 18, 23];
  const totalSeats = 40;

  const handleBooking = () => {
    if (selectedSeats.length > 0) {
      const newTicket = {
        id: Date.now(),
        bus: selectedBus,
        seats: [...selectedSeats],
        total: selectedBus.price * selectedSeats.length,
        from,
        to,
        date
      };

      // Add to confirmed tickets
      setConfirmedTickets([...confirmedTickets, newTicket]);

      // Reset selection
      setFrom('');
      setTo('');
      setDate('');
      setBuses([]);
      setSelectedBus(null);
      setShowSeats(false);
      setSelectedSeats([]);
    } else {
      alert('Please select at least one seat');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Bus Booking System</h1>

      {/* Search Form */}
      <div style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
        <h2>Search Buses</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label>From:</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ width: '100%', padding: '8px' }}>
              <option value="">Select City</option>
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div>
            <label>To:</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} style={{ width: '100%', padding: '8px' }}>
              <option value="">Select City</option>
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>
        <button onClick={handleSearch} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white' }}>
          Search Buses
        </button>
      </div>

      {/* Available Buses */}
      {buses.length > 0 && !showSeats && (
        <div>
          <h2>Available Buses</h2>
          {buses.map(bus => (
            <div key={bus.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3>{bus.name}</h3>
                  <p>Type: {bus.type}</p>
                  <p>Departure: {bus.departure} | Arrival: {bus.arrival}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '24px', fontWeight: 'bold' }}>₹{bus.price}</p>
                  <button onClick={() => handleSelectBus(bus)} style={{ padding: '8px 20px', backgroundColor: '#28a745', color: 'white' }}>
                    Select Seats
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Seat Selection */}
      {showSeats && selectedBus && (
        <div>
          <button onClick={() => setShowSeats(false)} style={{ padding: '8px 15px', marginBottom: '15px', backgroundColor: '#6c757d', color: 'white' }}>
            ← Back to Buses
          </button>

          <div style={{ border: '1px solid #ddd', padding: '20px', backgroundColor: 'white' }}>
            <h2>Select Seats - {selectedBus.name}</h2>
            <p>Departure: {selectedBus.departure} | Price per seat: ₹{selectedBus.price}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
              {[...Array(totalSeats)].map((_, i) => {
                const seatNum = i + 1;
                const isBooked = bookedSeats.includes(seatNum);
                const isSelected = selectedSeats.includes(seatNum);
                return (
                  <button
                    key={seatNum}
                    onClick={() => !isBooked && toggleSeat(seatNum)}
                    disabled={isBooked}
                    style={{
                      padding: '15px',
                      border: '1px solid #333',
                      backgroundColor: isBooked ? '#ccc' : isSelected ? '#28a745' : 'white',
                      color: isBooked ? '#666' : isSelected ? 'white' : '#333',
                      cursor: isBooked ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {seatNum}
                  </button>
                );
              })}
            </div>

            {selectedSeats.length > 0 && (
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
                <h3>Booking Summary</h3>
                <p>Selected Seats: {selectedSeats.join(', ')}</p>
                <p>Total Amount: ₹{selectedBus.price * selectedSeats.length}</p>
                <button onClick={handleBooking} style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white' }}>
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmed Tickets */}
      {confirmedTickets.length > 0 && (
        <div style={{ marginTop: '30px', border: '1px solid #ddd', padding: '20px', backgroundColor: '#fff3cd' }}>
          <h2>Confirmed Tickets</h2>
          {confirmedTickets.map(ticket => (
            <div key={ticket.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', backgroundColor: 'white' }}>
              <p><strong>Bus:</strong> {ticket.bus.name}</p>
              <p><strong>From:</strong> {ticket.from} → <strong>To:</strong> {ticket.to}</p>
              <p><strong>Date:</strong> {ticket.date}</p>
              <p><strong>Seats:</strong> {ticket.seats.join(', ')}</p>
              <p><strong>Total:</strong> ₹{ticket.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
