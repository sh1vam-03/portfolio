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

        // Common Loader function
        function showCommonLoader() {
          return new Promise((resolve) => {
            const loader = document.getElementById("commonLoader");
            const progress = document.getElementById("commonLoaderProgress");

            // Show loader
            loader.classList.add("active");
            progress.style.width = "0%";

            // Simulate loading progress - shorter duration
            const progressSteps = [
              { width: "30%", delay: 200 },
              { width: "60%", delay: 300 },
              { width: "90%", delay: 600 },
              { width: "100%", delay: 200 }
            ];

            let totalDelay = 0;
            progressSteps.forEach((step, index) => {
              totalDelay += step.delay;
              setTimeout(() => {
                progress.style.width = step.width;
              }, totalDelay);
            });

            // Hide loader after completion
            setTimeout(() => {
              loader.classList.remove("active");
              setTimeout(resolve, 0); // Shorter fade out
            }, totalDelay + 600);
          });
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

            if (this.currentInput) {
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
            }

            // Terminal window controls
            const closeBtn = document.getElementById("closeTerminal");
            const minimizeBtn = document.getElementById("minimizeTerminal");
            const maximizeBtn = document.getElementById("maximizeTerminal");

            if (closeBtn) {
              closeBtn.addEventListener("click", async () => {
                await showCommonLoader();
                this.showViewSelector();
              });
            }

            if (minimizeBtn) {
              minimizeBtn.addEventListener("click", () => {
                this.addOutput(
                  '[INFO] Terminal minimized. Type "exit" to return to selection screen.'
                );
              });
            }

            if (maximizeBtn) {
              maximizeBtn.addEventListener("click", () => {
                this.addOutput("[INFO] Terminal maximized.");
              });
            }
          }

          executeCommand() {
            if (this.isLoading || !this.currentInput) return;

            const command = this.currentInput.value.trim();

            if (command) {
              this.commandHistory.push(command);
              this.historyIndex = this.commandHistory.length;
              this.addOutput(`sh1vam@portfolio:~$ ${command}`, "command-line");

              if (this.commands[command]) {
                this.commands[command]();
              } else if (command === "cd" || command.startsWith("cd ")) {
                this.changeDirectory(command);
              } else {
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
            if (!this.currentInput) return;
            
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
            if (this.commandHistory.length === 0 || !this.currentInput) return;

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
pf -about    - Learn about me
pf -skills   - View my technical skills
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

sh1vam - Full-Stack Developer | Web Security & Penetration Tester

I'm building secure applications using my full stack development, web security, and penetration testing skills.

I am a Full Stack Developer and Ethical Hacker with specialized expertise in Web Security & Penetration Testing. My unique combination of development skills and security knowledge allows me to build robust web applications with security integrated at every layer of the technology stack.

With experience in both creating software and ethically breaking it, I implement security best practices during development while proactively identifying vulnerabilities through comprehensive penetration testing. This dual perspective enables me to deliver solutions that are not just functional, but fundamentally secure by design.

My technical approach combines modern web development frameworks with offensive security methodologies to create applications that withstand real-world threats while maintaining optimal performance and user experience.

Stats:
- 03+ Projects Completed
- 01+ Satisfied Clients
- 02+ Professional Certifications`;
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
████████████████          63% VAPT
██████████████            54% Web Security
█████████                 36% Network Sec
█                         02% Cryptography

Development:
██████████████████        69% Python
████████████████          63% JS/Node.js
███████████████           59% React
██████████                39% Databases

Tools & Technologies:
████████████████████████  93% Kali Linux
██████████████████████    86% Burp Suite
██████████████            54% Metasploit
██████████████            53% Wireshark`;
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

1. GitMan - GitHub Dorking URL Generator
- Identify potentially sensitive or exposed data within public GitHub repositories
- Designed for security researchers, penetration testers, and bug bounty hunters
- CLI-based tool with flexible GitHub dorking techniques
- Supports Python-based automation for security research
➤ Technologies: Python, GitHub Dorking, CLI, Security Research
➤ GitHub Link: https://github.com/sh1vam-03/gitman

2. WA-Spam — WhatsApp, Snapchat, etc Spammer  
- Send user-typed or auto-generated messages on WhatsApp, Snapchat, and more
- Random message generation and counting features
- Flexible spamming options for educational purposes
- Terminal-based Python tool for automation
➤ Technologies: Python, CLI, Automation, Terminal Tool
➤ GitHub Link: https://github.com/sh1vam-03/WhatsApp-Spammer

3. Tabsye — QR-Based Ordering System
- Modern restaurant ordering platform using QR codes
- Live menu updates, order tracking, and inventory management
- Seamless table orders and optimized restaurant service
- Web-based interface with Next.js and Tailwind CSS
➤ Technologies: Next.js, Tailwind CSS, PostgreSQL, Web Security
➤ Live Demo: https://tabsye.com`;
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

Email:        l1acker03@gmail.com
Phone:        +91 75177514XX
Address:      192.168.119.12
Availability: Currently available for freelance projects

Social:
- GitHub:     github.com/sh1vam-03
- LinkedIn:   linkedin.com/in/sh1vam~03
- Twitter:    x.com/sh1vam_03
- Instagram:  instagram.com/sh1vam_03

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

          async switchToGUI() {
            this.isLoading = true;
            this.addOutput("[INFO] Switching to GUI mode...");

            // Remove setTimeout and directly switch after loader
            await showCommonLoader();
            document.getElementById("terminalInterface").style.display = "none";
            document.getElementById("guiInterface").style.display = "block";
            initGUI();
            this.isLoading = false;
          }

          async showViewSelector() {
            this.isLoading = true;
            this.addOutput("[INFO] Returning to mode selection...");

            // Remove setTimeout and directly switch after loader
            await showCommonLoader();
            document.getElementById("terminalInterface").style.display = "none";
            document.getElementById("viewSelector").style.display = "flex";
            this.isLoading = false;
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

            if (
              content.includes("██") ||
              content.includes("➤") ||
              content.includes("████")
            ) {
              output.innerHTML = `<div class="ascii-art">${content}</div>`;
            } else {
              output.textContent = content;
            }

            this.terminalContent.insertBefore(output, this.currentInputContainer);
            this.scrollToBottom();
          }

          clearInput() {
            if (this.currentInput) {
              this.currentInput.value = "";
            }
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
            if (this.currentInput) {
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
            }

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
          const switchToTerminalBtn = document.getElementById("switchToTerminal");
          if (switchToTerminalBtn) {
            switchToTerminalBtn.addEventListener("click", async (e) => {
              e.preventDefault();
              
              await showCommonLoader();
              
              document.getElementById("guiInterface").style.display = "none";
              document.getElementById("terminalInterface").style.display = "flex";
              
              if (!window.terminal) {
                window.terminal = new TerminalPortfolio();
              }
              window.terminal.focusInput();
            });
          }

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

                if (navLinks && navLinks.classList.contains("active")) {
                  navLinks.classList.remove("active");
                  if (hamburger) {
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                  }
                }
              }
            });
          });

          // Animate skill bars
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
              "Full-Stack Developer",
              "Web Security & Penetration Tester",
            ];
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;

            function type() {
              const currentText = texts[textIndex];

              if (isDeleting) {
                textElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
              } else {
                textElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
              }

              if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1000;
              } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
              }

              setTimeout(type, typingSpeed);
            }

            setTimeout(type, 1000);
          }

          // Initialize animations
          function initAnimations() {
            if (typeof AOS !== "undefined") {
              AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
              });
            }

            animateSkillBars();
            initTypingAnimation();
            window.addEventListener("scroll", highlightNavSection);
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

