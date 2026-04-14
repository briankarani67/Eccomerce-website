import React from "react";
import "./announcements.css";
import card1 from "../../assets/images/card1.jpg";
import card2 from "../../assets/images/card2.jpg";
import card3 from "../../assets/images/card3.jpg";
import Footer from '../../components/Footer'
const posts = [
  {
    id: 1,
    category: "Insurance",
    title: "Entrepreneurial Success with Virtual Credit Card Services",
    desc: "Are you an entrepreneur looking to diversify your business and boost revenue? In this blog, we explore...",
    date: "Nov 06, 2023",
    image: card1,
  },
  {
    id: 2,
    category: "Taxes",
    title: "Refund-Policy",
    desc: "Thank you for choosing Braines. This refund policy outlines our approach to non-refundable service...",
    date: "Jul 21, 2025",
    image: card2,
  },
  {
    id: 3,
    category: "Help",
    title: "What you expect at Braines?",
    desc: "Welcome to Braines: Your One-Stop Solution for Diverse Services. At Braines, we pride ourselves on...",
    date: "Jun 23, 2024",
    image: card3,
  },
];

const Announcements = () => {
  return (
    <div className="announcement-container">
      <h4 className="sub-title">Announcement</h4>
      <h1 className="title">Our Recent Announcement</h1>
      <p className="subtitle-text">
        Updates, training content and helpful resources.
      </p>

      <div className="content">
        <div className="cards">
          {posts.map((post) => (
            <div className="card" key={post.id}>
              <img src={post.image} alt="" />
              <span className="tag">{post.category}</span>

              <div className="card-body">
                <h3>{post.title}</h3>
                <p>{post.desc}</p>

                <div className="card-footer">
                  <span>{post.date}</span>
                  <a href="#">Read More →</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="sidebar">
          <div className="box">
            <h3>Categories</h3>
            <p>All Posts</p>
          </div>

          <div className="box">
            <h3>Recent Posts</h3>

            {posts.map((post) => (
              <div className="recent" key={post.id}>
                <img src={post.image} alt="" />
                <div>
                  <small>{post.date}</small>
                  <p>{post.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Announcements;