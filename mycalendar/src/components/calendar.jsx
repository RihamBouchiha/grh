import React, { useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  const [formData, setFormData] = useState({ id: '', nom: '', prenom: '', debut: '', fin: '' });
  const [conges, setConges] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ajouterConge = () => {
    const nouveauConge = {
      id: formData.id,
      title: `${formData.nom} ${formData.prenom}`,
      start: formData.debut,
      end: formData.fin
    };
    setConges([...conges, nouveauConge]);
    setFormData({ id: '', nom: '', prenom: '', debut: '', fin: '' });
    setAfficherFormulaire(false);
  };

  const handleAfficherFormulaire = () => {
    setAfficherFormulaire(true);
  };

  return (
    <div>
      {/* Affichage du bouton "Ajouter Congé" */}
      {!afficherFormulaire && (
        <button
          type="button"
          onClick={handleAfficherFormulaire}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Ajouter Congé
        </button>
      )}

      {/* Affichage du formulaire si afficherFormulaire est vrai */}
      {afficherFormulaire && (
        <form>
          <label>ID:</label>
          <input type="text" name="id" value={formData.id} onChange={handleChange} />
          <br />
          <label>Nom:</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
          <br />
          <label>Prénom:</label>
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
          <br />
          <label>Date de début:</label>
          <input type="date" name="debut" value={formData.debut} onChange={handleChange} />
          <br />
          <label>Date de fin:</label>
          <input type="date" name="fin" value={formData.fin} onChange={handleChange} />
          <br />
          <button type="button" onClick={ajouterConge}>Ajouter Congé</button>
        </form>
      )}

      {/* Affichage du calendrier */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={
            {
                start:'today prev,next',
                center:'title',
                end:'dayGridMonth,timeGridWeek',
            }
        }
        height={'90vh'}
        events={conges} // Utilisation des congés saisis comme événements à afficher dans le calendrier
      />
    </div>
  );
}

export default Calendar;
