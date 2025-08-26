import Image from 'next/image';
import Link from 'next/link';

export default function CyberAwareness() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-8 bg-white min-h-screen gap-10 overflow-x-hidden overflow-hidden scrollbar-hide">
      {/* Image Section */}
      <div className="flex-1 max-w-md">
        <Image
          src="/cyber_pic.jpg"
          alt="Cybersecurity White Background"
          className="rounded-lg shadow-lg object-cover w-full h-auto"
          width={500}
          height={300}
          priority
        />
      </div>

      {/* Text Section */}
      <div className="flex-1 max-w-lg text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-6">
          Protect Your Digital Life
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Cybersecurity is everyone&apos;s responsibility. Stay vigilant against phishing scams, data breaches, and online threats. Learning and awareness are your strongest defenses in today’s connected world.
        </p>
        <Link
          href="/About/about"
          className="inline-block bg-blue-900 text-white font-semibold py-3 px-6 rounded-md shadow hover:bg-blue-800 transition duration-300"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}