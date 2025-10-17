# Portfolio | sh1vam-03

## Overview

This is a dual-mode portfolio website for a security specialist and developer, featuring both a terminal interface and a traditional GUI interface. The portfolio showcases skills, projects, and contact information in an interactive and visually appealing manner.

## [Portfolio Link](https://sh1vam-03.github.io/portfolio)

![Portfolio Preview](https://github.com/user-attachments/assets/bc3cf9af-ad02-4c73-a9cc-88624c937474)

## Features

### Dual Interface Experience
- **Terminal Mode**: Command-line interface with authentic terminal functionality
- **GUI Mode**: Modern graphical interface with smooth animations

### Terminal Mode Features
- Command execution with `pf` prefix (e.g., `pf -help`, `pf -about`)
- Command history navigation with arrow keys
- Tab auto-completion
- ASCII art representations of content
- Terminal window controls (minimize, maximize, close)
- Matrix background effect

### GUI Mode Features
- Responsive design with mobile support
- Typing animation in hero section
- Animated skill bars
- Project cards with hover effects
- Contact form with EmailJS integration
- Social media links
- Smooth scrolling navigation

### Shared Features
- Matrix code background animation
- Loading screen with terminal-style progress bar
- Mode selection screen
- Consistent cyber-security themed design

## Technologies Used

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- CSS Grid and Flexbox for layout
- CSS Custom Properties (Variables) for theming

### Libraries & APIs
- Font Awesome Icons
- Google Fonts (Roboto Mono, Poppins, Source Code Pro)
- AOS (Animate On Scroll)
- Devicon for technology icons
- EmailJS for contact form functionality

### Special Effects
- Canvas-based Matrix background
- Custom typing animation
- Glow effects and transitions
- ASCII art generation

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # All CSS styles
├── script.js           # All JavaScript functionality
```

## Code Explanation

### HTML Structure
The HTML file contains three main view containers:
1. Common loader with terminal-style progress animation
2. View selector screen with mode options
3. Terminal interface with command processing
4. GUI interface with traditional sections

### CSS Architecture
The CSS uses a comprehensive variable system for theming:
```css
:root {
  --primary: #00FF41;        /* Matrix green */
  --secondary: #0D0208;      /* Dark background */
  --text-primary: #E5E5E5;   /* Light text */
  /* ... more variables */
}
```

Key styling features include:
- Cyber-security aesthetic with matrix green accents
- Responsive design with mobile breakpoints
- Custom animations and transitions
- Glass-morphism effects with backdrop filters

### JavaScript Functionality

#### Terminal Class
The `TerminalPortfolio` class handles all terminal functionality:
- Command parsing and execution
- History management
- Output rendering with ASCII art
- Mode switching

#### GUI Initialization
The `initGUI()` function handles:
- Mobile menu toggle
- Smooth scrolling
- Skill bar animations
- Typing animation
- Contact form setup

#### Special Effects
- Matrix background using Canvas API
- Loading screen with simulated progress
- Email integration with EmailJS

## How to Use

### Terminal Mode Commands
```
pf -help       # Show help menu
pf -about      # Display about information
pf -skills     # Show skills with ASCII progress bars
pf -projects   # List projects with descriptions
pf -contact    # Show contact information
pf -gui        # Switch to GUI mode
ls             # List directory contents
clear          # Clear terminal screen
exit           # Return to mode selection
```

### GUI Mode Navigation
- Use the navigation bar to jump to sections
- View projects with technology tags
- Use the contact form to send messages
- Switch to terminal mode using the terminal link

## Customization

### Theming
Modify CSS variables in the `:root` selector to change the color scheme:

```css
:root {
  --primary: #YourColor;      /* Primary accent color */
  --secondary: #YourDarkColor; /* Dark background */
  /* ... other variables */
}
```

### Content Updates
1. **Personal Information**: Update content in the HTML file
2. **Skills**: Modify skill names and percentages in both HTML and JavaScript
3. **Projects**: Add or update project cards in the HTML
4. **Contact Information**: Update contact details and EmailJS templates

### Email Configuration
To set up the contact form:
1. Create an EmailJS account
2. Replace the public key in the JavaScript:
```javascript
emailjs.init("your-public-key");
```
3. Set up email templates in the EmailJS dashboard

## Browser Support

This portfolio supports all modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Features

- Minimal external dependencies
- Optimized CSS with efficient selectors
- Debounced scroll events
- Efficient canvas animation
- Lazy loading for images

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels for interactive elements
- Color contrast compliance
- Focus indicators for interactive elements

## Deployment

The portfolio is deployed on GitHub Pages at:
https://sh1vam-03.github.io/portfolio/

To deploy your own version:
1. Fork the repository
2. Enable GitHub Pages in repository settings
3. Customize content as needed

## License

This project is open source and available under the MIT License.

## Contact

- Email: l1acker03@gmail.com
- GitHub: [sh1vam-03](https://github.com/sh1vam-03)
- LinkedIn: [sh1vam~03](https://www.linkedin.com/in/sh1vam~03)
- Twitter: [sh1vam_03](https://x.com/sh1vam_03)

## Future Enhancements

Potential improvements for the portfolio:
- Add dark/light mode toggle
- Implement PWA features for offline access
- Add more interactive terminal commands
- Include a blog section
- Add project filtering by technology
- Implement internationalization (i18n)

---

This portfolio showcases a unique approach to personal websites by combining technical prowess with creative design, reflecting the skills of a security specialist and developer.
