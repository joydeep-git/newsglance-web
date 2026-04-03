const AiWaveformLoader = () => {

  return (
    <div className="flex items-center gap-1.5 py-3">
      {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
        <span
          key={i}
          className="block w-1 rounded-full bg-project/60"
          style={{
            height: `${h * 4}px`,
            animation: `audioWave 1.2s ease-in-out ${i * 0.08}s infinite alternate`,
          }}
        />
      ))}
      <span className="ml-2 text-xs text-muted-foreground animate-pulse">
        Generating audio…
      </span>
      <style>{`
      @keyframes audioWave {
        from { transform: scaleY(0.4); opacity: 0.5; }
        to   { transform: scaleY(1.4); opacity: 1; }
      }
    `}</style>
    </div>
  );
}


export default AiWaveformLoader;
