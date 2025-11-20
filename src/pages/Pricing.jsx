export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0$ / month",
      features: ["5 AI generations / day", "Basic templates", "Community Support"],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "15$ / month",
      features: [
        "250 AI generations / day",
        "Premium templates",
        "Faster responses",
        "Priority Support",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "49$ / month",
      features: [
        "Unlimited AI generations",
        "Custom models",
        "Dedicated Support",
        "Team Workspace",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">Pricing Plans</h1>
      <p className="text-center text-gray-500 dark:text-gray-300">
        Choose the plan that fits your business
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-xl shadow border transition-all 
            dark:bg-gray-800 dark:border-gray-700
            ${
              plan.highlighted
                ? "bg-blue-600 text-white scale-105"
                : "bg-white dark:bg-gray-900"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">{plan.name}</h2>
            <p className="text-center text-xl font-semibold mb-6">
              {plan.price}
            </p>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feat) => (
                <li
                  key={feat}
                  className={`flex items-center ${
                    plan.highlighted ? "text-white" : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  ✅ {feat}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2 rounded-lg font-semibold transition 
              ${
                plan.highlighted
                  ? "bg-white text-blue-600 hover:bg-gray-200"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
