 // Update time display
        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString();
            document.getElementById('time-display').innerHTML = `
                <div>${timeString}</div>
                <div>${dateString}</div>
            `;
        }
        
        setInterval(updateTime, 1000);
        updateTime();
        
        // Start menu functionality
        const startButton = document.getElementById('start-button');
        const startMenu = document.getElementById('start-menu');
        
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', () => {
            startMenu.classList.remove('active');
        });
        
        startMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Widgets panel functionality
        const widgetsButton = document.getElementById('widgets-button');
        const widgetsPanel = document.getElementById('widgets-panel');
        
        widgetsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            widgetsPanel.classList.toggle('active');
        });
        
        document.addEventListener('click', () => {
            widgetsPanel.classList.remove('active');
        });
        
        widgetsPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // App launching functionality
        const desktopIcons = document.querySelectorAll('.desktop-icon');
        const taskbarIcons = document.querySelectorAll('.taskbar-icon');
        const startMenuApps = document.querySelectorAll('.start-menu-app');
        
        function openApp(appName) {
            const window = document.getElementById(`${appName}-window`);
            if (window) {
                window.classList.add('active');
                window.style.left = `${Math.random() * 200 + 100}px`;
                window.style.top = `${Math.random() * 100 + 50}px`;
                
                // Update taskbar icon state
                taskbarIcons.forEach(icon => {
                    if (icon.dataset.app === appName) {
                        icon.classList.add('active');
                    }
                });
            }
        }
        
        desktopIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const appName = icon.dataset.app;
                openApp(appName);
            });
        });
        
        taskbarIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const appName = icon.dataset.app;
                openApp(appName);
            });
        });
        
        startMenuApps.forEach(app => {
            app.addEventListener('click', () => {
                const appName = app.dataset.app;
                openApp(appName);
                startMenu.classList.remove('active');
            });
        });
        
        // Window controls
        const closeButtons = document.querySelectorAll('.window-control.close');
        
        closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const windowId = button.dataset.window;
                document.getElementById(windowId).classList.remove('active');
                
                // Update taskbar icon state
                const appName = windowId.replace('-window', '');
                taskbarIcons.forEach(icon => {
                    if (icon.dataset.app === appName) {
                        icon.classList.remove('active');
                    }
                });
            });
        });
        
        // Notification functionality
        const notificationIcon = document.getElementById('notification-icon');
        const notification = document.getElementById('notification');
        const notificationClose = document.getElementById('notification-close');
        
        notificationIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            notification.classList.toggle('active');
        });
        
        notificationClose.addEventListener('click', () => {
            notification.classList.remove('active');
        });
        
        // Show notification on load
        setTimeout(() => {
            notification.classList.add('active');
        }, 1000);
        
        // Make windows draggable
        function makeDraggable(element) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            const header = element.querySelector('.window-header');
            
            header.onmousedown = dragMouseDown;
            
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }
            
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                element.style.top = (element.offsetTop - pos2) + "px";
                element.style.left = (element.offsetLeft - pos1) + "px";
            }
            
            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
        
        // Apply draggable to all windows
        document.querySelectorAll('.window').forEach(window => {
            makeDraggable(window);
        });
        
        // Settings options
        const settingsOptions = document.querySelectorAll('.settings-option');
        settingsOptions.forEach(option => {
            option.addEventListener('click', () => {
                settingsOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
        
        // Explorer options
        const explorerOptions = document.querySelectorAll('.explorer-option');
        explorerOptions.forEach(option => {
            option.addEventListener('click', () => {
                explorerOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });