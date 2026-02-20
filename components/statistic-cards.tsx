// första utkast på statistik-kort, inte kopplat till någon databas än, hårdkodade värden

export default function StatisticCards() {
  
    const cards = [
    {
      title: "Total products",
      value: 248,
      color: "bg-purple-100",
      icon: "📦",
    },
    {
      title: "In stock",
      value: 189,
      color: "bg-green-100",
      icon: "✅",
    },
    {
      title: "Low stock",
      value: 34,
      color: "bg-orange-100",
      icon: "⚠️",
    },
    {
      title: "Out of stock",
      value: 25,
      color: "bg-red-100",
      icon: "❌",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-6">
      <div className="grid grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-semibold text-gray-900 mt-1">
                {card.value}
              </h3>
            </div>

            <div className={`${card.color} p-4 rounded-lg`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}