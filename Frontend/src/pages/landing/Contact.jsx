import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [result, setResult] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult("Sending....");
        
        const formData = new FormData(e.target);

        // Replace this with your actual Access Key from Web3Forms
        formData.append("access_key", "fce90f2a-d0fc-4fad-b05e-ebae56b702fd");
        formData.append("from_name", "Braines");
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Message Sent Successfully!");
            e.target.reset(); // Clear the form
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <section className="contact-container">
            <div className="contact-content">
                <header className="contact-header">
                    <h1>Let's Work Together</h1>
                    <p>Your messages go straight to my inbox. I'll get back to you within 24 hours.</p>
                </header>

                <div className="contact-grid">
                    {/* Info Side (Keep your existing sidebar code here) */}
                    <div className="info-column">
                        <div className="info-card">
                            <Mail color="#ffffff" size={32} />
                            <div>
                                <h3>Direct Email</h3>
                                <p>brankar@gmail.com</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <Phone color="#ffffff" size={32} />
                            <div>
                                <h3>Phone Support</h3>
                                <p>+254 7675645678</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <MapPin color="#ffffff" size={32} />
                            <div>
                                <h3>Office Location</h3>
                                <p>Kirinyaga, Kenya</p>
                            </div>
                        </div>
                    </div>
                    {/* Form Side */}
                    <form className="contact-form" onSubmit={handleSubmit}>
                      <input type="hidden" name="from_name" value="Braines Client Inquiry" />
    
                      <input type="hidden" name="subject" value="New Message from Braines Portfolio" />

                     
                      <input type="hidden" name="redirect" value="https://yourwebsite.com/thanks" />
                        <div className="form-row">
                            <input name="name" className="form-input" placeholder="Name" required />
                            <input name="email" type="email" className="form-input" placeholder="Email" required />
                        </div>
                        <input name="subject" className="form-input" placeholder="Subject" required style={{ marginBottom: '20px' }} />
                        <textarea name="message" className="form-textarea" placeholder="Tell us about your project..." rows="5" required></textarea>
                        
                        <button type="submit" className="submit-btn">
                            Send Message <Send size={20} />
                        </button>
                        
                        {/* Success/Error Message display */}
                        <p style={{ marginTop: '15px', color: '#064420', fontWeight: 'bold', textAlign: 'center' }}>
                            {result}
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;