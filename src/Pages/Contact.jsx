import React, { useEffect, useState } from "react";
import { Share2, Send, X, CheckCircle, AlertCircle } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [showModal, setShowModal] = useState(false);
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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare email content
    const emailContent = `Hi Rifqi,

I'm reaching out regarding a potential collaboration opportunity.

Contact Details:
• Name: ${formData.name}
• Company: ${formData.company || 'Not specified'}
• Role: ${formData.role || 'Not specified'}
• Email: ${formData.email}

Services Needed: ${formData.services.length > 0 ? formData.services.join(', ') : 'Not specified'}

Project Details:
${formData.message}

Looking forward to hearing from you!

Best regards,
${formData.name}`;

    const subject = `New Contact Form Submission from ${formData.name}`;

    // Show email client options
    setTimeout(() => {
      const useGmail = confirm(
        'Choose your preferred email client:\n\n' +
        'OK - Open Gmail in browser\n' +
        'Cancel - Open default email client (Mail app)'
      );

      if (useGmail) {
        // Gmail
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=renaldorifqi@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
        window.open(gmailUrl, '_blank');
      } else {
        // Default email client (iCloud Mail, Outlook, etc.)
        const mailtoLink = `mailto:renaldorifqi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
        window.location.href = mailtoLink;
      }

      // Reset form and close modal
      setFormData({
        name: '',
        company: '',
        role: '',
        email: '',
        message: '',
        services: []
      });
      setShowModal(false);
      setIsSubmitting(false);
    }, 500);
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
            
            <div className="bg-[#03001C] backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative">
              <h4 className="text-lg font-medium text-white mb-4">
                Interested in Collaborating?
              </h4>
              <p className="text-gray-300 mb-6">
                I'm always open to connecting with others to talk about web projects, explore new tech, or exchange ideas about programming.
              </p>
              
              <button 
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 w-full justify-center"
              >
                <Share2 className="w-5 h-5" />
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a2e] border border-white/20 rounded-2xl p-6 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h5 className="text-xl font-semibold text-white">Send me a message</h5>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name and Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Your name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Your company *
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Acme Inc."
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Role and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Your role
                        </label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          placeholder="Product Designer"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Your email address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Tell me a little about the project *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your message..."
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                      />
                    </div>

                    {/* Services */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-3">
                        How can I help?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          'Backend Development',
                          'Website Development', 
                          'API Development',
                          'Database Design',
                          'Mobile Backend',
                          'Other'
                        ].map((service) => (
                          <label key={service} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.services.includes(service)}
                              onChange={() => handleServiceChange(service)}
                              className="w-4 h-4 text-indigo-600 bg-white/5 border-white/20 rounded focus:ring-indigo-500 focus:ring-2"
                            />
                            <span className="text-sm text-gray-300">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Opening email client...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send via Email Client
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
    </section>
  );
};

export default ContactPage;