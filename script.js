// Matrix background effect
function initMatrix() {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  const characters =
    "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?";
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(0);

  function draw() {
    ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00FF41";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 50);
  window.addEventListener("resize", resizeCanvas);
}

// Terminal Class
class TerminalPortfolio {
  constructor() {
    this.commandHistory = [];
    this.historyIndex = -1;
    this.currentInput = document.getElementById("terminalInput");
    this.terminalContent = document.getElementById("terminalContent");
    this.currentInputContainer = document.getElementById("currentInput");
    this.isLoading = false;

    this.commands = {
      "pf -help": () => this.showHelp(),
      "portfolio -help": () => this.showHelp(),

      "pf -about": () => this.showAbout(),
      "portfolio -about": () => this.showAbout(),

      "pf -skills": () => this.showSkills(),
      "portfolio -skills": () => this.showSkills(),

      "pf -projects": () => this.showProjects(),
      "portfolio -projects": () => this.showProjects(),

      "pf -contact": () => this.showContact(),
      "portfolio -contact": () => this.showContact(),

      "pf -gui": () => this.switchToGUI(),
      "portfolio -gui": () => this.switchToGUI(),

      "ls": () => this.listDirectory(),
      "cd": () => this.changeDirectory(),

      "clear": () => this.clearTerminal(),

      "exit": () => this.showViewSelector(),
    };

    this.initEventListeners();
    this.focusInput();
  }

  initEventListeners() {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".terminal-window-controls")) {
        this.focusInput();
      }
    });

    this.currentInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.executeCommand();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.navigateHistory(-1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        this.navigateHistory(1);
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.autoComplete();
      }
    });

    // Terminal window controls
    document.getElementById("closeTerminal").addEventListener("click", () => {
      this.showViewSelector();
    });

    document
      .getElementById("minimizeTerminal")
      .addEventListener("click", () => {
        this.addOutput(
          '[INFO] Terminal minimized. Type "exit" to return to selection screen.'
        );
      });

    document
      .getElementById("maximizeTerminal")
      .addEventListener("click", () => {
        this.addOutput("[INFO] Terminal maximized.");
      });
  }

  executeCommand() {
    if (this.isLoading) return;

    const command = this.currentInput.value.trim();

    if (command) {
      this.commandHistory.push(command);
      this.historyIndex = this.commandHistory.length;
      this.addOutput(`sh1vam@portfolio:~$ ${command}`, "command-line");

      if (this.commands[command]) {
        this.commands[command]();
      } else if (command === "cd" || command.startsWith("cd ")) {
  this.changeDirectory(command);
}else {
        this.addOutput(
          `bash: ${command}: command not found\nType 'pf -help' for available commands.`,
          "error"
        );
      }
    }

    this.clearInput();
    this.createNewPrompt();
  }

  autoComplete() {
    const input = this.currentInput.value;
    const commands = Object.keys(this.commands);
    const matches = commands.filter((cmd) =>
      cmd.startsWith(input.toLowerCase())
    );

    if (matches.length === 1) {
      this.currentInput.value = matches[0];
    } else if (matches.length > 1) {
      this.addOutput(matches.join("    "));
    }
  }

  navigateHistory(direction) {
    if (this.commandHistory.length === 0) return;

    this.historyIndex = Math.max(
      0,
      Math.min(this.commandHistory.length, this.historyIndex + direction)
    );

    if (
      this.historyIndex >= 0 &&
      this.historyIndex < this.commandHistory.length
    ) {
      this.currentInput.value = this.commandHistory[this.historyIndex];
    } else {
      this.currentInput.value = "";
    }
  }

  showHelp() {
    const helpContent = `Available Commands:

You can use pf as a shorthand for the portfolio command
Examples:


pf -help     - Show this help menu
pd -about    - Learn about me
pd -skills   - View my technical skills
pf -projects - See my projects
pf -contact  - Get my contact information
pf -gui      - Switch to GUI mode
ls           - List directory contents
cd           - Change directory
clear        - Clear terminal
exit         - Return to mode selection`;
    this.addOutput(helpContent);
  }

  showAbout() {
    const aboutAscii = ` 
 █████╗ ██████╗  ██████╗ ██╗   ██╗████████╗
██╔══██╗██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝
███████║██████╔╝██║   ██║██║   ██║   ██║   
██╔══██║██╔══██╗██║   ██║██║   ██║   ██║   
██║  ██║██████╔╝╚██████╔╝╚██████╔╝   ██║   
╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚═════╝    ╚═╝   `;

    const aboutContent = `${aboutAscii}

sh1vam - Security Specialist & Developer

8+ years experience in cybersecurity, penetration testing, 
and secure application development.

My mission is to build secure digital environments and 
protect organizations from evolving cyber threats.

Specializations:
- Penetration Testing
- Vulnerability Assessment  
- Network Security
- Secure Application Development
- Cloud Infrastructure Security

Stats:
- 50+ Projects Completed
- 25+ Satisfied Clients
- 12+ Professional Certifications`;
    this.addOutput(aboutContent);
  }

  showSkills() {
    const skillsAscii = `
███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
███████╗█████╔╝ ██║██║     ██║     ███████╗
╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
███████║██║  ██╗██║███████╗███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`;

    const skillsContent = `${skillsAscii}

Technical Skills:

Security:
█████████████████████ 95% Penetration Testing
███████████████████   90% Vulnerability Assessment
████████████████████  92% Network Security
█████████████████     88% Cryptography

Development:
█████████████████████ 95% Python
███████████████████   90% JavaScript/Node.js
████████████████      85% React
█████████████████     88% SQL/NoSQL Databases

Tools & Technologies:
█████████████████████ 93% Kali Linux
███████████████████   90% Metasploit
████████████████      87% Wireshark
████████████████      85% Docker & Kubernetes`;
    this.addOutput(skillsContent);
  }

  showProjects() {
    const projectsAscii = `
██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗███████╗
██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝
██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   ███████╗
██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   ╚════██║
██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║
╚═╝     ╚═╝  ╚═╝ ╚═════╝  �╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝`;

    const projectsContent = `${projectsAscii}

Recent Projects:

1. Secure Network Architecture
   - Designed secure network infrastructure
   - Advanced firewall configurations
   - IDS/IPS systems implementation
   - Secure remote access solutions
   ‚Ėą Technologies: Firewalls, VPN, IDS/IPS

2. Pen Testing Framework  
   - Comprehensive penetration testing framework
   - Automated vulnerability scanning
   - Reporting and remediation guidance
   - Custom exploit development
   ‚Ėą Technologies: Python, Security, Automation

3. Tabsye Browser Extension
   - Tab management and productivity enhancement
   - Organize, save, and restore browsing sessions
   - Cross-browser compatibility
   - Secure data storage
   ‚Ėą Technologies: JavaScript, Chrome API, React
   ‚Ėą Live Demo: https://tabsye.com`;
    this.addOutput(projectsContent);
  }

  showContact() {
    const contactAscii = `
 ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝
██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║   
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║   
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║   
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝   `;

    const contactContent = `${contactAscii}

Contact Information:

Email: sh1vam@example.com
Phone: +1 (234) 567-890
Location: San Francisco, CA
Availability: Currently available for freelance projects

Social:
- GitHub: github.com/sh1vam
- LinkedIn: linkedin.com/in/sh1vam
- Twitter: twitter.com/sh1vam
- Instagram: instagram.com/sh1vam

Let's work together to secure your digital assets and 
build innovative technology solutions.`;
    this.addOutput(contactContent);
  }

  listDirectory() {
    const listDirectory = `Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos`;
    this.addOutput(listDirectory);
  }

  changeDirectory(command) {
  this.addOutput(
    `bash: ${command}: Permission denied\nType 'pf -help' for available commands.`,
    "error"
  );
}

  switchToGUI() {
    this.isLoading = true;
    this.addOutput("[INFO] Switching to GUI mode...");

    // Simulate loading before switching
    setTimeout(() => {
      document.getElementById("terminalInterface").style.display = "none";
      document.getElementById("guiInterface").style.display = "block";
      showGUILoader();
    }, 1000);
  }

  showViewSelector() {
    this.isLoading = true;
    this.addOutput("[INFO] Returning to mode selection...");

    // Simulate loading before switching
    setTimeout(() => {
      document.getElementById("terminalInterface").style.display = "none";
      document.getElementById("viewSelector").style.display = "flex";
      this.isLoading = false;
    }, 800);
  }

  clearTerminal() {
    const outputs = this.terminalContent.querySelectorAll(".terminal-output");
    outputs.forEach((output, index) => {
      if (index > 0) output.remove();
    });
  }

  addOutput(content, type = "") {
    const output = document.createElement("div");
    output.className = `terminal-output ${type}`;
    output.style.whiteSpace = "pre-wrap";

    // Check if content contains ASCII art
    if (
      content.includes("‚Ėą") ||
      content.includes("‚ēĎ") ||
      content.includes("‚ēó") ||
      content.includes("‚ēĚ") ||
      content.includes("‚ēĒ") ||
      content.includes("‚ēö")
    ) {
      output.innerHTML = `<div class="ascii-art">${content}</div>`;
    } else {
      output.textContent = content;
    }

    this.terminalContent.insertBefore(output, this.currentInputContainer);
    this.scrollToBottom();
  }

  clearInput() {
    this.currentInput.value = "";
  }

  createNewPrompt() {
    const newInputContainer = document.createElement("div");
    newInputContainer.className = "terminal-input-container";
    newInputContainer.id = "currentInput";
    newInputContainer.innerHTML = `
                    <span class="terminal-prompt">sh1vam@portfolio:~$</span>
                    <input type="text" class="terminal-input" autocomplete="off" spellcheck="false">
                    <span class="terminal-cursor"></span>
                `;

    this.terminalContent.replaceChild(
      newInputContainer,
      this.currentInputContainer
    );
    this.currentInputContainer = newInputContainer;
    this.currentInput = newInputContainer.querySelector(".terminal-input");

    // Reattach event listeners
    this.currentInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.executeCommand();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.navigateHistory(-1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        this.navigateHistory(1);
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.autoComplete();
      }
    });

    this.focusInput();
    this.scrollToBottom();
  }

  focusInput() {
    if (this.currentInput) {
      this.currentInput.focus();
    }
  }

  scrollToBottom() {
    this.terminalContent.scrollTop = this.terminalContent.scrollHeight;
  }
}

