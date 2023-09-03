const Footer = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <ul style={{ fontWeight: 'bold' }}>
        <li>
          <a href="https://github.com/ZiberPax">ZiberPax</a>
        </li>
        <li>
          <a href="https://github.com/SidoryakaSergey">SidoryakaSergey</a>
        </li>
        <li>
          <a href="https://github.com/deepydee">deepydee </a>
        </li>
      </ul>
      <div style={{ textAlign: 'center' }}>2023 © Doomsday Store</div>
    </div>
  );
};

export default Footer;