// Initialize EmailJS
(function () {
  emailjs.init("vKxbPXfw618L4ocmy"); // ✅ Replace with your EmailJS public key
})();

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // 1️⃣ Send notification email (to you)
    emailjs.sendForm("service_va4luii", "template_6c967hv", this)
      .then(() => {
        // 2️⃣ Send auto-reply email (to user)
        return emailjs.sendForm("service_va4luii", "template_08nbffa", this);
      })
      .then(() => {
        alert("✅ Message sent successfully! An auto-reply has been sent to your inbox.");
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      })
      .catch((error) => {
        alert("❌ Failed to send message. Please try again later.");
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
}

          initAnimations();
        }

        // Initialize application
        document.addEventListener("DOMContentLoaded", () => {
          initMatrix();

          // View selection event listeners
          const terminalOption = document.getElementById("terminalOption");
          const guiOption = document.getElementById("guiOption");

          if (terminalOption) {
            terminalOption.addEventListener("click", async function () {
              document.getElementById("viewSelector").style.display = "none";
              
              await showCommonLoader();
              
              document.getElementById("terminalInterface").style.display = "flex";
              if (!window.terminal) {
                window.terminal = new TerminalPortfolio();
              }
              window.terminal.focusInput();
            });
          }

          if (guiOption) {
            guiOption.addEventListener("click", async function () {
              document.getElementById("viewSelector").style.display = "none";
              
              await showCommonLoader();
              
              document.getElementById("guiInterface").style.display = "block";
              initGUI();
            });
          }
        });