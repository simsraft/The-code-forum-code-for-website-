import { useState } from "react";
import { useLocation } from "wouter";
import SolarSystemLogo from "@/components/logo/solar-system-logo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Lock, MessageCircle, Zap } from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const features = [
    {
      id: "secure",
      icon: Lock,
      title: "Secure Access",
      description: "Private forums accessible only via unique 5-character codes",
    },
    {
      id: "share",
      icon: MessageCircle,
      title: "File Sharing",
      description: "Share text, images, and files with other forum members",
    },
    {
      id: "modern",
      icon: Zap,
      title: "Modern Interface",
      description: "Sleek, circular UI elements for an engaging experience",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <SolarSystemLogo size={240} />
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-primary"
          >
            THECODEFORUM.COM
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
          >
            Join private forums where developers can collaborate, share code, and build together in a secure environment.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              className="rounded-full text-lg px-8 py-6 font-medium transition-transform duration-200 hover:scale-110"
              onClick={() => setLocation("/auth")}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 bg-blue-50 rounded-t-[50px]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="bg-white p-8 rounded-[40px] text-center shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredItem(feature.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-full bg-primary/10 ${hoveredItem === feature.id ? 'scale-125' : ''} transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 px-4 md:px-6 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to join the conversation?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Create an account or log in to start sharing with other developers.
          </p>
          <Button 
            size="lg" 
            className="rounded-full text-lg px-8 py-6 font-medium transition-transform duration-200 hover:scale-110"
            onClick={() => setLocation("/auth")}
          >
            Log In / Register
          </Button>
        </div>
      </section>
    </div>
  );
}import { useState } from "react";
import { useLocation } from "wouter";
import SolarSystemLogo from "@/components/logo/solar-system-logo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Lock, MessageCircle, Zap } from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const features = [
    {
      id: "secure",
      icon: Lock,
      title: "Secure Access",
      description: "Private forums accessible only via unique 5-character codes",
    },
    {
      id: "share",
      icon: MessageCircle,
      title: "File Sharing",
      description: "Share text, images, and files with other forum members",
    },
    {
      id: "modern",
      icon: Zap,
      title: "Modern Interface",
      description: "Sleek, circular UI elements for an engaging experience",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <SolarSystemLogo size={240} />
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-primary"
          >
            THECODEFORUM.COM
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
          >
            Join private forums where developers can collaborate, share code, and build together in a secure environment.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              className="rounded-full text-lg px-8 py-6 font-medium transition-transform duration-200 hover:scale-110"
              onClick={() => setLocation("/auth")}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 bg-blue-50 rounded-t-[50px]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="bg-white p-8 rounded-[40px] text-center shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredItem(feature.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-full bg-primary/10 ${hoveredItem === feature.id ? 'scale-125' : ''} transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 px-4 md:px-6 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to join the conversation?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Create an account or log in to start sharing with other developers.
          </p>
          <Button 
            size="lg" 
            className="rounded-full text-lg px-8 py-6 font-medium transition-transform duration-200 hover:scale-110"
            onClick={() => setLocation("/auth")}
          >
            Log In / Register
          </Button>
        </div>
      </section>
    </div>
  );
}
