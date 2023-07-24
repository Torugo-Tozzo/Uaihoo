import React, { useEffect, useState } from 'react';

const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const getCurrentTime = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Bom dia');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Boa tarde');
      } else {
        setGreeting('Boa noite');
      }
    };

    const getCurrentDate = () => {
      const currentDate = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      setDate(currentDate);
    };

    getCurrentTime();
    getCurrentDate();
  }, []);

  return (
    <div>
      <h1 >{greeting}!</h1>
      <p>Hoje é {date}.</p>
    </div>
  );
};

export default Greeting;