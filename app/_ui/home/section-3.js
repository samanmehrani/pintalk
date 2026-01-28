const values = [
  {
    name: 'Instant Access to Global Markets',
    description:
      'No more spending excessive time and money to find buyers. With just a few clicks, you can connect with customers worldwide.',
  },
  {
    name: 'Reduced Dependency on Intermediaries',
    description:
      'We have designed a system that eliminates the need for costly brokers, allowing you to maximize your profits.',
  },
  {
    name: 'Security & Transparency',
    description:
      'Our platform is built to eliminate fraud and create a safe and trustworthy trade environment.',
  },
  {
    name: 'Expert Support',
    description:
      'Our professional team is always here to assist you in every step of your trading journey.',
  },
]

export default function DescriptionWhyChooseUs() {
  return (
    <main className="isolate">
      <div className="mx-auto px-4 pt-10 sm:pt-20 pb-28 lg:px-6 max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Why Choose Us?
        </h2>
        <dl className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-10 md:gap-28 text-sm sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.name}>
              <dt className="font-semibold">{value.name}</dt>
              <dd className="mt-1.5 text-gray-400">{value.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  )
}