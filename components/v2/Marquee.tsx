const ITEMS = [
  "Grass-fed",
  "Single ranch",
  "Freeze-dried whole",
  "Traceable",
  "No fillers",
  "Born on our grass",
  "Nutrient-dense",
  "Bovine-gelatin caps",
];

export default function Marquee() {
  // Duplicate the list so the track loops seamlessly.
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="v2-marquee" aria-hidden="true">
      <div className="v2-marquee-track">
        {row.map((item, i) => (
          <span className="v2-marquee-item" key={i}>
            {item}
            <span className="v2-marquee-star">✶</span>
          </span>
        ))}
      </div>
    </div>
  );
}
