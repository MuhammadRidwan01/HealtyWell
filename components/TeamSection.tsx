import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Users, Sparkles, ChevronRight, Github } from 'lucide-react';

export default function ModernTeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Team members data
  const teamMembers = [
    {
      name: "REVAN FAHRIANSYAH",
      role: "Co-Founder & CTO",
      bio: "Technical visionary developing innovative solutions and leading our engineering efforts.",
      image: "/REVAN FAHRIANSYAH LAKSONO (2).JPG",
      color: "from-blue-600 to-cyan-500",
      github: "https://github.com/revanfahriansyah" // Replace with actual GitHub username if available
    },
    {
      name: "MUHAMMAD RIDWAN",
      role: "Co-Founder & CEO",
      bio: "Visionary leader guiding our strategic direction and business growth initiatives.",
      image: "/MUHAMMAD RIDWAN (2) (1).webp",
      color: "from-emerald-500 to-teal-600",
      github: "https://github.com/mridwan" // Replace with actual GitHub username if available
    },
    {
      name: "PIERRE MAYSAR ALZHEYREY",
      role: "Co-Founder & CTO",
      bio: "Technology expert driving innovation and overseeing product development.",
      image: "/pier.JPG",
      color: "from-teal-600 to-emerald-600",
      github: "https://github.com/pierremaysar" // Replace with actual GitHub username if available
    }
  ];

  // Auto-rotate through team members when not hovering
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % teamMembers.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovering, teamMembers.length]);

  // Animation variants for cards - used with CSS animations since we removed framer-motion
  const cardVariants = {
    index: 0
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-teal-50 to-emerald-500 dark:from-gray-950 dark:to-gray-900"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 40%, #14b8a6 0%, rgba(0, 0, 0, 0) 400px), 
                         radial-gradient(circle at 80% 80%, rgba(224, 242, 254, 0.15) 0%, rgba(0, 0, 0, 0) 700px)`,
      }}
    >
      {/* Background animations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/30 dark:bg-teal-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/30 dark:bg-blue-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/30 dark:bg-cyan-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
        
        {/* Additional animate-in blobs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-500/20 dark:bg-teal-600/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-emerald-500/20 dark:bg-emerald-600/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Custom animation keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes floatAnimation {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        .animate-float {
          animation: floatAnimation 3s ease-in-out infinite;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 2s infinite alternate;
        }
      `}</style>
      
      {/* Header with animated icon */}
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center justify-center mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white animate-float">
            <Users size={28} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
            Meet Our Team
          </h2>
          <div className="mt-3 w-24 h-1.5 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Our diverse team of founders and technologists is united by a common mission:
            to build innovative solutions that transform industries.
          </p>
        </div>

        {/* Featured team member */}
        <div className="mb-20">
          <div 
            className="bg-white dark:bg-gray-800/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 mx-auto max-w-4xl"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="grid md:grid-cols-2 items-stretch">
              <div className="relative h-80 md:h-full w-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${teamMembers[activeIndex].color} opacity-20 dark:opacity-30`}></div>
                <Image
                  src={teamMembers[activeIndex].image}
                  alt={teamMembers[activeIndex].name}
                  fill
                  className="object-cover object-center opacity-90"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                {/* Navigation indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {teamMembers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-white scale-110' : 'bg-white/50 scale-100'}`}
                      aria-label={`View ${teamMembers[index].name}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="p-8 flex flex-col justify-center">
                <div 
                  className="flex items-center gap-2 mb-2 text-sm font-medium"
                >
                  <div className={`w-6 h-1 rounded bg-gradient-to-r ${teamMembers[activeIndex].color}`}></div>
                  <span className="text-gray-500 dark:text-gray-400 uppercase tracking-wider">{teamMembers[activeIndex].role}</span>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">
                  {teamMembers[activeIndex].name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                  {teamMembers[activeIndex].bio}
                </p>
                
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-teal-500/25 dark:hover:shadow-teal-600/20 transition-all duration-300">
                    <span>Full Profile</span>
                    <ChevronRight size={16} />
                  </button>
                  {teamMembers[activeIndex].github && (
                    <a 
                      href={teamMembers[activeIndex].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 opacity-0 animate-fadeIn"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'perspective(1000px)',
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards'
              }}
              custom={index}
              variants={cardVariants}
            >
              <div className="relative h-72 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-10 group-hover:opacity-20 dark:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-500`}></div>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="p-6 flex flex-col">
                <h3 className="font-bold text-xl mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{member.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-auto opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                  {member.bio}
                </p>
              </div>
              
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              
              <div className="absolute top-2 right-2 flex gap-2">
                {member.github && (
                  <a 
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/80 dark:bg-gray-900/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-white dark:hover:bg-gray-800"
                  >
                    <Github size={16} className="text-gray-700 dark:text-gray-300" />
                  </a>
                )}
                <div className="bg-white/80 dark:bg-gray-900/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                  <Sparkles size={16} className="text-teal-600 dark:text-teal-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}