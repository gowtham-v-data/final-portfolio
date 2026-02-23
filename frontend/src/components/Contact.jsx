import React, { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import "./Contact.css";

const Contact = ({ data }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send message to backend
      const response = await axios.post('http://localhost:8000/api/contact', formData);
      
      toast({
        title: "Message Sent Successfully!",
        description: "Your message has been sent and I've been notified via email. I'll get back to you soon!",
      });
      
      // Clear the form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error Sending Message",
        description: "There was a problem sending your message. Please try again or contact me directly via email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="section-title">{data.title}</h2>
          <p className="section-description">{data.description}</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-icon-wrapper">
                <Mail size={32} />
              </div>
              <h3 className="contact-info-title">Email Me</h3>
              <a href={`mailto:${data.email}`} className="contact-email">
                {data.email}
              </a>
            </div>
            <div className="social-links">
              <h3 className="social-title">Connect With Me</h3>
              <div className="social-icons">
                {data.socials.map((social, index) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className="social-icon"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <Icon size={24} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell me about your project..."
                rows="6"
                required
              ></textarea>
            </div>
            <Button type="submit" className="form-submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send size={18} className="btn-icon" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
