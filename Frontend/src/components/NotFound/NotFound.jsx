import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Página não encontrada</h1>
      <p style={styles.message}>
        A página que você está procurando não foi encontrada.
      </p>
      <Link to="/" style={styles.link}>
        Voltar para a página inicial
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  message: {
    fontSize: '20px',
    marginBottom: '32px',
  },
  link: {
    fontSize: '16px',
    textDecoration: 'none',
    color: 'blue',
  },
};

export default NotFound;
