import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function NeoCADPrototype() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let stars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.3 + 0.1,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fill();
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
      });
      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute w-full h-full" />
      </div>

      {/* Prototype title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-600"
      >
        NeoCAD Prototype v0.1
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.2 }}
        className="z-10 text-gray-300 mt-4 max-w-2xl text-center"
      >
        Tahap awal eksplorasi sistem NeoCAD. Prototype ini menggambarkan konsep antarmuka dan koneksi awal antara NeoCore, NeoSim, NeoNet, dan NeoVision untuk desain AI-imersif.
      </motion.p>

      {/* Interactive placeholder section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="z-10 mt-12 border border-gray-700 rounded-3xl p-10 bg-gray-900/40 backdrop-blur-md shadow-2xl w-[80%] max-w-4xl"
      >
        <h2 className="text-2xl mb-6 font-semibold text-cyan-400">Demo Visualization</h2>
        <p className="text-gray-400 mb-4">
          Visualisasi awal model 3D modular: ini adalah tahap awal sistem rendering real-time yang akan terhubung ke modul NeoVision untuk AR & VR.
        </p>
        <div className="w-full h-64 bg-black/60 border border-gray-800 rounded-xl flex items-center justify-center">
          <p className="text-gray-500">[ Placeholder: 3D model viewport simulation ]</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="z-10 mt-12"
      >
        <Button className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform flex items-center gap-3">
          <Sparkles className="h-5 w-5" /> Enter Prototype
        </Button>
      </motion.div>
    </div>
  );
}
