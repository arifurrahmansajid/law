// src/page/Booking/BookingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BookingPage = () => {
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [existingAppointments, setExistingAppointments] = useState([]);
  const [lawyerStats, setLawyerStats] = useState([]);
  const [allLawyers, setAllLawyers] = useState([]);
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF6347"];
  
  useEffect(() => {
    console.log("BookingPage loaded");
    
    const fetchAllLawyers = async () => {
      try {
        const response = await fetch('/lawyers.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setAllLawyers(data);
        return data;
      } catch (error) {
        console.error("Error fetching lawyers:", error);
        toast.error('Error loading lawyer data');
        return [];
      }
    };
    
    const storedLawyer = sessionStorage.getItem('bookingLawyer');
    console.log("Session storage data:", storedLawyer);
    
    if (!storedLawyer) {
      console.error("No lawyer data in session storage");
      toast.error('Lawyer information not found');
      navigate('/');
      return;
    }

    const loadData = async () => {
      try {
        const lawyerData = JSON.parse(storedLawyer);
        console.log("Parsed lawyer data:", lawyerData);
        setLawyer(lawyerData);
        
        const lawyers = await fetchAllLawyers();
        
        const savedAppointments = localStorage.getItem('lawyerAppointments');
        let appointments = [];
        if (savedAppointments) {
          appointments = JSON.parse(savedAppointments);
          setExistingAppointments(appointments);
        } else {
          localStorage.setItem('lawyerAppointments', JSON.stringify([]));
        }
        
        generateLawyerStatistics(lawyers, appointments);
        
        setLoading(false);
      } catch (error) {
        console.error("Error parsing lawyer data:", error);
        toast.error('Error loading lawyer data');
        navigate('/');
      }
    };
    
    loadData();
  }, [navigate]);
  
  const generateLawyerStatistics = (lawyers, appointments) => {
    const appointmentCounts = {};
    
    appointments.forEach(app => {
      if (appointmentCounts[app.lawyerName]) {
        appointmentCounts[app.lawyerName] += 100;
      } else {
        appointmentCounts[app.lawyerName] = 100;
      }
    });
    
    const lawyersWithAppointments = Object.keys(appointmentCounts);
    
    const chartData = [];
    
    lawyersWithAppointments.forEach(name => {
      chartData.push({
        bookName: name,
        totalPages: appointmentCounts[name]
      });
    });
    
    if (chartData.length < 6) {
      lawyers.forEach(lawyer => {
        if (!lawyersWithAppointments.includes(lawyer.name) && chartData.length < 6) {
          chartData.push({
            bookName: lawyer.name,
            totalPages: 0
          });
        }
      });
    }
    
    setLawyerStats(chartData);
  };
  
  // Simplified and improved teardrop shape
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
            C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
            ${x + width / 2},${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height}
            Z`;
  };
  
  const CustomBar = (props) => {
    const { fill, x, y, width, height } = props;
    
    return (
      <path 
        d={getPath(x, y, width, height)} 
        stroke="none" 
        fill={fill}
      />
    );
  };
  
  const handleBookAppointment = () => {
    console.log("Confirm booking clicked");
    if (!lawyer) return;
    
    // Check if appointment with same lawyer already exists
    const isDuplicate = existingAppointments.some(
      appointment => appointment.lawyerId === lawyer.lawyerId
    );
    
    if (isDuplicate) {
      // Show error toast for duplicate booking
      toast.error(`You already have an appointment with ${lawyer.lawyerName}`);
      return; // Exit function early
    }
    
    // Continue with booking process since it's not a duplicate
    const newAppointment = {
      id: `app${Date.now()}`,
      lawyerId: lawyer.lawyerId,
      lawyerName: lawyer.lawyerName,
      specialty: lawyer.specialty,
      fee: lawyer.fee
    };
    
    const updatedAppointments = [...existingAppointments, newAppointment];
    setExistingAppointments(updatedAppointments);
    localStorage.setItem('lawyerAppointments', JSON.stringify(updatedAppointments));
    
    const updatedStats = [...lawyerStats];
    const lawyerIndex = updatedStats.findIndex(item => item.bookName === lawyer.lawyerName);
    
    if (lawyerIndex >= 0) {
      updatedStats[lawyerIndex].totalPages += 100;
      setLawyerStats(updatedStats);
    } else {
      setLawyerStats([
        ...updatedStats,
        {
          bookName: lawyer.lawyerName,
          totalPages: 100
        }
      ]);
    }
    
    toast.success(`Appointment booked successfully with ${lawyer.lawyerName}`);
  };
  
  const handleCancelAppointment = (appointmentId) => {
    console.log(`Cancelling appointment: ${appointmentId}`);
    
    const appointmentToCancel = existingAppointments.find(app => app.id === appointmentId);
    if (!appointmentToCancel) return;
    
    const updatedAppointments = existingAppointments.filter(
      app => app.id !== appointmentId
    );
    setExistingAppointments(updatedAppointments);
    localStorage.setItem('lawyerAppointments', JSON.stringify(updatedAppointments));
    
    const updatedStats = [...lawyerStats];
    const lawyerIndex = updatedStats.findIndex(item => item.bookName === appointmentToCancel.lawyerName);
    
    if (lawyerIndex >= 0) {
      updatedStats[lawyerIndex].totalPages -= 100;
      
      if (updatedStats[lawyerIndex].totalPages <= 0) {
        const filteredStats = updatedStats.filter((_, index) => index !== lawyerIndex);
        setLawyerStats(filteredStats);
      } else {
        setLawyerStats(updatedStats);
      }
    }
    
    toast.success('Appointment cancelled successfully');
  };
  
  if (loading) {
    return <div className="p-10 text-center">Loading booking information...</div>;
  }
  
  if (!lawyer) {
    return <div className="p-10 text-center">No lawyer selected for booking</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-4 my-8">
      {/* Lawyer Statistics Chart */}
      <div className="bg-[#f3f3f3] rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-center">Lawyer Appointment Statistics</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={lawyerStats}
              margin={{
                top: 20,
                right: 30,
                left: -10,
                bottom: 20
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="bookName" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value} appointments`, 'Bookings']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  border: 'none'
                }}
              />
              <Bar
                dataKey="totalPages"
                shape={<CustomBar />}
                animationDuration={800}
                animationEasing="ease-in-out"
              >
                {lawyerStats.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* New Booking Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Book New Appointment</h2>
        <div className="mb-4">
          <p className="text-lg font-medium">{lawyer.lawyerName}</p>
          <p className="text-sm text-gray-600">{lawyer.specialty}</p>
          <p className="text-sm text-gray-600">License No: {lawyer.licenseNo}</p>
        </div>
        <div className="mb-6">
          <p className="text-sm font-medium">Fee: {lawyer.fee} Taka</p>
        </div>
        <button 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition-colors"
          onClick={handleBookAppointment}
        >
          Confirm Booking
        </button>
      </div>
      
      {/* My Appointments Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">My Today Appointments</h2>
        <p className="text-sm text-gray-500 mb-6">
          Our platform connects you with verified experienced lawyers across various specialties – all at your convenience.
        </p>
        
        {existingAppointments.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No appointments booked yet</p>
        ) : (
          existingAppointments.map(appointment => (
            <div key={appointment.id} className="border-b border-gray-100 py-4 last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{appointment.lawyerName}</p>
                  <p className="text-sm text-gray-600">{appointment.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Appointment Fee: {appointment.fee} Taka</p>
                </div>
              </div>
              <div className="mt-3">
                <button 
                  className="w-full border border-red-500 text-red-500 hover:bg-red-50 font-medium py-2 rounded-md transition-colors"
                  onClick={() => handleCancelAppointment(appointment.id)}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingPage;