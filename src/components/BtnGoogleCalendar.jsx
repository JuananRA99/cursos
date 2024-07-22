import React, { useEffect } from 'react';
import '../pages/css/BtnGoogleCalendar.css';

const GoogleCalendarButton = ({ onLoad }) => {
  useEffect(() => {
    const scriptId = 'google-calendar-script';
    const scriptUrl = 'https://calendar.google.com/calendar/scheduling-button-script.js';

    const loadCalendar = () => {
      if (window.calendar && window.calendar.schedulingButton) {
        window.calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ32alk0yJPN9N5bDoe1Sg4Aw0PtGHDpnZevQ5ZPrD3Hvwx8eAvAETSU3alEtuD8PttxmLAhXBL4',
          color: '#4CAF50',
          label: 'Reserva ahora',
          target: document.getElementById('google-calendar-button')
        });
        if (onLoad) onLoad();
      }
    };

    const existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = scriptUrl;
      script.async = true;
      script.onload = loadCalendar;
      document.body.appendChild(script);
    } else {
      loadCalendar();
    }

    return () => {
      const buttonContainer = document.getElementById('google-calendar-button');
      if (buttonContainer) {
        buttonContainer.innerHTML = '';
      }
    };
  }, [onLoad]);

  return (
    <>
      <link href="https://calendar.google.com/calendar/scheduling-button-script.css" rel="stylesheet" />
      <div className="custom-google-calendar-button">
        <div id="google-calendar-button"></div>
      </div>
    </>
  );
};

export default GoogleCalendarButton;
