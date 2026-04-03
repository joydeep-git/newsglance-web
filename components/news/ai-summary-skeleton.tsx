
const AiSummarySkeleton = () => {
  
  return (
    <div className="space-y-2.5 py-1 animate-pulse">
      {[100, 88, 95, 70].map((w, i) => (
        <div
          key={i}
          className="h-3.5 rounded-full bg-muted-foreground/20"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}


export default AiSummarySkeleton;
