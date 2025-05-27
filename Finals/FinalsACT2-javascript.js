document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // CALENDAR INITIALIZATION FUNCTION (REUSABLE)
    // =============================================
    function initCalendar(elementId, events) {
        const calendarEl = document.getElementById(elementId);
        if (!calendarEl) return null;

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: elementId === 'full-calendar' 
                    ? 'dayGridMonth,timeGridWeek,timeGridDay,listMonth' 
                    : 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            initialDate: new Date(),
            nowIndicator: true,
            dayMaxEvents: true,
            height: 'auto',
            events: events,
            eventClick: function(info) {
                alert('Event: ' + info.event.title + '\n' +
                    'Start: ' + info.event.start.toLocaleString() + '\n' +
                    (info.event.end ? 'End: ' + info.event.end.toLocaleString() : ''));
                info.jsEvent.preventDefault();
            }
        });

        calendar.render();
        
        // Fix for initial blank calendar
        const resizeObserver = new ResizeObserver(() => {
            calendar.updateSize();
        });
        resizeObserver.observe(calendarEl);
        
        // Additional reliability fixes
        window.addEventListener('load', () => calendar.updateSize());
        window.addEventListener('resize', () => calendar.updateSize());
        
        return calendar;
    }

    // =============================================
    // INITIALIZE ALL CALENDARS
    // =============================================
    
    // Full Page Calendar (Calendar Page)
    const fullCalendar = initCalendar('full-calendar', [
        {
            title: 'Mathematics - Grade 10',
            start: new Date().toISOString().split('T')[0] + 'T08:00:00',
            end: new Date().toISOString().split('T')[0] + 'T09:30:00',
            className: 'event-lecture'
        },
        {
            title: 'Department Meeting',
            start: new Date().toISOString().split('T')[0] + 'T10:00:00',
            end: new Date().toISOString().split('T')[0] + 'T11:30:00',
            className: 'event-meeting'
        },
        {
            title: 'Physics - Grade 11',
            start: new Date().toISOString().split('T')[0] + 'T13:00:00',
            end: new Date().toISOString().split('T')[0] + 'T14:30:00',
            className: 'event-lecture'
        },
        {
            title: 'Office Hours',
            start: new Date().toISOString().split('T')[0] + 'T15:00:00',
            end: new Date().toISOString().split('T')[0] + 'T16:30:00',
            className: 'event-office-hours'
        },
        {
            title: 'Midterm Exams',
            start: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
            end: new Date(new Date().setDate(new Date().getDate() + 8)).toISOString().split('T')[0],
            className: 'event-exam'
        },
        {
            title: 'Parent-Teacher Conference',
            start: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0] + 'T14:00:00',
            end: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0] + 'T17:00:00',
            className: 'event-other'
        }
    ]);

    // Dashboard Calendar (Main Page)
    const dashboardCalendar = initCalendar('calendar', [
        {
            title: 'Mathematics - Grade 10',
            start: new Date().toISOString().split('T')[0] + 'T08:00:00',
            end: new Date().toISOString().split('T')[0] + 'T09:30:00',
            className: 'event-lecture'
        },
        {
            title: 'Department Meeting',
            start: new Date().toISOString().split('T')[0] + 'T10:00:00',
            end: new Date().toISOString().split('T')[0] + 'T11:30:00',
            className: 'event-meeting'
        },
        {
            title: 'Physics - Grade 11',
            start: new Date().toISOString().split('T')[0] + 'T13:00:00',
            end: new Date().toISOString().split('T')[0] + 'T14:30:00',
            className: 'event-lecture'
        }
    ]);

    // =============================================
    // MOBILE MENU TOGGLE
    // =============================================
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'btn btn-primary d-md-none fixed-top m-3';
    mobileMenuToggle.innerHTML = '<i class="bi bi-list"></i> Menu';
    mobileMenuToggle.style.zIndex = '1000';
    document.body.prepend(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('mobile-show');
    });

    // =============================================
    // BOOTSTRAP COMPONENTS INITIALIZATION
    // =============================================
    
    // Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        this.innerHTML = '<i class="bi bi-sun"></i> Light Mode';
    } else {
        this.innerHTML = '<i class="bi bi-moon"></i> Dark Mode';
    }
});


// Add dark mode styles
const style = document.createElement('style');
style.textContent = `
    .dark-mode {
        background-color: #1a1a1a;
        color: #f0f0f0;
    }
    .dark-mode .card {
        background-color: #2d2d2d;
        color: #f0f0f0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }
    .dark-mode .card-header {
        background-color: #252525;
        border-bottom: 1px solid #444;
        color: #f0f0f0;
    }
    .dark-mode .table {
        color: #f0f0f0;
    }
    .dark-mode .table-hover tbody tr:hover {
        background-color: #3a3a3a;
        color: #f0f0f0;
    }
    .dark-mode .text-muted {
        color: #aaa !important;
    }
    .dark-mode .sidebar {
        background-color: #1e1e1e;
    }
    .dark-mode .nav-link {
        color: #ccc;
    }
    .dark-mode .nav-link:hover, .dark-mode .nav-link.active {
        background-color: #3498db;
        color: white;
    }
    .dark-mode .header {
        background-color: #2d2d2d;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    .dark-mode .form-control {
        background-color: #333;
        border-color: #444;
        color: #f0f0f0;
    }
    .dark-mode .input-group-text {
        background-color: #444;
        border-color: #555;
        color: #f0f0f0;
    }
`;
document.head.appendChild(style);