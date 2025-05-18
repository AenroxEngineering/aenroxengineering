document.addEventListener('DOMContentLoaded', () => {
  console.log('Welcome to Aenrox Engineering');

  // Smooth Scroll for Navigation Links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHref = e.target.getAttribute('href');
      if (targetHref.startsWith('#')) {
        e.preventDefault();
        const targetId = targetHref.substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      } else {
        // Allow default link behavior for external pages
        window.location.href = targetHref;
      }
    });
  });

  // Back-to-Top Button
  const backToTopButton = document.createElement('button');
  backToTopButton.innerText = 'Top';
  backToTopButton.classList.add('back-to-top');
  document.body.appendChild(backToTopButton);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Form Validation
  const contactForm = document.querySelector('.contact-form form');
  contactForm.addEventListener('submit', (e) => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      e.preventDefault();
      alert('Please fill in all fields.');
    }
  });
});
function openContactForm() {
  alert("Please email us at aenroxengineering@gmail.com or visit the Contact page.");
}
// Check if the user is an admin (stored in localStorage)
const isAdmin = localStorage.getItem("isAdmin") === "true";

// Show blog upload form only for admins
if (isAdmin) {
  document.getElementById("upload-blog").style.display = "block";
}

// Handle blog submissions
document.getElementById("blogForm").addEventListener("submit", function(event) {
  event.preventDefault();

  if (!isAdmin) {
    alert("Only admins can post blogs.");
    return;
  }

  // Get blog title and content
  const title = document.getElementById("blog-title").value;
  const content = document.getElementById("blog-content").value;

  // Create a new blog post element
  const blogPost = document.createElement("div");
  blogPost.classList.add("blog-post");
  blogPost.innerHTML = `<h3>${title}</h3><p>${content}</p>`;

  // Append blog post to the blog section
  document.getElementById("blog-posts").appendChild(blogPost);

  // Clear the form
  document.getElementById("blog-title").value = "";
  document.getElementById("blog-content").value = "";
});