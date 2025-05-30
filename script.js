// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Select only sections that should fade in (excluding the small-print section)
    const sections = document.querySelectorAll('section.fade-in');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Check if it's the countdown section, if so, start the countdown
                if (entry.target.classList.contains('countdown-section')) {
                    startCountdown();
                }
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Countdown Logic
function startCountdown() {
    // Define key dates
    const startDate = new Date("June 1, 2025 00:00:00").getTime();
    const endDate = new Date("June 20, 2025 23:59:59").getTime(); // Competition ends at the end of the day
    const resultDate = new Date("July 1, 2025 00:00:00").getTime();

    // Find the elements to display time and message
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const messageElement = document.getElementById("countdown-message");
    const countdownContainer = document.getElementById("countdown");
    const sectionTitle = document.querySelector(".countdown-section h2");

    // Update the countdown every 1 second
    const countdownInterval = setInterval(function() {

        // Get today's date and time
        const now = new Date().getTime();

        let targetDate;
        let message = "";
        let title = "";
        let showCountdown = true;

        if (now < startDate) {
            // Phase 1: Countdown to Start
            targetDate = startDate;
            title = "⏰ Início da Competição em:";
            message = ""; // No specific message needed during countdown
        } else if (now >= startDate && now < endDate) {
            // Phase 2: Countdown to End
            targetDate = endDate;
            title = "⏳ Fim da Competição em:";
            message = "Competição em andamento!"; // Add message during this phase
        } else if (now >= endDate && now < resultDate) {
            // Phase 3: Countdown to Result
            targetDate = resultDate;
            title = "🏆 Divulgação do Resultado em:";
            message = "Competição encerrada. Aguardando resultado!"; // Add message during this phase
        } else {
            // Phase 4: Competition Ended
            clearInterval(countdownInterval);
            title = "🎉 Resultado Divulgado!";
            message = "O resultado do 1º Campeonato Interfarmácia HEAL 2025 foi divulgado."; // Final message
            showCountdown = false;
        }

        // Update the title element
        sectionTitle.textContent = title;

        // Update the message element
        messageElement.textContent = message;

        if (showCountdown) {
            const distance = targetDate - now;

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Ensure countdown is visible
            countdownContainer.style.display = 'flex';

            // Output the result in elements
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Hide countdown numbers when competition is fully ended
            countdownContainer.style.display = 'none';
            daysElement.textContent = "00"; // Reset values
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
        }
    }, 1000); // Update every second
}