// GUI Loader function
function showGUILoader() {
  const loader = document.getElementById("guiLoader");
  const progress = document.getElementById("guiProgress");

  // Reset and show loader
  loader.style.display = "flex";
  loader.style.opacity = "1";
  progress.style.width = "0%";

  // Simulate loading
  setTimeout(() => {
    progress.style.width = "30%";
  }, 500);

  setTimeout(() => {
    progress.style.width = "60%";
  }, 1500);

  setTimeout(() => {
    progress.style.width = "90%";
  }, 2500);

  setTimeout(() => {
    progress.style.width = "100%";
  }, 3000);

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      // Initialize GUI after loader is gone
      initGUI();
    }, 600);
  }, 3500);
}

// GUI initialization
function initGUI() {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks) {
        navLinks.classList.remove("active");
        if (hamburger) {
          hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });

  // Switch to terminal from GUI
  document.getElementById("switchToTerminal").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("guiInterface").style.display = "none";
    document.getElementById("terminalInterface").style.display = "flex";
    if (!window.terminal) {
      window.terminal = new TerminalPortfolio();
    }
    window.terminal.focusInput();
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          if (hamburger) {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
          }
        }
      }
    });
  });

  // Animate skill bars on scroll
  function animateSkillBars() {
    const skillLevels = document.querySelectorAll(".skill-level");
    skillLevels.forEach((skill) => {
      const level = skill.getAttribute("data-level");
      skill.style.width = level + "%";
    });
  }

  // Typing animation
  function initTypingAnimation() {
    const textElement = document.getElementById("typed-text");
    if (!textElement) return;

    const texts = [
      "Security Specialist",
      "Penetration Tester",
      "Full-Stack Developer",
      "Cybersecurity Expert",
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentText = texts[textIndex];

      if (isDeleting) {
        // Remove characters
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        // Add characters
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      // Check if current text is complete
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before starting next
      }

      setTimeout(type, typingSpeed);
    }

    // Start typing animation
    setTimeout(type, 1000);
  }

  // Initialize animations
  function initAnimations() {
    // Initialize AOS
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });
    }

    // Animate skill bars
    animateSkillBars();

    // Start typing animation
    initTypingAnimation();

    // Add scroll event listener for nav highlighting
    window.addEventListener("scroll", highlightNavSection);

    // Initial highlight call
    highlightNavSection();
  }

  // Highlight current section in navigation
  function highlightNavSection() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    let currentSection = "";
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // Form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission
      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("Message sent successfully! I'll get back to you soon.");
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Initialize animations
  initAnimations();
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  initMatrix();

  // Add click event listeners to view options
  document
    .getElementById("terminalOption")
    .addEventListener("click", function () {
      document.getElementById("viewSelector").style.display = "none";
      document.getElementById("terminalInterface").style.display = "flex";
      window.terminal = new TerminalPortfolio();
    });

  document.getElementById("guiOption").addEventListener("click", function () {
    document.getElementById("viewSelector").style.display = "none";
    document.getElementById("guiInterface").style.display = "block";
    showGUILoader();
  });
});

// Fallback in case DOMContentLoaded doesn't fire correctly
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  if (loader && loader.style.display !== "none") {
    setTimeout(function () {
      loader.style.opacity = "0";
      setTimeout(function () {
        loader.style.display = "none";
      }, 600);
    }, 1000);
  }
});
