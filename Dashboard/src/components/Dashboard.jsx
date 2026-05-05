import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments || []);
        setTotalAppointments(data.appointments?.length || 0);

        // Compute unique doctors (assuming doctor field exists)
        const doctors = [...new Set(data.appointments?.map(apt => `${apt.doctor?.firstName} ${apt.doctor?.lastName}` || apt.doctorId)?.filter(Boolean))];
        setTotalDoctors(doctors.length);
      } catch (error) {
        setAppointments([]);
        toast.error("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, hasVisited) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { hasVisited },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, hasVisited }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  const { isAuthenticated, admin } = useContext(Context);

  if (!isAuthenticated || !admin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin &&
                    `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{totalAppointments}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{totalDoctors}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="text-center py-4">Loading...</td></tr>
              ) : appointments.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-4">No appointments found.</td></tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName || appointment.patientId?.firstName} ${appointment.lastName || appointment.patientId?.lastName}`}</td>
                    <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                    <td>{appointment.doctor ? `${appointment.doctor.firstName} ${appointment.doctor.lastName}` : (appointment.doctorId?.firstName ? `${appointment.doctorId.firstName} ${appointment.doctorId.lastName}` : 'N/A')}</td>
                    <td>{appointment.department || 'N/A'}</td>
                    <td>
                      <span className={`status-badge status-${appointment.status?.toLowerCase()}`}>
                        {appointment.status || 'Pending'}
                      </span>
                    </td>
                    <td>
                      <button
                      onClick={() => handleUpdateStatus(appointment._id, !appointment.hasVisited)}
                      className={`visited-btn ${appointment.hasVisited ? 'visited' : ''}`}
                    >
                      {appointment.hasVisited ? <GoCheckCircleFill /> : <AiFillCloseCircle />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;