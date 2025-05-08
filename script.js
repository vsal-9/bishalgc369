// Utility functions
const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  // Cleanup function for event listeners
  const cleanup = {
    listeners: new Set(),
    add(element, event, handler) {
      element.addEventListener(event, handler)
      this.listeners.add({ element, event, handler })
    },
    removeAll() {
      this.listeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler)
      })
      this.listeners.clear()
    },
  }
  
  // Custom Cursor
  function initCustomCursor() {
    try {
      const cursor = document.createElement("div")
      cursor.classList.add("cursor")
  
      const cursorDot = document.createElement("div")
      cursorDot.classList.add("cursor-dot")
  
      document.body.appendChild(cursor)
      document.body.appendChild(cursorDot)
  
      const handleMouseMove = (e) => {
        cursor.style.left = e.clientX + "px"
        cursor.style.top = e.clientY + "px"
  
        cursorDot.style.left = e.clientX + "px"
        cursorDot.style.top = e.clientY + "px"
      }
  
      const handleMouseDown = () => cursor.classList.add("active")
      const handleMouseUp = () => cursor.classList.remove("active")
  
      cleanup.add(document, "mousemove", handleMouseMove)
      cleanup.add(document, "mousedown", handleMouseDown)
      cleanup.add(document, "mouseup", handleMouseUp)
  
      return { cursor, cursorDot }
    } catch (error) {
      console.error("Error initializing custom cursor:", error)
      return null
    }
  }
  
  // Click Animation
  function initClickAnimation() {
    document.addEventListener("click", (e) => {
      const clickAnim = document.createElement("div")
      clickAnim.classList.add("click-animation")
      clickAnim.style.left = e.clientX + "px"
      clickAnim.style.top = e.clientY + "px"
      clickAnim.style.width = "50px"
      clickAnim.style.height = "50px"
  
      document.body.appendChild(clickAnim)
  
      setTimeout(() => {
        clickAnim.remove()
      }, 600)
    })
  }
  
  // Background Code Lines Animation
  function initCodeLinesAnimation() {
    const codeLines = document.querySelector(".code-lines")
    if (!codeLines) return
  
    // Create random code snippets
    const snippets = [
      'if (isHacked) { alert("Access Granted"); }',
      "sudo apt-get update && sudo apt-get upgrade",
      "nmap -sV -p 1-65535 target.com",
      "ssh root@192.168.1.1",
      "SELECT * FROM users WHERE 1=1;",
      "for i in range(0, 100): print(i)",
      "curl -s https://api.target.com/v1/users",
      "git clone https://github.com/user/repo.git",
      "docker run -d -p 80:80 nginx",
      'function hackTheSystem() { return "success"; }',
    ]
  
    // Create and animate code snippets
    setInterval(() => {
      if (Math.random() > 0.7) {
        // Only create new snippets occasionally
        const snippet = document.createElement("div")
        snippet.classList.add("code-snippet")
        snippet.textContent = snippets[Math.floor(Math.random() * snippets.length)]
        snippet.style.left = `${Math.random() * 100}%`
        snippet.style.top = `${Math.random() * 100}%`
        snippet.style.opacity = "0"
        snippet.style.color = "rgba(0, 255, 0, 0.15)"
        snippet.style.fontSize = "12px"
        snippet.style.position = "absolute"
        snippet.style.pointerEvents = "none"
        snippet.style.fontFamily = "Fira Code, monospace"
        snippet.style.textShadow = "0 0 5px rgba(0, 255, 0, 0.3)"
        snippet.style.transform = "scale(0.8)"
        snippet.style.transition = "all 2s ease"
  
        document.querySelector(".background-animation").appendChild(snippet)
  
        // Animate in
        setTimeout(() => {
          snippet.style.opacity = "0.15"
          snippet.style.transform = "scale(1)"
        }, 100)
  
        // Remove after animation
        setTimeout(() => {
          snippet.style.opacity = "0"
          setTimeout(() => {
            snippet.remove()
          }, 2000)
        }, 5000)
      }
    }, 1000)
  }
  
  // Matrix Rain Animation
  function initMatrixRain() {
    try {
      const canvas = document.getElementById("matrix-canvas")
      if (!canvas) return null
  
      const ctx = canvas.getContext("2d")
      if (!ctx) return null
  
      let animationFrameId
      let isActive = true
  
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
  
      const fontSize = 14
      let columns = Math.floor(canvas.width / fontSize)
  
      const drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * canvas.height))
  
      const matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}"
  
      function draw() {
        if (!isActive) return
  
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
  
        ctx.fillStyle = "#0f0"
        ctx.font = fontSize + "px monospace"
  
        for (let i = 0; i < drops.length; i++) {
          const text = matrix[Math.floor(Math.random() * matrix.length)]
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)
  
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
  
          drops[i]++
        }
  
        animationFrameId = requestAnimationFrame(draw)
      }
  
      const handleResize = debounce(() => {
        resizeCanvas()
        columns = Math.floor(canvas.width / fontSize)
        drops.length = columns
        drops.fill(0).forEach((_, i) => (drops[i] = Math.floor(Math.random() * canvas.height)))
      }, 250)
  
      cleanup.add(window, "resize", handleResize)
      resizeCanvas()
      draw()
  
      return {
        stop: () => {
          isActive = false
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId)
          }
        },
      }
    } catch (error) {
      console.error("Error initializing matrix rain:", error)
      return null
    }
  }
  
  // Scroll Progress Indicator
  function initScrollProgress() {
    try {
      const scrollProgress = document.querySelector(".scroll-progress")
      if (!scrollProgress) return null
  
      const handleScroll = debounce(() => {
        const totalHeight = document.body.scrollHeight - window.innerHeight
        const progress = (window.pageYOffset / totalHeight) * 100
        scrollProgress.style.width = `${progress}%`
      }, 100)
  
      cleanup.add(window, "scroll", handleScroll)
      return { stop: () => cleanup.removeAll() }
    } catch (error) {
      console.error("Error initializing scroll progress:", error)
      return null
    }
  }
  
  // Theme Toggle
  function initThemeToggle() {
    try {
      const themeSwitch = document.getElementById("theme-switch")
      const themeMode = document.querySelector(".theme-mode")
      if (!themeSwitch || !themeMode) return null
  
      const handleThemeToggle = () => {
        document.documentElement.classList.toggle("light")
        themeMode.textContent = document.documentElement.classList.contains("light") ? "Stealth Mode" : "Hacker Mode"
      }
  
      cleanup.add(themeSwitch, "click", handleThemeToggle)
      return { stop: () => cleanup.removeAll() }
    } catch (error) {
      console.error("Error initializing theme toggle:", error)
      return null
    }
  }
  
  // Typing Headers Animation
  function initTypingHeaders() {
    try {
      const typingHeaders = document.querySelectorAll(".typing-header")
      if (!typingHeaders.length) return null
  
      const observers = new Set()
  
      typingHeaders.forEach((header) => {
        const text = header.textContent
        header.textContent = ""
  
        let i = 0
        const typeWriter = () => {
          if (i < text.length) {
            header.textContent += text.charAt(i)
            i++
            setTimeout(typeWriter, 50)
          }
        }
  
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                typeWriter()
                observer.unobserve(header)
                observers.delete(observer)
              }
            })
          },
          { threshold: 0.1 },
        )
  
        observers.add(observer)
        observer.observe(header)
      })
  
      return {
        stop: () => {
          observers.forEach((observer) => observer.disconnect())
          observers.clear()
        },
      }
    } catch (error) {
      console.error("Error initializing typing headers:", error)
      return null
    }
  }
  
  // Skill Tabs
  function initSkillTabs() {
    try {
      const skillTabs = document.querySelectorAll(".skill-tab")
      const skillCategories = document.querySelectorAll(".skill-category")
  
      if (!skillTabs.length || !skillCategories.length) return null
  
      const handleTabClick = (tab) => {
        const category = tab.getAttribute("data-category")
  
        // Update active tab
        skillTabs.forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")
  
        // Show selected category
        skillCategories.forEach((cat) => {
          if (cat.getAttribute("data-category") === category) {
            cat.classList.add("active")
  
            // Animate skill levels
            const skillLevels = cat.querySelectorAll(".skill-level")
            skillLevels.forEach((level) => {
              const width = level.style.width
              level.style.width = "0"
              requestAnimationFrame(() => {
                level.style.width = width
              })
            })
          } else {
            cat.classList.remove("active")
          }
        })
      }
  
      skillTabs.forEach((tab) => {
        cleanup.add(tab, "click", () => handleTabClick(tab))
      })
  
      return { stop: () => cleanup.removeAll() }
    } catch (error) {
      console.error("Error initializing skill tabs:", error)
      return null
    }
  }
  
  // Project Filters
  function initProjectFilters() {
    try {
      const filterBtns = document.querySelectorAll(".filter-btn")
      const projectCards = document.querySelectorAll(".project-card")
  
      if (!filterBtns.length || !projectCards.length) return null
  
      const handleFilter = (btn) => {
        const filter = btn.getAttribute("data-filter")
  
        // Update active button
        filterBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
  
        // Filter projects
        projectCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-categories").includes(filter)) {
            card.style.display = "block"
            requestAnimationFrame(() => {
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            })
          } else {
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"
            setTimeout(() => {
              card.style.display = "none"
            }, 300)
          }
        })
      }
  
      filterBtns.forEach((btn) => {
        cleanup.add(btn, "click", () => handleFilter(btn))
      })
  
      return { stop: () => cleanup.removeAll() }
    } catch (error) {
      console.error("Error initializing project filters:", error)
      return null
    }
  }
  
  // Testimonial Slider
  function initTestimonialSlider() {
    try {
      const testimonials = document.querySelectorAll(".testimonial-card")
      const dots = document.querySelectorAll(".dot")
      const prevBtn = document.querySelector(".prev-testimonial")
      const nextBtn = document.querySelector(".next-testimonial")
  
      if (!testimonials.length) return null
  
      let currentIndex = 0
      let autoSlideInterval
  
      const showTestimonial = (index) => {
        testimonials.forEach((t) => t.classList.remove("active"))
        dots.forEach((d) => d.classList.remove("active"))
  
        testimonials[index].classList.add("active")
        dots[index].classList.add("active")
      }
  
      const handlePrev = () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
        showTestimonial(currentIndex)
      }
  
      const handleNext = () => {
        currentIndex = (currentIndex + 1) % testimonials.length
        showTestimonial(currentIndex)
      }
  
      if (prevBtn) cleanup.add(prevBtn, "click", handlePrev)
      if (nextBtn) cleanup.add(nextBtn, "click", handleNext)
  
      dots.forEach((dot, index) => {
        cleanup.add(dot, "click", () => {
          currentIndex = index
          showTestimonial(currentIndex)
        })
      })
  
      // Auto slide
      autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length
        showTestimonial(currentIndex)
      }, 5000)
  
      return {
        stop: () => {
          clearInterval(autoSlideInterval)
          cleanup.removeAll()
        },
      }
    } catch (error) {
      console.error("Error initializing testimonial slider:", error)
      return null
    }
  }
  
  // Terminal CLI
  function initTerminalCLI() {
    try {
      const terminalInput = document.getElementById("terminal-input")
      const terminalOutput = document.getElementById("terminal-output")
  
      if (!terminalInput || !terminalOutput) return null
  
      const commands = {
        help: () => {
          return `
  Available commands:
  - about: Display information about me
  - skills: List my technical skills
  - projects: View my projects
  - contact: Get my contact information
  - clear: Clear the terminal
  - download resume: Download my resume
  - ls: List available sections
  - cd [section]: Navigate to a section
                  `
        },
        about: () => {
          return "Full Stack Developer with expertise in building responsive, high-performance web applications with a focus on cybersecurity principles."
        },
        skills: () => {
          return "HTML, CSS, JavaScript, TypeScript, React, Angular, Node.js, Python, SQL, AWS, Docker, Linux, Penetration Testing, Network Security"
        },
        projects: () => {
          return 'Project 1: Alpha Medical Assistant\nProject 2: RoadTrust\nProject 3: SecureNet Scanner\nType "project 1", "project 2", or "project 3" for details.'
        },
        "project 1": () => {
          return "Alpha Medical Assistant: Developed a smart medical assistant platform for doctors and students, focusing on diagnostic support and X-ray image processing."
        },
        "project 2": () => {
          return "RoadTrust: Designed and developed a cryptocurrency staking platform enabling users to manage high-yield crypto investments."
        },
        "project 3": () => {
          return "SecureNet Scanner: Built an automated network vulnerability scanner that identifies security weaknesses in corporate networks."
        },
        contact: () => {
          return "Email: your.email@example.com\nLinkedIn: linkedin.com/in/yourprofile\nGitHub: github.com/yourusername"
        },
        clear: () => {
          terminalOutput.innerHTML = ""
          return ""
        },
        "download resume": () => {
          // In a real implementation, this would trigger a download
          return "Downloading resume..."
        },
        ls: () => {
          return "about\nskills\nprojects\ncase-studies\nexperience\neducation\ncertifications\ntestimonials\ncontact"
        },
        cd: (args) => {
          if (!args) return "Please specify a section to navigate to."
  
          const section = args.toLowerCase()
          const validSections = [
            "about",
            "skills",
            "projects",
            "case-studies",
            "experience",
            "education",
            "certifications",
            "testimonials",
            "contact",
          ]
  
          if (validSections.includes(section)) {
            const targetSection = document.getElementById(section)
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: "smooth" })
              return `Navigating to ${section}...`
            }
          }
  
          return `Section "${section}" not found.`
        },
      }
  
      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault()
  
          const input = terminalInput.value.trim()
          const [cmd, ...args] = input.split(" ")
  
          // Add command to output
          const commandOutput = document.createElement("div")
          commandOutput.innerHTML = `<span style="color: var(--kali-accent);">visitor@portfolio:~$</span> ${input}`
          terminalOutput.appendChild(commandOutput)
  
          // Process command
          let response = ""
          if (cmd in commands) {
            if (typeof commands[cmd] === "function") {
              response = commands[cmd](args.join(" "))
            } else {
              response = commands[cmd]
            }
          } else if (cmd) {
            response = `Command not found: ${cmd}. Type "help" for available commands.`
          }
  
          // Add response to output
          if (response) {
            const responseOutput = document.createElement("div")
            responseOutput.innerHTML = response
            terminalOutput.appendChild(responseOutput)
          }
  
          // Clear input
          terminalInput.value = ""
  
          // Scroll to bottom
          terminalOutput.scrollTop = terminalOutput.scrollHeight
        }
      }
  
      const handleTerminalClick = () => {
        terminalInput.focus()
      }
  
      cleanup.add(terminalInput, "keydown", handleKeyDown)
      cleanup.add(document.querySelector(".terminal-cli"), "click", handleTerminalClick)
  
      return { stop: () => cleanup.removeAll() }
    } catch (error) {
      console.error("Error initializing terminal CLI:", error)
      return null
    }
  }
  
  // Floating Action Button
  function initFloatingActionButton() {
    try {
      const fab = document.getElementById("contact-fab")
      if (!fab) return null
  
      const handleFabClick = () => {
        const contactSection = document.getElementById("contact")
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" })
        }
      }
  
      cleanup.add(fab, "click", handleFabClick)
      return { stop: () => cleanup.removeAll() }
    } catch (error) {
      console.error("Error initializing floating action button:", error)
      return null
    }
  }
  
  function initLoadingAnimation() {
    const loadingScreen = document.querySelector(".loading-screen")
    const container = document.querySelector(".container")
  
    if (!loadingScreen || !container) {
      console.error("Loading screen or container elements not found")
      return
    }
  
    // Make sure container is hidden initially
    container.style.opacity = "0"
    container.style.display = "none"
  
    // Start loading animation
    setTimeout(() => {
      // Fade out loading screen
      loadingScreen.style.opacity = "0"
      loadingScreen.style.transition = "opacity 0.5s ease"
  
      setTimeout(() => {
        // Show container with initial opacity 0
        container.style.display = "flex"
  
        // Force reflow to ensure CSS transition works
        void container.offsetHeight
  
        // Fade in container
        container.style.opacity = "1"
        container.style.transition = "opacity 0.5s ease"
        container.classList.add("loaded")
  
        // Remove loading screen from DOM after fade out
        loadingScreen.style.display = "none"
  
        // Initialize scroll animations after loading
        initScrollAnimations()
  
        // Make sure all sections are properly initialized
        const sections = document.querySelectorAll(".content-section")
        sections.forEach((section) => {
          section.style.display = "block"
        })
  
        console.log("Loading complete, site initialized")
      }, 500) // Wait for loading screen to fade out
    }, 3000) // Initial loading delay
  }
  
  // Scroll Animations
  function initScrollAnimations() {
    const sections = document.querySelectorAll(".content-section")
    const scrollRevealElements = document.querySelectorAll(".scroll-reveal")
  
    // Make first section visible immediately
    if (sections.length > 0) {
      sections[0].classList.add("visible")
      const firstSectionReveal = sections[0].querySelectorAll(".scroll-reveal")
      firstSectionReveal.forEach((el) => el.classList.add("visible"))
    }
  
    // Create intersection observer for sections
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
  
            // Animate child elements with delay
            const revealElements = entry.target.querySelectorAll(".scroll-reveal:not(.visible)")
            revealElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("visible")
              }, 200 * index)
            })
          }
        })
      },
      { threshold: 0.1 },
    )
  
    // Observe all sections except the first one (already visible)
    sections.forEach((section, index) => {
      if (index > 0) {
        sectionObserver.observe(section)
      }
    })
  
    // Create intersection observer for individual elements
    const elementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
  
            // Add specific animations based on element type
            if (entry.target.classList.contains("skill-card")) {
              entry.target.style.animationDelay = `${Math.random() * 0.5}s`
              entry.target.style.animation = "fadeIn 0.5s forwards, slideUp 0.5s forwards"
            }
  
            if (entry.target.classList.contains("project-card")) {
              entry.target.style.animation = "fadeIn 0.7s forwards, slideUp 0.7s forwards"
            }
  
            if (entry.target.classList.contains("job-card") || entry.target.classList.contains("education-card")) {
              entry.target.style.animation = "fadeIn 0.8s forwards, slideUp 0.8s forwards"
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )
  
    // Observe individual elements
    const animateElements = document.querySelectorAll(".skill-card, .project-card, .job-card, .education-card")
    animateElements.forEach((el) => {
      elementObserver.observe(el)
    })
  }
  
  // Smooth scroll to section when clicking menu items
  function initSmoothScroll() {
    const menuItems = document.querySelectorAll(".menu-item[data-target]")
    const headerHeight = document.querySelector(".terminal-header").offsetHeight || 50 // Get header height or use fallback
  
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        const targetId = item.getAttribute("data-target")
        const targetSection = document.getElementById(targetId)
  
        if (targetSection) {
          // Update active menu item
          menuItems.forEach((mi) => mi.classList.remove("active"))
          item.classList.add("active")
  
          // Smooth scroll to section with offset for fixed header
          const yOffset = -headerHeight // Account for fixed header
          const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset
  
          window.scrollTo({
            top: y,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Update active menu item on scroll
    window.addEventListener("scroll", () => {
      let currentSection = ""
      const sections = document.querySelectorAll(".content-section")
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (window.pageYOffset >= sectionTop - headerHeight - 100) {
          currentSection = section.getAttribute("id")
        }
      })
  
      menuItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("data-target") === currentSection) {
          item.classList.add("active")
        }
      })
    })
  }
  
  // Mobile Menu Toggle
  function initMobileMenu() {
    // Check if mobile menu toggle already exists
    let menuToggle = document.querySelector(".mobile-menu-toggle")
  
    // If not, create it
    if (!menuToggle) {
      menuToggle = document.createElement("button")
      menuToggle.classList.add("mobile-menu-toggle")
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
      document.body.appendChild(menuToggle)
    }
  
    const sidebar = document.querySelector(".sidebar")
  
    
  
    function checkWindowSize() {
      if (window.innerWidth <= 1024) {
        menuToggle.style.display = "flex"
      } else {
        menuToggle.style.display = "none"
        sidebar.classList.remove("active")
      }
    }
  
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
  
      // Toggle icon between bars and times
      if (sidebar.classList.contains("active")) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>'
      } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
      }
    })
  
    // Add event listener for the sidebar close button
    sidebarClose.addEventListener("click", () => {
      sidebar.classList.remove("active")
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
    })
  
    // Close sidebar when clicking outside of it
    document.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 1024 &&
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target) &&
        sidebar.classList.contains("active")
      ) {
        sidebar.classList.remove("active")
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
      }
    })
  
    window.addEventListener("resize", checkWindowSize)
    checkWindowSize()
  
    // Close sidebar when clicking on a menu item on mobile
    const menuItems = document.querySelectorAll(".menu-item")
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove("active")
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
        }
      })
    })
  }
  
  // Initialize all functions when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    try {
      console.log("DOM loaded, initializing site...")
  
      // Store all initialized components for cleanup
      const components = {
        cursor: initCustomCursor(),
        matrixRain: initMatrixRain(),
        scrollProgress: initScrollProgress(),
        themeToggle: initThemeToggle(),
        typingHeaders: initTypingHeaders(),
        skillTabs: initSkillTabs(),
        projectFilters: initProjectFilters(),
        testimonialSlider: initTestimonialSlider(),
        terminalCLI: initTerminalCLI(),
        fab: initFloatingActionButton(),
      }
  
      // Initialize loading animation
      initLoadingAnimation()
  
      // Initialize other features that will be used after loading
      initSmoothScroll()
      initMobileMenu()
  
      // Add hover effects for interactive elements
      const interactiveElements = document.querySelectorAll(
        "button, .menu-item, .skill-card, .project-card, .job-card, .education-card, a",
      )
  
      interactiveElements.forEach((el) => {
        if (!components.cursor) return
  
        const handleMouseEnter = () => components.cursor.cursor.classList.add("active")
        const handleMouseLeave = () => components.cursor.cursor.classList.remove("active")
  
        cleanup.add(el, "mouseenter", handleMouseEnter)
        cleanup.add(el, "mouseleave", handleMouseLeave)
      })
  
      // Fallback in case loading animation fails
      const fallbackTimeout = setTimeout(() => {
        const loadingScreen = document.querySelector(".loading-screen")
        const container = document.querySelector(".container")
  
        if (loadingScreen && loadingScreen.style.display !== "none") {
          console.log("Loading timeout reached, forcing site display")
          loadingScreen.style.display = "none"
          container.style.display = "flex"
          container.style.opacity = "1"
          container.classList.add("loaded")
          initScrollAnimations()
        }
      }, 6000)
  
      // Cleanup function
      window.addEventListener("unload", () => {
        clearTimeout(fallbackTimeout)
        Object.values(components).forEach((component) => {
          if (component && typeof component.stop === "function") {
            component.stop()
          }
        })
        cleanup.removeAll()
      })
    } catch (error) {
      console.error("Error during site initialization:", error)
    }
  })

  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

document.querySelectorAll('.contact-btn').forEach(item => {
  item.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});
  

