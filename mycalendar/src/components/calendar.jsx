import React, { useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import 'bootstrap/dist/css/bootstrap.min.css';

function Calendar() {
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  const [formData, setFormData] = useState({ nom: '', prenom: '', debut: '', fin: '' });
  const [conges, setConges] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ajouterConge = () => {
    if (formData.nom && formData.prenom && formData.debut && formData.fin) {
      const nouveauConge = {
        id: Date.now().toString(),
        title: `${formData.nom} ${formData.prenom}`,
        start: formData.debut,
        end: formData.fin
      };
      setConges([...conges, nouveauConge]);
      setFormData({ nom: '', prenom: '', debut: '', fin: '' });
      setAfficherFormulaire(false);
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  const handleAfficherFormulaire = () => {
    setAfficherFormulaire(true);
  };

  return (
    <div className="container mt-5">
      {!afficherFormulaire && (
        <button
          type="button"
          onClick={handleAfficherFormulaire}
          className="btn btn-primary"
        >
          Ajouter Congé
        </button>
      )}

      {afficherFormulaire && (
        <div className="modal-bg d-flex justify-content-center align-items-center">
          <div className="modal-form">
            <form>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="nom" className="form-label">Nom:</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label htmlFor="prenom" className="form-label">Prénom:</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="debut" className="form-label">Date de début:</label>
                  <input
                    type="date"
                    name="debut"
                    value={formData.debut}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label htmlFor="fin" className="form-label">Date de fin:</label>
                  <input
                    type="date"
                    name="fin"
                    value={formData.fin}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <button type="button" onClick={ajouterConge} className="btn btn-success">
                Ajouter Congé
              </button>
            </form>
          </div>
        </div>
      )}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek',
        }}
        height={'90vh'}
        events={conges}
      />
    </div>
  );
}

export default Calendar;
