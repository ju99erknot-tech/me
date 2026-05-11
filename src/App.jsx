import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaGamepad } from 'react-icons/fa';
import './index.css';
import './App.css';

// SVG Components
const ChromeDino = ({ isJumping, runState }) => (
  <svg viewBox="0 0 44 47" width="44" height="47" fill="currentColor">
    <rect x="22" y="0" width="22" height="16" />
    <rect x="26" y="2" width="4" height="4" fill="var(--color-bg)" />
    <rect x="20" y="16" width="12" height="6" />
    <rect x="10" y="22" width="22" height="12" />
    <rect x="2" y="16" width="8" height="18" />
    <rect x="0" y="12" width="2" height="4" />
    <rect x="32" y="18" width="6" height="4" />
    <rect x="36" y="22" width="4" height="2" />
    {isJumping || runState === 0 ? (
      <><rect x="12" y="34" width="6" height="10" /><rect x="14" y="44" width="6" height="3" /></>
    ) : (<rect x="12" y="34" width="6" height="6" />)}
    {isJumping || runState === 1 ? (
      <><rect x="22" y="34" width="6" height="10" /><rect x="24" y="44" width="6" height="3" /></>
    ) : (<rect x="22" y="34" width="6" height="6" />)}
  </svg>
);

const ChromeDinoDuck = ({ runState }) => (
  <svg viewBox="0 0 59 30" width="59" height="30" fill="currentColor">
    <rect x="10" y="0" width="40" height="20" />
    <rect x="40" y="0" width="19" height="12" />
    <rect x="46" y="2" width="4" height="4" fill="var(--color-bg)" />
    <rect x="0" y="0" width="10" height="10" />
    {runState === 0 ? (
      <><rect x="12" y="20" width="6" height="10" /><rect x="30" y="20" width="6" height="6" /></>
    ) : (
      <><rect x="12" y="20" width="6" height="6" /><rect x="30" y="20" width="6" height="10" /></>
    )}
  </svg>
);

const Cactus = () => (
  <svg viewBox="0 0 24 48" width="24" height="48" fill="currentColor">
    <rect x="8" y="0" width="8" height="48" />
    <rect x="0" y="12" width="8" height="6" />
    <rect x="0" y="12" width="4" height="16" />
    <rect x="16" y="18" width="8" height="6" />
    <rect x="20" y="18" width="4" height="12" />
  </svg>
);

const Bird = ({ runState }) => (
  <svg viewBox="0 0 46 32" width="46" height="32" fill="currentColor">
    <rect x="0" y="14" width="12" height="6" /> 
    <rect x="12" y="10" width="10" height="12" /> 
    <rect x="16" y="12" width="2" height="2" fill="var(--color-bg)" /> 
    {runState === 0 ? (
      <path d="M 22 0 h 6 v 6 h 12 v 6 h 6 v 4 h -24 z" />
    ) : (
      <path d="M 22 22 h 6 v 4 h 12 v 4 h 6 v 2 h -24 z" />
    )}
  </svg>
);

const Cloud = () => (
  <svg viewBox="0 0 46 14" width="46" height="14" fill="currentColor">
    <rect x="10" y="0" width="20" height="4" />
    <rect x="4" y="4" width="36" height="6" />
    <rect x="0" y="10" width="46" height="4" />
  </svg>
);

const Mountain = () => (
  <svg viewBox="0 0 60 30" width="60" height="30" fill="currentColor">
    <path d="M 30 0 L 60 30 L 0 30 Z" />
  </svg>
);

