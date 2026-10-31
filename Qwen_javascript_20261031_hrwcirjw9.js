import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Crosshair, Activity, Cpu, Eye, EyeOff } from 'lucide-react';
import { tankData } from './tankData';
import { ProceduralTank } from './ProceduralTank';
import { AnimatedNumber } from './AnimatedNumber';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWireframe, setIsWireframe] = useState(false);
  const currentTank = tankData[currentIndex];

  return (
    <div className="relative w-full h-screen bg-tactical-bg text-gray-200 overflow-hidden font-sans selection:bg-tactical-accent selection:text-black">
      
      {/* Шапка */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <Crosshair className="w-8 h-8 text-tactical-accent" />
          <h1 className="text-xl md:text-2xl font-bold tracking-widest text-white">
            ЭВОЛЮЦИЯ БРОНИ <span className="text-tactical-accent">//</span> 3D МУЗЕЙ
          </h1>
        </div>
        <button 
          onClick={() => setIsWireframe(!isWireframe)}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-tactical-panel border border-tactical-tech/30 rounded hover:bg-tactical-tech/10 transition-colors group"
        >
          {isWireframe ? <EyeOff className="w-4 h-4 text-tactical-tech" /> : <Eye className="w-4 h-4 text-tactical-tech" />}
          <span className="font-mono text-xs md:text-sm text-tactical-tech group-hover:text-white transition-colors">
            {isWireframe ? 'МАССИВ' : 'РЕНТГЕН'}
          </span>
        </button>
      </header>

      {/* 3D Сцена */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
          <color attach="background" args={['#0a0a0a']} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
          <Environment preset="warehouse" />
          
          <ProceduralTank 
            key={currentTank.type} 
            type={currentTank.type} 
            isWireframe={isWireframe} 
          />
          
          <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.6} far={10} color="#000000" />
          <OrbitControls 
            enablePan={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2.1} 
            minDistance={3} 
            maxDistance={10} 
          />
        </Canvas>
      </div>

      {/* Левая панель - Характеристики */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-24 left-6 w-72 z-10 hidden md:block"
      >
        <div className="bg-tactical-panel/80 backdrop-blur-md border-l-4 border-tactical-accent p-6 rounded-r-lg shadow-2xl">
          <h2 className="text-tactical-accent font-mono text-sm tracking-widest mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" /> ХАРАКТЕРИСТИКИ ТАНКА
          </h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTank.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <h3 className="text-2xl font-bold text-white">{currentTank.name}</h3>
                <p className="text-tactical-tech font-mono text-sm">{currentTank.era} // {currentTank.year}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                <SpecItem label="ВЕС" value={currentTank.weight} suffix=" Т" icon={Activity} />
                <SpecItem label="ДВИГАТЕЛЬ" value={currentTank.hp} suffix=" Л.С." icon={Cpu} />
                <SpecItem label="БРОНЯ" value={currentTank.armor} isText />
                <SpecItem label="ОРУДИЕ" value={currentTank.gun} isText />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Правая панель - Контекст */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute top-24 right-6 w-80 z-10 hidden md:block"
      >
        <div className="bg-tactical-panel/80 backdrop-blur-md border-r-4 border-tactical-tech p-6 rounded-l-lg shadow-2xl">
          <h2 className="text-tactical-tech font-mono text-sm tracking-widest mb-4 flex items-center gap-2 justify-end">
            ИСТОРИЧЕСКИЙ КОНТЕКСТ <Shield className="w-4 h-4" />
          </h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTank.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="text-gray-300 text-sm leading-relaxed font-light text-right"
            >
              {currentTank.description}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Нижняя временная шкала */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 z-20"
      >
        <div className="bg-tactical-panel/90 backdrop-blur-md border border-gray-800 rounded-full px-4 md:px-8 py-4 flex justify-between items-center relative">
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gray-800 -z-10 hidden md:block" />
          {tankData.map((tank, index) => (
            <button
              key={tank.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex flex-col items-center gap-1 md:gap-2 transition-all duration-300 relative z-10 ${
                currentIndex === index ? 'text-tactical-accent scale-110' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-300 ${
                currentIndex === index 
                  ? 'border-tactical-accent bg-tactical-accent shadow-[0_0_15px_#f59e0b]' 
                  : 'border-gray-600 bg-tactical-bg hover:border-gray-400'
              }`} />
              <span className="font-mono text-xs md:text-sm font-bold">{tank.year}</span>
              <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest opacity-80 hidden sm:block">{tank.era}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Мобильный адаптивный HUD (вертикальный) */}
      <div className="md:hidden absolute bottom-28 left-4 right-4 z-10">
         <div className="bg-tactical-panel/90 backdrop-blur-md border border-tactical-accent p-4 rounded-lg shadow-xl">
            <h3 className="text-tactical-accent font-mono text-lg font-bold">{currentTank.name}</h3>
            <p className="text-gray-400 text-xs font-mono mb-3">{currentTank.year} // {currentTank.era}</p>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
               <div><span className="text-gray-500">ВЕС:</span> <AnimatedNumber value={currentTank.weight} /> Т</div>
               <div><span className="text-gray-500">МОЩН:</span> <AnimatedNumber value={currentTank.hp} /></div>
               <div><span className="text-gray-500">ПУШКА:</span> {currentTank.gun}</div>
               <div><span className="text-gray-500">БРОНЯ:</span> {currentTank.armor}</div>
            </div>
            <p className="text-gray-400 text-xs mt-3 pt-3 border-t border-gray-800 leading-relaxed">
              {currentTank.description}
            </p>
         </div>
      </div>
    </div>
  );
}

function SpecItem({ label, value, suffix = "", isText = false, icon: Icon }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-gray-500 font-mono tracking-wider flex items-center gap-1">
        {Icon && <Icon className="w-3 h-3" />} {label}
      </span>
      <span className="text-xl font-bold text-white font-mono flex items-baseline gap-1">
        {isText ? value : <><AnimatedNumber value={value} /><span className="text-sm text-tactical-tech">{suffix}</span></>}
      </span>
    </div>
  );
}