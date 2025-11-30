import React, { useEffect, useState } from "react";
import { Share2, Send, X, ChevronDown, ChevronUp } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    message: '',
    services: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create email content
      const emailContent = `
Name: ${formData.name}
Company: ${formData.company}
Role: ${formData.role}
Email: ${formData.email}
Services: ${formData.services.join(', ')}

Message:
${formData.message}
      `;

      // Create mailto link
      const mailtoLink = `mailto:renaldorifqi@gmail.com?subject=New Contact Form Submission from ${formData.name}&body=${encodeURIComponent(emailContent)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      // Reset form and close dropdown
      setFormData({
        name: '',
        company: '',
        role: '',
        email: '',
        message: '',
        services: []
      });
      setShowDropdown(false);
      
      alert('Email client opened! Please send the email to complete your message.');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#301E67] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16" data-aos="fade-up">
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent text-center">
            Connect & Collaborate
          </h2>
          <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto">
            "Great ideas start with meaningful connections."
            
            
          </p>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 items-stretch">
          {/* Left Column - Social Links */}
          <div data-aos="fade-right" className="flex flex-col">
            <div className="bg-[#03001C] backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Find Me on Social Media
              </h3>
              <p className="text-gray-300 mb-8 flex-1">
                Follow my path in web development and technology.
                Collaboration and knowledge sharing are at the heart of what I do.
              </p>
              <div className="mt-auto">
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div data-aos="fade-left" className="space-y-8">
            <div className="bg-[#03001C] backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Share2 className="w-8 h-8 text-indigo-400" />
                <h3 className="text-2xl font-semibold text-white">
                  Contact Information
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Email</h4>
                  <p className="text-gray-300">renaldorifqi@gmail.com</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Location</h4>
                  <p className="text-gray-300">Yogyakarta, Indonesia</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Availability</h4>
                  <p className="text-green-400">Open to internship opportunities and freelance projects.</p>
                </div>
              </div>
            </div>
            

            <div className="bg-[#03001C] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h4 className="text-lg font-medium text-white mb-4">
                Interested in Collaborating?

              </h4>
              <p className="text-gray-300 mb-6">
                I’m always open to connecting with others to talk about web projects, explore new tech, or exchange ideas about programming.
              </p>
              <a 
                href="mailto:renaldorifqi@gmail.com?subject=Collaboration Opportunity&body=Hello Rifqi,%0A%0AI'm interested in collaborating with you on a project. I'd like to discuss more about..."
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Share2 className="w-5 h-5" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;