function App() {
  const [currentView, setCurrentView] = useState('menu'); 
  const [activeIndex, setActiveIndex] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const menuItems = [
    { label: 'START GAME', action: 'game', icon: <FaGamepad /> },
    { label: 'GITHUB', url: 'https://github.com/ju99erknot', icon: <FaGithub /> },
    { label: 'LINKEDIN', url: 'https://linkedin.com/in/ju99erknot', icon: <FaLinkedin /> },
    { label: 'TWITTER', url: 'https://twitter.com/ju99erknot', icon: <FaTwitter /> },
    { label: 'CONTACT', url: 'mailto:contact@ju99erknot.my.id', icon: <FaEnvelope /> },
  ];

  // GAME STATE
  const [isJumping, setIsJumping] = useState(false);
  const [isDucking, setIsDucking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [dinoY, setDinoY] = useState(0);
  const [speed, setSpeed] = useState(6);
  const [runState, setRunState] = useState(0);

  // Obstacle: { type: 'cactus'|'bird', x, y }
  const [obstacle, setObstacle] = useState({ type: 'cactus', x: 600, y: 12 });
  // Background elements
  const [bgElements, setBgElements] = useState([
    { type: 'cloud', x: 200, y: 50 },
    { type: 'cloud', x: 500, y: 30 },
    { type: 'mountain', x: 300, y: 12 },
    { type: 'mountain', x: 700, y: 12 },
  ]);

  const requestRef = useRef();
  const stateRef = useRef({ isJumping, isDucking, gameOver, dinoY, obstacle, score, speed, bgElements });

  useEffect(() => {
    stateRef.current = { isJumping, isDucking, gameOver, dinoY, obstacle, score, speed, bgElements };
  }, [isJumping, isDucking, gameOver, dinoY, obstacle, score, speed, bgElements]);

  const jump = () => {
    if (stateRef.current.gameOver) {
      setGameOver(false);
      setScore(0);
      setObstacle({ type: 'cactus', x: 600, y: 12 });
      setSpeed(6);
      return;
    }
    if (stateRef.current.isDucking) return;

    if (!stateRef.current.isJumping) {
      setIsJumping(true);
      let velocity = 16; 
      const gravity = 0.8; 
      let currentY = 0; 

      const jumpAnimation = () => {
        velocity -= gravity;
        // If player ducks while jumping, increase gravity drastically
        if (stateRef.current.isDucking) velocity -= 2;

        currentY += velocity;
        
        if (currentY <= 0) {
          setDinoY(0);
          setIsJumping(false); 
        } else {
          setDinoY(currentY);
          requestAnimationFrame(jumpAnimation);
        }
      };
      requestAnimationFrame(jumpAnimation);
    }
  };

  useEffect(() => {
    if (currentView !== 'game') return;

    let lastTime = performance.now();
    let runTimer = 0;

    const updateGame = (time) => {
      const state = stateRef.current;
      if (state.gameOver) return;

      const deltaTime = time - lastTime;

      if (deltaTime > 16) {
        lastTime = time;
        runTimer += deltaTime;

        // Animate legs and wings
        if (runTimer > 100) {
          setRunState(prev => (prev === 0 ? 1 : 0));
          runTimer = 0;
        }

        // Background scrolling (slower than foreground)
        setBgElements(prev => prev.map(el => {
          let nx = el.x - (state.speed * (el.type === 'cloud' ? 0.2 : 0.4));
          if (nx < -100) {
            nx = 600 + Math.random() * 200;
            if (el.type === 'cloud') return { ...el, x: nx, y: 20 + Math.random() * 60 };
          }
          return { ...el, x: nx };
        }));

        // Obstacle movement and logic
        setObstacle(prev => {
          let nextX = prev.x - state.speed;
          if (nextX < -50) {
            setScore(s => {
              const newScore = s + 10;
              if (newScore % 50 === 0) setSpeed(sp => Math.min(sp + 1, 16));
              if (newScore > highScore) setHighScore(newScore);
              return newScore;
            });
            
            // Randomize next obstacle
            const isBird = Math.random() > 0.6 && state.score > 200; // Birds appear later
            let y = 12; // Ground level for cactus
            if (isBird) {
               // 3 heights: 20 (low, must jump), 45 (mid, must duck), 75 (high, ignore)
               const heights = [20, 45, 75];
               y = heights[Math.floor(Math.random() * heights.length)];
            }
            return { type: isBird ? 'bird' : 'cactus', x: 600 + Math.random() * 300, y };
          }
          return { ...prev, x: nextX };
        });

        // Hitbox Collision
        const pIsDucking = state.isDucking && !state.isJumping;
        const pWidth = pIsDucking ? 59 : 44;
        const pHeight = pIsDucking ? 30 : 47;
        
        // Player hitbox (shrunk for fairness)
        const pLeft = 50 + 10; 
        const pRight = 50 + pWidth - 15;
        const pBottom = state.dinoY + 5;
        const pTop = state.dinoY + pHeight - 10;

        // Obstacle hitbox
        const isBird = state.obstacle.type === 'bird';
        const oWidth = isBird ? 46 : 24;
        const oHeight = isBird ? 32 : 48;
        
        const oLeft = state.obstacle.x + 8;
        const oRight = state.obstacle.x + oWidth - 8;
        const oBottom = state.obstacle.y + 4; // lift slightly
        const oTop = state.obstacle.y + oHeight - 8;

        const isXCollision = pRight > oLeft && pLeft < oRight;
        const isYCollision = pBottom < oTop && pTop > oBottom;

        if (isXCollision && isYCollision) {
          setGameOver(true);
        }
      }
      requestRef.current = requestAnimationFrame(updateGame);
    };

    requestRef.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(requestRef.current);
  }, [currentView, highScore]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentView === 'menu') {
        if (e.key === 'ArrowUp') {
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1));
        } else if (e.key === 'ArrowDown') {
          setActiveIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'Enter') {
          const item = menuItems[activeIndex];
          if (item.action === 'game') {
            setCurrentView('game');
            setGameOver(false);
            setScore(0);
            setSpeed(6);
            setObstacle({ type: 'cactus', x: 600, y: 12 });
          } else if (item.url) {
            window.open(item.url, '_blank');
          }
        }
      } else if (currentView === 'game') {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
          e.preventDefault(); 
          jump();
        } else if (e.code === 'ArrowDown') {
          e.preventDefault();
          setIsDucking(true);
        } else if (e.key === 'Escape') {
          setCurrentView('menu');
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'ArrowDown') {
        setIsDucking(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentView, activeIndex, menuItems]);

  return (
    <>
      <div className="crt-overlay"></div>

      <div className="app-container flicker">
        <div className="score-board">
          <span>1UP<br/><span className="blink">{score.toString().padStart(6, '0')}</span></span>
          <span>HIGH SCORE<br/>{highScore.toString().padStart(6, '0')}</span>
          <span>CREDIT 99</span>
        </div>

        <header className="header" style={{ display: currentView === 'game' ? 'none' : 'block' }}>
          <h1 className="title">JU99ERKNOT</h1>
          <p className="subtitle">SYS.VER. 1.0.0 READY</p>
        </header>

        <main>
          {currentView === 'menu' ? (
            <ul className="menu-list">
              {menuItems.map((item, index) => (
                <li 
                  key={index} 
                  className={`menu-item ${index === activeIndex ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    if (item.action === 'game') {
                      setCurrentView('game');
                      setGameOver(false);
                      setScore(0);
                      setSpeed(6);
                      setObstacle({ type: 'cactus', x: 600, y: 12 });
                    } else if (item.url) {
                      window.open(item.url, '_blank');
                    }
                  }}
                >
                  <span className="cursor">►</span>
                  <a href={item.url || '#'} target={item.url ? "_blank" : undefined} rel="noreferrer" className="item-text" onClick={e => e.preventDefault()}>
                    <span className="icon">{item.icon}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="game-area" onClick={jump}>
              {/* Background elements */}
              {bgElements.map((el, i) => (
                <div key={i} className={el.type} style={{ left: el.x, bottom: el.type === 'mountain' ? el.y : undefined, top: el.type === 'cloud' ? el.y : undefined }}>
                  {el.type === 'cloud' ? <Cloud /> : <Mountain />}
                </div>
              ))}
              
              <div className="ground-line"></div>
              
              <div 
                className="player" 
                style={{ bottom: `${12 + dinoY}px` }}
              >
                {isDucking && !isJumping ? (
                  <ChromeDinoDuck runState={runState} />
                ) : (
                  <ChromeDino isJumping={isJumping} runState={runState} />
                )}
              </div>
              
              <div 
                className="obstacle" 
                style={{ left: `${obstacle.x}px`, bottom: `${obstacle.y}px` }}
              >
                {obstacle.type === 'cactus' ? <Cactus /> : <Bird runState={runState} />}
              </div>

              {gameOver && (
                <div className="game-over-screen">
                  <div className="game-over-text">GAME OVER</div>
                  <div className="restart-text">PRESS SPACE TO RESTART</div>
                  <div className="restart-text" style={{marginTop: '1.5rem', color: 'var(--color-primary-dim)'}}>PRESS ESC TO EXIT TO MENU</div>
                </div>
              )}
            </div>
          )}
        </main>

        <div className="insert-coin">
          {currentView === 'menu' ? 'INSERT COIN OR PRESS ENTER' : 'SPACE TO JUMP / DOWN TO DUCK'}
        </div>

        <footer className="footer">
          <p>© 198X JU99ERKNOT. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
